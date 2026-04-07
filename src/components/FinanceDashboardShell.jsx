"use client";

import { cloneElement, isValidElement, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/animations/FadeUp";
import FinanceSidebar from "./FinanceSidebar";
import FinanceTopbar from "./FinanceTopbar";
import ChatbotWidget from "./ChatbotWidget";
import { useTheme } from "./Themetoggler";
import LoginScreen from "./LoginScreen";

const AUTH_STORAGE_KEY = "quantro-authenticated";
const AUTH_NAME_KEY = "quantro-auth-user";

const FinanceDashboardShell = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userName, setUserName] = useState("");

  const content = isValidElement(children)
    ? cloneElement(children, { searchQuery })
    : children;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsAuthenticated(
        window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true"
      );
      setUserName(window.sessionStorage.getItem(AUTH_NAME_KEY) || "");
      setIsAuthReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleLogin = ({ userId } = {}) => {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
    const nextUserName = userId?.trim() || "there";
    window.sessionStorage.setItem(AUTH_NAME_KEY, nextUserName);
    setUserName(nextUserName);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(AUTH_NAME_KEY);
    setSearchQuery("");
    setUserName("");
    setIsAuthenticated(false);
    router.replace("/");
  };

  if (!isAuthReady || !isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen">
        <FinanceSidebar onLogout={handleLogout} />

        <div className="ml-[88px] min-h-screen">
          <FinanceTopbar
            theme={theme}
            onToggleTheme={toggleTheme}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            userName={userName}
          />

          <main className="px-5 pb-5 pt-4 lg:px-6 lg:pb-6 lg:pt-5">
            <Card className="min-h-[calc(100vh-110px)] rounded-lg  border border-border bg-card/95 shadow-sm backdrop-blur">
              <CardContent className="p-6 lg:p-7">
                <PageTransition transitionKey={pathname}>
                  {content}
                </PageTransition>
              </CardContent>
            </Card>
          </main>
        </div>
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default FinanceDashboardShell;
