import Link from "next/link";

export default function LeadersPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">역대 회장단</h1>
        <p className="text-blue-900/85 leading-7">
          학부 학생자치 활동을 이끌어 온 역대 회장단의 활동 이력과 주요 성과를 정리한 공간입니다.
          학기별 기록은 추후 업데이트될 예정입니다.
        </p>
        <Link href="/" className="inline-block mt-6 text-sm text-blue-700 hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
