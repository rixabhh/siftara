import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface ClerkUser {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
}

interface ClerkEvent {
  type: string;
  data: ClerkUser;
}

async function verifyWebhookSignature(
  body: string,
  headers: Headers
): Promise<boolean> {
  if (!WEBHOOK_SECRET) {
    console.warn("CLERK_WEBHOOK_SECRET not set — skipping signature verification");
    return true;
  }

  const svixId = headers.get("svix-id");
  const svixTimestamp = headers.get("svix-timestamp");
  const svixSignature = headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  const toSign = `${svixId}.${svixTimestamp}.${body}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(toSign));
  const expectedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));

  const signatures = svixSignature.split(" ");
  return signatures.some((sig) => sig === `v1,${expectedSignature}`);
}

async function upsertUser(user: ClerkUser) {
  const db = getDb();
  const now = new Date();
  const email = user.email_addresses?.[0]?.email_address ?? "";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || email.split("@")[0];

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, user.id))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(schema.users)
      .set({
        name,
        email,
        avatarUrl: user.image_url ?? null,
        updatedAt: now,
      })
      .where(eq(schema.users.id, user.id));
  } else {
    await db.insert(schema.users).values({
      id: user.id,
      name,
      email,
      avatarUrl: user.image_url ?? null,
      authProvider: "clerk",
      role: "learner",
      planType: "free",
      freeMySiftUsed: false,
      createdAt: now,
      updatedAt: now,
    });
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const headers = request.headers;

  const isValid = await verifyWebhookSignature(body, headers);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: ClerkEvent;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated":
        await upsertUser(event.data);
        break;

      case "user.deleted":
        if (event.data?.id) {
          const db = getDb();
          await db.delete(schema.users).where(eq(schema.users.id, event.data.id));
        }
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook处理失败:", error);
    return NextResponse.json({ error: "Webhook处理失败" }, { status: 500 });
  }
}
