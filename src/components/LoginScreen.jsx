"use client";

import { useRef, useState } from "react";
import { LockKeyhole, ShieldCheck, UserRound } from "@/components/icons";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/*
  No globals.css changes needed.
  Uses only your existing tokens:
    --background, --foreground, --card, --card-foreground,
    --primary, --primary-foreground, --muted, --muted-foreground,
    --border, --input, --border-soft-primary, --overlay
*/

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submitIconRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId.trim() || !password.trim()) {
      setError("Please enter both your User ID and Password.");
      return;
    }
    setError("");
    onLogin?.({ userId, password });
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ── Floating gradient orbs ──
          Dark:  --background is near-black  → orbs glow vividly at 0.6 opacity
          Light: --background is warm cream  → orbs are softer via --border-soft-primary tones
          Both use only --primary which is rgb(255,102,0) in both themes.
      ── */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 620,
          height: 620,
          top: -180,
          left: -220,
          background: "radial-gradient(circle, var(--primary), color-mix(in srgb, var(--primary) 60%, black))",
          filter: "blur(130px)",
          opacity: "var(--orb-opacity, 0.55)",
        }}
        animate={{ x: [0, 340, 160, -80, 0], y: [0, 180, 380, 220, 0], scale: [1, 1.12, 0.92, 1.08, 1] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          bottom: -160,
          right: -180,
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 70%, white), var(--primary))",
          filter: "blur(130px)",
          opacity: "var(--orb-opacity, 0.55)",
        }}
        animate={{ x: [0, -260, 200, 0], y: [0, 280, 120, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: -20,
          left: "30%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 80%, black), color-mix(in srgb, var(--primary) 50%, white))",
          filter: "blur(120px)",
          opacity: "var(--orb-opacity, 0.55)",
        }}
        animate={{ x: [0, 180, -220, 100, 0], y: [0, -140, 200, 320, 0], scale: [1, 0.88, 1.15, 1.05, 1] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />

      {/* ── Glassmorphic Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card
          className="overflow-hidden rounded-2xl"
          style={{
            /* --card already adapts: dark = rgb(20,20,24), light = rgb(255,251,246) */
            background: "color-mix(in srgb, var(--card) 55%, transparent)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            boxShadow: "0 8px 48px color-mix(in srgb, var(--primary) 8%, transparent), inset 0 1px 0 color-mix(in srgb, var(--foreground) 8%, transparent)",
          }}
        >
          <CardContent className="space-y-3 p-8">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px]"
              style={{
                background: "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 80%, black))",
                color: "var(--primary-foreground)",
                boxShadow: "0 4px 20px color-mix(in srgb, var(--primary) 40%, transparent)",
              }}
            >
              <span className="text-lg font-black tracking-widest">Q</span>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.12, duration: 0.28 }}
              className="flex justify-center"
            >
              <Badge
                className="rounded-full text-xs font-medium"
                style={{
                  background: "var(--border-soft-primary)",
                  border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)",
                  color: "var(--primary)",
                }}
              >
                Secure Login
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.16, duration: 0.28 }}
              className="text-center text-2xl font-semibold tracking-tight"
              style={{ color: "var(--card-foreground)" }}
            >
              Welcome to Quantro
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="mx-auto w-[65%] text-center text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Use any demo ID and password to enter the personal finance dashboard.
            </motion.p>

            <form className="space-y-5 mt-5" onSubmit={handleSubmit}>

              {/* User ID */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.25 }}
                className="space-y-2"
              >
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--card-foreground)" }}
                >
                  User ID
                </label>
                <div className="relative mt-1">
                  <UserRound
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your user ID"
                    className="h-12 rounded-lg pl-10"
                    style={{
                      background: "var(--input)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="space-y-2"
              >
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--card-foreground)" }}
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <LockKeyhole
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "var(--muted-foreground)" }}
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 rounded-lg pl-10"
                    style={{
                      background: "var(--input)",
                      border: "1px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Error + Submit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.25 }}
              >
                {error && (
                  <p
                    className="mb-3 text-center text-xs"
                    style={{ color: "var(--destructive)" }}
                  >
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-lg border-0 font-semibold"
                  style={{
                    background: "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 80%, black))",
                    color: "var(--primary-foreground)",
                    boxShadow: "0 4px 18px color-mix(in srgb, var(--primary) 35%, transparent)",
                  }}
                  onMouseEnter={() => submitIconRef.current?.startAnimation?.()}
                  onMouseLeave={() => submitIconRef.current?.stopAnimation?.()}
                >
                  <ShieldCheck ref={submitIconRef} className="mr-2 h-4 w-4" />
                  Login To Dashboard
                </Button>
              </motion.div>
            </form>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
