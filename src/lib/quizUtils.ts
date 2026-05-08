import type { VocabItem } from "@/data/vocab";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(
  pool: VocabItem[],
  count: number
): VocabItem[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function buildChoices<T>(
  correct: T,
  pool: T[],
  count: number,
  isSame: (a: T, b: T) => boolean
): T[] {
  const wrong = shuffle(pool.filter((p) => !isSame(p, correct))).slice(
    0,
    count - 1
  );
  return shuffle([correct, ...wrong]);
}
