"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  async function handleLogout() {
    const { success } = await signOut();
    if (success) {
      router.push("/");
    }
  }

  return (
    <header className="bg-blue-950 text-lime-100 border-b-4 border-lime-400 shadow-md">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl md:text-4xl font-black tracking-tight hover:text-lime-300 transition-colors"
          >
            공공인재빅데이터융합학
          </Link>

          <nav className="flex items-center gap-3">
            <Link href="/posts">
              <Button variant="outline" size="sm" className="bg-lime-300 text-blue-950 hover:bg-lime-200">
                자유게시판
              </Button>
            </Link>
            {loading ? (
              <span className="text-sm text-lime-200">로딩 중...</span>
            ) : user ? (
              <>
                <Link href="/settings" className="text-sm text-lime-200 hover:underline">
                  {user.user_metadata?.name || user.email}님
                </Link>
                <Link href="/posts/new">
                  <Button variant="outline" size="sm" className="bg-lime-300 text-blue-950 hover:bg-lime-200">
                    글쓰기
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="bg-red-400 text-white hover:bg-red-500"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="bg-lime-300 text-blue-950 hover:bg-lime-200">
                    로그인
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" size="sm" className="bg-lime-300 text-blue-950 hover:bg-lime-200">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
