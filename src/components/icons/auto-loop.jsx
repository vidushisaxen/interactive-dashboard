"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const AutoLoop = forwardRef(
  ({ Icon, intervalMs, start = true, ...props }, ref) => {
    const iconRef = useRef(null);

    useImperativeHandle(ref, () => iconRef.current);

    useEffect(() => {
      if (!start) return;
      if (!iconRef.current?.startAnimation) return;

      iconRef.current.startAnimation();

      if (!intervalMs) return;
      const intervalId = window.setInterval(() => {
        iconRef.current?.startAnimation?.();
      }, intervalMs);

      return () => window.clearInterval(intervalId);
    }, [intervalMs, start]);

    return <Icon ref={iconRef} {...props} />;
  }
);

AutoLoop.displayName = "AutoLoop";

export { AutoLoop };
