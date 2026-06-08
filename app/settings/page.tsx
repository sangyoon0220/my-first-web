"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth() as any;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name ?? "");
      setEmail(user.email ?? "");
      setUsername(user.user_metadata?.username ?? "");
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const updates: any = { name };
      if (email && email !== user.email) updates.email = email;
      if (username) updates.username = username;
      if (showPasswordInput && password) updates.password = password;

      const { user: updated, error: updErr } = await updateUser(updates);
      if (updErr) {
        setError(updErr as string);
        return;
      }
      setMessage("정보가 업데이트되었습니다.");
      // small delay then refresh
      setTimeout(() => router.refresh(), 800);
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <div className="p-6">로그인해야 설정을 수정할 수 있습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">계정 설정</h1>
      {error && <div className="mb-3 p-2 bg-red-100 text-red-800">{error}</div>}
      {message && <div className="mb-3 p-2 bg-green-100 text-green-800">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">아이디 (username)</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          {!showPasswordInput ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">********</span>
              <Button type="button" onClick={() => setShowPasswordInput(true)}>비밀번호 변경</Button>
            </div>
          ) : (
            <Input type="password" placeholder="새 비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>{loading ? '저장 중...' : '저장'}</Button>
          <Button type="button" variant="outline" onClick={() => router.push('/')}>취소</Button>
        </div>
      </form>
    </div>
  );
}
