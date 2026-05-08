"use client";

import { useEffect, useState } from "react";
import type { VocabItem } from "@/data/vocab";

type Level = 1 | 2 | 3;

export default function Home() {
  const [level, setLevel] = useState<Level>(1);
  const [items, setItems] = useState<VocabItem[]>([]);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);

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

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("Trình duyệt của bạn không hỗ trợ phát âm. Hãy dùng Chrome hoặc Edge.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const toggle = (i: number) =>
    setRevealed((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-red-700">
            学中文 · Học từ vựng tiếng Trung
          </h1>
          <p className="text-gray-600">
            Luyện từ vựng HSK 1-3 · Nghe phát âm · Xem pinyin và nghĩa
          </p>
        </header>

        <div className="mb-6 flex justify-center gap-2">
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

        <p className="mb-4 text-center text-sm text-gray-500">
          Bấm vào thẻ để xem pinyin & nghĩa · Bấm 🔊 để nghe phát âm
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const open = revealed[i];
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100 transition hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <button
                      onClick={() => toggle(i)}
                      className="flex-1 text-left"
                    >
                      <div className="text-4xl font-bold text-gray-900">
                        {item.hanzi}
                      </div>
                    </button>
                    <button
                      onClick={() => speak(item.hanzi)}
                      className="ml-2 rounded-full bg-red-100 p-2 text-xl hover:bg-red-200"
                      aria-label="Phát âm"
                      title="Nghe phát âm"
                    >
                      🔊
                    </button>
                  </div>

                  <div
                    className={`mt-3 ${open ? "" : "invisible"}`}
                    aria-hidden={!open}
                  >
                    <div className="text-lg italic text-red-600">
                      {item.pinyin}
                    </div>
                    <div className="mt-1 text-gray-700">
                      → {item.vietnamese}
                    </div>
                  </div>

                  {!open && (
                    <button
                      onClick={() => toggle(i)}
                      className="-mt-12 text-sm text-gray-400 hover:text-red-600"
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
