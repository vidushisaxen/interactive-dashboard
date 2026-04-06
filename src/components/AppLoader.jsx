"use client";

import { motion } from "motion/react";

const loaderEase = [0.22, 1, 0.36, 1];

const AppLoader = ({ reducedMotion = false }) => {
  return (
    <motion.div
      className="fixed inset-0 z-220 flex items-center justify-center overflow-hidden bg-background/90 px-6 backdrop-blur-md"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.42, ease: loaderEase },
      }}
      aria-hidden="true"
    >
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 540,
          height: 540,
          top: -140,
          left: -180,
          background:
            "radial-gradient(circle, var(--primary), color-mix(in srgb, var(--primary) 60%, black))",
          filter: "blur(120px)",
          opacity: 0.52,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 280, 120, -60, 0],
                y: [0, 140, 320, 180, 0],
                scale: [1, 1.1, 0.94, 1.06, 1],
              }
        }
        transition={{
          duration: 16,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 460,
          height: 460,
          right: -120,
          bottom: -120,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 70%, white), var(--primary))",
          filter: "blur(120px)",
          opacity: 0.48,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -220, 160, 0],
                y: [0, 220, 100, 0],
                scale: [1, 1.08, 0.92, 1],
              }
        }
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          left: "36%",
          bottom: 20,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 80%, black), color-mix(in srgb, var(--primary) 50%, white))",
          filter: "blur(110px)",
          opacity: 0.44,
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 140, -180, 80, 0],
                y: [0, -120, 160, 240, 0],
                scale: [1, 0.9, 1.12, 1.04, 1],
              }
        }
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-xs rounded-xl"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.38, ease: loaderEase }}
      >
        <div className="mb-5 flex items-center justify-center gap-3">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.36, ease: loaderEase }}
          >
            <span className="text-sm font-black tracking-widest">Q</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.p
              className="text-xl font-semibold  text-foreground"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06, ease: loaderEase }}
            >
              QUANTRO
            </motion.p>
          </div>
        </div>

        <div className="overflow-hidden rounded-full bg-muted/80">
          <motion.div
            className="h-1.5 rounded-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reducedMotion ? 0.35 : 1.2,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppLoader;
