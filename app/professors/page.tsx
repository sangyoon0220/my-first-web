import Link from "next/link";

export default function ProfessorsPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">교수진</h1>
        <p className="text-blue-900/85 leading-7">
          전공 교수진은 데이터분석, 공공정책, 행정정보, AI 응용 분야를 중심으로 교육과 연구를 수행합니다.
          아래 교수 소개에서 담당 분야와 연락처를 확인할 수 있습니다.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/yoon_geon.jpg" alt="윤건" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">윤건</p>
              <p className="text-sm">부교수 · 학과장 — 공공관리·데이터기반행정</p>
              <p className="text-sm mt-1">서울대학교 행정학 박사. 데이터기반 행정, 인공지능 정부 연구.</p>
              <p className="text-sm mt-1">연락처: 031-379-0739 · <a href="mailto:kyoon2010@hs.ac.kr" className="text-blue-700">kyoon2010@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/lee_seokmin.jpg" alt="이석민" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">이석민</p>
              <p className="text-sm">부교수 — 정책분석평가·공공빅데이터분석</p>
              <p className="text-sm mt-1">서울대학교 정치학 박사(과학기술정책). 정책 분석 및 데이터 활용 연구.</p>
              <p className="text-sm mt-1">연락처: 031-379-0738 · <a href="mailto:newmind68@hs.ac.kr" className="text-blue-700">newmind68@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/no_seungchul.jpg" alt="노승철" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">노승철</p>
              <p className="text-sm">부교수 — 빅데이터분석·GIS</p>
              <p className="text-sm mt-1">서울대학교 환경대학원 도시계획학 박사. GIS 및 빅데이터 분석 전문.</p>
              <p className="text-sm mt-1">연락처: 031-379-0842 · <a href="mailto:nsc0203@hs.ac.kr" className="text-blue-700">nsc0203@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/kang_hyun.svg" alt="강현" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">강현</p>
              <p className="text-sm">겸임교수 — 법학 (형사법·행정법)</p>
              <p className="text-sm mt-1">법률 실무 및 교육 경력. 행정법·형사법 강의 담당.</p>
              <p className="text-sm mt-1">이메일: <a href="mailto:kanghyun@hs.ac.kr" className="text-blue-700">kanghyun@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/jang_gwangho.svg" alt="장광호" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">장광호</p>
              <p className="text-sm">초빙 — AI·개인정보 / 빅데이터와 개인정보보호</p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/kim_daejung.svg" alt="김대중" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">김대중</p>
              <p className="text-sm">초빙 — 재무행정</p>
            </div>
          </div>

          <div className="p-4 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/shin_seungyun.svg" alt="신승윤" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">신승윤</p>
              <p className="text-sm">초빙 — 지방행정·공공혁신</p>
            </div>
          </div>
        </div>
        <Link href="/" className="inline-block mt-6 text-sm text-blue-700 hover:underline">
          메인으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
