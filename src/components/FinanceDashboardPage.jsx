"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  Landmark,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ExportCsvButton from "./ExportCsvButton";
import BalanceHero from "./BalanceHero";
import ActivityCard from "./ActivityCard";
import TransactionsCard from "./TransactionsCard";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import {
  DASHBOARD_ACCOUNT_DATA,
  DASHBOARD_ALERTS,
  DASHBOARD_HOLDINGS,
  DASHBOARD_METRIC_CARDS,
  DASHBOARD_QUICK_ACCESS_CARDS,
  DASHBOARD_STOCK_WATCHLIST,
  DASHBOARD_TRANSACTIONS,
} from "./dashboard-data";

function DashboardSkeleton() {
  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-88 max-w-full" />
        </div>
      </header>

      <Skeleton className="h-56 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    </section>
  );
}

function OverviewCard({ title, description, icon: Icon, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group rounded-2xl border border-border/60 bg-card/95 p-5 text-left shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-foreground/16 group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-foreground" />
      </div>
      <p className="mt-5 text-base font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-primary-foreground/88">
        {description}
      </p>
    </button>
  );
}

function SnapshotCard({ title, subtitle, badge, action, children }) {
  return (
    <Card className="border-border/60 bg-card shadow-sm">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit rounded-full">
              {badge}
            </Badge>
            <div>
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          {action}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

const FinanceDashboardPage = ({ onNav, searchQuery = "" }) => {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const loading = useScreenSkeleton();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredAccounts = useMemo(() => {
    if (!normalizedQuery) return DASHBOARD_ACCOUNT_DATA;
    return DASHBOARD_ACCOUNT_DATA.filter((item) =>
      [item.name, item.institution, item.balance, item.change]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const filteredWatchlist = useMemo(() => {
    if (!normalizedQuery) return DASHBOARD_STOCK_WATCHLIST;
    return DASHBOARD_STOCK_WATCHLIST.filter((item) =>
      [item.ticker, item.company, item.signal, item.move]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const filteredHoldings = useMemo(() => {
    if (!normalizedQuery) return DASHBOARD_HOLDINGS;
    return DASHBOARD_HOLDINGS.filter((item) =>
      [item.name, item.allocation, item.value, item.detail]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const filteredAlerts = useMemo(() => {
    if (!normalizedQuery) return DASHBOARD_ALERTS;
    return DASHBOARD_ALERTS.filter((item) =>
      [item.title, item.description, item.severity]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const filteredTransactions = useMemo(() => {
    if (!normalizedQuery) return DASHBOARD_TRANSACTIONS;
    return DASHBOARD_TRANSACTIONS.filter((item) =>
      [item.title, item.subtitle, item.amount]
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    );
  }, [normalizedQuery]);

  const sectionVisibility = useMemo(() => {
    if (!normalizedQuery) {
      return {
        hero: true,
        access: true,
        metrics: true,
        workflow: true,
        accounts: true,
        stocks: true,
        activity: true,
        transactions: true,
        portfolio: true,
        alerts: true,
      };
    }

    const matches = (...values) =>
      values.some((value) => value.toLowerCase().includes(normalizedQuery));

    return {
      hero: matches("overview", "net worth", "cash flow", "transfer", "request", "move money"),
      access: matches("overview", "insights", "stocks", "accounts", "portfolio"),
      metrics: matches("net worth", "cash flow", "budget", "invested assets"),
      workflow: matches("data sources", "sync", "alerts engine", "filters", "kpi", "dashboard ui"),
      accounts: filteredAccounts.length > 0 || matches("accounts", "balances", "activity"),
      stocks: filteredWatchlist.length > 0 || matches("stocks", "watchlist", "signals", "performance"),
      activity: matches("insights", "spending", "budget", "trends"),
      transactions: filteredTransactions.length > 0 || matches("transactions", "recent activity", "cash flow"),
      portfolio: filteredHoldings.length > 0 || matches("portfolio", "holdings", "allocation"),
      alerts: filteredAlerts.length > 0 || matches("alerts", "notifications", "unusual activity"),
    };
  }, [
    filteredAccounts.length,
    filteredAlerts.length,
    filteredHoldings.length,
    filteredTransactions.length,
    filteredWatchlist.length,
    normalizedQuery,
  ]);

  const hasVisibleSections = Object.values(sectionVisibility).some(Boolean);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary" className="rounded-full">
            Dashboard Home
          </Badge>
        </AnimatedFadeUp>

        <div>
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">
              Personal Finance Command Center
            </h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Overview, insights, stocks, accounts, portfolio, alerts, and quick actions in one realistic finance workspace.
            </p>
          </AnimatedTextReveal>
        </div>
      </header>

      {sectionVisibility.hero ? (
        <AnimatedFadeUp delay={0.08}>
          <BalanceHero
            balance="$84,560"
            cents=".42"
            lastTransaction="Payroll credited, portfolio up 1.9%, and dining budget is nearing its weekly limit."
            hidden={balanceHidden}
            onToggleHidden={() => setBalanceHidden((prev) => !prev)}
            onMoveMoney={() => onNav?.("move-money")}
            onRequest={() => onNav?.("request")}
            onTransfer={() => onNav?.("transfer")}
          />
        </AnimatedFadeUp>
      ) : null}

      {sectionVisibility.access ? (
        <AnimatedFadeUp delay={0.12}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {DASHBOARD_QUICK_ACCESS_CARDS.map((item) => (
              <OverviewCard
                key={item.id}
                title={item.title}
                description={item.subtitle}
                icon={item.icon}
                onOpen={() => item.nav && onNav?.(item.nav)}
              />
            ))}
          </div>
        </AnimatedFadeUp>
      ) : null}

      {sectionVisibility.metrics ? (
        <AnimatedFadeUp delay={0.16}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {DASHBOARD_METRIC_CARDS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/60 bg-card/95 p-5 shadow-sm"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">{item.value}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    {item.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedFadeUp>
      ) : null}

      {sectionVisibility.workflow ? (
        <AnimatedFadeUp delay={0.2}>
          <Card className="border-border/60 bg-card shadow-sm">
            <CardContent className="grid gap-4 p-6 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full">
                    Data Flow
                  </Badge>
                  <Badge className="rounded-full">
                    Live sync
                  </Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">
                  From source ingestion to dashboard insights
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Bank APIs, card transactions, investment feeds, and manual entries flow through sync, processing, normalization, and calculation layers before updating balances, budgets, holdings, KPIs, alerts, and search filters.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Source health", "11 sources connected"],
                  ["Sync cadence", "Real-time + 15m refresh"],
                  ["Alerts engine", "3 active triggers"],
                  ["Search filters", searchQuery ? `Filtering: ${searchQuery}` : "Ready for drill-down"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border/60 bg-background/45 p-4"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedFadeUp>
      ) : null}

      {!hasVisibleSections ? (
        <AnimatedFadeUp delay={0.22}>
          <div className="rounded-2xl border border-dashed border-border/70 bg-background/40 p-10 text-center">
            <p className="text-base font-semibold tracking-tight">
              No dashboard results for &quot;{searchQuery}&quot;
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try searching for accounts, stocks, alerts, portfolio, spending, or transactions.
            </p>
          </div>
        </AnimatedFadeUp>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-6">
          {sectionVisibility.accounts ? (
            <AnimatedFadeUp>
              <SnapshotCard
                title="Accounts Snapshot"
                subtitle="Balances and activity across linked accounts"
                badge="Accounts"
                action={
                  <ExportCsvButton
                    fileName="quantro_accounts"
                    rows={filteredAccounts.map((item) => ({
                      account_name: item.name,
                      institution: item.institution,
                      balance: item.balance,
                      change: item.change,
                    }))}
                    className="rounded-lg"
                  />
                }
              >
                <div className="space-y-3">
                  {filteredAccounts.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border/60 bg-background/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.institution}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{item.balance}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.change}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SnapshotCard>
            </AnimatedFadeUp>
          ) : null}

          {sectionVisibility.stocks ? (
            <AnimatedFadeUp>
              <SnapshotCard
                title="Stocks Watchlist"
                subtitle="Signals and movement from your tracked positions"
                badge="Stocks"
                action={
                  <ExportCsvButton
                    fileName="quantro_watchlist"
                    rows={filteredWatchlist.map((item) => ({
                      ticker: item.ticker,
                      company: item.company,
                      price: item.price,
                      move: item.move,
                      signal: item.signal,
                    }))}
                    className="rounded-lg"
                  />
                }
              >
                <div className="space-y-3">
                  {filteredWatchlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/50 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{item.ticker}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{item.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{item.price}</p>
                        <p className="mt-1 text-xs text-primary">{item.move} • {item.signal}</p>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => onNav?.("stocks")}
                  >
                    Open Stocks
                  </Button>
                </div>
              </SnapshotCard>
            </AnimatedFadeUp>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {sectionVisibility.activity ? (
            <AnimatedFadeUp>
              <ActivityCard />
            </AnimatedFadeUp>
          ) : null}

          {sectionVisibility.alerts ? (
            <AnimatedFadeUp>
              <SnapshotCard
                title="Filters And Alerts"
                subtitle="Search, filters, and alert engine output"
                badge="Alerts"
                action={
                  <ExportCsvButton
                    fileName="quantro_alerts"
                    rows={filteredAlerts.map((item) => ({
                      title: item.title,
                      description: item.description,
                      severity: item.severity,
                    }))}
                    className="rounded-lg"
                  />
                }
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <SlidersHorizontal className="h-4 w-4 text-primary" />
                      Active filters
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {searchQuery ? `Search scoped to "${searchQuery}"` : "No manual filters applied. Search, route views, and alerts can refine the dashboard."}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-background/50 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BellRing className="h-4 w-4 text-primary" />
                      Alert details
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Review notifications, alert details, and recommended next actions before moving money.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredAlerts.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border/60 bg-background/50 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                          {item.severity === "warning" ? (
                            <ShieldAlert className="h-4 w-4" />
                          ) : (
                            <BellRing className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SnapshotCard>
            </AnimatedFadeUp>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          {sectionVisibility.transactions ? (
            <AnimatedFadeUp>
              <TransactionsCard
                title="Recent Activity"
                subtitle="Transactions, transfers, and cash-flow confirmations"
                transactions={filteredTransactions}
                onFilter={() => onNav?.("analytics")}
                onViewAll={() => onNav?.("pools")}
                onSelectTransaction={() => onNav?.("overview")}
              />
            </AnimatedFadeUp>
          ) : null}

          {sectionVisibility.portfolio ? (
            <AnimatedFadeUp>
              <SnapshotCard
                title="Portfolio Allocation"
                subtitle="Holdings and allocation across your personal finance stack"
                badge="Portfolio"
                action={
                  <ExportCsvButton
                    fileName="quantro_portfolio"
                    rows={filteredHoldings.map((item) => ({
                      holding: item.name,
                      allocation: item.allocation,
                      value: item.value,
                      detail: item.detail,
                    }))}
                    className="rounded-lg"
                  />
                }
              >
                <div className="space-y-3">
                  {filteredHoldings.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border/60 bg-background/50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{item.allocation}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SnapshotCard>
            </AnimatedFadeUp>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FinanceDashboardPage;
