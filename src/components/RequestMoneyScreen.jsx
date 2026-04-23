"use client";

import { useRef, useState } from "react";
import {
  Clock3,
  Mail,
  QrCode,
  ReceiptText,
  SendHorizontal,
  UserRound,
} from "@/components/icons";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useScreenSkeleton } from "@/hooks/use-screen-skeleton";
import { REQUEST_RECENT_REQUESTS } from "./dashboard-data";

function RequestMoneySkeleton() {
  return (
    <section className="space-y-7">
      {/* HEADER */}
      <header className="space-y-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
      </header>

      {/* STATUS */}
      <div className="rounded-lg bg-muted/20 p-4 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-full max-w-2xl" />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-6">
        
        {/* LEFT: FORM BUILDER */}
        <div className="space-y-6 xl:col-span-3">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              ))}

              {/* textarea */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 xl:col-span-3">
          
          {/* METRICS */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-muted/20 p-4"
              >
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* RECENT REQUESTS */}
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-background/50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
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
    currency: "USD",
    dueDate: "",
    notes: "",
    cc: "",
    subject: "",
    attachment: "",
    expiration: "",
    location: "",
    customMessage: "",
  });
  const [requestStatus, setRequestStatus] = useState(
    "Create a request by username, email, or QR and track how quickly people respond."
  );
  const loading = useScreenSkeleton();
  const generateQrIconRef = useRef(null);
  const sendRequestIconRef = useRef(null);

  if (loading) {
    return <RequestMoneySkeleton />;
  }

  const amountLabel = form.amount ? `$${form.amount}` : "$0.00";

  return (
    <section className="space-y-7">
      <header className="space-y-2">
        <AnimatedFadeUp>
          <Badge variant="secondary">
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
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <p className="text-sm font-medium">Request status</p>
          <p className="mt-1 text-xs text-muted-foreground">{requestStatus}</p>
        </div>
      </AnimatedFadeUp>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-6 xl:items-stretch">
          <div className="space-y-6 xl:col-span-3">
          <AnimatedFadeUp delay={0.12}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Payment request builder
                </CardTitle>
                <CardDescription>
                  Choose the method that fits the way your customer or teammate
                  prefers to pay.
                </CardDescription>
              </CardHeader>

              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-6">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid h-auto w-full grid-cols-3 rounded-lg p-1 gap-2">
                    <TabsTrigger value="person" className="rounded-lg h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Person
                    </TabsTrigger>
                    <TabsTrigger value="email" className="rounded-lg h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="rounded-lg h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      QR
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {tab === "person" && (
                  <div className="space-y-4 min-h-100">
                    <Field
                      // icon={UserRound}
                      label="Recipient"
                      placeholder="@username"
                      value={form.recipient}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, recipient: value }))
                      }
                    />
                    <Field
                      // icon={ReceiptText}
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
                      // icon={ReceiptText}
                      label="Reason"
                      placeholder="March expense split"
                      value={form.reason}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, reason: value }))
                      }
                    />
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select
                        value={form.currency}
                        onValueChange={(value) =>
                          setForm((prev) => ({ ...prev, currency: value }))
                        }
                      >
                        <SelectTrigger className="h-11! rounded-lg w-full">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={form.dueDate}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, dueDate: event.target.value }))
                        }
                        className="h-12 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notes</Label>
                      <Textarea
                        placeholder="Additional notes..."
                        value={form.notes}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, notes: event.target.value }))
                        }
                        className="min-h-20 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {tab === "email" && (
                  <div className="space-y-4 min-h-100">
                    <Field
                      // icon={Mail}
                      label="Email address"
                      placeholder="billing@example.com"
                      value={form.email}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, email: value }))
                      }
                    />
                    <Field
                      // icon={ReceiptText}
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
                      // icon={SendHorizontal}
                      label="Message"
                      placeholder="Invoice #2041"
                      value={form.message}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, message: value }))
                      }
                    />
                    <Field
                      label="Subject"
                      placeholder="Payment Request"
                      value={form.subject}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, subject: value }))
                      }
                    />
                    <Field
                      label="CC"
                      placeholder="cc@example.com"
                      value={form.cc}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, cc: value }))
                      }
                    />
                  </div>
                )}

                {tab === "qr" && (
                  <div className="space-y-4 min-h-100">
                    <div className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
                        className="mt-5 rounded-lg"
                        onClick={() =>
                          setRequestStatus(
                            `QR request created for ${amountLabel} with note "${form.reason || form.message || "Payment request"}".`
                          )
                        }
                        onMouseEnter={() => generateQrIconRef.current?.startAnimation?.()}
                        onMouseLeave={() => generateQrIconRef.current?.stopAnimation?.()}
                      >
                        <QrCode ref={generateQrIconRef} className="mr-2 h-4 w-4" />
                        Generate QR request
                      </Button>
                    </div>
                    <Field
                      label="Expiration"
                      placeholder="e.g., 24 hours"
                      value={form.expiration}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, expiration: value }))
                      }
                    />
                    <Field
                      label="Location"
                      placeholder="Store location or online"
                      value={form.location}
                      onChange={(value) =>
                        setForm((prev) => ({ ...prev, location: value }))
                      }
                    />
                    <div className="space-y-2">
                      <Label>Custom Message</Label>
                      <Textarea
                        placeholder="Additional message for QR..."
                        value={form.customMessage}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, customMessage: event.target.value }))
                        }
                        className="min-h-20 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
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
                    className="rounded-lg"
                    onClick={() =>
                      setRequestStatus(
                        tab === "person"
                          ? `Request sent to ${form.recipient || "@recipient"} for ${amountLabel}.`
                          : tab === "email"
                            ? `Request email prepared for ${form.email || "recipient@example.com"} for ${amountLabel}.`
                            : `QR request published for ${amountLabel} with ready-to-scan checkout access.`
                      )
                    }
                    onMouseEnter={() => sendRequestIconRef.current?.startAnimation?.()}
                    onMouseLeave={() => sendRequestIconRef.current?.stopAnimation?.()}
                  >
                    <SendHorizontal ref={sendRequestIconRef} className="mr-2 h-4 w-4" />
                    Send request
                  </Button>
                </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>
        </div>

        <div className="space-y-6 xl:col-span-3">
          <AnimatedFadeUp delay={0.14}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Collection snapshot
                </CardTitle>
                <CardDescription>
                  Dummy finance metrics for outbound requests this week.
                </CardDescription>
              </CardHeader>

              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-3">
                  <MetricRow label="Collected this week" value="$8,942" />
                  <MetricRow label="Average payment time" value="4.2 hours" />
                  <MetricRow label="Open requests" value="12" />
                  <MetricRow label="Most effective channel" value="Email" />
                </div>
              </CardContent>
            </Card>
          </AnimatedFadeUp>

          <AnimatedFadeUp delay={0.18}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Recent requests
                </CardTitle>
                <CardDescription>
                  A few sample records to make the request workflow feel
                  complete.
                </CardDescription>
              </CardHeader>

              <CardContent className="min-h-0 flex-1 overflow-auto pr-1">
                <div className="space-y-3">
                  {REQUEST_RECENT_REQUESTS.map((item) => (
                    <div
                      key={`${item.name}-${item.method}`}
                      className="rounded-lg bg-muted/20 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.method}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold">{item.amount}</p>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />
                        <span>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
      {Icon && (
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-12 rounded-lg ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  </div>
);

const MetricRow = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-lg bg-muted/20 p-4">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

export default RequestMoneyScreen;
