import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "1";

  return NextResponse.json({ isAdmin });
}
