# ARCHITECTURE — my-first-web

## 1. 프로젝트 목표

- 이 프로젝트는 개인 블로그로 글을 읽고, 작성하고, 관리할 수 있게 만드는 것을 목표로 한다.
- 독자는 글 목록과 상세 페이지를 쉽게 읽을 수 있어야 한다.
- 작성자는 로그인 후 글을 작성하고 수정할 수 있어야 한다.
- 이후 Ch8~12에서는 Supabase CRUD, 인증, RLS를 붙일 수 있는 구조를 유지한다.

## 2. 페이지 맵

### 현재 코드에 있는 주요 경로

| 페이지 | URL | 상태 | 설명 |
| --- | --- | --- | --- |
| 홈 | `/` | ✅ 있음 | 사이트 진입점 |
| 글 목록 | `/posts` | ✅ 있음 | 글 카드 목록 |
| 글 상세 | `/posts/[id]` | ✅ 있음 | 선택한 글의 상세 내용 |
| 글 작성 | `/posts/new` | ✅ 있음 (보호) | 새 글 작성 화면 |
| 글 수정 | `/posts/edit/[id]` | ✅ 있음 (보호) | 기존 글 편집 화면 |
| 로그인 | `/login` | ✅ 추가됨 | 이메일/비밀번호 로그인 |
| 회원가입 | `/signup` | ✅ 추가됨 | 이메일 OTP 회원가입 |
| 관리자 로그인 | `/admin/login` | ✅ 있음 | 레거시 관리자 진입점 |

## 3. 유저 플로우

### 초기 방문 (비로그인)

1. 사용자가 `/`에서 홈에 들어온다.
2. 헤더에 "로그인" / "회원가입" 버튼이 보인다.

### 회원가입

1. "회원가입" 버튼 클릭 → `/signup` 이동
2. **Step 1**: 이메일 입력 → "코드 전송" 클릭
3. **Step 2**: 이메일로 받은 OTP 코드 입력 → "검증" 클릭
4. 로그인 성공 → `/posts` 리다이렉트
5. 세션 유지 (쿠키 기반, 새로고침해도 유지)

### 로그인

1. "로그인" 버튼 클릭 → `/login` 이동
2. 이메일과 비밀번호 입력 → "로그인" 클릭
3. 성공 → `/posts` 리다이렉트
4. 세션 유지 (쿠키 기반)

### 글 읽기 (로그인 불필요)

1. `/posts` → 글 목록 조회 (서버 컴포넌트, 전체 공개)
2. `/posts/[id]` → 특정 글 조회 (서버 컴포넌트, 전체 공개)

### 글 작성 (로그인 필수)

1. 로그인 상태에서 헤더 "글쓰기" 버튼 → `/posts/new`
2. 비로그인 상태: middleware에서 `/login`으로 리다이렉트
3. `/posts/new`에서 제목, 내용 입력
4. "저장" 클릭 → 서버 액션 또는 API POST → 글 생성
5. 생성 후 `/posts/[id]` 상세 페이지로 이동

### 글 수정 (로그인 필수, Ch11 RLS 처리 예정)

1. `/posts/[id]` 상세 페이지에서 "수정" 버튼 클릭 (로그인한 사용자만 표시 - UX)
2. `/posts/edit/[id]` → 제목, 내용 수정
3. "저장" 클릭 → 서버 액션 또는 API PATCH → 글 수정
4. 수정 후 `/posts/[id]` 상세 페이지로 이동
5. **권한 검사**: 실제 본인 글 확인은 Ch11 RLS에서 처리 (현재는 UX만)

### 글 삭제 (로그인 필수, Ch11 RLS 처리 예정)

1. `/posts/[id]` 상세 페이지에서 "삭제" 버튼 클릭 (로그인한 사용자만 표시 - UX)
2. 확인 Dialog → "삭제" 클릭
3. 서버 액션 또는 API DELETE → 글 삭제
4. 삭제 후 `/posts` 목록으로 리다이렉트
5. **권한 검사**: 실제 본인 글 확인은 Ch11 RLS에서 처리 (현재는 UX만)

### 로그아웃

1. 헤더 "로그아웃" 버튼 클릭
2. 세션 삭제 (쿠키 제거)
3. `/` 홈으로 리다이렉트

## 4. 컴포넌트 계층

### 공통 레이아웃

- `app/layout.tsx`: 전체 레이아웃과 공통 스타일 적용
- Header: 사이트 이름, 주요 메뉴, 로그인 관련 버튼
- Main: 각 페이지별 핵심 콘텐츠 영역
- Footer: 저작권, 링크, 보조 정보

### 홈 페이지

- Hero 영역: 프로젝트 소개와 주요 CTA
- FeaturedPostCard: 대표 글 또는 최근 글 강조
- Navigation Card: 글 목록, 로그인, 마이페이지 이동

### 글 목록 페이지

- SearchBar: 제목 또는 키워드 검색
- Card Grid: 각 글을 카드로 표시
- Button: 글쓰기, 상세 보기, 페이지 이동

### 글 상세 페이지

- PostHeader: 제목, 작성자, 날짜
- PostBody: 본문 내용
- Action Area: 수정, 삭제, 목록으로 이동
- Dialog: 삭제 확인 같은 중요한 액션에 사용

### 작성/수정 페이지

- Input: 제목 입력
- Textarea: 본문 입력
- Button: 저장, 취소, 제출
- Dialog: 작성 취소나 삭제 확인에 사용

### 재사용 UI

- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/dialog.tsx`

## 5. 데이터 모델

### auth.users (Supabase 내장)

Supabase 인증 시스템이 관리하는 테이블. 이 프로젝트에서는 직접 수정하지 않음.

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | UUID | 기본 키 |
| email | text | 로그인 이메일 |
| encrypted_password | bytea | 해시된 비밀번호 |
| last_sign_in_at | timestamptz | 마지막 로그인 시간 |
| created_at | timestamptz | 생성 시각 |

### profiles (사용자 확장 정보)

`auth.users`를 참조하는 확장 테이블.

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | UUID | 기본 키, auth.users.id 참조 (on delete cascade) |
| username | text | 사용자 닉네임 |
| avatar_url | text | 프로필 이미지 URL |
| role | text | `'user'` 또는 `'counselor'` (기본값: `'user'`) |
| created_at | timestamptz | 생성 시각 |

### posts (블로그 글)

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | UUID | 기본 키 (자동 생성: gen_random_uuid()) |
| user_id | UUID | 글 작성자, profiles.id 참조 (on delete cascade) |
| title | text | 글 제목 (필수) |
| content | text | 글 본문 (필수) |
| created_at | timestamptz | 생성 시각 (기본값: now()) |

### 관계도

```
auth.users (1)
    ↓ (1:1)
  profiles (1)
    ↓ (1:N)
  posts (N)
```

- 한 명의 사용자(`auth.users`)는 정확히 한 개의 프로필(`profiles`)을 가진다. (자동으로 하나씩 생성됨)
- 한 명의 사용자(`profiles`)는 여러 개의 글(`posts`)을 작성할 수 있다.
- `posts.user_id`가 `profiles.id`를 참조하는 1:N 관계다.
- 사용자 삭제 시 해당 프로필과 모든 글이 자동으로 삭제된다. (ON DELETE CASCADE)

## 6. Ch10 posts CRUD API 구조

### 읽기 (R) - 공개

**함수 위치**: `lib/posts.ts`

```typescript
// 모든 글 조회
export async function getPosts(): Promise<Post[]>

// 특정 글 조회
export async function getPostById(id: string): Promise<Post | null>
```

**페이지**:
- `app/posts/page.tsx` - 글 목록 (서버 컴포넌트)
- `app/posts/[id]/page.tsx` - 글 상세 (서버 컴포넌트)

**라우트**:
- GET `/api/posts` (필요시)
- GET `/api/posts/[id]` (필요시)

### 생성 (C) - 로그인 필수

**함수 위치**: `lib/posts.ts`

```typescript
// 글 생성
export async function createPost(
  title: string,
  content: string,
  user_id: string
): Promise<Post>
```

**페이지**:
- `app/posts/new/page.tsx` - 글 작성 화면 (로그인 필수, middleware 보호)

**라우트**:
- POST `/api/posts`

**보호**: `middleware.ts`에서 `/posts/new` 접근 시 로그인 확인

### 수정 (U) - 로그인 필수 + 본인 글 (Ch11 RLS)

**함수 위치**: `lib/posts.ts`

```typescript
// 글 수정
export async function updatePost(
  id: string,
  title: string,
  content: string
): Promise<Post>
```

**페이지**:
- `app/posts/edit/[id]/page.tsx` - 글 수정 화면 (로그인 필수, middleware 보호)

**라우트**:
- PATCH `/api/posts/[id]`

**보호**:
- `middleware.ts`에서 `/posts/edit/[id]` 접근 시 로그인 확인
- UI: 글 상세에서 "수정" 버튼은 로그인한 사용자만 표시 (현재)
- **Ch11에서 RLS**: 본인 글만 수정 가능하도록 DB 제약

## 보안: RLS 적용 (Ch11)

- `posts` 테이블에 대해 Ch11 RLS 정책을 적용하여 DB가 작성·수정·삭제 권한을 직접 강제합니다.
- 마이그레이션 파일: `supabase/migrations/20260520093000_add_posts_rls.sql`
- 규칙 요약: SELECT는 공개, INSERT/UPDATE/DELETE는 `auth.uid() = user_id`로 제한

### 삭제 (D) - 로그인 필수 + 본인 글 (Ch11 RLS)

**함수 위치**: `lib/posts.ts`

```typescript
// 글 삭제
export async function deletePost(id: string): Promise<void>
```

**라우트**:
- DELETE `/api/posts/[id]`

**보호**:
- UI: "삭제" 버튼은 로그인한 사용자만 표시 (현재)
- **Ch11에서 RLS**: 본인 글만 삭제 가능하도록 DB 제약

### 미들웨어 (보호 라우트)

**파일**: `middleware.ts`

```typescript
matcher: ['/posts/new', '/posts/new/:path*', '/posts/edit/:path*']

// 로그인 확인 후
// - 로그인한 경우: 요청된 페이지로 진행
// - 비로그인: /login으로 리다이렉트
```

## 7. 권한 및 보안 설계

### Ch10 (현재): UX 기반 제어

- 로그인 상태를 header 컴포넌트에서 확인하여 "수정", "삭제" 버튼 표시/숨김
- middleware에서 `/posts/new`, `/posts/edit/[id]` 접근 제한 (로그인 필수)
- **문제점**: 클라이언트 측 검사만 하므로, URL 조작으로 우회 가능

### Ch11 (예정): RLS (Row-Level Security) 기반 제어

- Supabase DB에서 직접 행 수준 보안 규칙 설정
- `SELECT`: 누구나 글을 읽을 수 있음
- `INSERT`: 로그인한 사용자만 글 작성 가능
- `UPDATE/DELETE`: 본인 글 (user_id = auth.uid())만 수정/삭제 가능
- **보장**: 서버 측에서 강제하므로 우회 불가능

## 8. TODO: 추가 예정

- 댓글 모델
- 태그/카테고리 모델
- 이미지 업로드 모델
- 검색 최적화 구조
- `/mypage`: 사용자 프로필 및 내 글 관리