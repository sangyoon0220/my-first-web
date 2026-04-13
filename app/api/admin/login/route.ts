import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminLogin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string; password?: string };
  const id = body.id ?? "";
  const password = body.password ?? "";

  if (!isValidAdminLogin(id, password)) {
    return NextResponse.json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
