"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { VocabItem } from "@/data/vocab";
import { useLearned } from "@/lib/useLearned";
import { speakChinese } from "@/lib/speak";
import { AuthBar } from "@/components/AuthBar";

type Level = 1 | 2 | 3;

export default function Home() {
  const [level, setLevel] = useState<Level>(1);
  const [items, setItems] = useState<VocabItem[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { learned, toggle: toggleLearned, hydrated } = useLearned();

  useEffect(() => {
    setLoading(true);
    setRevealed({});
    fetch(`/api/vocab?level=${level}`)
      .then((r) => r.json())
      .then((data: VocabItem[]) => {
        setItems(data);
        setLoading(false);
      });
  }, [level]);

  const toggleReveal = (i: number) =>
    setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));

  const learnedCount = items.filter((it) => learned.has(it.hanzi)).length;
  const progress = items.length > 0 ? (learnedCount / items.length) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <AuthBar />
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-red-700">
            学中文 · Học từ vựng tiếng Trung
          </h1>
          <p className="text-gray-600">
            Luyện từ vựng HSK 1-3 · Nghe phát âm · Xem pinyin và nghĩa
          </p>
        </header>

        {/* Nav vào game */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Link
            href="/quiz/listen"
            className="rounded-full bg-blue-600 px-5 py-2 font-semibold text-white shadow hover:bg-blue-700"
          >
            🎧 Game: Nghe → chọn nghĩa
          </Link>
          <Link
            href="/quiz/pinyin"
            className="rounded-full bg-green-600 px-5 py-2 font-semibold text-white shadow hover:bg-green-700"
          >
            🔤 Game: Chữ Hán → chọn pinyin
          </Link>
          <Link
            href="/quiz/match"
            className="rounded-full bg-purple-600 px-5 py-2 font-semibold text-white shadow hover:bg-purple-700"
          >
            🧩 Game: Ghép cặp
          </Link>
        </div>

        {/* Lọc HSK */}
        <div className="mb-4 flex justify-center gap-2">
          {([1, 2, 3] as Level[]).map((lv) => (
            <button
              key={lv}
              onClick={() => setLevel(lv)}
              className={`rounded-full px-6 py-2 font-semibold shadow-sm transition ${
                level === lv
                  ? "bg-red-600 text-white"
                  : "bg-white text-red-700 hover:bg-red-100"
              }`}
            >
              HSK {lv}
            </button>
          ))}
        </div>

        {/* Tiến độ */}
        {hydrated && items.length > 0 && (
          <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-1 flex justify-between text-sm font-semibold text-gray-700">
              <span>Tiến độ HSK {level}</span>
              <span>
                Đã thuộc {learnedCount}/{items.length}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <p className="mb-4 text-center text-sm text-gray-500">
          Bấm 🔊 để nghe · Bấm thẻ để hiện pinyin/nghĩa · Bấm ✅ để đánh dấu đã thuộc
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const open = revealed[i];
              const isLearned = learned.has(item.hanzi);
              return (
                <div
                  key={item.hanzi + i}
                  className={`rounded-2xl bg-white p-5 shadow-md ring-1 transition hover:shadow-lg ${
                    isLearned
                      ? "opacity-60 ring-green-400"
                      : "ring-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <button
                      onClick={() => toggleReveal(i)}
                      className="flex-1 text-left"
                    >
                      <div className="text-5xl font-bold text-gray-900">
                        {item.hanzi}
                      </div>
                    </button>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => speakChinese(item.hanzi)}
                        className="rounded-full bg-red-100 p-2 text-xl hover:bg-red-200"
                        aria-label="Phát âm"
                        title="Nghe phát âm"
                      >
                        🔊
                      </button>
                      <button
                        onClick={() => toggleLearned(item.hanzi)}
                        className={`rounded-full p-2 text-xl ${
                          isLearned
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-green-100"
                        }`}
                        title={isLearned ? "Đã thuộc — bấm để bỏ" : "Đánh dấu đã thuộc"}
                      >
                        ✅
                      </button>
                    </div>
                  </div>

                  <div className={`mt-3 ${open ? "" : "invisible"}`} aria-hidden={!open}>
                    <div className="mb-2 inline-block rounded-lg bg-blue-50 px-3 py-1.5 text-2xl font-bold italic text-blue-700 ring-1 ring-blue-200">
                      {item.pinyin}
                    </div>
                    <div className="rounded-lg bg-yellow-50 px-3 py-2 text-lg font-semibold text-amber-900 ring-1 ring-yellow-200">
                      → {item.vietnamese}
                    </div>
                  </div>

                  {!open && (
                    <button
                      onClick={() => toggleReveal(i)}
                      className="-mt-16 text-sm text-gray-400 hover:text-red-600"
                    >
                      [bấm để xem]
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          BTVN SEONGON · Built with Next.js + Claude Code · Phát âm bằng Web Speech API
        </footer>
      </div>
    </main>
  );
}
