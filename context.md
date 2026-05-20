# Context — my-first-web 프로젝트 상태

## 현재 상태


## 기술 결정 사항
- 프레임워크: Next.js 16.2.1 App Router only (pages/ 금지)
- 언어/런타임: TypeScript + React 19.2.4
- 스타일: Tailwind CSS 4 + `app/globals.css`의 CSS 변수
- UI 컴포넌트: shadcn/ui (`components/ui/`)

### Ch8: Supabase 연결 ✅
- posts 테이블 RLS 적용: `supabase/migrations/20260520093000_add_posts_rls.sql` 추가 (SELECT: 모두, INSERT/UPDATE/DELETE: 작성자 제약)
### Ch9: 이메일 OTP 인증 ✅
- **인증 방식**: 이메일 코드 기반 (password signup 제외)
  - `sendEmailCode(email)` - OTP 코드 발송
  - `verifyEmailCode(email, code)` - 코드 검증 + 자동 로그인
  - `signInWithEmail(email, password)` - 로그인
  - `signOut()` - 로그아웃
- **세션 관리**: @supabase/ssr + 쿠키 (App Router 전용)
- **전역 상태**: `contexts/AuthContext.tsx` + `useAuth` Hook
- **보호 라우트**: `middleware.ts` → /posts/new, /posts/edit/* 리다이렉트
- **API 보안**: 
  - `auth.signIn()` 구버전 금지 (signInWithPassword 사용)
  - `service_role` 키 클라이언트 금지

### Ch10: 게시글 CRUD (준비 중)
- **posts 테이블 스키마**:
  - `id` (UUID, 기본 키)
  - `user_id` (UUID, 외래 키 → users.id)
  - `title` (TEXT, 제목)
  - `content` (TEXT, 본문)
  - `created_at` (TIMESTAMP, 작성 시간)
  - `updated_at` (TIMESTAMP, 수정 시간)
- **읽기 (R)**: 로그인 불필요, 전체 공개 (middleware 제약 없음)
- **생성 (C)**: 로그인 필수 (middleware 제약 있음)
- **수정 (U)**: 로그인 필수 + 본인 글만 (RLS 처리, Ch11)
- **삭제 (D)**: 로그인 필수 + 본인 글만 (RLS 처리, Ch11)
- **UI vs 보안**: 수정/삭제 버튼은 UX 목적, 실제 권한 검사는 Ch11 RLS에서 처리

## 패키지 버전 정책

| 패키지 | 교재 기준 | 현재 설치 | 비고 |
|--------|----------|---------|------|
| next | 16.2.1 | 16.2.1 | ✅ 동일 |
| react | 19.2.4 | 19.2.4 | ✅ 동일 |
| @supabase/supabase-js | 2.47.12 | 2.105.4 | 신버전 호환 가능 |
| @supabase/ssr | 0.5.2 | 0.5.2 | ✅ 동일 |
| Tailwind CSS | 4 | 4 | ✅ 동일 |
| TypeScript | 최신 (^5) | ^5 | ✅ 호환 |

## 해결된 이슈

### Ch9 인증 구현 중
- AuthSessionMissingError: `getUser()` → `getSession()` 변경 (안전한 에러 처리)
- Double-subscription: useEffect cleanup으로 unsubscribe 처리
- 이메일 rate limit (429): 클라이언트 측 300초 cooldown 추가
- 구버전 API: `auth.signIn()` 금지, `signInWithPassword()` / `signUpWithOtp()` 사용

### 구조 및 규칙
- `copilot-instructions.md`는 `.github/` 아래에 둘 때 자동 로드된다.
- `context.md`는 규칙이 아니라 현재 진행 상태를 적는 문서다.
- `todo.md`는 단계별 체크리스트와 진행률을 남기는 문서다.
- 와이어프레임은 별도 문서로 초안을 남겨도 이후 작업의 기준이 된다.

### Ch9 → Ch10 전환
- Ch9 인증 완료 (이메일 OTP 회원가입, 로그인, 세션 관리)
- Ch10에서는 posts CRUD + 보호 라우트 구현
- Ch11에서는 RLS (행 수준 보안) 처리 → 본인 글만 수정/삭제 가능
