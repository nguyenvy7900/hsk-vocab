"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "hsk-learned-v1";

export function useLearned() {
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLearned(new Set(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = (set: Set<string>) => {
    setLearned(new Set(set));
    try {
      localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
    } catch {}
  };

  const toggle = useCallback(
    (hanzi: string) => {
      setLearned((prev) => {
        const next = new Set(prev);
        if (next.has(hanzi)) next.delete(hanzi);
        else next.add(hanzi);
        try {
          localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
        } catch {}
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => persist(new Set()), []);

  return { learned, toggle, reset, hydrated };
}
