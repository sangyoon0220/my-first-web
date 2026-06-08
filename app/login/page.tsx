"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { sendEmailCode } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !password) {
        setError("이메일과 비밀번호를 입력해주세요.");
        return;
      }

      const { user, error: signInError } = await signInWithEmail(email, password);

      if (signInError) {
        // Supabase may return an 'Email not confirmed' error when email confirmation is required
        if (typeof signInError === 'string' && /confirm/i.test(signInError)) {
          setShowResend(true);
          setError("이메일 인증이 필요합니다. 이메일 인증 또는 매직링크를 다시 전송하세요.");
        } else {
          setError(signInError);
        }
        return;
      }

      if (user) {
        router.push("/posts");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-lg bg-card shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-6">로그인</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>
          {showResend && (
            <div className="mt-3 text-center">
              {message && <div className="mb-2 text-sm text-green-700">{message}</div>}
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white text-sm"
                onClick={async () => {
                  setMessage(null);
                  setLoading(true);
                  try {
                    const res = await sendEmailCode(email);
                    if (!res.success) {
                      setError(res.error ?? "인증 메일 전송에 실패했습니다.");
                    } else {
                      setMessage("인증 메일(또는 매직링크)이 전송되었습니다. 이메일을 확인하세요.");
                      setShowResend(false);
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                인증/매직링크 다시 전송
              </button>
            </div>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-foreground">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="text-primary hover:underline font-semibold">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
