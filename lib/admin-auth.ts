import type { NextRequest } from "next/server";

export const ADMIN_ID = "steven0220";
export const ADMIN_PASSWORD = "sangyoon0220";
export const ADMIN_SESSION_COOKIE = "admin_session";

export function isValidAdminLogin(id: string, password: string): boolean {
  return id === ADMIN_ID && password === ADMIN_PASSWORD;
}

export function isAdminRequest(request: NextRequest): boolean {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === "1";
}
