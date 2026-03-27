"use client";

import { useState } from "react";
import {
  Clock3,
  Mail,
  QrCode,
  ReceiptText,
  SendHorizontal,
  UserRound,
} from "lucide-react";

import { AnimatedFadeUp } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import { REQUEST_RECENT_REQUESTS } from "./dashboard-data";

function RequestMoneySkeleton() {
  return (
    <section className="space-y-7">
      <div className="space-y-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-52" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <Skeleton className="h-24 w-full rounded-2xl" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Skeleton className="h-96 w-full rounded-2xl xl:col-span-3" />
        <div className="space-y-6 xl:col-span-2">
          <Skeleton className="h-60 w-full rounded-2xl" />
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

const RequestMoneyScreen = () => {
  const [tab, setTab] = useState("person");
  const [form, setForm] = useState({
    recipient: "@atlas-ops",
    amount: "420.00",
    reason: "March expense split",
    email: "billing@atlasretail.co",
    message: "Invoice #2041",
  });
  const [requestStatus, setRequestStatus] = useState(
    "Create a request by username, email, or QR and track how quickly people respond."
  );
  const loading = useScreenSkeleton();

  if (loading) {
    return <RequestMoneySkeleton />;
  }

  const amountLabel = form.amount ? `$${form.amount}` : "$0.00";

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary" className="rounded-full">
            Request
          </Badge>
        </AnimatedFadeUp>

        <AnimatedFadeUp delay={0.04}>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Request money with shareable flows
            </h1>
            <p className="text-sm text-muted-foreground">
              Build a complete payment request using realistic dummy finance
              content across direct, email, and QR collection paths.
            </p>
          </div>
        </AnimatedFadeUp>
      </header>

      <AnimatedFadeUp delay={0.08}>
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Request status</p>
          <p className="mt-1 text-xs text-muted-foreground">{requestStatus}</p>
        </div>
      </AnimatedFadeUp>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-3">
          <AnimatedFadeUp delay={0.12}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Payment request builder
                </CardTitle>
                <CardDescription>
                  Choose the method that fits the way your customer or teammate
                  prefers to pay.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl p-1">
                    <TabsTrigger value="person" className="rounded-lg">
                      Person
                    </TabsTrigger>
                    <TabsTrigger value="email" className="rounded-lg">
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="rounded-lg">
                      QR
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {tab === "person" && (
                  <div className="space-y-4">
                    <Field
                      icon={UserRound}
                      label="Recipient"
                      placeholder="@username"
                      value={form.recipient}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, recipient: value }))
                      }
                    />
                    <Field
                      icon={ReceiptText}
                      label="Amount"
                      placeholder="$0.00"
                      value={form.amount}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          amount: value.replace(/[^0-9.]/g, ""),
                        }))
                      }
                    />
                    <Field
                      icon={ReceiptText}
                      label="Reason"
                      placeholder="March expense split"
                      value={form.reason}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, reason: value }))
                      }
                    />
                  </div>
                )}

                {tab === "email" && (
                  <div className="space-y-4">
                    <Field
                      icon={Mail}
                      label="Email address"
                      placeholder="billing@example.com"
                      value={form.email}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, email: value }))
                      }
                    />
                    <Field
                      icon={ReceiptText}
                      label="Amount"
                      placeholder="$0.00"
                      value={form.amount}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          amount: value.replace(/[^0-9.]/g, ""),
                        }))
                      }
                    />
                    <Field
                      icon={SendHorizontal}
                      label="Message"
                      placeholder="Invoice #2041"
                      value={form.message}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, message: value }))
                      }
                    />
                  </div>
                )}

                {tab === "qr" && (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/20 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <QrCode className="h-7 w-7" />
                    </div>
                    <h3 className="text-base font-semibold">
                      Ready-to-share QR request
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generate a scannable request for {amountLabel} with a note
                      attached for point-of-sale or in-person collection.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-5 rounded-xl"
                      onClick={() =>
                        setRequestStatus(
                          `QR request created for ${amountLabel} with note "${form.reason || form.message || "Payment request"}".`
                        )
                      }
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR request
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={() =>
                      setRequestStatus(
                        "Draft saved. The request is ready to customize before sending."
                      )
                    }
                  >
                    Save draft
                  </Button>

                  <Button
                    type="button"
                    className="rounded-xl"
                    onClick={() =>
                      setRequestStatus(
                        tab === "person"
                          ? `Request sent to ${form.recipient || "@recipient"} for ${amountLabel}.`
                          : tab === "email"
                            ? `Request email prepared for ${form.email || "recipient@example.com"} for ${amountLabel}.`
                            : `QR request published for ${amountLabel} with ready-to-scan checkout access.`
                      )
                    }
                  >
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Send request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        <div className="space-y-6">
          <AnimatedFadeUp delay={0.14}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Collection snapshot
                </CardTitle>
                <CardDescription>
                  Dummy finance metrics for outbound requests this week.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <MetricRow label="Collected this week" value="$8,942" />
                <MetricRow label="Average payment time" value="4.2 hours" />
                <MetricRow label="Open requests" value="12" />
                <MetricRow label="Most effective channel" value="Email" />
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.18}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Recent requests
                </CardTitle>
                <CardDescription>
                  A few sample records to make the request workflow feel
                  complete.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {REQUEST_RECENT_REQUESTS.map((item) => (
                  <div
                    key={`${item.name}-${item.method}`}
                    className="rounded-xl border border-border/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.method}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">{item.amount}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>{item.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>
      </div>
    </section>
  );
};

const Field = ({ icon: Icon, label, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-xl pl-11"
      />
    </div>
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

export default RequestMoneyScreen;
