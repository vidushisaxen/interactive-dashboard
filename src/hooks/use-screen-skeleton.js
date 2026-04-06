"use client";

import { useEffect, useState } from "react";

const SCREEN_SKELETON_SEEN_KEY = "quantro-screen-skeleton-seen";

export function useScreenSkeleton(delay = 700) {
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.sessionStorage.getItem(SCREEN_SKELETON_SEEN_KEY);
  });

  useEffect(() => {
    if (!loading) {
      return;
    }

    window.sessionStorage.setItem(SCREEN_SKELETON_SEEN_KEY, "true");

    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, loading]);

  return loading;
}
