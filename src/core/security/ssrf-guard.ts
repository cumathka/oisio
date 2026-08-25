import dns from "node:dns/promises";
import { URL } from "node:url";

export interface SSRFCheckResult {
  isSafe: boolean;
  hostname: string;
  resolvedIp?: string;
  reason?: string;
}

/**
 * Checks if an IPv4 string belongs to private, loopback, link-local, carrier-grade NAT, or multicast ranges.
 */
export function isPrivateOrReservedIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // Malformed IPs are considered unsafe
  }

  const [a, b] = parts;

  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;

  // 10.0.0.0/8 (RFC 1918 Private)
  if (a === 10) return true;

  // 100.64.0.0/10 (Carrier-grade NAT)
  if (a === 100 && b >= 64 && b <= 127) return true;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;

  // 169.254.0.0/16 (Link-local / Cloud Metadata: AWS/GCP/Azure IMDS)
  if (a === 169 && b === 254) return true;

  // 172.16.0.0/12 (RFC 1918 Private)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (a === 192 && b === 0 && parts[2] === 0) return true;

  // 192.168.0.0/16 (RFC 1918 Private)
  if (a === 192 && b === 168) return true;

  // 198.18.0.0/15 (Network benchmark tests)
  if (a === 198 && (b === 18 || b === 19)) return true;

  // 224.0.0.0/4 (Multicast)
  if (a >= 224 && a <= 239) return true;

  // 240.0.0.0/4 (Reserved for future use / Broadcast)
  if (a >= 240) return true;

  return false;
}

/**
 * Checks if an IPv6 string is loopback, unique local, link-local, or IPv4-mapped private.
 */
export function isPrivateOrReservedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase().trim();

  // Loopback ::1
  if (normalized === "::1" || normalized === "0:0:0:0:0:0:0:1") return true;
  // Unspecified ::
  if (normalized === "::" || normalized === "0:0:0:0:0:0:0:0") return true;

  // IPv4-mapped IPv6 (::ffff:127.0.0.1 or ::ffff:192.168.1.1)
  if (normalized.startsWith("::ffff:")) {
    const ipv4Part = normalized.replace("::ffff:", "");
    if (ipv4Part.includes(".")) {
      return isPrivateOrReservedIPv4(ipv4Part);
    }
  }

  // Unique local addresses (fc00::/7) -> fc.. or fd..
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;

  // Link-local unicast (fe80::/10)
  if (
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb")
  ) {
    return true;
  }

  return false;
}

/**
 * Hardened SSRF Validator
 * Protects against URL parsing anomalies, credentials abuse (admin@127.0.0.1),
 * cloud metadata endpoints (169.254.169.254), internal LANs, and DNS resolution to private IPs.
 */
export async function validateSafeCrawlerUrl(
  rawUrl: string,
): Promise<SSRFCheckResult> {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    return { isSafe: false, hostname: "", reason: "Invalid URL format" };
  }

  // Enforce HTTP / HTTPS only
  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return {
      isSafe: false,
      hostname: parsedUrl.hostname,
      reason: `Disallowed protocol: ${parsedUrl.protocol}. Only http: and https: are allowed.`,
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase().trim();

  // Block localhost and internal domain names
  const blockedHostnames = [
    "localhost",
    "localhost.localdomain",
    "metadata.google.internal",
    "instance-data",
    "169.254.169.254",
  ];

  if (
    blockedHostnames.includes(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".lan")
  ) {
    return {
      isSafe: false,
      hostname,
      reason: "Host is a reserved local or cloud metadata name.",
    };
  }

  // Direct IP checks (IPv4 and IPv6)
  if (isPrivateOrReservedIPv4(hostname)) {
    return {
      isSafe: false,
      hostname,
      resolvedIp: hostname,
      reason: "Direct access to private/reserved IPv4 addresses is blocked.",
    };
  }

  if (hostname.startsWith("[") && hostname.endsWith("]")) {
    const cleanV6 = hostname.slice(1, -1);
    if (isPrivateOrReservedIPv6(cleanV6)) {
      return {
        isSafe: false,
        hostname,
        resolvedIp: cleanV6,
        reason: "Direct access to private/reserved IPv6 addresses is blocked.",
      };
    }
  }

  // DNS Resolution check to prevent DNS Rebinding to internal IPs
  try {
    const lookupResults = await dns.lookup(hostname, { all: true });
    if (!lookupResults || lookupResults.length === 0) {
      return {
        isSafe: false,
        hostname,
        reason: "DNS resolution failed: Host not found.",
      };
    }

    for (const record of lookupResults) {
      if (record.family === 4 && isPrivateOrReservedIPv4(record.address)) {
        return {
          isSafe: false,
          hostname,
          resolvedIp: record.address,
          reason: `Resolved IP (${record.address}) is in a private or reserved network range.`,
        };
      }
      if (record.family === 6 && isPrivateOrReservedIPv6(record.address)) {
        return {
          isSafe: false,
          hostname,
          resolvedIp: record.address,
          reason: `Resolved IPv6 (${record.address}) is in a private or reserved network range.`,
        };
      }
    }

    return {
      isSafe: true,
      hostname,
      resolvedIp: lookupResults[0].address,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown DNS error";
    return {
      isSafe: false,
      hostname,
      reason: `DNS lookup failed: ${errorMessage}`,
    };
  }
}
