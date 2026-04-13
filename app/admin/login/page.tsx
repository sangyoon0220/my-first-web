"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<section className="max-w-md mx-auto py-10" />}>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/posts";

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (!response.ok) {
        setErrorMessage("관리자 로그인에 실패했습니다.");
        return;
      }

      router.push(redirectPath);
      router.refresh();
    } catch {
      setErrorMessage("로그인 요청 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-md mx-auto py-10">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-black text-blue-950 mb-2">관리자 로그인</h1>
        <p className="text-sm text-blue-900/75 mb-6">관리자만 게시글 작성/수정이 가능합니다.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-id" className="block text-sm font-semibold text-blue-950 mb-2">
              아이디
            </label>
            <input
              id="admin-id"
              type="text"
              value={id}
              onChange={(event) => setId(event.target.value)}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-blue-950 mb-2">
              비밀번호
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-lime-300 px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>

          {errorMessage && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-950 px-5 py-2.5 text-lime-100 font-semibold hover:bg-blue-900 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </section>
  );
}
