"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <label htmlFor="post-search" className="block text-sm font-semibold text-blue-950 mb-2">
        게시글 검색
      </label>
      <input
        id="post-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="제목으로 검색해보세요"
        className="w-full rounded-lg border border-lime-300 bg-white px-4 py-2.5 text-blue-950 outline-none focus:ring-2 focus:ring-lime-400"
      />
    </div>
  );
}
