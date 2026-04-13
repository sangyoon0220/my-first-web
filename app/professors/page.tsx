import Link from "next/link";

export default function ProfessorsPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">교수님</h1>
        <p className="text-blue-900/85 leading-7">
          전공 교수진은 데이터분석, 공공정책, 행정정보, AI 응용 분야를 중심으로 수업과 프로젝트 지도를 진행합니다.
          세부 연구 분야와 담당 과목은 학기별 공지에서 확인할 수 있습니다.
        </p>
        <Link href="/" className="inline-block mt-6 text-sm text-blue-700 hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
