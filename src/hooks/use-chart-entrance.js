"use client";

import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useChartEntrance() {
  const prefersReducedMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);
  const observerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const ref = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
            }

            setAnimationKey((current) => current + 1);
            return;
          }

          hasAnimatedRef.current = false;
        },
        {
          threshold: 0.35,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      observerRef.current.observe(node);
    },
    [prefersReducedMotion]
  );

  return {
    ref,
    shouldAnimate: !prefersReducedMotion && animationKey > 0,
    animationKey,
  };
}
