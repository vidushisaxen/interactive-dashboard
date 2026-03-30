"use client";

import { useState } from "react";
import { LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--shell-glow-a),transparent_26%),radial-gradient(circle_at_bottom_right,var(--shell-glow-b),transparent_24%)]" />

      {/* Card — mirrors dialog root: opacity + scale + y */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="overflow-hidden rounded-xl  border border-border bg-card/96 shadow-2xl backdrop-blur">
          <CardContent className="space-y-3 p-8">

            {/* Logo — mirrors dialog icon: scale pop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-primary text-primary-foreground shadow-sm"
            >
              <span className="text-lg font-black tracking-widest">Q</span>
            </motion.div>

            {/* Badge — mirrors dialog title: blur + y */}
            <motion.div
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.12, duration: 0.28 }}
              className="flex justify-center"
            >
              <Badge variant="secondary" className="rounded-full">Secure Login</Badge>
            </motion.div>

            {/* Heading — mirrors dialog description: blur + y */}
            <motion.h1
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.16, duration: 0.28 }}
              className="text-center text-2xl font-semibold tracking-tight"
            >
              Welcome to Quantro
            </motion.h1>

            {/* Subtext — mirrors dialog footer: opacity + y */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="mx-auto w-[65%] text-center text-sm text-muted-foreground"
            >
              Use any demo ID and password to enter the personal finance dashboard.
            </motion.p>

            <form className="space-y-5 mt-5" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.25 }}
                className="space-y-5"
              >
                <label className="text-sm font-medium">User ID</label>
                <div className="relative mt-3">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your user ID"
                    className="h-12 rounded-lg pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-3">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 rounded-lg pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.25 }}
              >
                {error && (
                  <p className="mb-3 text-center text-xs text-destructive">{error}</p>
                )}
                <Button type="submit" className="h-12 w-full rounded-lg">
                  <ShieldCheck className="mr-2 h-4 w-4" />
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