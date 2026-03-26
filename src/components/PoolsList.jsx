"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AnimatedFadeUp, AnimatedTextReveal } from "@/lib/animations";
import { POOLS } from "./data";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";


const typeVariantMap = {
  Classic: "secondary",
  Stable: "outline",
  Weighted: "secondary",
};

const formatCurrency = (n) =>
  n >= 1e6
    ? `$${(n / 1e6).toFixed(2)}M`
    : `$${n.toLocaleString("en", { maximumFractionDigits: 1 })}`;

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

      <Card className="border-none shadow-sm">
        <CardContent className="space-y-4 px-6 py-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[1.6fr_0.9fr_0.8fr_0.7fr] items-center gap-4 rounded-2xl border border-border/50 px-4 py-4"
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
              <Skeleton className="ml-auto h-4 w-20" />
              <Skeleton className="ml-auto h-4 w-14" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function PoolPair({ pool }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-sm shadow-sm">
          {pool.token0Icon || "🟡"}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-sm shadow-sm">
          {pool.token1Icon || "💠"}
        </div>
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-medium">
          {pool.pair || `${pool.token0 || "DAI"} / ${pool.token1 || "USDC"}`}
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {pool.feeTier ? `Fee ${pool.feeTier}` : "Liquidity pool"}
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
    <section className="space-y-7">
      <header className="space-y-3">
        <AnimatedFadeUp>
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
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
              Browse liquidity pools by type, liquidity, and APR.
            </p>
          </AnimatedTextReveal>
        </div>
      </header>

      <AnimatedFadeUp delay={0.1}>
        <Card className="border-none shadow-sm">
          <CardContent className="px-6 py-4">
            <div className="overflow-hidden rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-15 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Pool
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Type
                    </TableHead>
                    <TableHead className="text-right text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Liquidity
                    </TableHead>
                    <TableHead className="text-right text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      APR
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                 {POOLS.map((pool, index) => (
  <motion.tr
    key={pool.id}
    variants={fadeUp(18, 0.45, 0.08 + index * 0.05)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    onClick={() => onSelectPool?.(pool)}
    className="cursor-pointer  transition-colors hover:bg-accent/40"
  >
    <TableCell className="py-4">
      <PoolPair pool={pool} />
    </TableCell>

    <TableCell>
      <Badge
        variant={typeVariantMap[pool.type] || "outline"}
        className="rounded-full"
      >
        {pool.type}
      </Badge>
    </TableCell>

    <TableCell className="text-right text-sm font-medium">
      {formatCurrency(pool.liquidity)}
    </TableCell>

    <TableCell className="text-right">
      <span
        className={
          pool.apr
            ? "text-sm font-semibold text-primary"
            : "text-sm text-muted-foreground"
        }
      >
        {pool.apr ? `${pool.apr}%` : "--%"}
      </span>
    </TableCell>
  </motion.tr>
))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AnimatedFadeUp>
    </section>
  );
};

export default PoolsList;
