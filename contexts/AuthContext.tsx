"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import * as authFunctions from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ user: User | null; error: string | null }>;
  signOut: () => Promise<{ success: boolean; error: string | null }>;
  updateUser: (updates: { email?: string; password?: string; name?: string }) => Promise<{ user: User | null; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 초기 사용자 상태 확인: getSession()을 사용해 세션이 없을 때 예외가 발생하지 않도록 처리
    const initializeUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data?.session?.user ?? null);
      } catch (err) {
        console.error("Error fetching session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    // 로그인/로그아웃 상태 변화 감지
    const subscription = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // cleanup: subscription 해제
    return () => {
      subscription.data?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail: authFunctions.signInWithEmail,
        signUpWithEmail: authFunctions.signUpWithEmail,
        signOut: authFunctions.signOut,
        updateUser: authFunctions.updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
