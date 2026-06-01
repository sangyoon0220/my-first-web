import Link from "next/link";

export default function HanshinPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-300 bg-white p-8 shadow-md text-blue-950">
        <h1 className="text-3xl font-black mb-4">공공인재빅데이터융합학 (공빅)</h1>

        <p className="text-blue-900/85 leading-7 mb-4">
          AI·빅데이터 역량을 바탕으로 공공가치를 실현하는 인재를 양성하는 전공입니다. 문과·이과 구분 없이
          누구나 지원 가능하며, 행정학사와 빅데이터분석학사 두 학위를 동시에 취득할 수 있는 융합 프로그램을 운영합니다.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">핵심 특징</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7 space-y-1">
          <li>공공관리 트랙과 공공빅데이터 트랙의 이원적 트랙 운영</li>
          <li>전용 실습실(공공관리실습실, 공공빅데이터실습실) 및 전용 공부 공간 제공</li>
          <li>공무원·공기업 준비반 상시 운영</li>
          <li>3개 전공 소학회(공공조직관리학회, 빅데이터분석학회, 인공지능학회)</li>
          <li>학사 2개 동시 취득(행정학사 + 빅데이터분석학사)</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">교육 구성(요약)</h2>
        <p className="text-blue-900/85 leading-7">
          1~2학년은 기초 탐색과 프로그래밍/데이터 기초를, 2~3학년은 분석 및 응용 역량 구축을, 4학년은 캡스톤과
          실전 프로젝트로 실무 완성을 목표로 설계되어 있습니다. 과목 예시는 본 페이지 상단의 '교육과정' 섹션을 참고하세요.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">학생 지원 및 활동</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7 space-y-1">
          <li>공무원·공기업 준비반: 전담 교수 지도, 전용 책상 제공, 모의고사 및 강의 연계</li>
          <li>전용 실습실: 데이터 분석·빅데이터 실습 환경(데스크탑, 빔프로젝터 등)</li>
          <li>소학회 활동: 공모전·프로젝트·학술제 참여로 실전 경험 축적</li>
          <li>자격증 및 외부 연계: 사회조사분석사, 빅데이터분석기사 등 취득 지원</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">교수진</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/yoon_geon.svg" alt="윤건" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">윤건</p>
              <p className="text-sm">부교수 · 학과장 — 공공관리·데이터기반행정</p>
              <p className="text-sm mt-1">서울대학교 행정학 박사. 연구 분야: 데이터기반 행정, 인공지능 정부, 공공조직 및 인사관리.</p>
              <p className="text-sm mt-1">연락처: 031-379-0739 · <a href="mailto:kyoon2010@hs.ac.kr" className="text-blue-700">kyoon2010@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/lee_seokmin.svg" alt="이석민" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">이석민</p>
              <p className="text-sm">부교수 — 정책분석평가·공공빅데이터분석</p>
              <p className="text-sm mt-1">서울대학교 정치학 박사(과학기술정책). 연구 및 정책자문 경력 보유.</p>
              <p className="text-sm mt-1">연락처: 031-379-0738 · <a href="mailto:newmind68@hs.ac.kr" className="text-blue-700">newmind68@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/no_seungchul.svg" alt="노승철" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">노승철</p>
              <p className="text-sm">부교수 — 빅데이터분석·공간정보분석</p>
              <p className="text-sm mt-1">서울대학교 환경대학원 도시계획학 박사. 연구 분야: GIS, 사회조사, 빅데이터 분석.</p>
              <p className="text-sm mt-1">연락처: 031-379-0842 · <a href="mailto:nsc0203@hs.ac.kr" className="text-blue-700">nsc0203@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/kang_hyun.svg" alt="강현" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">강현</p>
              <p className="text-sm">겸임교수 — 법학 (형사법·행정법)</p>
              <p className="text-sm mt-1">법률 실무 및 교육 경력 보유. 행정법·형사법 관련 강의 담당.</p>
              <p className="text-sm mt-1">이메일: <a href="mailto:kanghyun@hs.ac.kr" className="text-blue-700">kanghyun@hs.ac.kr</a></p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/jang_gwangho.svg" alt="장광호" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">장광호</p>
              <p className="text-sm">초빙 — AI·개인정보 / 빅데이터와 개인정보보호</p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/kim_daejung.svg" alt="김대중" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">김대중</p>
              <p className="text-sm">초빙 — 재무행정</p>
            </div>
          </div>

          <div className="p-3 bg-card rounded-lg flex gap-3">
            <img src="/images/professors/shin_seungyun.svg" alt="신승윤" className="w-28 h-28 object-cover rounded" />
            <div>
              <p className="font-bold">신승윤</p>
              <p className="text-sm">초빙 — 지방행정·공공혁신</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-3">진로</h2>
        <ul className="list-disc list-inside text-blue-900/85 leading-7 space-y-1">
          <li>공무원(5·7·9급), 공기업(기획·인사·경영), 데이터 분석가</li>
          <li>연구원·대학원 진학, 데이터 기반 창업 및 프리랜서 활동</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">자료 및 외부 링크</h2>
        <p className="text-blue-900/85 leading-7">공식 학과 소개 영상 및 블로그, 입학안내 등은 아래에서 확인하세요.</p>
        <ul className="list-inside text-blue-700 mt-2">
          <li><a href="https://hanshin-gongbig.super.site/" className="hover:underline">공빅 공식 사이트(외부)</a></li>
          <li><a href="https://www.youtube.com/channel/UClchjgC-vhOsXAy8bhwKX2w" className="hover:underline">학과 공식 유튜브 채널</a></li>
          <li><a href="/docs/major_introduce.pdf" className="hover:underline">학과 소개 PDF (내부)</a></li>
        </ul>

        <div className="mt-6 border-t pt-4 text-sm text-blue-900/80">
          <p>학과 문의: <a href="mailto:nsc0203@hs.ac.kr" className="text-blue-700">nsc0203@hs.ac.kr</a></p>
          <p>문의 전화: 031-379-0490</p>
        </div>

        <Link href="/intro" className="inline-block mt-6 text-sm text-blue-700 hover:underline">뒤로 가기</Link>
      </div>
    </section>
  );
}
