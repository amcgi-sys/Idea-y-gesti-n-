import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "idea-gestion", timestamp: new Date().toISOString() });
}
