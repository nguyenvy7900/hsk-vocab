"use client";

type Level = 1 | 2 | 3;

export function LevelPicker({
  level,
  setLevel,
}: {
  level: Level;
  setLevel: (l: Level) => void;
}) {
  return (
    <div className="mb-6 flex justify-center gap-2">
      {([1, 2, 3] as Level[]).map((lv) => (
        <button
          key={lv}
          onClick={() => setLevel(lv)}
          className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition ${
            level === lv
              ? "bg-red-600 text-white"
              : "bg-white text-red-700 hover:bg-red-100"
          }`}
        >
          HSK {lv}
        </button>
      ))}
    </div>
  );
}
