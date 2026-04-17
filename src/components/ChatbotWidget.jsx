"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BotMessageSquare, LoaderCircle, MessageCircle, SendHorizonal, Sparkles, X } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "quantro-chatbot-messages";
const MAX_MESSAGES = 12;

const pageHints = {
  "/overview": "Summarize the portfolio health shown on this overview screen.",
  "/analytics": "Point out the most useful analytics insights a user should look for here.",
  "/stocks": "Explain how to read the stock widgets and charts on this screen.",
  "/pools": "Help me understand the pools screen and how to compare options.",
  "/deposit": "Walk me through depositing funds safely in this dashboard.",
  "/withdraw": "What should I double-check before withdrawing from this dashboard?",
  "/transfer": "Help me complete a transfer and avoid mistakes.",
  "/request": "Help me request money and explain what the user should verify.",
  "/move-money": "Explain the difference between the move-money actions on this page.",
};

const starterMessages = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "I can help explain this dashboard, summarize what each page is for, and answer finance workflow questions based on your current screen.",
  },
];

function normalizeChatText(text) {
  if (typeof text !== "string") return "";
  // Strip emphasis markers that show up as literal "***" in the UI.
  return text.replace(/\*{2,3}/g, "").trim();
}

const panelVariants = {
  closed: {
    opacity: 0,
    y: 18,
    scale: 0.92,
    transition: {
      duration: 0.18,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const contentVariants = {
  closed: { opacity: 0, y: 8 },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const messageVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function createUserMessage(content) {
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: "user",
    content: normalizeChatText(content),
  };
}

function createAssistantMessage(content) {
  return {
    id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: "assistant",
    content: normalizeChatText(content),
  };
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return starterMessages;
  }

  const safeMessages = messages
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
    )
    .map((message) => ({ ...message, content: normalizeChatText(message.content) }))
    .slice(-MAX_MESSAGES);

  return safeMessages.length ? safeMessages : starterMessages;
}

export default function ChatbotWidget() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesRef = useRef(null);
  const toggleIconRef = useRef(null);
  const headerIconRef = useRef(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(sanitizeMessages(JSON.parse(stored)));
      }
    } catch {
      setMessages(starterMessages);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)));
  }, [messages]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isOpen) return;

    let timeoutId = null;
    const intervalId = window.setInterval(() => {
      headerIconRef.current?.startAnimation?.();
      toggleIconRef.current?.startAnimation?.();

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        headerIconRef.current?.stopAnimation?.();
        toggleIconRef.current?.stopAnimation?.();
      }, 900);
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, prefersReducedMotion]);

  useEffect(() => {
    const viewport = messagesRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']"
    );
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const suggestedPrompt = useMemo(() => {
    return pageHints[pathname] || "Help me understand what I should pay attention to on this screen.";
  }, [pathname]);

  const submitMessage = async (rawValue) => {
    const content = rawValue.trim();
    if (!content || isLoading) {
      return;
    }

    const nextUserMessage = createUserMessage(content);
    const nextMessages = [...messages, nextUserMessage].slice(-MAX_MESSAGES);

    setMessages(nextMessages);
    setInputValue("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          pathname,
          history: messages,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "The assistant could not respond right now.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        createAssistantMessage(payload.reply || "I do not have a reply yet."),
      ].slice(-MAX_MESSAGES));
    } catch (error) {
      setErrorMessage(error.message || "The assistant could not respond right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end sm:inset-x-auto sm:right-5 sm:bottom-5">
        <div className="pointer-events-auto flex w-full max-w-[24rem] flex-col items-end gap-3">
          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.section
                key="chat-panel"
                initial={prefersReducedMotion ? false : "closed"}
                animate={prefersReducedMotion ? undefined : "open"}
                exit={prefersReducedMotion ? undefined : "closed"}
                variants={panelVariants}
                style={{ originX: 1, originY: 1 }}
                className="w-full overflow-hidden rounded-2xl border border-white/12 bg-[color:color-mix(in_srgb,var(--card)_90%,black_10%)] shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                <motion.div
                  variants={contentVariants}
                  className="border-b border-white/8 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_62%)] px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Sparkles ref={headerIconRef} className="size-4 text-primary" />
                        Quantro Assistant
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ask about the current page, workflows, or dashboard metrics.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      className="bg-transparent text-muted-foreground transition-colors hover:bg-white/8 hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close assistant"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={contentVariants} className="px-4 pb-4 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="group mb-3 h-auto w-full justify-start rounded-xl border-white/10 bg-white/4 px-3 py-2 text-left text-xs text-muted-foreground text-wrap transition-colors hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
                    onClick={() => submitMessage(suggestedPrompt)}
                    disabled={isLoading}
                  >
                    <BotMessageSquare className="mt-0.5 size-3.5 shrink-0 text-primary transition-colors group-hover:text-primary-foreground" />
                    <div className="w-full overflow-hidden text-wrap">
                    {suggestedPrompt}
                    </div>
                  </Button>

                  <div ref={messagesRef}>
                    <ScrollArea className="h-72 pr-3">
                      <div className="space-y-3">
                        <AnimatePresence initial={false}>
                          {messages.map((message, index) => (
                            <motion.div
                              key={message.id}
                              custom={index}
                              initial={prefersReducedMotion ? false : "hidden"}
                              animate={prefersReducedMotion ? undefined : "visible"}
                              exit={prefersReducedMotion ? undefined : "hidden"}
                              variants={messageVariants}
                              className={cn(
                                "max-w-[88%] rounded-xl px-3 py-2 text-sm leading-6 shadow-sm transition-colors",
                                message.role === "assistant"
                                  ? "bg-white/6 text-foreground hover:bg-primary hover:text-primary-foreground"
                                  : "ml-auto bg-primary text-primary-foreground"
                              )}
                            >
                              {normalizeChatText(message.content)}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {isLoading ? (
                          <motion.div
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            className="flex max-w-[88%] items-center gap-2 rounded-xl bg-white/6 px-3 py-2 text-sm text-muted-foreground"
                          >
                            <LoaderCircle className="size-4 text-primary" />
                            Thinking...
                          </motion.div>
                        ) : null}
                      </div>
                    </ScrollArea>
                  </div>

                  {errorMessage ? (
                    <motion.p
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                    >
                      {errorMessage}
                    </motion.p>
                  ) : null}

                  <motion.form
                    variants={contentVariants}
                    className="mt-3 flex items-end gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      submitMessage(inputValue);
                    }}
                  >
                    <Input
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      placeholder="Ask about this screen"
                      className="h-11 rounded-xl border-white/10 bg-white/5 px-3 text-sm"
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      size="icon-sm"
                      className="shrink-0 shadow-lg shadow-primary/20"
                      disabled={isLoading || !inputValue.trim()}
                      aria-label="Send message"
                    >
                      <SendHorizonal className="size-4" />
                    </Button>
                  </motion.form>
                </motion.div>
              </motion.section>
            ) : null}
          </AnimatePresence>

          <motion.div
            animate={
              prefersReducedMotion || isOpen
                ? { y: 0 }
                : { y: [0, -8, 0] }
            }
            transition={
              prefersReducedMotion || isOpen
                ? { duration: 0 }
                : { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            }
            className="relative"
          >
            {!isOpen ? (
              <span className="pointer-events-none absolute -inset-2 rounded-full bg-primary/15 blur-xl animate-pulse" />
            ) : null}
            <Button
              type="button"
              size="icon-lg"
              className="relative shadow-[0_18px_38px_rgba(255,102,0,0.35)]"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Hide assistant" : "Open assistant"}
            >
              <MessageCircle ref={toggleIconRef} className="size-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
