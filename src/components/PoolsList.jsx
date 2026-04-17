"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedFadeUp, AnimatedTextReveal, fadeUp } from "@/lib/animations";
import { motion } from "motion/react";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import ExportCsvButton from "./ExportCsvButton";

import { POOLS } from "./dashboard-data";

const typeVariantMap = {
  Growth: "secondary",
  Dividend: "outline",
  Thematic: "secondary",
  Balanced: "outline",
  Quality: "secondary",
};

const formatCurrency = (n) =>
  n >= 1e6
    ? `$${(n / 1e6).toFixed(2)}M`
    : `$${n.toLocaleString("en", { maximumFractionDigits: 1 })}`;

const tickerStyleMap = {
  AAPL: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-500 text-white",
  MSFT: "bg-gradient-to-br from-sky-600 via-cyan-500 to-emerald-400 text-white",
  NVDA: "bg-gradient-to-br from-lime-500 via-green-500 to-emerald-700 text-white",
  AMD: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-700 text-white",
  KO: "bg-gradient-to-br from-red-500 via-rose-500 to-red-700 text-white",
  PG: "bg-gradient-to-br from-blue-500 via-sky-500 to-indigo-700 text-white",
  TSLA: "bg-gradient-to-br from-zinc-900 via-zinc-700 to-red-600 text-white",
  NEE: "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-700 text-white",
  V: "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 text-slate-950",
  PYPL: "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 text-white",
  LLY: "bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-700 text-white",
  UNH: "bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-700 text-white",
  CRWD: "bg-gradient-to-br from-rose-500 via-red-500 to-orange-700 text-white",
  PANW: "bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 text-slate-950",
  NKE: "bg-gradient-to-br from-stone-800 via-zinc-700 to-slate-600 text-white",
  SBUX: "bg-gradient-to-br from-emerald-500 via-green-600 to-teal-800 text-white",
  HON: "bg-gradient-to-br from-amber-500 via-orange-500 to-red-700 text-white",
  ROK: "bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-700 text-white",
  CRM: "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 text-white",
  NOW: "bg-gradient-to-br from-zinc-700 via-slate-700 to-black text-white",
  JPM: "bg-gradient-to-br from-slate-700 via-blue-800 to-slate-950 text-white",
  GS: "bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 text-white",
};

function PoolLogo({ icon }) {
  if (icon && typeof icon === "object" && icon.src) {
    return (
      <Image
        src={icon.src}
        alt={icon.alt || icon.label || "Pool logo"}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  const label = typeof icon === "string" ? icon : icon?.label || "?";
  const style = tickerStyleMap[label] || "bg-gradient-to-br from-slate-600 to-slate-800 text-white";

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[10px] font-semibold tracking-wide shadow-sm ${style}`}
    >
      {label}
    </div>
  );
}

function PoolsListSkeleton() {
  return (
    <section className="space-y-7">
      <header className="space-y-3">
        <Skeleton className="h-6 w-18 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
      </header>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 rounded-xl px-5 py-5 lg:grid-cols-5"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 -ml-4 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20 lg:ml-auto" />
            <Skeleton className="h-4 w-16 lg:ml-auto" />
            <Skeleton className="h-4 w-16 lg:ml-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}

function PoolPair({ pool }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <PoolLogo icon={pool.token0Icon} />
        <PoolLogo icon={pool.token1Icon} />
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{pool.pair}</div>
        <div className="truncate text-xs text-muted-foreground">
          {pool.feeTier}
        </div>
      </div>
    </div>
  );
}

const PoolsList = ({ onSelectPool }) => {
  const loading = useScreenSkeleton();

  if (loading) {
    return <PoolsListSkeleton />;
  }

  return (
    <section className="">
      <header className="flex justify-between">
        <div className="space-y-3">
        <AnimatedFadeUp>
        <Badge
          variant="secondary"
        >
          Pools
        </Badge>
        </AnimatedFadeUp>

        <div className="space-y-1">
          <AnimatedTextReveal>
            <h1 className="text-2xl font-semibold tracking-tight">Pools</h1>
          </AnimatedTextReveal>

          <AnimatedTextReveal delay={0.08}>
            <p className="text-sm text-muted-foreground">
              Browse curated stock pools, then open any one to see its thesis, portfolio info, and performance chart.
            </p>
          </AnimatedTextReveal>
          </div>
        </div>
         <div className="mb-3 ">
              <ExportCsvButton
                fileName="quantro_pools"
                rows={POOLS.map((pool) => ({
                  name: pool.pair,
                  type: pool.type,
                  category: pool.feeTier,
                  aum: pool.liquidity,
                  net_flow_24h: pool.volume24h,
                  ytd_return: pool.apr,
                  benchmark: pool.benchmark,
                }))}
                className="rounded-lg"
              />
            </div>
      </header>
     

      <AnimatedFadeUp delay={0.08} className="pt-3">
        <Card className=" bg-transparent shadow-none border border-border px-3">
          <CardContent className="px-0 py-0 ">
            <div className="mb-3 hidden rounded-xl bg-background/35 px-5 py-4 text-xs uppercase tracking-widest text-muted-foreground lg:grid lg:grid-cols-5">
              <span>Pool</span>
              <span>Type</span>
              <span className="text-right">AUM</span>
              <span className="text-right">24h Flow</span>
              <span className="text-right">YTD</span>
            </div>

            <div className="flex flex-col">
              {POOLS.map((pool, index) => (
                
                <React.Fragment key={pool.id}>
                <motion.div
                  variants={fadeUp(20, 0.46, 0.06 + index * 0.04)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="relative"
                >
                  <Link
                    href={`/pools/${pool.slug}`}
                    onClick={() => onSelectPool?.(pool)}
                    className="grid w-full grid-cols-1 gap-4 rounded-xl bg-card/92 px-5 py-5 text-left transition-colors hover:bg-accent/30 lg:grid-cols-5 lg:items-center"
                  >
                    <PoolPair pool={pool} />

                    <div>
                      <Badge
                        variant={typeVariantMap[pool.type] || "outline"}
                        className="rounded-full"
                      >
                        {pool.type}
                      </Badge>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                        AUM
                      </p>
                      <p className="text-sm font-medium">{formatCurrency(pool.liquidity)}</p>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                        24h Flow
                      </p>
                      <p className="text-sm font-medium">{pool.volume24h}</p>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground lg:hidden">
                        YTD
                      </p>
                      <span
                        className={
                          pool.apr
                            ? "text-sm font-semibold text-primary"
                            : "text-sm text-muted-foreground"
                        }
                      >
                        {pool.apr ? `${pool.apr}%` : "--%"}
                      </span>
                    </div>
                  </Link>
                </motion.div>
                {index < POOLS.length - 1 && <span className="w-full h-px bg-border" />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
};

export default PoolsList;
