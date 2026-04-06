"use client";

import { useCallback, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

const BASE_DELAY = 140;
const VIEWPORT_AMOUNT = 0.35;

export function useChartEntrance() {
  const prefersReducedMotion = useReducedMotion();
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, {
    once: true,
    amount: VIEWPORT_AMOUNT,
  });

  const ref = useCallback(
    (node) => {
      nodeRef.current = node;
    },
    []
  );

  const hasEnteredView = prefersReducedMotion || isInView;
  const animationKey = hasEnteredView ? 1 : 0;

  return {
    ref,
    isChartVisible: hasEnteredView,
    shouldAnimate: !prefersReducedMotion && hasEnteredView,
    animationKey,
    animationDelay: BASE_DELAY,
  };
}
