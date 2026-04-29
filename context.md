# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-04-29
- Ch7 과제 제출용 설계 문서를 정리하는 중이다.
- 완료된 작업: `copilot-instructions.md`, `ARCHITECTURE.md`, `todo.md`, 와이어프레임 초안 정리
- 진행 중: GitHub 저장소 제출 전 최종 점검

## 기술 결정 사항

- 프레임워크: Next.js 16.2.1 App Router only
- 언어/런타임: TypeScript + React 19.2.4
- 스타일: Tailwind CSS 4 + `app/globals.css`의 CSS 변수
- UI 컴포넌트: shadcn/ui (`components/ui/`)
- 인증 흐름: 현재 구현 기준으로 `/admin/login`과 `/api/admin/session`을 사용
- 설계 기준: 블로그 확장용 경로로 `/login`, `/signup`, `/mypage`를 함께 문서화
- 데이터 모델: `users`와 `posts` 테이블, UUID 기반 기본 키와 1:N 관계를 기준으로 정리

## 해결된 이슈

- 공용 규칙과 프로젝트 상태를 분리해서 관리할 수 있게 문서 구조를 정리했다.
- 현재 저장소의 실제 라우트와 Ch7 블로그 설계를 문서에서 함께 다루도록 맞췄다.
- shadcn/ui와 디자인 토큰 기준을 Copilot 지시문에 반영했다.

## 알게 된 점

- `copilot-instructions.md`는 `.github/` 아래에 둘 때 자동 로드된다.
- `context.md`는 규칙이 아니라 현재 진행 상태를 적는 문서다.
- `todo.md`는 단계별 체크리스트와 진행률을 남기는 문서다.
- 와이어프레임은 별도 문서로 초안을 남겨도 이후 Copilot Vision이나 v0 작업의 기준이 된다.