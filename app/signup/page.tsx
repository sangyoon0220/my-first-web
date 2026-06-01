"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { sendEmailCode, verifyEmailCode } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestCode() {
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

      const { success: sendSuccess, error: sendError, status } = await sendEmailCode(email);

      if (!sendSuccess) {
        if (status === 429 || /rate limit/i.test(sendError ?? "")) {
          setError("요청이 너무 많습니다. 5분 후 다시 시도하거나 다른 이메일을 사용해보세요.");
          return;
        }

        setError(sendError);
        return;
      }

      setStep("code");
      setCode("");
      setMessage("인증 코드를 이메일로 보냈습니다. 이메일로 받은 인증번호(8자리)를 입력하세요.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    await requestCode();
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (!email || !code) {
        setError("이메일과 인증 코드를 입력해주세요.");
        return;
      }

      const { user, error: verifyError, status } = await verifyEmailCode(email, code);

      if (verifyError) {
        if (status === 429 || /rate limit/i.test(verifyError)) {
          setError("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
          return;
        }

        setError(verifyError);
        return;
      }

      if (user) {
        setVerified(true);
        setMessage("이메일 인증이 완료되었습니다. 잠시 후 이동합니다.");
        setTimeout(() => {
          router.push("/posts");
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-lg bg-card shadow-sm">
        <h1 className="text-2xl font-bold text-foreground mb-6">이메일 인증 회원가입</h1>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm">
            {message}
          </div>
        )}

        {!verified && step === "email" && (
          <form onSubmit={handleSendCode} className="space-y-4">
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
                비밀번호 (최소 8자리)
              </label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "인증 코드 전송 중..." : "인증 코드 보내기"}
            </Button>
          </form>
        )}

        {!verified && step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label htmlFor="email-readonly" className="block text-sm font-medium text-foreground mb-1">
                이메일
              </label>
              <Input id="email-readonly" type="email" value={email} disabled />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-1">
                인증번호
              </label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="인증번호를 입력하세요 (예: 8자리 숫자)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "확인 중..." : "코드 확인"}
            </Button>

            <button
              type="button"
              className="w-full text-sm text-primary hover:underline disabled:opacity-50"
              onClick={() => {
                void requestCode();
              }}
              disabled={loading}
            >
              코드 다시 보내기
            </button>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
