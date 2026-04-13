import "./globals.css";
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
          <div className="max-w-5xl mx-auto px-6 py-6 text-center">
            <Link
              href="/"
              className="inline-block text-2xl md:text-4xl font-black tracking-tight hover:text-lime-300 transition-colors"
            >
              공공인재빅데이터융합학
            </Link>
          </div>
        </header>
        <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-1">{children}</main>
        <footer className="text-center text-blue-950/85 py-5 border-t border-lime-300/70 bg-lime-200/70">
          © 2026 공공인재빅데이터융합학
        </footer>
      </body>
    </html>
  );
}
