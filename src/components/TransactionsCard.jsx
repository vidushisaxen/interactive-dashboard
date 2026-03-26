import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const defaultTransactions = [
  {
    id: 1,
    title: "Salary Deposit",
    subtitle: "Today • Bank Transfer",
    amount: "+$3,850.00",
    positive: true,
    icon: ArrowDownLeft,
  },
  {
    id: 2,
    title: "Apple Subscription",
    subtitle: "Today • Recurring Payment",
    amount: "-$12.99",
    positive: false,
    icon: ArrowUpRight,
  },
  {
    id: 3,
    title: "Transfer to Savings",
    subtitle: "Yesterday • Internal Move",
    amount: "-$540.00",
    positive: false,
    icon: ArrowUpRight,
  },
  {
    id: 4,
    title: "Freelance Payment",
    subtitle: "Yesterday • Incoming",
    amount: "+$920.00",
    positive: true,
    icon: ArrowDownLeft,
  },
];

const TransactionsCard = ({
  title = "Recent Transactions",
  subtitle = "Your latest activity and movements",
  transactions = defaultTransactions,
  onFilter,
  onSelectTransaction,
  onViewAll,
}) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit rounded-full">
              Transactions
            </Badge>

            <div>
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onFilter}
              className="rounded-xl cursor-pointer"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onViewAll}
              className="rounded-xl text-primary cursor-pointer"
            >
              View all
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          {transactions.map((item) => {
            const Icon = item.icon;
            const positive = item.positive;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTransaction?.(item)}
                className="flex w-full items-center gap-3 cursor-pointer rounded-2xl border border-border/60 bg-background/50 px-4 py-3 text-left transition-colors hover:bg-accent/40"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    positive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{item.title}</div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">
                    {item.subtitle}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "text-base font-semibold",
                      positive ? "text-emerald-500" : "text-foreground"
                    )}
                  >
                    {item.amount}
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
