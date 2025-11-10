import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });
  // In a real app, send an email with a reset link.
  return NextResponse.json({ ok: true });
}
