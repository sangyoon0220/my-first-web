import Link from "next/link";

export default function IntroPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">과 소개</h1>

        <h2 className="text-xl font-bold mt-2 mb-3">전공 소개</h2>
        <p className="text-blue-900/85 leading-7">
          디지털 기술 시대에 빅데이터와 AI 활용은 공공과 민간, 문과와 이과 상관없이 모두에게 필수역량이
          되었습니다. 이와 같은 시대적 흐름 속에 공공인재빅데이터융합학은 인문학적 소양과 빅데이터・AI
          활용역량을 모두 갖춘 인재를 양성하고 있습니다. 우리는 행정학과 빅데이터・AI 두 영역의 창의융복합
          역량을 갖추고 공공과 사회혁신에 이바지하는 공공리더, 공공데이터전문가를 양성합니다. 다양한 강의와
          비교과 프로그램을 통해 실무역량을 기르고, 공공과 민간기업에서도 새로운 비즈니스와 가치를 창출하는
          사회의 혁신리더로 성장하게 됩니다.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">교육목표</h2>
        <p className="text-blue-900/85 leading-7">
          공공행정관리 및 정책 이해도가 높은 실무형 공공행정 전문인재, 데이터기반의 공공 및 사회문제 해결을
          주도하는 실천형 사회혁신 전문인재, 빅데이터 및 인공지능 분야에 특화된 창의융합형
          공공데이터사이언티스트를 양성합니다.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">전공의 인재상</h2>
        <p className="text-blue-900/85 leading-7">실무·실천·창의융합형 데이터기반 공공혁신인재</p>

        <h2 className="text-xl font-bold mt-8 mb-3">전공 취득자격증</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7 space-y-1">
          <li>행정사, 행정관리사, 정책분석평가사</li>
          <li>빅데이터분석기사, 사회조사분석사, 데이터분석(준)전문가, 정보처리기사</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">진출분야</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7 space-y-1">
          <li>공공행정: 중앙정부 및 지방자치단체 공무원, 경찰/소방/교육 등 공무원</li>
          <li>공공기관: 공기업(공사, 공단), 국제기구</li>
          <li>기업체 및 민간기관: 기획/인사/총무 담당자, 데이터분석가, 공공정책연구원</li>
        </ul>

        <Link href="/" className="inline-block mt-6 text-sm text-blue-700 hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
