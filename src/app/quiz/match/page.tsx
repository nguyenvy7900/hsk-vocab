"use client";

import { useEffect, useState } from "react";
import type { VocabItem } from "@/data/vocab";
import { shuffle, pickQuestions } from "@/lib/quizUtils";
import { LevelPicker } from "@/components/LevelPicker";

const PAIR_COUNT = 6;
type Level = 1 | 2 | 3;

export default function MatchQuiz() {
  const [level, setLevel] = useState<Level>(1);
  const [pairs, setPairs] = useState<VocabItem[]>([]);
  const [vnOrder, setVnOrder] = useState<VocabItem[]>([]);
  const [pickedHanzi, setPickedHanzi] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const startNewRound = (data: VocabItem[]) => {
    const qs = pickQuestions(data, PAIR_COUNT);
    setPairs(qs);
    setVnOrder(shuffle(qs));
    setPickedHanzi(null);
    setMatched(new Set());
    setDone(false);
  };

  useEffect(() => {
    fetch(`/api/vocab?level=${level}`)
      .then((r) => r.json())
      .then((data: VocabItem[]) => startNewRound(data));
  }, [level]);

  useEffect(() => {
    if (pairs.length > 0 && matched.size === pairs.length) {
      setTimeout(() => setDone(true), 500);
    }
  }, [matched, pairs]);

  const onPickHanzi = (h: string) => {
    if (matched.has(h)) return;
    setPickedHanzi(h);
  };

  const onPickVn = (item: VocabItem) => {
    if (!pickedHanzi || matched.has(item.hanzi)) return;
    if (pickedHanzi === item.hanzi) {
      setMatched((prev) => new Set(prev).add(item.hanzi));
      setPickedHanzi(null);
    } else {
      setWrongFlash(item.hanzi);
      setTimeout(() => setWrongFlash(null), 400);
      setPickedHanzi(null);
    }
  };

  if (pairs.length === 0) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <h1 className="mb-2 text-3xl font-bold text-purple-700">🎉 Đã ghép xong!</h1>
        <p className="mb-6 text-gray-600">
          Hoàn thành {pairs.length} cặp HSK {level}
        </p>
        <button
          onClick={() => {
            fetch(`/api/vocab?level=${level}`)
              .then((r) => r.json())
              .then((data: VocabItem[]) => startNewRound(data));
          }}
          className="rounded-full bg-purple-600 px-6 py-2 font-semibold text-white shadow hover:bg-purple-700"
        >
          Vòng mới
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold text-purple-700">
        🧩 Ghép chữ Hán với nghĩa
      </h1>
      <LevelPicker level={level} setLevel={setLevel} />

      <p className="mb-4 text-center text-sm text-gray-600">
        Đã ghép: <span className="font-bold">{matched.size}/{pairs.length}</span> · Bấm 1 chữ Hán bên trái rồi bấm nghĩa Việt bên phải để ghép
      </p>

      <div className="mb-2 grid grid-cols-2 gap-4">
        <h3 className="text-center text-sm font-semibold text-gray-500">Chữ Hán</h3>
        <h3 className="text-center text-sm font-semibold text-gray-500">Nghĩa Việt</h3>
      </div>
      <div
        className="grid auto-rows-fr grid-cols-2 gap-x-4 gap-y-2"
        style={{ gridTemplateRows: `repeat(${pairs.length}, minmax(0, 1fr))` }}
      >
        {pairs.map((p, rowIdx) => {
          const isMatched = matched.has(p.hanzi);
          const isPicked = pickedHanzi === p.hanzi;
          return (
            <button
              key={p.hanzi}
              onClick={() => onPickHanzi(p.hanzi)}
              disabled={isMatched}
              style={{ gridRow: rowIdx + 1, gridColumn: 1 }}
              className={`flex items-center justify-center rounded-xl px-4 py-4 text-3xl font-bold ring-2 transition ${
                isMatched
                  ? "bg-green-100 text-green-600 opacity-60 ring-green-300"
                  : isPicked
                  ? "bg-purple-100 ring-purple-500"
                  : "bg-white ring-gray-200 hover:bg-purple-50"
              }`}
            >
              {p.hanzi}
            </button>
          );
        })}

        {vnOrder.map((p, rowIdx) => {
          const isMatched = matched.has(p.hanzi);
          const isWrong = wrongFlash === p.hanzi;
          return (
            <button
              key={p.hanzi + "-vn"}
              onClick={() => onPickVn(p)}
              disabled={isMatched || !pickedHanzi}
              style={{ gridRow: rowIdx + 1, gridColumn: 2 }}
              className={`flex items-center justify-center rounded-xl px-4 py-4 text-center text-base font-semibold ring-2 transition ${
                isMatched
                  ? "bg-green-100 text-green-700 opacity-60 ring-green-300"
                  : isWrong
                  ? "bg-red-100 ring-red-500"
                  : pickedHanzi
                  ? "bg-white ring-purple-300 hover:bg-purple-50"
                  : "bg-white opacity-70 ring-gray-200"
              }`}
            >
              {p.vietnamese}
            </button>
          );
        })}
      </div>
    </div>
  );
}
