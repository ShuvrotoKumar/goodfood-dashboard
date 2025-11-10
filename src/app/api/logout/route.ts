import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "gf_auth", value: "", path: "/", maxAge: 0 });
  return res;
}
