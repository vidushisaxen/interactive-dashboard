"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import FinanceSidebar from "./FinanceSidebar";
import FinanceTopbar from "./FinanceTopbar";

const FinanceDashboardShell = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.10),transparent_22%),radial-gradient(circle_at_bottom_right,hsl(262_83%_58%/0.08),transparent_20%)]">
        <FinanceSidebar
          expanded={sidebarExpanded}
          onExpandedChange={setSidebarExpanded}
        />

        <div
          className={`min-h-screen transition-[margin-left] duration-300 ${
            sidebarExpanded ? "ml-60" : "ml-22"
          }`}
        >
          <FinanceTopbar />

          <main className="px-5 pb-5 pt-4 lg:px-6 lg:pb-6 lg:pt-5">
            <Card className="min-h-[calc(100vh-110px)] rounded-[28px] border-border/60 bg-card/95 shadow-sm backdrop-blur">
              <CardContent className="p-6 lg:p-7">{children}</CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboardShell;
