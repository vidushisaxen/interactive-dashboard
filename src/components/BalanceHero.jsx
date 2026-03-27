import {
  Eye,
  EyeOff,
  MoveRight,
  Plus,
  ReceiptText,
  SendHorizontal,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BalanceHero = ({
  balance = "$1025.254",
  cents = ".00",
  lastTransaction = "You have earned +$205.99 from James • 2 mins ago",
  hidden = false,
  onToggleHidden,
  onMoveMoney,
  onRequest,
  onTransfer,
}) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="flex flex-col gap-8 p-6 lg:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
          <Badge variant="secondary" className="mb-3 rounded-full">
            Available Balance
          </Badge>

          <p className="mb-2 text-sm text-muted-foreground">
            This is your overview dashboard for this month
          </p>

          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
              {hidden ? "••••••••" : balance}
              {!hidden && (
                <span className="ml-1 text-2xl text-muted-foreground sm:text-3xl">
                  {cents}
                </span>
              )}
            </h1>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onToggleHidden}
              className="h-10 w-10 rounded-2xl cursor-pointer"
            >
              {hidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Last transaction:{" "}
            <span className="text-foreground">
              {hidden ? "Hidden" : lastTransaction}
            </span>
          </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:max-w-[34rem] xl:justify-end">
            <Button type="button" variant="outline" onClick={onMoveMoney} className="h-11 cursor-pointer rounded-2xl">
              <MoveRight className="mr-2 h-4 w-4" />
              Move Money
            </Button>

            <Button type="button" variant="outline" onClick={onRequest} className="h-11 cursor-pointer rounded-2xl">
              <ReceiptText className="mr-2 h-4 w-4" />
              Request
            </Button>

            <Button type="button" onClick={onTransfer} className="h-11 cursor-pointer rounded-2xl">
              Transfer
              <SendHorizontal className="ml-2 h-4 w-4" />
            </Button>

            <Button type="button" variant="outline" size="icon" onClick={onMoveMoney} className="h-11 w-11 cursor-pointer rounded-full">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceHero;
