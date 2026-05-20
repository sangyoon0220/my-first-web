import "./globals.css";
import Link from "next/link";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "./header";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col bg-lime-100 text-slate-900">
        <AuthProvider>
          <Header />
          <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-1">{children}</main>
          <footer className="text-center text-blue-950/85 py-5 border-t border-lime-300/70 bg-lime-200/70">
            © 2026 공공인재빅데이터융합학
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
