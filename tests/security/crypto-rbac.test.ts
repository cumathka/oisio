import { describe, expect, it } from "vitest";
import { decryptSecret, encryptSecret } from "@/core/security/crypto";
import { hasPermission } from "@/core/security/rbac";

describe("AES-256-GCM Cryptography & RBAC Engine", () => {
  const dummy32ByteHexKey =
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

  it("encrypts and decrypts sensitive tokens symmetrically", () => {
    const originalToken = "ya29.a0AfH6SMD_google_ads_sensitive_token_12345";
    const encrypted = encryptSecret(originalToken, dummy32ByteHexKey);

    expect(encrypted).not.toEqual(originalToken);
    expect(encrypted.split(":").length).toBe(3);

    const decrypted = decryptSecret(encrypted, dummy32ByteHexKey);
    expect(decrypted).toBe(originalToken);
  });

  it("enforces strict role-based access control (RBAC)", () => {
    expect(hasPermission("OWNER", "billing:manage")).toBe(true);
    expect(hasPermission("OWNER", "project:delete")).toBe(true);

    expect(hasPermission("MANAGER", "project:create")).toBe(true);
    expect(hasPermission("MANAGER", "billing:manage")).toBe(false);

    expect(hasPermission("VIEWER", "dashboard:view")).toBe(true);
    expect(hasPermission("VIEWER", "project:create")).toBe(false);
    expect(hasPermission("VIEWER", "ads:edit")).toBe(false);
  });
});
