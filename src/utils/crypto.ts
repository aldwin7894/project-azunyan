import crypto from "node:crypto";

const key = process.env.ENCRYPTION_KEY as string;

const encryptSymmetric = (plaintext: string) => {
  const iv = crypto.randomBytes(12).toString("base64");

  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64"),
  );
  let ciphertext = cipher.update(plaintext, "utf8", "base64");
  ciphertext += cipher.final("base64");
  const tag = cipher.getAuthTag();
  ciphertext = `${iv}:${ciphertext}:${tag.toString("base64")}`;

  return ciphertext;
};
const decryptSymmetric = (ciphertext: string) => {
  const [iv, ciphertextBase64, tag] = ciphertext.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(key, "base64"),
    Buffer.from(iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(tag, "base64"));

  let plaintext = decipher.update(ciphertextBase64, "base64", "utf8");
  plaintext += decipher.final("utf8");

  return plaintext;
};

const CryptoUtil = {
  encryptSymmetric,
  decryptSymmetric,
};
export default CryptoUtil;
