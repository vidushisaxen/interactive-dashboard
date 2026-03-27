"use client";

import { motion } from "motion/react";

const loaderEase = [0.22, 1, 0.36, 1];

const AppLoader = ({ reducedMotion = false }) => {
  return (
    <motion.div
      className="fixed inset-0 z-220 flex items-center justify-center bg-background/90 px-6 backdrop-blur-md"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.42, ease: loaderEase },
      }}
      aria-hidden="true"
    >
      <motion.div
        className="w-full max-w-xs rounded-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.38, ease: loaderEase }}
      >
        <div className="mb-5 flex items-center justify-center gap-3">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
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
