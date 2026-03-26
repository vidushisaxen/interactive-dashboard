"use client"
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BalanceHero from "./BalanceHero";
import CurrencyCard from "./CurrencyCard";
import ActivityCard from "./ActivityCard";
import SavingsCard from "./SavingsCard";
import TransactionsCard from "./TransactionsCard";
import PromoCard from "./PromoCard";
import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";

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

      <Card className="border-border/60 shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:justify-between lg:p-7">
          <div className="space-y-4">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-4 w-64 max-w-full" />
            <Skeleton className="h-14 w-72 max-w-full" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-11 w-32 rounded-2xl" />
            <Skeleton className="h-11 w-28 rounded-2xl" />
            <Skeleton className="h-11 w-28 rounded-2xl" />
            <Skeleton className="h-11 w-11 rounded-2xl" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.05fr_1.45fr_1fr]">
        <div className="space-y-6">
          <Skeleton className="h-[720px] w-full rounded-[28px]" />
          <Skeleton className="h-[360px] w-full rounded-[28px]" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[430px] w-full rounded-[28px]" />
          <Skeleton className="h-[430px] w-full rounded-[28px]" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[520px] w-full rounded-[28px]" />
        </div>
      </div>
    </section>
  );
}

const FinanceDashboardPage = ({ onNav }) => {
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    code: "JPY",
    amount: "16,428.5",
    flag: "🇯🇵",
    change: "+2.14%",
  });
  const [currencies, setCurrencies] = useState([
    { id: 1, code: "JPY", amount: "16,428.5", flag: "🇯🇵", change: "+2.14%" },
    { id: 2, code: "EUR", amount: "0.92", flag: "🇪🇺", change: "+0.64%" },
    { id: 3, code: "GBP", amount: "0.78", flag: "🇬🇧", change: "+0.42%" },
    { id: 4, code: "AUD", amount: "1.51", flag: "🇦🇺", change: "+1.08%" },
  ]);
  const loading = useScreenSkeleton();

  const currencyTrendData = useMemo(
    () => [
      { label: "1", value: 15820 },
      { label: "5", value: 16010 },
      { label: "10", value: 15940 },
      { label: "15", value: 16120 },
      { label: "20", value: 16210 },
      { label: "25", value: 16350 },
      { label: "30", value: 16428.5 },
      { label: "35", value: 16390 },
      { label: "40", value: 16510 },
      { label: "45", value: 16460 },
      { label: "50", value: 16620 },
      { label: "55", value: 16540 },
      { label: "60", value: 16428.5 },
    ],
    []
  );

  const currencyLiquidityData = useMemo(
    () => [
      { label: "Mon", value: 12 },
      { label: "Tue", value: 18 },
      { label: "Wed", value: 14 },
      { label: "Thu", value: 24 },
      { label: "Fri", value: 20 },
      { label: "Sat", value: 10 },
      { label: "Sun", value: 16 },
    ],
    []
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary" className="rounded-full">
            Dashboard
          </Badge>
        </AnimatedFadeUp>

        <div>
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">
              Finance Overview
            </h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Monitor balance, currencies, activity, savings, and transactions.
            </p>
          </AnimatedTextReveal>
        </div>
      </header>
      <AnimatedFadeUp delay={0.1}>
        <BalanceHero
          hidden={balanceHidden}
          onToggleHidden={() => setBalanceHidden((prev) => !prev)}
          onMoveMoney={() => onNav?.("deposit")}
          onRequest={() => onNav?.("overview")}
          onTransfer={() => onNav?.("withdraw")}
        />
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.05fr_1.45fr_1fr]">
        <div className="flex min-w-0 flex-col gap-6">
          <AnimatedFadeUp>
            <CurrencyCard
              title="Nuance currency"
              subtitle="Last currency Today 1 USD = 16,428.5 JPY"
              selectedCurrency={selectedCurrency}
              trendData={currencyTrendData}
              liquidityData={currencyLiquidityData}
              items={currencies}
              onAddNew={() =>
                setCurrencies((prev) => {
                  const next = {
                    id: prev.length + 1,
                    code: "CAD",
                    amount: "1.36",
                    flag: "🇨🇦",
                    change: "+0.31%",
                  };
                  setSelectedCurrency(next);
                  return [...prev, next];
                })
              }
              onSelectCurrency={(item) => setSelectedCurrency(item)}
            />
          </AnimatedFadeUp>


          <AnimatedFadeUp>
            <SavingsCard onViewGoals={() => onNav?.("analytics")} />
          </AnimatedFadeUp>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <AnimatedFadeUp>
          <ActivityCard />
          </AnimatedFadeUp>
          <AnimatedFadeUp>
          <PromoCard
            onExplore={() => onNav?.("analytics")}
            onGenerate={() => onNav?.("overview")}
          />
          </AnimatedFadeUp>
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <AnimatedFadeUp>
          <TransactionsCard
            onFilter={() => onNav?.("analytics")}
            onViewAll={() => onNav?.("pools")}
            onSelectTransaction={() => onNav?.("overview")}
          />
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
};

export default FinanceDashboardPage;
