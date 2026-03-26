"use client";

import React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export const smoothTween = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

export const smoothSpring = {
  type: "spring",
  stiffness: 140,
  damping: 20,
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const viewportRepeat = {
  once: false,
  amount: 0.2,
};


export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeUp = (distance = 24, duration = 0.5, delay = 0) => ({
  hidden: {
    opacity: 0,
    y: distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothTween,
      duration,
      delay,
    },
  },
});

export const fadeDown = (distance = 24, duration = 0.5, delay = 0) => ({
  hidden: {
    opacity: 0,
    y: -distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothTween,
      duration,
      delay,
    },
  },
});

export const slideIn = (
  direction = "left",
  distance = 32,
  duration = 0.5,
  delay = 0
) => {
  const axis =
    direction === "left"
      ? { x: -distance }
      : direction === "right"
      ? { x: distance }
      : direction === "up"
      ? { y: distance }
      : { y: -distance };

  return {
    hidden: {
      opacity: 0,
      ...axis,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ...smoothTween,
        duration,
        delay,
      },
    },
  };
};

export const scaleFade = (duration = 0.45, delay = 0, from = 0.96) => ({
  hidden: {
    opacity: 0,
    scale: from,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...smoothTween,
      duration,
      delay,
    },
  },
});

export const textReveal = (y = 24, blur = "10px", duration = 0.6, delay = 0) => ({
  hidden: {
    opacity: 0,
    y,
    filter: `blur(${blur})`,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...smoothTween,
      duration,
      delay,
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                             Reusable wrappers                              */
/* -------------------------------------------------------------------------- */

export function AnimatedFadeUp({
  children,
  className,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.2,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? undefined : fadeUp(24, duration, delay)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedSlideIn({
  children,
  className,
  direction = "left",
  distance = 32,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.2,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        prefersReducedMotion
          ? undefined
          : slideIn(direction, distance, duration, delay)
      }
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedScaleFade({
  children,
  className,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.2,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        prefersReducedMotion ? undefined : scaleFade(duration, delay, 0.96)
      }
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedTextReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.2,
  y = 24,
  blur = "10px",
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        variants={
          prefersReducedMotion
            ? undefined
            : textReveal(y, blur, duration, delay)
        }
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once, amount }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         Manual trigger version                             */
/* -------------------------------------------------------------------------- */

export function ManualTextReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        variants={
          prefersReducedMotion
            ? undefined
            : textReveal(24, "10px", duration, delay)
        }
        initial={prefersReducedMotion ? false : "hidden"}
        animate={
          prefersReducedMotion ? undefined : isInView ? "visible" : "hidden"
        }
      >
        {children}
      </motion.div>
    </div>
  );
}