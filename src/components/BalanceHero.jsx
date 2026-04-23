import {
  Eye,
  EyeOff,
  MoveRight,
  Plus,
  ReceiptText,
  SendHorizontal,
} from "@/components/icons";
import { useRef } from "react";

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
  const visibilityIconRef = useRef(null);
  const moveMoneyIconRef = useRef(null);
  const requestIconRef = useRef(null);
  const transferIconRef = useRef(null);
  const plusIconRef = useRef(null);

  return (
    <Card>
      <CardContent className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
          <Badge variant="secondary" className="mb-3">
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
              onMouseEnter={() => visibilityIconRef.current?.startAnimation?.()}
              onMouseLeave={() => visibilityIconRef.current?.stopAnimation?.()}
              className="h-10 w-10 rounded-lg cursor-pointer"
            >
              {hidden ? (
                <Eye ref={visibilityIconRef} className="h-4 w-4" />
              ) : (
                <EyeOff ref={visibilityIconRef} className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Last transaction:{" "}
            <span className="text-foreground">
              {hidden ? "Hidden" : lastTransaction}
            </span>
          </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:max-w-136 xl:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onMoveMoney}
              onMouseEnter={() => moveMoneyIconRef.current?.startAnimation?.()}
              onMouseLeave={() => moveMoneyIconRef.current?.stopAnimation?.()}
              className="h-11 cursor-pointer rounded-lg"
            >
              <MoveRight ref={moveMoneyIconRef} className="mr-2 h-4 w-4" />
              Move Money
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onRequest}
              onMouseEnter={() => requestIconRef.current?.startAnimation?.()}
              onMouseLeave={() => requestIconRef.current?.stopAnimation?.()}
              className="h-11 cursor-pointer rounded-lg"
            >
              <ReceiptText ref={requestIconRef} className="mr-2 h-4 w-4" />
              Request
            </Button>

            <Button
              type="button"
              onClick={onTransfer}
              onMouseEnter={() => transferIconRef.current?.startAnimation?.()}
              onMouseLeave={() => transferIconRef.current?.stopAnimation?.()}
              className="h-11 cursor-pointer rounded-lg"
            >
              Transfer
              <SendHorizontal ref={transferIconRef} className="ml-2 h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onMoveMoney}
              onMouseEnter={() => plusIconRef.current?.startAnimation?.()}
              onMouseLeave={() => plusIconRef.current?.stopAnimation?.()}
              className="h-11 w-11 cursor-pointer rounded-full"
            >
              <Plus ref={plusIconRef} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceHero;
