import "./globals.css";
import AdminSessionButton from "./admin-session-button";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-lime-100 text-slate-900">
        <header className="bg-blue-950 text-lime-100 border-b-4 border-lime-400 shadow-md">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-sm md:text-base font-extrabold tracking-tight hover:text-lime-300 transition-colors"
            >
              공인재 이상윤의 생존일기
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full border border-lime-300/50 bg-blue-900 hover:bg-blue-800 hover:border-lime-300 transition-colors"
              >
                홈
              </Link>
              <Link
                href="/posts"
                className="px-3 py-1.5 rounded-full border border-lime-300/50 bg-blue-900 hover:bg-blue-800 hover:border-lime-300 transition-colors"
              >
                블로그
              </Link>
              <Link
                href="/posts/new"
                className="px-3 py-1.5 rounded-full border border-lime-300/50 bg-lime-400/90 text-blue-950 font-semibold hover:bg-lime-300 transition-colors"
              >
                새 글 쓰기
              </Link>
              <AdminSessionButton />
            </div>
          </nav>
        </header>
        <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-1">{children}</main>
        <footer className="text-center text-blue-950/85 py-5 border-t border-lime-300/70 bg-lime-200/70">
          © 2026 공인재 이상윤의 생존일기
        </footer>
      </body>
    </html>
  );
}
