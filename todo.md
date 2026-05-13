# TODO — my-first-web

## Ch9: Supabase 이메일/비밀번호 인증

### ① 기초 확인

- [x] Supabase CLI 프로젝트 연결 확인 (`npx supabase projects list`)
- [ ] 환경변수 재확인 (`.env.local`)
- [ ] Supabase 대시보드 Email Provider 확인
- [ ] Supabase 대시보드 URL Configuration 확인

### ② 문서 정비

- [x] `context.md` Ch9 기준 갱신
- [x] `todo.md` Ch9 목표 정리
- [ ] `AGENTS.md` 버전 정책 추가
- [ ] `CLAUDE.md` 인증 기준 추가

### ③ 코드 구현

- [x] `lib/auth.ts` - 인증 함수 (signInWithEmail, signUpWithEmail, signOut)
- [x] `app/login/page.tsx` - 로그인 화면
- [x] `app/signup/page.tsx` - 회원가입 화면
- [x] `contexts/AuthContext.tsx` - 로그인 상태 전역 공유
- [x] `app/layout.tsx` - AuthProvider 연결
- [x] `app/header.tsx` - 로그인/회원가입/글쓰기/로그아웃 UI
- [x] `middleware.ts` - `/posts/new` 보호 라우트

### ④ 검증

- [~] 회원가입 → 로그인 → 새로고침 유지 → 로그아웃 시나리오 테스트 (Supabase Email Provider 설정 필요)
- [ ] 비로그인 사용자 `/posts/new` 접근 차단 확인
- [x] `npm run build` 성공 ✅
- [x] 구버전 API 확인 (`auth.signIn` 없음) ✅
- [x] 민감 키 확인 (`service_role` 없음) ✅

### ⑤ 배포

- [ ] Vercel 환경변수 재확인
- [ ] GitHub push & Vercel 배포
- [ ] 배포된 사이트 검증

## 진행률

- **현재**: 기초 확인 완료 (1/5)
- **목표**: Ch9 완료 후 Ch11 RLS 이동
