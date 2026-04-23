import { ChevronRight, Filter } from "@/components/icons";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ExportCsvButton from "./ExportCsvButton";
import { TRANSACTION_CARD_ITEMS } from "./dashboard-data";

const TransactionRow = ({ item, positive, onSelect }) => {
  const Icon = item.icon;
  const iconRef = useRef(null);
  const chevronRef = useRef(null);

  const handleEnter = () => {
    iconRef.current?.startAnimation?.();
    chevronRef.current?.startAnimation?.();
  };

  const handleLeave = () => {
    iconRef.current?.stopAnimation?.();
    chevronRef.current?.stopAnimation?.();
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex w-full items-center gap-3 cursor-pointer rounded-lg border  border-border bg-background/50 px-4 py-3 text-left transition-colors hover:bg-accent/40"
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[color:var(--card-border)]",
          positive
            ? "bg-(--status-success-soft) text-(--status-success)"
            : "bg-primary/10 text-primary"
        )}
      >
        <Icon ref={iconRef} className="h-4.5 w-4.5" />
      </div>

      <div className="">
        <div className="truncate text-sm font-medium">{item.title}</div>
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {item.subtitle}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "text-base font-semibold",
            positive ? "text-(--status-success)" : "text-foreground"
          )}
        >
          {item.amount}
        </div>

        <ChevronRight ref={chevronRef} className="h-4 w-4 text-muted-foreground" />
      </div>
    </button>
  );
};

const TransactionsCard = ({
  title = "Recent Transactions",
  subtitle = "Your latest activity and movements",
  transactions = TRANSACTION_CARD_ITEMS,
  onFilter,
  onSelectTransaction,
  onViewAll,
}) => {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-0 flex-1 flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Transactions
            </Badge>

            <div >
              <h3 className="text-base font-semibold tracking-tight">{title}</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ExportCsvButton
              fileName="quantro_transactions"
              rows={transactions.map((item) => ({
                title: item.title,
                subtitle: item.subtitle,
                amount: item.amount,
                direction: item.positive ? "credit" : "debit",
              }))}
              className="rounded-lg"
            />

          </div>
        </div>

        <Separator />

        <div className="min-h-0 flex-1 space-y-2 overflow-auto pr-1">
          {transactions.map((item) => {
            const positive = item.positive;

            return (
              <TransactionRow
                key={item.id}
                item={item}
                positive={positive}
                onSelect={() => onSelectTransaction?.(item)}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
