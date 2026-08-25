import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Standard for GCM
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts sensitive string payload using AES-256-GCM.
 * Output format: iv_hex:auth_tag_hex:ciphertext_hex
 */
export function encryptSecret(plainText: string, secretKeyHex: string): string {
  const key = Buffer.from(secretKeyHex, "hex");
  if (key.length !== 32) {
    throw new Error(
      "Encryption key must be exactly 32 bytes (64 hex characters).",
    );
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Decrypts AES-256-GCM ciphertext string.
 */
export function decryptSecret(
  encryptedPayload: string,
  secretKeyHex: string,
): string {
  const key = Buffer.from(secretKeyHex, "hex");
  if (key.length !== 32) {
    throw new Error(
      "Encryption key must be exactly 32 bytes (64 hex characters).",
    );
  }

  const parts = encryptedPayload.split(":");
  if (parts.length !== 3) {
    throw new Error(
      "Malformed encrypted payload format. Expected iv:authTag:ciphertext",
    );
  }

  const [ivHex, authTagHex, cipherHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const ciphertext = Buffer.from(cipherHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
