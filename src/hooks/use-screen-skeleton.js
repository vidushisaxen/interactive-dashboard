"use client";

import { useEffect, useState } from "react";

export function useScreenSkeleton(delay = 700) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay]);

  return loading;
}
