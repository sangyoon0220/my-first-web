"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUpWithEmail } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (!email) {
        setError("이메일을 입력해주세요.");
        return;
      }
      if (!password || password.length < 8) {
        setError("비밀번호는 최소 8자리 이상이어야 합니다.");
        return;
      }

      const { user, error: signupError } = await signUpWithEmail(email, password, name || "");

      if (signupError) {
        setError(signupError as string);
        return;
      }

      if (user) {
        setMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        setTimeout(() => router.push("/login"), 1200);
      }
    } finally {
      setLoading(false);
    }
  }

  // No email verification flow in development: users sign up with email+password directly.

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-lg bg-card shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-6">회원가입</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">{error}</div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm">{message}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              이름 (선택)
            </label>
            <Input id="name" type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              이메일
            </label>
            <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              비밀번호 (최소 8자리)
            </label>
            <Input id="password" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "회원가입 중..." : "회원가입"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-foreground">
          이미 계정이 있으신가요? {" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">로그인</Link>
        </p>
      </div>
    </div>
  );
}
