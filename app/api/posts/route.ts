import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  const { title, content, user_id } = await request.json();

  // 입력값 검증
  if (!title || !content || !user_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 서버 사이드 Supabase 클라이언트 생성 (쿠키를 통한 세션 관리)
  let response = NextResponse.json({ error: "Internal server error" }, { status: 500 });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  try {
    // posts 테이블에 새 글 삽입
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, user_id }])
      .select()
      .single();

    if (error) {
      console.error("createPost API error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("createPost API exception:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
