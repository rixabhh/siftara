const SIGNING_SECRET = process.env.CERTIFICATE_SIGNING_SECRET;

export interface CertificatePayload {
  certificateId: string;
  certificateCode: string;
  learnerName: string;
  courseId: string;
  title: string;
  skills: string[];
  issuedAt: string;
  criteriaVersion: string;
}

export function buildCertificatePayload(fields: {
  id: string;
  certificateCode: string;
  learnerName: string;
  courseId: string | null;
  title: string;
  skillsJson: string | null;
  issuedAt: Date;
}): CertificatePayload {
  return {
    certificateId: fields.id,
    certificateCode: fields.certificateCode,
    learnerName: fields.learnerName,
    courseId: fields.courseId ?? "",
    title: fields.title,
    skills: fields.skillsJson ? JSON.parse(fields.skillsJson) : [],
    issuedAt: fields.issuedAt.toISOString(),
    criteriaVersion: "v1",
  };
}

function canonicalize(payload: CertificatePayload): string {
  return JSON.stringify({
    certificate_id: payload.certificateId,
    certificate_code: payload.certificateCode,
    learner_name: payload.learnerName,
    course_id: payload.courseId,
    title: payload.title,
    skills: payload.skills.sort(),
    issued_at: payload.issuedAt,
    criteria_version: payload.criteriaVersion,
  });
}

export async function signCertificate(payload: CertificatePayload): Promise<{ signature: string; payloadHash: string }> {
  const canonical = canonicalize(payload);
  const encoder = new TextEncoder();

  // Compute payload hash
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(canonical));
  const payloadHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (!SIGNING_SECRET) {
    console.warn("CERTIFICATE_SIGNING_SECRET not set — using unsigned fallback");
    return { signature: `unsigned-${payloadHash}`, payloadHash };
  }

  // Compute HMAC-SHA256 signature
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(canonical));
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { signature, payloadHash };
}

export async function verifyCertificate(
  payload: CertificatePayload,
  storedSignature: string,
  storedHash: string
): Promise<{ valid: boolean; reason: string }> {
  // Recompute hash
  const canonical = canonicalize(payload);
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(canonical));
  const recomputedHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Check hash matches
  if (recomputedHash !== storedHash) {
    return { valid: false, reason: "Payload hash mismatch — certificate data may have been altered" };
  }

  // Check signature
  if (storedSignature.startsWith("unsigned-")) {
    return { valid: true, reason: "Certificate is valid (unsigned — signing not configured)" };
  }

  if (!SIGNING_SECRET) {
    return { valid: false, reason: "Signing secret not configured — cannot verify signature" };
  }

  // Recompute HMAC
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SIGNING_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigBytes = hexToBytes(storedSignature);
  const valid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(canonical));

  if (!valid) {
    return { valid: false, reason: "Digital signature verification failed" };
  }

  return { valid: true, reason: "Certificate signature verified" };
}

function hexToBytes(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}
