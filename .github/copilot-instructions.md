# Copilot Instructions

- Tech Stack:
  - Next.js: 16.2.1 (App Router ONLY)
  - Tailwind CSS: ^4

- Coding Conventions:
  - 기본적으로 Server Component 사용
  - 스타일은 Tailwind CSS만 사용 (CSS 모듈/글로벌 CSS 사용 자제)

- Known AI Mistakes / Rules:
  - `next/router` 금지 — `next/navigation` 사용
  - Pages Router 사용 금지 (App Router만 허용)
  - `params` 사용 시 반드시 `await` 필요 (비동기 데이터/params 처리에서 누락 주의)

--
이 파일은 레포의 GitHub Copilot 지침용입니다. Agent 모드에서 이 규칙을 따르세요.
