"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const BASE_DELAY = 140;
const MAX_DELAY = 720;

export function useChartEntrance() {
  const prefersReducedMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(0);
  const nodeRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const ref = useCallback(
    (node) => {
      nodeRef.current = node;
    },
    []
  );

  useEffect(() => {
    if (prefersReducedMotion || hasAnimatedRef.current || !nodeRef.current) {
      return;
    }

    const node = nodeRef.current;
    const rect = node.getBoundingClientRect();
    const relativeTop = Math.max(rect.top, 0);
    const nextDelay = Math.min(
      BASE_DELAY + Math.round(relativeTop * 0.18),
      MAX_DELAY
    );

    setAnimationDelay(nextDelay);

    timeoutRef.current = window.setTimeout(() => {
      hasAnimatedRef.current = true;
      setAnimationKey(1);
      timeoutRef.current = null;
    }, nextDelay);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  return {
    ref,
    isChartVisible: prefersReducedMotion || animationKey > 0,
    shouldAnimate: !prefersReducedMotion && animationKey > 0,
    animationKey,
    animationDelay,
  };
}
