import Link from "next/link";

export default function CurriculumPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">교육과정 (요약)</h1>

        <h2 className="text-xl font-bold mt-4 mb-2">졸업요건</h2>
        <p className="text-blue-900/85 leading-7">총 130학점 이상(전공별 세부 기준 상이). 전공 필수 및 선택 과목을 포함함.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">전공 필수 주요 과목</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7">
          <li>공공조직관리론 (PS110)</li>
          <li>사회조사분석 (PS414)</li>
          <li>조사연구방법론 (PS201)</li>
          <li>졸업논문 (PSA01 / PSB01)</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">전공 선택 주요 과목</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7">
          <li>기초프로그래밍 (PS101), 파이썬데이터분석기초 (PS227)</li>
          <li>웹프로그래밍 (PS106), 모바일앱프로그래밍 (PS203)</li>
          <li>머신러닝이해와활용 (PS210), 딥러닝기초 (PS224)</li>
          <li>데이터분석과시각화 (PS211), 다변량데이터분석 (PS212)</li>
          <li>데이터베이스와SQL (PS217), GIS를이용한공간정보분석 (PS415)</li>
          <li>데이터기반정책관리 (PS408), 빅데이터와개인정보보호 (PS405)</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">학년별 설계(요약)</h2>
        <ol className="list-decimal list-inside text-blue-900/85 leading-7">
          <li>1학년: 전공 탐색 및 기초(프로그래밍·데이터 기초)</li>
          <li>2학년: 분석 기초 및 연구방법론 확립</li>
          <li>3학년: 심화 과목과 캡스톤 설계(공공정책 캡스톤 등)</li>
          <li>4학년: 졸업논문 및 실전 프로젝트 완성</li>
        </ol>

        <p className="mt-6 text-sm text-blue-900/80">원본 교과목 목록과 세부 설명은 학과의 교과목 소개 문서를 바탕으로 요약했습니다.</p>

        <Link href="/intro" className="inline-block mt-6 text-sm text-blue-700 hover:underline">뒤로 가기</Link>
      </div>
    </section>
  );
}
