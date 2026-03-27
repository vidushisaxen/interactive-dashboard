"use client";

import { cloneElement, isValidElement, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { smoothTween } from "@/lib/animations";
import FinanceSidebar from "./FinanceSidebar";
import FinanceTopbar from "./FinanceTopbar";
import { useTheme } from "./ThemeProvider";
import LoginScreen from "./LoginScreen";

const shellTween = {
  ...smoothTween,
  duration: 0.52,
  ease: [0.2, 0.9, 0.2, 1],
};

const AUTH_STORAGE_KEY = "quantro-authenticated";
const VALID_USER_ID = "quantro-admin";
const VALID_PASSWORD = "Quantro@2026";

const FinanceDashboardShell = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const content = isValidElement(children)
    ? cloneElement(children, { searchQuery })
    : children;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsAuthenticated(
        window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true"
      );
      setIsAuthReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleLogin = ({ userId, password }) => {
    const success =
      userId.trim() === VALID_USER_ID && password === VALID_PASSWORD;

    if (!success) {
      return false;
    }

    window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    return true;
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setSearchQuery("");
    setSidebarExpanded(false);
    setIsAuthenticated(false);
  };

  if (!isAuthReady || !isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen">
        <FinanceSidebar
          expanded={sidebarExpanded}
          onExpandedChange={setSidebarExpanded}
          onLogout={handleLogout}
        />

        <motion.div
          className="min-h-screen"
          animate={{ marginLeft: sidebarExpanded ? 240 : 88 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : shellTween
          }
        >
          <FinanceTopbar
            theme={theme}
            onToggleTheme={toggleTheme}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <main className="px-5 pb-5 pt-4 lg:px-6 lg:pb-6 lg:pt-5">
            <Card className="min-h-[calc(100vh-110px)] rounded-[28px] border-border/60 bg-card/95 shadow-sm backdrop-blur">
              <CardContent className="p-6 lg:p-7">{content}</CardContent>
            </Card>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default FinanceDashboardShell;
