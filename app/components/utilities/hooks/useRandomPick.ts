"use client";
import { useCallback, useEffect, useState } from "react";

export function useRandomPick<T>(items: T[]) {
  const [item, setItem] = useState<T | null>(null);

  const reroll = useCallback(() => {
    if (!items || items.length === 0) {
      setItem(null);
      return;
    }
    const idx = Math.floor(Math.random() * items.length);
    setItem(items[idx]);
  }, [items]);

  // Pick one on initial mount
  useEffect(() => {
    reroll();
  }, [reroll]);

  return { item, reroll };
}
