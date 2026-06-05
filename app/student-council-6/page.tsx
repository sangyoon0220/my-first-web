import Link from "next/link";

export default function StudentCouncilSixPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <div className="flex justify-center mb-6">
          <img src="/images/student-council-6.png" alt="제6대 학생회" className="w-full max-w-md rounded-lg shadow-md" />
        </div>
        <h1 className="text-3xl font-black mb-4">6대 학생회 소개</h1>
        <p className="text-blue-900/85 leading-7">
          6대 학생회의 운영 목표, 주요 공약, 행사 기획 및 학우 소통 계획을 안내합니다.
          공지사항과 활동 기록은 지속적으로 업데이트됩니다.
        </p>
        <a
          href="https://www.instagram.com/hanshin_doodle?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 p-1 rounded-full hover:opacity-90"
        >
          <img src="/images/instagram.webp" alt="instagram" className="w-10 h-10" />
        </a>
        <Link href="/" className="inline-block mt-6 text-sm text-blue-700 hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
