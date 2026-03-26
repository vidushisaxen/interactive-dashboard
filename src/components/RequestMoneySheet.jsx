"use client";

import { Mail, QrCode, ReceiptText, SendHorizontal, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SidePanel from "./SidePanel";
import {
  AnimatedSlideIn,
  AnimatedTextReveal,
  AnimatedFadeUp,
} from "@/lib/animations";

const RequestMoneySheet = ({ open, onOpenChange }) => {
  const [tab, setTab] = useState("person");
  const [form, setForm] = useState({
    recipient: "@vidushi",
    amount: "120.00",
    reason: "Dinner split",
    email: "name@example.com",
    message: "Invoice #2041",
  });
  const [requestStatus, setRequestStatus] = useState("No request sent yet.");
  const amountLabel = form.amount ? `$${form.amount}` : "$0.00";

  return (
    <SidePanel
      open={open}
      onClose={() => onOpenChange(false)}
      title="Request Money"
      subtitle="Send a payment request by person, email, or QR"
      width="w-[460px]"
    >
      <div className="space-y-6">
        <AnimatedSlideIn direction="right" duration={0.55}>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/30 p-4">
            <div className="space-y-1">
              <AnimatedTextReveal y={14} blur="6px" duration={0.45}>
                <p className="text-sm font-medium">Payment request</p>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={14}
                blur="6px"
                duration={0.45}
                delay={0.05}
              >
                <p className="text-xs text-muted-foreground">
                  Choose a request method and share it instantly.
                </p>
              </AnimatedTextReveal>
            </div>

            <AnimatedFadeUp delay={0.08} duration={0.4}>
              <Badge variant="secondary" className="rounded-full">
                Fast
              </Badge>
            </AnimatedFadeUp>
          </div>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.5} delay={0.06}>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl p-1">
              <TabsTrigger value="person" className="rounded-xl">
                Person
              </TabsTrigger>
              <TabsTrigger value="email" className="rounded-xl">
                Email
              </TabsTrigger>
              <TabsTrigger value="qr" className="rounded-xl">
                QR
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="up" duration={0.4} delay={0.1}>
          <Separator />
        </AnimatedSlideIn>

        <AnimatedSlideIn direction="right" duration={0.45} delay={0.11}>
          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <p className="text-sm font-medium">Request preview</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {requestStatus}
            </p>
          </div>
        </AnimatedSlideIn>

        {tab === "person" && (
          <AnimatedSlideIn direction="right" duration={0.45} delay={0.12}>
            <div className="space-y-4">
              <Field
                icon={UserRound}
                label="Recipient"
                placeholder="@username"
                value={form.recipient}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, recipient: value }))
                }
                delay={0}
              />
              <Field
                icon={ReceiptText}
                label="Amount"
                placeholder="$0.00"
                value={form.amount}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, amount: value.replace(/[^0-9.]/g, "") }))
                }
                delay={0.04}
              />
              <Field
                icon={ReceiptText}
                label="Reason"
                placeholder="Dinner split"
                value={form.reason}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, reason: value }))
                }
                delay={0.08}
              />
            </div>
          </AnimatedSlideIn>
        )}

        {tab === "email" && (
          <AnimatedSlideIn direction="right" duration={0.45} delay={0.12}>
            <div className="space-y-4">
              <Field
                icon={Mail}
                label="Email address"
                placeholder="name@example.com"
                value={form.email}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, email: value }))
                }
                delay={0}
              />
              <Field
                icon={ReceiptText}
                label="Amount"
                placeholder="$0.00"
                value={form.amount}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, amount: value.replace(/[^0-9.]/g, "") }))
                }
                delay={0.04}
              />
              <Field
                icon={ReceiptText}
                label="Message"
                placeholder="Invoice #2041"
                value={form.message}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, message: value }))
                }
                delay={0.08}
              />
            </div>
          </AnimatedSlideIn>
        )}

        {tab === "qr" && (
          <AnimatedSlideIn direction="right" duration={0.5} delay={0.12}>
            <div className="rounded-3xl border border-dashed border-border/60 bg-background/50 p-8 text-center">
              <AnimatedFadeUp duration={0.4}>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <QrCode className="h-7 w-7" />
                </div>
              </AnimatedFadeUp>

              <AnimatedTextReveal y={12} blur="5px" duration={0.4}>
                <h3 className="text-sm font-medium">Generate a QR request</h3>
              </AnimatedTextReveal>

              <AnimatedTextReveal
                y={12}
                blur="5px"
                duration={0.4}
                delay={0.05}
              >
                <p className="mt-1 text-xs text-muted-foreground">
                  Share a scannable payment request with amount and note attached.
                </p>
              </AnimatedTextReveal>

              <AnimatedFadeUp delay={0.08} duration={0.4}>
                <Button
                  variant="outline"
                  onClick={() =>
                    setRequestStatus(
                      `QR request ready for ${amountLabel} with note "${form.reason || form.message || "Payment request"}".`
                    )
                  }
                  className="mt-4 rounded-2xl cursor-pointer"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR
                </Button>
              </AnimatedFadeUp>
            </div>
          </AnimatedSlideIn>
        )}

        <AnimatedSlideIn direction="up" duration={0.5} delay={0.18}>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-2xl cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            <Button
              type="button"
              onClick={() =>
                setRequestStatus(
                  tab === "person"
                    ? `Request sent to ${form.recipient || "@recipient"} for ${amountLabel}.`
                    : `Request email prepared for ${form.email || "recipient@example.com"} for ${amountLabel}.`
                )
              }
              className="rounded-2xl cursor-pointer"
            >
              <SendHorizontal className="mr-2 h-4 w-4" />
              Send request
            </Button>
          </div>
        </AnimatedSlideIn>
      </div>
    </SidePanel>
  );
};

const Field = ({ icon: Icon, label, placeholder, value, onChange, delay = 0 }) => (
  <AnimatedSlideIn direction="right" duration={0.4} delay={delay}>
    <div className="space-y-2">
      <AnimatedTextReveal y={10} blur="4px" duration={0.35}>
        <Label>{label}</Label>
      </AnimatedTextReveal>

      <AnimatedFadeUp delay={0.04} duration={0.35}>
        <div className="relative">
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-12 rounded-2xl pl-11"
          />
        </div>
      </AnimatedFadeUp>
    </div>
  </AnimatedSlideIn>
);

export default RequestMoneySheet;
