import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type Params = {
  params: Promise<{ id: string }>;
};

function createSupabase(request: NextRequest, response: NextResponse) {
  return createServerClient(
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
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { title, content } = await request.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: false });
  const supabase = createSupabase(request, response);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing, error: existingError } = await supabase
    .from("posts")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (existing.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;

  const response = NextResponse.json({ ok: false });
  const supabase = createSupabase(request, response);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existing, error: existingError } = await supabase
    .from("posts")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (existing.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
