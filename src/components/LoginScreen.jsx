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

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin?.({ userId, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10 text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--shell-glow-a),transparent_26%),radial-gradient(circle_at_bottom_right,var(--shell-glow-b),transparent_24%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/96 shadow-2xl backdrop-blur">
          <CardContent className="space-y-6 p-8">
            <div className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[22px] bg-primary text-primary-foreground shadow-sm">
                <span className="text-lg font-black tracking-widest">Q</span>
              </div>
              <div>
                <Badge variant="secondary" className="rounded-full">
                  Secure Login
                </Badge>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                  Welcome to Quantro
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use any demo ID and password to enter the personal finance dashboard.
                </p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium">User ID</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={userId}
                    onChange={(event) => setUserId(event.target.value)}
                    placeholder="Enter your user ID"
                    className="h-12 rounded-xl pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-12 rounded-xl pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="h-12 w-full rounded-xl">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Login To Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
