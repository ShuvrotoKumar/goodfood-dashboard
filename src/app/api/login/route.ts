import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "gf_auth",
    value: "token",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
