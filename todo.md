# TODO — my-first-web

## Ch9: Supabase 이메일 OTP 인증 ✅ COMPLETED

### ① 기초 확인 ✅

- [x] Supabase CLI 프로젝트 연결 확인 (`npx supabase projects list`)
- [x] 환경변수 설정 (`.env.local`)
- [x] Supabase 대시보드 Email Provider 확인

### ② 문서 정비 ✅

- [x] `context.md` Ch9 기준 갱신
- [x] `todo.md` Ch9 목표 정리
- [x] `AGENTS.md` 버전 정책 추가
- [x] `CLAUDE.md` 인증 기준 추가
- [x] `.github/copilot-instructions.md` Ch9 규칙 추가

### ③ 코드 구현 ✅

- [x] `lib/auth.ts` - 인증 함수 (sendEmailCode, verifyEmailCode, signInWithEmail, signOut)
- [x] `app/login/page.tsx` - 로그인 화면 (이메일 + 비밀번호)
- [x] `app/signup/page.tsx` - 회원가입 화면 (2단계: 이메일 → 코드 검증)
- [x] `contexts/AuthContext.tsx` - 로그인 상태 전역 공유 (useAuth Hook)
- [x] `app/layout.tsx` - AuthProvider 연결
- [x] `app/header.tsx` - 로그인/회원가입/글쓰기/로그아웃 UI
- [x] `middleware.ts` - `/posts/new`, `/posts/edit/*` 보호 라우트

### ④ 검증 ✅

- [x] 회원가입 → 로그인 플로우 작동 확인
- [x] 비로그인 사용자 `/posts/new` 접근 차단 확인
- [x] `npm run build` 성공 ✅
- [x] 구버전 API 확인 (`auth.signIn` 없음) ✅
- [x] 민감 키 확인 (`service_role` 없음) ✅

### ⑤ 배포

- [x] Git commit & push (bf8952a - ch9: add email code auth flow)
- [~] Vercel 배포 (토큰 인증 필요, 코드는 준비됨)

## Ch10: 게시글 CRUD 구현 (준비 중)

### ① 문서 정비

- [ ] `context.md` Ch10 기준 반영 → DONE (step 2에서 완료)
- [ ] `todo.md` Ch10 목표 정리 → DOING (지금 하는 중)
- [ ] `ARCHITECTURE.md` posts CRUD API 추가
- [ ] `.github/copilot-instructions.md` Ch10 규칙 추가 (CRUD, 보호 라우트, UX vs RLS)
- [ ] `AGENTS.md` Ch10 버전/규칙 추가
- [ ] `CLAUDE.md` Ch10 규칙 추가
- [ ] `.agent/rules/project.md` 신규 생성

### ② 코드 구현 (예정)

#### 읽기 (R)
- [ ] `lib/posts.ts` - getPosts(), getPostById() 함수
- [ ] `app/posts/page.tsx` - 글 목록 페이지 (서버 컴포넌트)
- [ ] `app/posts/[id]/page.tsx` - 글 상세 페이지 (서버 컴포넌트)

#### 생성 (C)
- [ ] `lib/posts.ts` - createPost(title, content, user_id) 함수
- [ ] `app/posts/new/page.tsx` - 글 작성 페이지 (로그인 필수, middleware 보호)
- [ ] 서버 액션 또는 API 라우트 `/api/posts` (POST)

#### 수정 (U)
- [ ] `lib/posts.ts` - updatePost(id, title, content) 함수
- [ ] `app/posts/edit/[id]/page.tsx` - 글 수정 페이지 (로그인 필수, middleware 보호)
- [ ] 서버 액션 또는 API 라우트 `/api/posts/[id]` (PATCH)

#### 삭제 (D)
- [ ] `lib/posts.ts` - deletePost(id) 함수
- [ ] 서버 액션 또는 API 라우트 `/api/posts/[id]` (DELETE)
- [ ] UI: "삭제" 버튼 + 확인 Dialog

### ③ 보호 라우트 (middleware.ts 확장)

- [ ] `/posts/new` → 로그인 필수 (이미 있음)
- [ ] `/posts/edit/[id]` → 로그인 필수 (이미 있음)
- [ ] `/posts/[id]/delete` 또는 버튼 → UI 목적, 실제 권한은 Ch11 RLS

### ④ 검증

- [ ] 글 생성 → 글 목록에 나타나는지 확인
- [ ] 글 수정 → 변경 사항이 즉시 반영되는지 확인
- [ ] 글 삭제 → 삭제 후 목록에서 사라지는지 확인
- [ ] 다른 사용자 글에 대한 수정/삭제 시도 (Ch11 RLS까지는 UX로 처리)
- [ ] `npm run build` 성공
- [ ] 비로그인 사용자 `/posts/new` 및 `/posts/edit/[id]` 접근 차단 확인

### ⑤ 배포

- [ ] Git commit & push
- [ ] Vercel 배포

## 진행률

- **Ch9**: ✅ 100% 완료 (인증 시스템 완성)
- **Ch10**: 준비 중 (문서 정비 진행 중, 코드 미작성)
- **Ch11**: 대기 중 (RLS - 행 수준 보안)
 
## Ch11: RLS 진행 상태

- [x] posts RLS 마이그레이션 파일 생성: `supabase/migrations/20260520093000_add_posts_rls.sql`
- [ ] Supabase에 마이그레이션 적용 (`npx supabase db push`)
- [ ] 브라우저 우회 테스트 (비로그인, 사용자 A/B)
- [ ] 문서 업데이트 반영 커밋
