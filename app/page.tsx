import Link from 'next/link';

export default function Home() {
  return (
    <section className="py-8 md:py-14">
      <div className="bg-white border border-lime-300/90 rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] p-8 md:p-12 text-blue-950">
        <span className="inline-block mb-4 px-3 py-1 rounded-full border border-lime-300 bg-lime-200 text-blue-950 text-xs font-extrabold tracking-wide">
          DEPARTMENT GUIDE
        </span>
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-2">
          공공인재빅데이터융합학전공
        </h1>
        <p className="text-sm md:text-base text-blue-900/70">학과 안내 메뉴를 선택하여 자세한 정보를 확인하세요.</p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link
            href="/intro"
            className="text-center px-5 py-4 text-base rounded-xl border border-blue-900 bg-blue-950 text-lime-100 font-bold hover:bg-blue-900 hover:-translate-y-0.5 transition"
          >
            과 소개
          </Link>
          <Link
            href="/professors"
            className="text-center px-5 py-4 text-base rounded-xl border border-blue-900 bg-blue-950 text-lime-100 font-bold hover:bg-blue-900 hover:-translate-y-0.5 transition"
          >
            교수진
          </Link>
          <Link
            href="/leaders"
            className="text-center px-5 py-4 text-base rounded-xl border border-blue-900 bg-blue-950 text-lime-100 font-bold hover:bg-blue-900 hover:-translate-y-0.5 transition"
          >
            대표 학생회
          </Link>
          <Link
            href="/student-council-6"
            className="text-center px-5 py-4 text-base rounded-xl border border-lime-300 bg-lime-400 text-blue-950 font-bold hover:bg-lime-300 hover:-translate-y-0.5 transition"
          >
            6대 학생회
          </Link>
          <Link
            href="/posts"
            className="text-center px-5 py-4 text-base rounded-xl border border-blue-900 bg-blue-950 text-lime-100 font-bold hover:bg-blue-900 hover:-translate-y-0.5 transition"
          >
            자유게시판
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-lime-300/80 bg-lime-50 px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-900">
        <a
          href="https://linktr.ee/hsgongbig?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn0NuKcwSozqwfaderPou0rT7dqiYDxbC_NQcaAsbKJ56fhl9m4eESyVFCzZw_aem_d4ks0aJY1nQHATFq-hG-oA"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-blue-950 hover:text-blue-700 hover:underline underline-offset-4"
        >
          공빅 링크트리
        </a>
        <a
          href="https://hs.ac.kr/kor/index..do"
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-blue-700 hover:underline underline-offset-4"
        >
          한신대학교
        </a>
        <a
          href="https://hsctis.hs.ac.kr/app-nexa/index.html"
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-blue-700 hover:underline underline-offset-4"
        >
          한신종합정보
        </a>
        <a
          href="https://hslib.hs.ac.kr/"
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-blue-700 hover:underline underline-offset-4"
        >
          한신대학교 중앙도서관
        </a>
      </div>
      
      {/* 학과 공지사항 및 자유게시판 섹션 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 shadow-md text-blue-950">
          <h2 className="text-xl font-bold mb-3">학과 공지사항</h2>
          <ul className="text-sm text-blue-900/85 space-y-2">
            <li>2025-03-10 | 2025학년도 1학기 수강신청 안내</li>
            <li>2025-03-05 | 신입생 오리엔테이션 자료</li>
            <li>2025-02-28 | 학과 사무실 운영 시간 안내</li>
          </ul>
          <Link href="/notices" className="inline-block mt-4 text-sm text-blue-700 hover:underline">
            공지사항 전체 보기
          </Link>
        </div>

        <div className="rounded-2xl border-2 border-lime-300 bg-white p-6 shadow-md text-blue-950">
          <h2 className="text-xl font-bold mb-3">자유게시판</h2>
          <p className="text-sm text-blue-900/85">학우들이 올린 최신 글과 소식을 한눈에 확인하세요.</p>
          <Link href="/posts" className="inline-block mt-4 text-sm text-blue-700 hover:underline">
            바로가기
          </Link>
        </div>
      </div>
    </section>
  );
}