"use client";

import { useEffect, useState } from "react";
import type { VocabItem } from "@/data/vocab";
import { buildChoices, pickQuestions } from "@/lib/quizUtils";
import { LevelPicker } from "@/components/LevelPicker";

const QUESTION_COUNT = 10;
type Level = 1 | 2 | 3;

export default function PinyinQuiz() {
  const [level, setLevel] = useState<Level>(1);
  const [pool, setPool] = useState<VocabItem[]>([]);
  const [questions, setQuestions] = useState<VocabItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [choices, setChoices] = useState<VocabItem[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`/api/vocab?level=${level}`)
      .then((r) => r.json())
      .then((data: VocabItem[]) => {
        setPool(data);
        const qs = pickQuestions(data, QUESTION_COUNT);
        setQuestions(qs);
        setIdx(0);
        setScore(0);
        setDone(false);
        setPicked(null);
      });
  }, [level]);

  useEffect(() => {
    if (questions.length === 0) return;
    const current = questions[idx];
    if (!current) return;
    setChoices(buildChoices(current, pool, 4, (a, b) => a.pinyin === b.pinyin));
    setPicked(null);
  }, [idx, questions, pool]);

  const current = questions[idx];

  const onPick = (item: VocabItem) => {
    if (picked) return;
    setPicked(item.pinyin);
    if (item.pinyin === current.pinyin) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx(idx + 1);
  };

  const restart = () => {
    const qs = pickQuestions(pool, QUESTION_COUNT);
    setQuestions(qs);
    setIdx(0);
    setScore(0);
    setDone(false);
    setPicked(null);
  };

  if (questions.length === 0) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow">
        <h1 className="mb-2 text-3xl font-bold text-green-700">🎉 Hoàn thành!</h1>
        <p className="mb-1 text-xl">
          Điểm: <span className="font-bold text-green-600">{score}/{questions.length}</span>
        </p>
        <p className="mb-6 text-gray-600">{pct}% chính xác</p>
        <button
          onClick={restart}
          className="rounded-full bg-green-600 px-6 py-2 font-semibold text-white shadow hover:bg-green-700"
        >
          Chơi lại
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-center text-2xl font-bold text-green-700">
        🔤 Chọn pinyin đúng cho chữ Hán
      </h1>
      <LevelPicker level={level} setLevel={setLevel} />

      <div className="mb-3 flex justify-between text-sm font-semibold text-gray-600">
        <span>Câu {idx + 1}/{questions.length}</span>
        <span>Điểm: {score}</span>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <div className="mb-6 text-center">
          <div className="text-7xl font-bold text-gray-900">
            {current.hanzi}
          </div>
          <p className="mt-2 text-sm text-gray-500">({current.vietnamese})</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {choices.map((c) => {
            const isCorrect = c.pinyin === current.pinyin;
            const isPicked = picked === c.pinyin;
            let cls = "bg-white text-gray-900 hover:bg-green-50 ring-green-300";
            if (picked) {
              if (isCorrect) cls = "bg-green-100 text-green-900 ring-green-500";
              else if (isPicked) cls = "bg-red-100 text-red-900 ring-red-500";
              else cls = "bg-white text-gray-500 ring-gray-200";
            }
            return (
              <button
                key={c.hanzi}
                onClick={() => onPick(c)}
                disabled={!!picked}
                className={`rounded-xl px-4 py-4 text-center text-xl font-semibold ring-2 transition disabled:cursor-default ${cls}`}
              >
                {c.pinyin}
              </button>
            );
          })}
        </div>

        {picked && (
          <div className="mt-5 text-center">
            <p className="mb-3 text-lg">
              {picked === current.pinyin ? (
                <span className="font-bold text-green-600">✓ Chính xác!</span>
              ) : (
                <span className="font-bold text-red-600">
                  ✗ Sai. Đáp án: {current.pinyin}
                </span>
              )}
            </p>
            <button
              onClick={next}
              className="rounded-full bg-green-600 px-6 py-2 font-semibold text-white shadow hover:bg-green-700"
            >
              {idx + 1 >= questions.length ? "Xem kết quả" : "Câu tiếp →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
