import { describe, expect, it } from "vitest";
import {
  isPrivateOrReservedIPv4,
  isPrivateOrReservedIPv6,
  validateSafeCrawlerUrl,
} from "@/core/security/ssrf-guard";

describe("SSRF Protection Guardrail", () => {
  it("blocks private IPv4 addresses (RFC 1918 & Loopback)", () => {
    expect(isPrivateOrReservedIPv4("127.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIPv4("10.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIPv4("172.16.0.5")).toBe(true);
    expect(isPrivateOrReservedIPv4("172.31.255.254")).toBe(true);
    expect(isPrivateOrReservedIPv4("192.168.1.1")).toBe(true);
  });

  it("blocks Cloud Metadata IPs (169.254.169.254 AWS/GCP/Azure IMDS)", () => {
    expect(isPrivateOrReservedIPv4("169.254.169.254")).toBe(true);
    expect(isPrivateOrReservedIPv4("169.254.1.1")).toBe(true);
  });

  it("allows public IPv4 addresses", () => {
    expect(isPrivateOrReservedIPv4("8.8.8.8")).toBe(false);
    expect(isPrivateOrReservedIPv4("1.1.1.1")).toBe(false);
    expect(isPrivateOrReservedIPv4("142.250.180.206")).toBe(false);
  });

  it("blocks IPv6 loopback and mapped addresses", () => {
    expect(isPrivateOrReservedIPv6("::1")).toBe(true);
    expect(isPrivateOrReservedIPv6("::ffff:127.0.0.1")).toBe(true);
    expect(isPrivateOrReservedIPv6("::ffff:10.0.0.1")).toBe(true);
  });

  it("validates and blocks unsafe crawler target URLs", async () => {
    const localhostResult = await validateSafeCrawlerUrl(
      "http://127.0.0.1/admin",
    );
    expect(localhostResult.isSafe).toBe(false);

    const metadataResult = await validateSafeCrawlerUrl(
      "http://169.254.169.254/latest/meta-data/",
    );
    expect(metadataResult.isSafe).toBe(false);

    const fileScheme = await validateSafeCrawlerUrl("file:///etc/passwd");
    expect(fileScheme.isSafe).toBe(false);
  });
});
