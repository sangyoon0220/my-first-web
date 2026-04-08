export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string; // YYYY-MM-DD 형식 권장
};

export const posts: Post[] = [
  {
    id: 1,
    title: "React 19 새 기능 정리",
    content:
      "React 19에서 달라진 주요 기능들을 정리한 글입니다. 렌더링 성능 개선과 새 훅 사용법 등을 다룹니다.",
    author: "김코딩",
    date: "2026-03-30",
  },
  {
    id: 2,
    title: "Tailwind CSS 4 변경사항",
    content:
      "Tailwind CSS 4의 새로운 유틸리티와 구성 변경사항을 요약합니다. 마이그레이션 팁 포함.",
    author: "이디자인",
    date: "2026-03-28",
  },
  {
    id: 3,
    title: "Next.js 16 App Router 가이드",
    content:
      "Next.js 16의 App Router 사용법과 폴더 기반 라우팅, 동적 라우트 처리 패턴을 소개합니다.",
    author: "박개발",
    date: "2026-03-25",
  },
];
