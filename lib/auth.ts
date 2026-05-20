import { createClient } from "@/lib/supabase/client";

/**
 * 이메일과 비밀번호로 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 성공 시 user, 실패 시 error
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.";
    return { user: null, error: message };
  }
}

/**
 * 이메일과 비밀번호로 회원가입
 * @param email 이메일
 * @param password 비밀번호
 * @param name 사용자 이름
 * @returns 성공 시 user, 실패 시 error
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      // 자세한 에러 로깅을 남겨 디버깅에 사용
      console.error("signUp error detail:", error);
      const errMsg = error?.message ?? "회원가입 중 오류가 발생했습니다.";
      return { user: null, error: `${errMsg} (code: ${error?.status ?? "unknown"})`, status: error?.status ?? null };
    }

    return { user: data.user, error: null, status: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다.";
    return { user: null, error: message };
  }
}

/**
 * 이메일로 인증 코드를 전송
 * @param email 이메일
 * @returns 성공 시 true, 실패 시 error
 */
export async function sendEmailCode(email: string) {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error("sendEmailCode error detail:", error);
      const errMsg = error?.message ?? "인증 코드 전송 중 오류가 발생했습니다.";
      return { success: false, error: `${errMsg} (code: ${error?.status ?? "unknown"})`, status: error?.status ?? null };
    }

    return { success: true, error: null, status: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "인증 코드 전송 중 오류가 발생했습니다.";
    return { success: false, error: message, status: null };
  }
}

/**
 * 이메일과 인증 코드를 검증
 * @param email 이메일
 * @param token 인증 코드
 * @returns 성공 시 user, 실패 시 error
 */
export async function verifyEmailCode(email: string, token: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      console.error("verifyEmailCode error detail:", error);
      const errMsg = error?.message ?? "인증 코드 확인 중 오류가 발생했습니다.";
      return { user: null, error: `${errMsg} (code: ${error?.status ?? "unknown"})`, status: error?.status ?? null };
    }

    return { user: data.user, error: null, status: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "인증 코드 확인 중 오류가 발생했습니다.";
    return { user: null, error: message, status: null };
  }
}

/**
 * 로그아웃
 * @returns 성공 시 true, 실패 시 error message
 */
export async function signOut() {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "로그아웃 중 오류가 발생했습니다.";
    return { success: false, error: message };
  }
}
