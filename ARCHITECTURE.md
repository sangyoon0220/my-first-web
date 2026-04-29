# ARCHITECTURE — my-first-web

## 1. 프로젝트 목표

- 이 프로젝트는 개인 블로그로 글을 읽고, 작성하고, 관리할 수 있게 만드는 것을 목표로 한다.
- 독자는 글 목록과 상세 페이지를 쉽게 읽을 수 있어야 한다.
- 작성자는 로그인 후 글을 작성하고 수정할 수 있어야 한다.
- 이후 Ch8~12에서는 Supabase CRUD, 인증, RLS를 붙일 수 있는 구조를 유지한다.

## 2. 페이지 맵

### 현재 코드에 있는 주요 경로

| 페이지 | URL | 설명 |
| --- | --- | --- |
| 홈 | `/` | 사이트 진입점 |
| 글 목록 | `/posts` | 글 카드 목록 |
| 글 상세 | `/posts/[id]` | 선택한 글의 상세 내용 |
| 글 작성 | `/posts/new` | 새 글 작성 화면 |
| 글 수정 | `/posts/edit/[id]` | 기존 글 편집 화면 |
| 관리자 로그인 | `/admin/login` | 현재 구현된 관리자 세션 진입점 |

### Ch7 과제 기준으로 확장할 경로

| 페이지 | URL | 상태 | 설명 |
| --- | --- | --- | --- |
| 로그인 | `/login` | 추가 예정 | 일반 사용자 로그인 |
| 회원가입 | `/signup` | 추가 예정 | 새 계정 생성 |
| 마이페이지 | `/mypage` | 추가 예정 | 내 정보와 내 글 관리 |

## 3. 유저 플로우

### 글 읽기

1. 사용자가 `/`에서 홈에 들어온다.
2. 글 목록으로 이동해 관심 있는 글을 찾는다.
3. 글 카드를 선택해 `/posts/[id]` 상세를 확인한다.

### 글 작성

1. 사용자가 `/posts` 또는 `/posts/new`에서 글쓰기 버튼을 누른다.
2. 인증이 필요하면 `/admin/login` 또는 과제 확장용 `/login`으로 이동한다.
3. 로그인 후 `/posts/new`에서 제목과 내용을 입력한다.
4. 제출 후 글 상세 또는 글 목록으로 돌아간다.

### 마이페이지

1. 사용자가 로그인한다.
2. `/mypage`에서 프로필과 내 글 목록을 확인한다.
3. 필요한 경우 `/posts/edit/[id]`로 이동해 글을 수정한다.

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

### users

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | UUID | 기본 키 |
| email | text | 로그인 이메일, 고유값 |
| name | text | 사용자 이름 |
| avatar_url | text | 프로필 이미지 URL |
| role | text | `user` 또는 `admin` |
| created_at | timestamptz | 생성 시각 |

### posts

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| id | UUID | 기본 키 |
| title | text | 글 제목 |
| content | text | 글 본문 |
| summary | text | 목록용 요약 |
| status | text | `draft` 또는 `published` |
| author_id | UUID | `users.id` 참조 |
| created_at | timestamptz | 생성 시각 |
| updated_at | timestamptz | 수정 시각 |

### 관계

- 한 명의 사용자(`users`)는 여러 개의 글(`posts`)을 작성할 수 있다.
- `posts.author_id`가 `users.id`를 참조하는 1:N 관계다.
- 이후 RLS를 적용할 때 `role`과 `author_id`를 기준으로 권한을 나눌 수 있다.

## 6. TODO: 추가 예정

- 댓글 모델
- 태그/카테고리 모델
- 이미지 업로드 모델
- 검색 최적화 구조