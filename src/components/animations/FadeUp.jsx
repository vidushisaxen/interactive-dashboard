"use client";

import { motion, useReducedMotion } from "motion/react";

const FADE_UP_EASE = [0.335, -0.006, 0.014, 0.995];

export const FadeUp = ({
  children,
  delay = 0,
  duration = 1,
  yOffset = 50,
  className = "w-full",
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: FADE_UP_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleDown = ({
  children,
  delay = 0,
  duration = 0.2,
  className = "w-full",
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ originY: 0, originX: 0.5 }}
      transition={{
        duration,
        delay,
        ease: FADE_UP_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeUpStagger = ({
  children,
  staggerDelay = 0.1,
  delay = 0.5,
  duration = 0.8,
  className = "",
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            delay,
            duration,
            ease: [0.25, 0.4, 0.25, 1],
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Bounce = ({ children }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition = ({ transitionKey, children, className = "w-full" }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={transitionKey}
      initial={{ opacity: 0, scale: 1.03, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.44,
        ease: FADE_UP_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
