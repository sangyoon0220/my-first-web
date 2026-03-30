export default function Home() {
  return (
    <>
      <header>
        <div>
          <h1>사이트 제목</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <section aria-labelledby="latest-posts">
          <h2 id="latest-posts">최신 게시글</h2>

          <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition mb-4">
            <h3 className="text-lg font-bold">게시글 제목 1</h3>
            <p className="text-gray-600">게시글 1의 내용 미리보기입니다. 이곳에는 간단한 요약이 들어갑니다.</p>
            <div>
              <span>작성자: 이상윤</span>
              <span> · </span>
              <time className="text-sm text-gray-400" dateTime="2026-03-30">2026-03-30</time>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition mb-4">
            <h3 className="text-lg font-bold">게시글 제목 2</h3>
            <p className="text-gray-600">게시글 2의 내용 미리보기입니다. 이곳에는 간단한 요약이 들어갑니다.</p>
            <div>
              <span>작성자: 이상윤</span>
              <span> · </span>
              <time className="text-sm text-gray-400" dateTime="2026-03-29">2026-03-29</time>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-bold">게시글 제목 3</h3>
            <p className="text-gray-600">게시글 3의 내용 미리보기입니다. 이곳에는 간단한 요약이 들어갑니다.</p>
            <div>
              <span>작성자: 이상윤</span>
              <span> · </span>
              <time className="text-sm text-gray-400" dateTime="2026-03-28">2026-03-28</time>
            </div>
          </article>
        </section>
      </main>

      <footer>
        <p>© 2026 사이트 제목</p>
      </footer>
    </>
  );
}
