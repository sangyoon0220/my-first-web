"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminSessionButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });

        if (!response.ok) {
          if (mounted) {
            setLoaded(true);
          }
          return;
        }

        const data = (await response.json()) as { isAdmin?: boolean };

        if (mounted) {
          setIsAdmin(Boolean(data.isAdmin));
          setLoaded(true);
        }
      } catch {
        if (mounted) {
          setLoaded(true);
        }
      }
    }

    void loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAdmin(false);
      window.location.href = "/posts";
    } catch {
      window.alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  if (!loaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <Link
        href="/admin/login?redirect=/posts"
        className="px-3 py-1.5 rounded-full border border-blue-200/70 bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-colors"
      >
        관리자 로그인
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-3 py-1.5 rounded-full border border-red-200/80 bg-white text-red-600 font-semibold hover:bg-red-50 transition-colors"
    >
      관리자 로그아웃
    </button>
  );
}
