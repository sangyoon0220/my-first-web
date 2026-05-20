import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  const { title, content } = await request.json();

  // 입력값 검증
  if (!title || !content) {
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
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = user.id;

    // profiles 테이블에 사용자 정보가 있는지 확인
    const { data: profileExists } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user_id)
      .single();

    // 프로필이 없으면 생성
    if (!profileExists) {
      const { error: profileCreateError } = await supabase
        .from("profiles")
        .insert([{ id: user_id }]);

      if (profileCreateError) {
        console.error("createProfile error:", profileCreateError);
        // 프로필 생성 실패했지만 계속 진행 (이미 있을 수도 있음)
      }
    }

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
