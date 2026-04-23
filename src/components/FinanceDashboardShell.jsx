"use client";

import { cloneElement, isValidElement, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PageTransition } from "@/components/animations/FadeUp";
import FinanceSidebar from "./FinanceSidebar";
import FinanceTopbar from "./FinanceTopbar";
import ChatbotWidget from "./ChatbotWidget";
import { useTheme } from "./Themetoggler";
import LoginScreen from "./LoginScreen";

const AUTH_STORAGE_KEY = "quantro-authenticated";
const AUTH_NAME_KEY = "quantro-auth-user";
const SIDEBAR_PINNED_KEY = "quantro-sidebar-pinned";

const SIDEBAR_COLLAPSED_OFFSET_PX = 88;
const SIDEBAR_PINNED_OFFSET_PX = 248;

const FinanceDashboardShell = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userName, setUserName] = useState("");
  const [sidebarPinned, setSidebarPinned] = useState(false);

  const content = isValidElement(children)
    ? cloneElement(children, { searchQuery })
    : children;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsAuthenticated(
        window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "true"
      );
      setUserName(window.sessionStorage.getItem(AUTH_NAME_KEY) || "");
      setSidebarPinned(window.localStorage.getItem(SIDEBAR_PINNED_KEY) === "true");
      setIsAuthReady(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;
    window.localStorage.setItem(SIDEBAR_PINNED_KEY, sidebarPinned ? "true" : "false");
  }, [isAuthReady, sidebarPinned]);

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
        <FinanceSidebar
          onLogout={handleLogout}
          pinned={sidebarPinned}
          onPinnedChange={setSidebarPinned}
        />

        <div
          className="min-h-screen transition-[margin-left] duration-300 ease-out"
          style={{
            marginLeft: sidebarPinned
              ? SIDEBAR_PINNED_OFFSET_PX
              : SIDEBAR_COLLAPSED_OFFSET_PX,
          }}
        >
          <FinanceTopbar
            theme={theme}
            onToggleTheme={toggleTheme}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            userName={userName}
	          />

	          <main className="px-5 pb-5 pt-4 lg:px-6 lg:pb-6 lg:pt-5">
	            <div className="min-h-[calc(100vh-110px)]">
	              <PageTransition transitionKey={pathname}>
	                {content}
	              </PageTransition>
	            </div>
          </main>
        </div>
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default FinanceDashboardShell;
