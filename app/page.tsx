import Link from "next/link";

export default function Home() {
  return (
    <section className="py-8 md:py-14">
      <div className="bg-white/80 border-2 border-lime-300 rounded-2xl shadow-lg p-8 md:p-12 text-blue-950">
        <span className="inline-block mb-4 px-3 py-1 rounded-full bg-lime-400 text-blue-950 text-xs font-bold tracking-wide">
          LIFE LOG
        </span>
        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
          공인재 이상윤의 생존일기
        </h1>
        <p className="text-base md:text-lg text-blue-900/85 max-w-3xl">
          이상윤이 공빅에서 살아남는 과정을 기록하는 공간입니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/posts"
            className="px-5 py-2.5 rounded-lg bg-blue-950 text-lime-100 font-semibold hover:bg-blue-900 transition-colors"
          >
            글 보러 가기
          </Link>
          <Link
            href="/posts/new"
            className="px-5 py-2.5 rounded-lg bg-lime-400 text-blue-950 font-semibold hover:bg-lime-300 transition-colors"
          >
            새 글 쓰기
          </Link>
        </div>
      </div>
    </section>
  );
}
