"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { updateUser, signInWithEmail } = useAuth() as any;
  const [showPanel, setShowPanel] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [panelLoading, setPanelLoading] = useState(false);

  async function handleLogout() {
    const { success } = await signOut();
    if (success) {
      router.push("/");
    }
  }

  function openPanel() {
    if (!user) return;
    setEditName(user.user_metadata?.name ?? "");
    setEditEmail(user.email ?? "");
    setUsername(user.user_metadata?.username ?? "");
    setShowPanel((s) => !s);
    setStatusMsg(null);
  }

  async function handleSaveProfile() {
    setPanelLoading(true);
    setStatusMsg(null);
    try {
      const updates: any = { name: editName };
      if (editEmail && editEmail !== user.email) updates.email = editEmail;
      if (username) updates.username = username;
      const { user: updated, error } = await updateUser(updates);
      if (error) {
        setStatusMsg(error);
        return;
      }
      setStatusMsg("프로필이 저장되었습니다.");
    } finally {
      setPanelLoading(false);
    }
  }

  async function handleChangePassword() {
    setPanelLoading(true);
    setStatusMsg(null);
    try {
      if (!currentPwd) {
        setStatusMsg("현재 비밀번호를 입력하세요.");
        return;
      }
      if (!newPwd || newPwd.length < 8) {
        setStatusMsg("새 비밀번호는 최소 8자리입니다.");
        return;
      }
      if (newPwd !== confirmPwd) {
        setStatusMsg("새 비밀번호가 일치하지 않습니다.");
        return;
      }
      // Verify current password
      const { user: signed, error: signinErr } = await signInWithEmail(user.email!, currentPwd);
      if (signinErr) {
        setStatusMsg("현재 비밀번호가 틀립니다.");
        return;
      }
      // Update password
      const { user: updated, error } = await updateUser({ password: newPwd });
      if (error) {
        setStatusMsg(error);
        return;
      }
      setStatusMsg("비밀번호가 변경되었습니다.");
      setShowChangePwd(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
    } finally {
      setPanelLoading(false);
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
                  <span className="text-sm text-lime-200 flex items-center gap-2">
                    <span>{user.user_metadata?.name || user.email}님</span>
                    <button onClick={openPanel} className="text-xs px-2 py-1 bg-lime-300 text-blue-950 rounded">설정</button>
                  </span>
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
                {showPanel && (
                  <div className="absolute right-6 top-20 w-80 bg-card p-4 rounded shadow-lg z-50 text-foreground">
                    <h3 className="font-semibold mb-2">설정</h3>
                    {statusMsg && <div className="mb-2 text-sm text-red-600">{statusMsg}</div>}
                    <div className="mb-2">
                      <label className="text-sm text-foreground">이름</label>
                      <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <label className="text-sm text-foreground">이메일</label>
                      <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <label className="text-sm text-foreground">아이디 (username)</label>
                      <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <label className="text-sm text-foreground">비밀번호</label>
                      <div className="flex items-center gap-2">
                        <span className="flex-1 text-sm">********</span>
                        <button
                          onMouseDown={() => setShowPassword(true)}
                          onMouseUp={() => setShowPassword(false)}
                          onMouseLeave={() => setShowPassword(false)}
                          className="px-2 py-1 bg-gray-200 rounded text-xs"
                        >
                          비밀번호 확인
                        </button>
                      </div>
                    </div>
                    {!showChangePwd ? (
                      <div className="flex gap-2 mt-2">
                        <Button onClick={() => setShowChangePwd(true)}>비밀번호 변경</Button>
                        <Button variant="outline" onClick={() => setShowPanel(false)}>닫기</Button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <Input type="password" placeholder="현재 비밀번호" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="mb-2" />
                        <Input type="password" placeholder="새 비밀번호" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="mb-2" />
                        <Input type="password" placeholder="새 비밀번호 확인" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="mb-2" />
                        <div className="flex gap-2">
                          <Button onClick={handleChangePassword} disabled={panelLoading}>변경</Button>
                          <Button variant="outline" onClick={() => setShowChangePwd(false)}>취소</Button>
                        </div>
                      </div>
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={panelLoading}>저장</Button>
                      <Button variant="outline" onClick={() => setShowPanel(false)}>닫기</Button>
                    </div>
                  </div>
                )}
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
