import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CandlestickChart,
  CircleHelp,
  CreditCard,
  Globe,
  Landmark,
  LayoutGrid,
  Lock,
  MessageSquareText,
  MoonStar,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  Wallet,
  WalletCards,
  BookOpen,
  FileText,
  ArrowRightLeft,
  HandCoins,
  Send,
} from "lucide-react";

// Theme tokens and shared chart colors
export const T = {
  bg: "var(--background)", surface: "var(--card)", surfaceAlt: "var(--secondary)",
  border: "var(--border)", accent: "var(--chart-1)", accentDim: "var(--border-soft-primary)",
  danger: "var(--destructive)", text: "var(--foreground)", textMuted: "var(--muted-foreground)", textDim: "var(--chart-series-muted)",
};

// Dashboard home content
export const DASHBOARD_QUICK_ACCESS_CARDS = [
  { id: "overview", title: "Overview", subtitle: "Balance, cash flow, and recent activity", target: "/", nav: null, icon: Wallet },
  { id: "insights", title: "Insights", subtitle: "Spending, budget, and trend analysis", target: "/analytics", nav: "analytics", icon: BarChart3 },
  { id: "stocks", title: "Stocks", subtitle: "Watchlist, signals, and performance", target: "/stocks", nav: "stocks", icon: TrendingUp },
  { id: "accounts", title: "Accounts", subtitle: "Balances and recent account activity", target: "/pools", nav: "pools", icon: Landmark },
  { id: "portfolio", title: "Portfolio", subtitle: "Holdings and allocation breakdown", target: "/overview", nav: "overview", icon: BriefcaseBusiness },
];

export const DASHBOARD_METRIC_CARDS = [
  { label: "Net Worth", value: "$84,560.42", change: "+6.8%", note: "vs last month" },
  { label: "Monthly Cash Flow", value: "+$3,280.18", change: "+12.4%", note: "income minus expenses" },
  { label: "Budget Used", value: "71%", change: "-4.1%", note: "$1,180 left this month" },
  { label: "Invested Assets", value: "$38,940.00", change: "+9.7%", note: "portfolio + watchlist signals" },
];

export const DASHBOARD_ACCOUNT_DATA = [
  { id: 1, name: "Everyday Checking", institution: "Chase", balance: "$12,480.12", change: "+$820 this week" },
  { id: 2, name: "High-Yield Savings", institution: "Marcus", balance: "$18,240.00", change: "+$160 interest" },
  { id: 3, name: "Travel Card", institution: "Amex", balance: "$1,284.90", change: "Due in 5 days" },
  { id: 4, name: "Brokerage Cash", institution: "Fidelity", balance: "$6,120.35", change: "+$430 transfer" },
];

export const DASHBOARD_STOCK_WATCHLIST = [
  { id: 1, ticker: "NVDA", company: "NVIDIA", price: "$932.80", move: "+4.8%", signal: "Momentum buy" },
  { id: 2, ticker: "MSFT", company: "Microsoft", price: "$428.14", move: "+1.9%", signal: "Holding strong" },
  { id: 3, ticker: "AAPL", company: "Apple", price: "$212.60", move: "-0.8%", signal: "Range-bound" },
  { id: 4, ticker: "TSLA", company: "Tesla", price: "$174.22", move: "+2.3%", signal: "Volatile rebound" },
];

export const DASHBOARD_HOLDINGS = [
  { id: 1, name: "US Equities", allocation: "42%", value: "$16,355", detail: "Growth and core index funds" },
  { id: 2, name: "Retirement", allocation: "28%", value: "$10,902", detail: "401(k) and IRA positions" },
  { id: 3, name: "Cash & Savings", allocation: "18%", value: "$7,004", detail: "Emergency and short-term goals" },
  { id: 4, name: "Alternatives", allocation: "12%", value: "$4,679", detail: "Crypto and thematic exposure" },
];

export const DASHBOARD_ALERTS = [
  { id: 1, title: "Budget alert", description: "Dining is 18% above your weekly budget.", severity: "warning" },
  { id: 2, title: "Price movement", description: "NVDA moved +4.8% and triggered your watchlist alert.", severity: "success" },
  // { id: 3, title: "Subscription reminder", description: "3 recurring payments renew in the next 7 days.", severity: "neutral" },
];

export const DASHBOARD_TRANSACTIONS = [
  { id: 1, title: "Salary Deposit", subtitle: "Today • Payroll", amount: "+$3,850.00", positive: true, icon: ArrowDownLeft },
  { id: 2, title: "Apple Subscription", subtitle: "Today • Entertainment", amount: "-$12.99", positive: false, icon: ArrowUpRight },
  { id: 3, title: "Transfer to Savings", subtitle: "Yesterday • Goal contribution", amount: "-$540.00", positive: false, icon: ArrowUpRight },
  { id: 4, title: "Freelance Payment", subtitle: "Yesterday • Incoming", amount: "+$920.00", positive: true, icon: ArrowDownLeft },
];

export const TRANSACTION_CARD_ITEMS = [
  { id: 1, title: "Salary Deposit", subtitle: "Today • Bank Transfer", amount: "+$3,850.00", positive: true, icon: ArrowDownLeft },
  { id: 2, title: "Apple Subscription", subtitle: "Today • Recurring Payment", amount: "-$12.99", positive: false, icon: ArrowUpRight },
  { id: 3, title: "Transfer to Savings", subtitle: "Yesterday • Internal Move", amount: "-$540.00", positive: false, icon: ArrowUpRight },
  { id: 4, title: "Freelance Payment", subtitle: "Yesterday • Incoming", amount: "+$920.00", positive: true, icon: ArrowDownLeft },
  { id: 5, title: "Agency Payment", subtitle: "Yesterday • Recurring Payment", amount: "+$1020.00", positive: false, icon: ArrowDownLeft },
];

export const ACTIVITY_METRICS = {
  income: { label: "Income", value: "$4,826.20", change: "+12.4%", dataset: "Liquidity" },
  expenses: { label: "Expenses", value: "$2,194.80", change: "+3.1%", dataset: "Volume" },
  savings: { label: "Savings", value: "$1,205.44", change: "+8.7%", dataset: "ETH" },
};

export const ACTIVITY_RANGES = ["7 Days", "30 Days", "90 Days"];

// Pool and liquidity flow content
export const POOL_STAT_META = {
  Liquidity: { value: "24,828", sub: "Liquidity", change: "▲ 4.86%" },
  Volume: { value: "25,010", sub: "Volume", change: "▲ 3.21%" },
  ETH: { value: "5.84", sub: "ETH", change: "▲ 1.18%" },
  GEH: { value: "0.172", sub: "GEH", change: "▼ 0.84%" },
};

export const DEPOSIT_STEP_CONTENT = [
  { step: 1, title: "Initialize deposit", description: "Start by selecting your token amounts and previewing the estimated pool position.", progress: 25, multiplier: 0.4 },
  { step: 2, title: "Increase contribution", description: "As you move forward, your simulated liquidity allocation grows across the pool.", progress: 50, multiplier: 0.65 },
  { step: 3, title: "Optimize position", description: "Your pool share becomes stronger and the projected bar distribution increases.", progress: 75, multiplier: 0.85 },
  { step: 4, title: "Ready to confirm", description: "Final review step before submitting the liquidity deposit into the pool.", progress: 100, multiplier: 1 },
];

export const WITHDRAW_STEP_CONTENT = [
  { step: 1, title: "Preview withdrawal", description: "Start by selecting how much liquidity you want to remove from the pool and preview the expected token output.", summary: "Low withdrawal impact. Most of your position remains active in the pool." },
  { step: 2, title: "Review token output", description: "Your ETH and cBNB withdrawal amounts become more meaningful as the selected percentage increases.", summary: "Balanced reduction. Your position starts decreasing at a moderate pace." },
  { step: 3, title: "Confirm pool impact", description: "This withdrawal level noticeably reduces your liquidity position and future fee exposure.", summary: "High withdrawal impact. Pool ownership and remaining balance reduce significantly." },
  { step: 4, title: "Ready to withdraw", description: "You are removing most of the position. Review remaining pool share, rewards, and output before final confirmation.", summary: "Maximum withdrawal range. Most of the liquidity position will be removed." },
];

export const MOVE_MONEY_ACCOUNTS = [
  { id: "main", icon: Landmark, title: "Main Balance", amount: "$10,254.00", description: "Daily operating cash and card spend" },
  { id: "vault", icon: WalletCards, title: "Savings Vault", amount: "$8,420.00", description: "Emergency and quarterly tax reserve" },
  { id: "payroll", icon: Sparkles, title: "Growth Wallet", amount: "$4,980.00", description: "Marketing, experiments, and launch budget" },
];

export const MOVE_MONEY_ACTIVITY_FEED = [
  { label: "Payroll reserve top-up", meta: "Main Balance to Savings Vault", amount: "$1,200.00", time: "Today, 11:10 AM" },
  { label: "Vendor float allocation", meta: "Growth Wallet to Main Balance", amount: "$320.00", time: "Yesterday, 4:25 PM" },
  { label: "Campaign budget move", meta: "Main Balance to Growth Wallet", amount: "$850.00", time: "Mar 26, 9:05 AM" },
];

export const TRANSFER_TYPES = [
  { id: "personal", icon: UserRound, title: "Personal transfer", description: "Pay a teammate, friend, or contractor instantly." },
  { id: "bank", icon: Building2, title: "Bank transfer", description: "Send money to an external account with same-day delivery." },
];

export const TRANSFER_BENEFICIARIES = [
  { name: "Maya Chen", type: "Personal", arrival: "Instant", amount: "$860.00" },
  { name: "Northwind Supply", type: "Bank", arrival: "Same day", amount: "$2,450.00" },
  { name: "Studio Walnut", type: "Personal", arrival: "Instant", amount: "$310.00" },
];

export const REQUEST_RECENT_REQUESTS = [
  { name: "Atlas Retail", method: "Invoice email", amount: "$4,200.00", status: "Viewed 32 mins ago" },
  { name: "Lena Howard", method: "Direct username", amount: "$120.00", status: "Paid yesterday" },
  { name: "In-store QR", method: "Counter code", amount: "$86.40", status: "Awaiting scan" },
];

export const SETTINGS_GROUPS = [
  {
    title: "Preferences",
    items: [
      { icon: MoonStar, label: "Appearance", key: "appearance", kind: "toggle" },
      { icon: Globe, label: "Language", key: "language", kind: "choice" },
      { icon: Bell, label: "Notifications", key: "notifications", kind: "toggle" },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: Lock, label: "Password", key: "password", kind: "choice" },
      { icon: ShieldCheck, label: "2FA", key: "twoFactor", kind: "toggle" },
      { icon: CreditCard, label: "Payment Methods", key: "payments", kind: "choice" },
    ],
  },
];

export const SETTINGS_CHOICE_OPTIONS = {
  language: ["English", "Spanish", "French"],
  password: ["Updated 14 days ago", "Reset available", "Needs review"],
  payments: ["3 linked", "4 linked", "1 primary card"],
};

// Stocks screen content and live chart config
export const STOCK_MARKET_HIGHLIGHTS = [
  { label: "Market mood", value: "Risk-on" },
  { label: "Best performer", value: "NVDA +8.4%" },
  { label: "Momentum", value: "High volume breakout" },
];

export const STOCK_RANGE_COPY = {
  "1D": "Intraday snapshots with hourly movement across the session.",
  "1W": "Weekly movement showing short-term rotation between leaders.",
  "1Y": "Twelve months of steady growth with periodic pullbacks.",
  "3Y": "Multi-year growth with broader market cycles included.",
  "5Y": "Long-term compound growth showing the strongest winners over time.",
};

export const STOCK_INSIGHT_CARDS = [
  { title: "Why it moved", body: "Tech leaders are showing stronger relative strength as capital rotates into high-growth names." },
  { title: "Risk note", body: "Short ranges can swing quickly, so daily moves are noisier than 1Y or 5Y trends." },
  { title: "Quantro view", body: "Use 1D and 1W to spot momentum, then confirm conviction on 1Y, 3Y, and 5Y." },
];

export const STOCK_SERIES = [
  { key: "nvda", label: "NVDA", name: "NVIDIA", base: 932, stroke: "var(--chart-1)", drift: 0.55, volatility: 2.6 },
  { key: "aapl", label: "AAPL", name: "Apple", base: 212, stroke: "var(--chart-2)", drift: 0.32, volatility: 1.4 },
  { key: "msft", label: "MSFT", name: "Microsoft", base: 428, stroke: "var(--chart-3)", drift: 0.44, volatility: 1.9 },
  { key: "tsla", label: "TSLA", name: "Tesla", base: 174, stroke: "var(--chart-4)", drift: 0.16, volatility: 3.4 },
];

const stockRange = (start, count, formatter) =>
  Array.from({ length: count }, (_, index) => formatter(start, index));

export const STOCK_RANGE_CONFIG = {
  "1D": {
    labels: stockRange(9, 28, (_, index) => {
      const totalMinutes = 30 + index * 15;
      const hours = Math.floor(totalMinutes / 60) + 9;
      const minutes = totalMinutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }),
    driftScale: 0.35,
    volatilityScale: 1,
    liveTail: 8,
  },
  "1W": {
    labels: ["Mon 09", "Mon 13", "Mon 16", "Tue 09", "Tue 13", "Tue 16", "Wed 09", "Wed 13", "Wed 16", "Thu 09", "Thu 13", "Thu 16", "Fri 09", "Fri 13", "Fri 16", "Sat 11", "Sat 15", "Sun 11", "Sun 15", "Sun 19"],
    driftScale: 0.55,
    volatilityScale: 1.15,
    liveTail: 6,
  },
  "1Y": {
    labels: [
      "Jan W1", "Jan W2", "Jan W3", "Jan W4", "Feb W1", "Feb W2", "Feb W3", "Feb W4", "Mar W1", "Mar W2", "Mar W3", "Mar W4",
      "Apr W1", "Apr W2", "Apr W3", "Apr W4", "May W1", "May W2", "May W3", "May W4", "Jun W1", "Jun W2", "Jun W3", "Jun W4",
      "Jul W1", "Jul W2", "Jul W3", "Jul W4", "Aug W1", "Aug W2", "Aug W3", "Aug W4", "Sep W1", "Sep W2", "Sep W3", "Sep W4",
      "Oct W1", "Oct W2", "Oct W3", "Oct W4", "Nov W1", "Nov W2", "Nov W3", "Nov W4", "Dec W1", "Dec W2", "Dec W3", "Dec W4",
    ],
    driftScale: 0.9,
    volatilityScale: 1.3,
    liveTail: 5,
  },
  "3Y": {
    labels: stockRange(2023, 36, (start, index) => {
      const year = start + Math.floor(index / 12);
      const month = (index % 12) + 1;
      return `${year}-${String(month).padStart(2, "0")}`;
    }),
    driftScale: 1.2,
    volatilityScale: 1.45,
    liveTail: 4,
  },
  "5Y": {
    labels: stockRange(2021, 60, (start, index) => {
      const year = start + Math.floor(index / 12);
      const month = (index % 12) + 1;
      return `${year}-${String(month).padStart(2, "0")}`;
    }),
    driftScale: 1.55,
    volatilityScale: 1.65,
    liveTail: 4,
  },
};

// Shell, profile, notifications, and support content
export const NOTIFICATION_ITEMS = [
  { id: 1, icon: Wallet, title: "Salary credited", text: "$3,850.00 received into your main balance", time: "2 mins ago", unread: true },
  { id: 2, icon: CreditCard, title: "Card charged", text: "Apple subscription payment of $12.99 completed", time: "20 mins ago", unread: true },
  { id: 3, icon: TrendingUp, title: "Savings goal updated", text: "Your emergency fund is now 82% complete", time: "1 hour ago", unread: false },
  { id: 4, icon: Bell, title: "Monthly report ready", text: "Your spending breakdown for this month is available", time: "3 hours ago", unread: false },
];

export const HELP_ITEMS = [
  { icon: CircleHelp, title: "Help Center", text: "Browse common questions and answers", action: "Open", tone: "default" },
  { icon: MessageSquareText, title: "Live Chat", text: "Chat with support in real time", action: "Start", tone: "primary" },
  { icon: PhoneCall, title: "Call Support", text: "Talk to a specialist for urgent issues", action: "Call", tone: "default" },
  { icon: FileText, title: "Report an Issue", text: "Share a bug or account problem", action: "Report", tone: "default" },
  { icon: BookOpen, title: "Documentation", text: "Read product and feature guides", action: "View", tone: "default" },
];

export const SIDEBAR_PRIMARY_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, href: "/" },
  { label: "Insights", icon: BarChart3, href: "/analytics" },
  { label: "Stocks", icon: CandlestickChart, href: "/stocks" },
  { label: "Accounts", icon: Landmark, href: "/pools" },
  { label: "Portfolio", icon: BriefcaseBusiness, href: "/overview" },
  { label: "Add Funds", icon: ArrowDownToLine, href: "/deposit" },
  { label: "Cash Out", icon: ArrowUpFromLine, href: "/withdraw" },
  { label: "Move Money", icon: ArrowRightLeft, href: "/move-money" },
  { label: "Request Money", icon: HandCoins, href: "/request" },
  { label: "Transfer Money", icon: Send, href: "/transfer" },
];

export const SEARCH_TERMS = [
  "salary deposit", "apple subscription", "transfer to savings", "freelance payment", "goal savings", "currency trend",
  "market activity", "stocks", "nvidia", "apple", "microsoft", "tesla", "move money", "request money", "accounts",
  "portfolio", "analytics", "liquidity", "expenses", "income",
];

export const PROFILE_ACTIONS = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "wallet", label: "Connected Accounts", icon: Wallet },
  { id: "security", label: "Security", icon: ShieldCheck },
];

export const PROFILE_ACTION_DETAILS = {
  profile: "Profile details are ready to edit.",
  wallet: "Two connected accounts are synced to this workspace.",
  security: "2FA and security checks are currently active.",
};
// Reusable chart datasets and visual primitives
export const POOLS = [
  {
    id: 1,
    slug: "magnificent-seven-core",
    pair: "Magnificent Seven Core",
    token0Icon: "AAPL",
    token1Icon: "MSFT",
    type: "Growth",
    feeTier: "Tech Leaders",
    liquidity: 126400000,
    apr: 28.4,
    volume24h: "$8.4M",
    description:
      "A concentrated large-cap pool built around the highest-conviction US technology leaders.",
    paragraph:
      "This pool is designed for users who want broad exposure to mega-cap innovation with a strong emphasis on cash-generative names and AI beneficiaries.",
    benchmark: "NASDAQ 100",
    riskLevel: "Moderate",
    manager: "Quantro Equity Desk",
    rebalance: "Monthly",
    strategy: "Momentum + quality",
    topHoldings: ["Apple", "Microsoft", "NVIDIA", "Amazon"],
    statsByRange: {
      "1H": { aum: "$126.4M", flow: "$210K", return: "+0.18%", drawdown: "-0.12%" },
      "4H": { aum: "$126.9M", flow: "$640K", return: "+0.42%", drawdown: "-0.28%" },
      "1D": { aum: "$127.8M", flow: "$1.8M", return: "+0.94%", drawdown: "-0.55%" },
      "1W": { aum: "$129.5M", flow: "$5.7M", return: "+2.76%", drawdown: "-1.12%" },
      "1M": { aum: "$132.2M", flow: "$11.1M", return: "+6.48%", drawdown: "-2.84%" },
      "6M": { aum: "$138.6M", flow: "$31.4M", return: "+18.22%", drawdown: "-5.72%" },
    },
    chartScale: { aum: 1.42, flow: 0.31, price: 56, yield: 2.6 },
  },
  {
    id: 2,
    slug: "ai-infrastructure",
    pair: "AI Infrastructure",
    token0Icon: "NVDA",
    token1Icon: "AMD",
    type: "Growth",
    feeTier: "Semiconductor",
    liquidity: 84200000,
    apr: 34.9,
    volume24h: "$6.2M",
    description:
      "A high-beta stock pool focused on compute, networking, and data-center demand tied to AI adoption.",
    paragraph:
      "This pool leans into chipmakers and infrastructure suppliers that benefit from enterprise and hyperscaler spending cycles.",
    benchmark: "PHLX Semiconductor",
    riskLevel: "High",
    manager: "Quantro Thematic Team",
    rebalance: "Bi-weekly",
    strategy: "Thematic growth",
    topHoldings: ["NVIDIA", "AMD", "Broadcom", "TSMC"],
    statsByRange: {
      "1H": { aum: "$84.2M", flow: "$180K", return: "+0.26%", drawdown: "-0.18%" },
      "4H": { aum: "$84.7M", flow: "$520K", return: "+0.58%", drawdown: "-0.42%" },
      "1D": { aum: "$85.9M", flow: "$1.5M", return: "+1.12%", drawdown: "-0.91%" },
      "1W": { aum: "$87.6M", flow: "$4.8M", return: "+3.91%", drawdown: "-1.84%" },
      "1M": { aum: "$91.5M", flow: "$9.9M", return: "+9.34%", drawdown: "-4.37%" },
      "6M": { aum: "$97.8M", flow: "$24.7M", return: "+24.68%", drawdown: "-8.42%" },
    },
    chartScale: { aum: 1.12, flow: 0.38, price: 72, yield: 3.2 },
  },
  {
    id: 3,
    slug: "dividend-defenders",
    pair: "Dividend Defenders",
    token0Icon: "KO",
    token1Icon: "PG",
    type: "Dividend",
    feeTier: "Defensive",
    liquidity: 69300000,
    apr: 12.8,
    volume24h: "$2.1M",
    description:
      "A lower-volatility pool built around dependable dividend names in staples, healthcare, and industrials.",
    paragraph:
      "The goal is to preserve capital better during market pullbacks while still compounding through income and selective growth.",
    benchmark: "S&P 500 Value",
    riskLevel: "Low",
    manager: "Quantro Income Desk",
    rebalance: "Quarterly",
    strategy: "Dividend quality",
    topHoldings: ["Coca-Cola", "Procter & Gamble", "Johnson & Johnson", "PepsiCo"],
    statsByRange: {
      "1H": { aum: "$69.3M", flow: "$72K", return: "+0.05%", drawdown: "-0.04%" },
      "4H": { aum: "$69.4M", flow: "$210K", return: "+0.12%", drawdown: "-0.10%" },
      "1D": { aum: "$69.8M", flow: "$640K", return: "+0.31%", drawdown: "-0.24%" },
      "1W": { aum: "$70.4M", flow: "$1.9M", return: "+0.88%", drawdown: "-0.63%" },
      "1M": { aum: "$71.5M", flow: "$4.3M", return: "+2.44%", drawdown: "-1.58%" },
      "6M": { aum: "$73.9M", flow: "$8.8M", return: "+7.26%", drawdown: "-3.11%" },
    },
    chartScale: { aum: 0.94, flow: 0.14, price: 34, yield: 1.4 },
  },
  {
    id: 4,
    slug: "clean-energy-transition",
    pair: "Clean Energy Transition",
    token0Icon: "TSLA",
    token1Icon: "NEE",
    type: "Thematic",
    feeTier: "Energy",
    liquidity: 51200000,
    apr: 21.2,
    volume24h: "$3.3M",
    description:
      "A blended exposure pool across electrification, utilities, battery supply chains, and renewable infrastructure.",
    paragraph:
      "This pool balances disruptive growth names with steadier operators participating in the long-term energy transition.",
    benchmark: "S&P Global Clean Energy",
    riskLevel: "Moderate",
    manager: "Quantro Sustainability Desk",
    rebalance: "Monthly",
    strategy: "Secular transition",
    topHoldings: ["Tesla", "NextEra Energy", "First Solar", "Enphase"],
    statsByRange: {
      "1H": { aum: "$51.2M", flow: "$94K", return: "+0.09%", drawdown: "-0.08%" },
      "4H": { aum: "$51.4M", flow: "$280K", return: "+0.24%", drawdown: "-0.19%" },
      "1D": { aum: "$51.9M", flow: "$780K", return: "+0.62%", drawdown: "-0.48%" },
      "1W": { aum: "$52.8M", flow: "$2.3M", return: "+1.94%", drawdown: "-1.22%" },
      "1M": { aum: "$54.1M", flow: "$5.9M", return: "+5.16%", drawdown: "-3.27%" },
      "6M": { aum: "$57.8M", flow: "$14.6M", return: "+13.42%", drawdown: "-6.74%" },
    },
    chartScale: { aum: 0.76, flow: 0.22, price: 41, yield: 2.1 },
  },
  {
    id: 5,
    slug: "global-fintech",
    pair: "Global Fintech",
    token0Icon: "V",
    token1Icon: "PYPL",
    type: "Balanced",
    feeTier: "Payments",
    liquidity: 44100000,
    apr: 16.7,
    volume24h: "$1.7M",
    description:
      "A payments and financial software pool spanning card networks, digital wallets, and infrastructure providers.",
    paragraph:
      "The basket aims to capture durable transaction growth with a mix of mature compounders and undervalued platform names.",
    benchmark: "MSCI World Financials",
    riskLevel: "Moderate",
    manager: "Quantro Fintech Research",
    rebalance: "Monthly",
    strategy: "Compounders + turnaround",
    topHoldings: ["Visa", "PayPal", "Mastercard", "Adyen"],
    statsByRange: {
      "1H": { aum: "$44.1M", flow: "$51K", return: "+0.07%", drawdown: "-0.06%" },
      "4H": { aum: "$44.2M", flow: "$160K", return: "+0.19%", drawdown: "-0.15%" },
      "1D": { aum: "$44.5M", flow: "$510K", return: "+0.47%", drawdown: "-0.36%" },
      "1W": { aum: "$45.0M", flow: "$1.4M", return: "+1.28%", drawdown: "-0.92%" },
      "1M": { aum: "$45.9M", flow: "$3.8M", return: "+3.67%", drawdown: "-2.16%" },
      "6M": { aum: "$47.7M", flow: "$8.2M", return: "+9.85%", drawdown: "-4.24%" },
    },
    chartScale: { aum: 0.63, flow: 0.18, price: 29, yield: 1.8 },
  },
  {
    id: 6,
    slug: "healthcare-innovators",
    pair: "Healthcare Innovators",
    token0Icon: "LLY",
    token1Icon: "UNH",
    type: "Quality",
    feeTier: "Healthcare",
    liquidity: 58700000,
    apr: 19.6,
    volume24h: "$2.8M",
    description:
      "A healthcare pool mixing pharmaceutical leaders, managed care, and medical technology franchises.",
    paragraph:
      "The focus is on earnings resilience, pricing power, and innovation pipelines that can outperform across cycles.",
    benchmark: "S&P 500 Health Care",
    riskLevel: "Moderate",
    manager: "Quantro Sector Rotation",
    rebalance: "Monthly",
    strategy: "Quality defensives",
    topHoldings: ["Eli Lilly", "UnitedHealth", "AbbVie", "Intuitive Surgical"],
    statsByRange: {
      "1H": { aum: "$58.7M", flow: "$88K", return: "+0.11%", drawdown: "-0.07%" },
      "4H": { aum: "$58.9M", flow: "$250K", return: "+0.23%", drawdown: "-0.18%" },
      "1D": { aum: "$59.3M", flow: "$690K", return: "+0.51%", drawdown: "-0.41%" },
      "1W": { aum: "$60.1M", flow: "$2.1M", return: "+1.62%", drawdown: "-1.04%" },
      "1M": { aum: "$61.4M", flow: "$4.9M", return: "+4.41%", drawdown: "-2.63%" },
      "6M": { aum: "$64.2M", flow: "$11.7M", return: "+11.93%", drawdown: "-4.98%" },
    },
    chartScale: { aum: 0.88, flow: 0.2, price: 37, yield: 2.0 },
  },
  {
    id: 7,
    slug: "cybersecurity-command",
    pair: "Cybersecurity Command",
    token0Icon: "CRWD",
    token1Icon: "PANW",
    type: "Growth",
    feeTier: "Security Software",
    liquidity: 47600000,
    apr: 22.4,
    volume24h: "$2.9M",
    description:
      "A software-focused pool built around endpoint, network, identity, and cloud security leaders.",
    paragraph:
      "The strategy targets durable enterprise spending categories where security budgets remain resilient even when broader IT demand softens.",
    benchmark: "NYSE FactSet Cybersecurity",
    riskLevel: "Moderate",
    manager: "Quantro Security Themes",
    rebalance: "Monthly",
    strategy: "Secular software growth",
    topHoldings: ["CrowdStrike", "Palo Alto Networks", "Zscaler", "Okta"],
    statsByRange: {
      "1H": { aum: "$47.6M", flow: "$66K", return: "+0.12%", drawdown: "-0.09%" },
      "4H": { aum: "$47.8M", flow: "$230K", return: "+0.31%", drawdown: "-0.22%" },
      "1D": { aum: "$48.2M", flow: "$740K", return: "+0.74%", drawdown: "-0.53%" },
      "1W": { aum: "$49.1M", flow: "$2.2M", return: "+2.08%", drawdown: "-1.37%" },
      "1M": { aum: "$50.5M", flow: "$5.4M", return: "+5.82%", drawdown: "-3.26%" },
      "6M": { aum: "$53.4M", flow: "$12.8M", return: "+15.47%", drawdown: "-6.13%" },
    },
    chartScale: { aum: 0.71, flow: 0.24, price: 45, yield: 2.2 },
  },
  {
    id: 8,
    slug: "consumer-brands-premium",
    pair: "Consumer Brands Premium",
    token0Icon: "NKE",
    token1Icon: "SBUX",
    type: "Balanced",
    feeTier: "Consumer",
    liquidity: 38800000,
    apr: 14.3,
    volume24h: "$1.3M",
    description:
      "A global consumer pool built around premium brands, discretionary leaders, and repeat-purchase franchises.",
    paragraph:
      "This basket aims to combine brand pricing power with long-duration global demand across apparel, beverages, and lifestyle categories.",
    benchmark: "MSCI World Consumer Discretionary",
    riskLevel: "Moderate",
    manager: "Quantro Consumer Desk",
    rebalance: "Quarterly",
    strategy: "Brand compounders",
    topHoldings: ["Nike", "Starbucks", "Lululemon", "McDonald's"],
    statsByRange: {
      "1H": { aum: "$38.8M", flow: "$39K", return: "+0.06%", drawdown: "-0.05%" },
      "4H": { aum: "$38.9M", flow: "$120K", return: "+0.18%", drawdown: "-0.13%" },
      "1D": { aum: "$39.2M", flow: "$410K", return: "+0.39%", drawdown: "-0.29%" },
      "1W": { aum: "$39.7M", flow: "$1.1M", return: "+1.11%", drawdown: "-0.81%" },
      "1M": { aum: "$40.5M", flow: "$2.9M", return: "+3.18%", drawdown: "-1.94%" },
      "6M": { aum: "$42.1M", flow: "$6.3M", return: "+8.64%", drawdown: "-3.88%" },
    },
    chartScale: { aum: 0.57, flow: 0.16, price: 27, yield: 1.7 },
  },
  {
    id: 9,
    slug: "industrial-automation",
    pair: "Industrial Automation",
    token0Icon: "HON",
    token1Icon: "ROK",
    type: "Quality",
    feeTier: "Industrials",
    liquidity: 53400000,
    apr: 17.8,
    volume24h: "$2.0M",
    description:
      "A precision industrial pool centered on automation, controls, aerospace systems, and smart manufacturing.",
    paragraph:
      "The portfolio is built for investors who want exposure to factory modernization, efficiency upgrades, and mission-critical industrial software.",
    benchmark: "S&P 500 Industrials",
    riskLevel: "Moderate",
    manager: "Quantro Industrial Research",
    rebalance: "Monthly",
    strategy: "Quality cyclicals",
    topHoldings: ["Honeywell", "Rockwell Automation", "Emerson", "GE Aerospace"],
    statsByRange: {
      "1H": { aum: "$53.4M", flow: "$58K", return: "+0.08%", drawdown: "-0.06%" },
      "4H": { aum: "$53.6M", flow: "$170K", return: "+0.21%", drawdown: "-0.16%" },
      "1D": { aum: "$54.0M", flow: "$530K", return: "+0.48%", drawdown: "-0.34%" },
      "1W": { aum: "$54.8M", flow: "$1.7M", return: "+1.43%", drawdown: "-0.96%" },
      "1M": { aum: "$56.0M", flow: "$4.2M", return: "+4.08%", drawdown: "-2.33%" },
      "6M": { aum: "$58.7M", flow: "$9.4M", return: "+10.91%", drawdown: "-4.61%" },
    },
    chartScale: { aum: 0.81, flow: 0.19, price: 33, yield: 1.95 },
  },
  {
    id: 10,
    slug: "cloud-software-leaders",
    pair: "Cloud Software Leaders",
    token0Icon: "CRM",
    token1Icon: "NOW",
    type: "Growth",
    feeTier: "Enterprise SaaS",
    liquidity: 61800000,
    apr: 26.1,
    volume24h: "$3.6M",
    description:
      "A large-cap software pool focused on mission-critical enterprise platforms with high recurring revenue.",
    paragraph:
      "The pool emphasizes workflow, CRM, analytics, and collaboration platforms that can compound through subscription growth and operating leverage.",
    benchmark: "BVP Nasdaq Emerging Cloud",
    riskLevel: "Moderate",
    manager: "Quantro Software Strategy",
    rebalance: "Bi-weekly",
    strategy: "Recurring revenue compounders",
    topHoldings: ["Salesforce", "ServiceNow", "Adobe", "Datadog"],
    statsByRange: {
      "1H": { aum: "$61.8M", flow: "$91K", return: "+0.14%", drawdown: "-0.10%" },
      "4H": { aum: "$62.0M", flow: "$280K", return: "+0.37%", drawdown: "-0.25%" },
      "1D": { aum: "$62.6M", flow: "$860K", return: "+0.81%", drawdown: "-0.58%" },
      "1W": { aum: "$63.7M", flow: "$2.6M", return: "+2.37%", drawdown: "-1.46%" },
      "1M": { aum: "$65.5M", flow: "$6.5M", return: "+6.19%", drawdown: "-3.48%" },
      "6M": { aum: "$69.2M", flow: "$15.1M", return: "+16.84%", drawdown: "-6.72%" },
    },
    chartScale: { aum: 0.92, flow: 0.28, price: 49, yield: 2.35 },
  },
  {
    id: 11,
    slug: "banking-and-brokers",
    pair: "Banking and Brokers",
    token0Icon: "JPM",
    token1Icon: "GS",
    type: "Dividend",
    feeTier: "Financials",
    liquidity: 70400000,
    apr: 15.9,
    volume24h: "$2.4M",
    description:
      "A diversified financials pool spanning money-center banks, brokers, exchanges, and custody businesses.",
    paragraph:
      "This strategy seeks a balance between dividend income, capital markets upside, and interest-rate sensitivity across the financial sector.",
    benchmark: "KBW Bank Index",
    riskLevel: "Moderate",
    manager: "Quantro Financials Desk",
    rebalance: "Quarterly",
    strategy: "Income + cyclicals",
    topHoldings: ["JPMorgan", "Goldman Sachs", "Morgan Stanley", "BlackRock"],
    statsByRange: {
      "1H": { aum: "$70.4M", flow: "$77K", return: "+0.09%", drawdown: "-0.07%" },
      "4H": { aum: "$70.6M", flow: "$220K", return: "+0.24%", drawdown: "-0.18%" },
      "1D": { aum: "$71.0M", flow: "$680K", return: "+0.56%", drawdown: "-0.39%" },
      "1W": { aum: "$71.9M", flow: "$2.0M", return: "+1.58%", drawdown: "-1.01%" },
      "1M": { aum: "$73.1M", flow: "$4.8M", return: "+4.29%", drawdown: "-2.45%" },
      "6M": { aum: "$75.9M", flow: "$10.9M", return: "+11.62%", drawdown: "-4.79%" },
    },
    chartScale: { aum: 1.01, flow: 0.21, price: 35, yield: 1.9 },
  },
];

export const POOL_METRICS = ["AUM", "Net Flow", "Price", "Yield"];
export const POOL_TIME_RANGES = ["1H", "4H", "1D", "1W", "1M", "6M"];

export const CHART_RAW = {
  Liquidity: [
    { label: "Apr 1", value: 42 },
    { label: "Apr 2", value: 18 },
    { label: "Apr 3", value: 30 },
    { label: "Apr 4", value: 45 },
    { label: "Apr 5", value: 72 },
    { label: "Apr 6", value: 58 },
    { label: "Apr 7", value: 47 },
    { label: "Apr 8", value: 78 },
    { label: "Apr 9", value: 12 },
    { label: "Apr 10", value: 50 },
    { label: "Apr 11", value: 64 },
    { label: "Apr 12", value: 58 },
    { label: "Apr 13", value: 67 },
    { label: "Apr 14", value: 24 },
    { label: "Apr 15", value: 20 },
    { label: "Apr 16", value: 22 },
    { label: "Apr 17", value: 85 },
    { label: "Apr 18", value: 66 },
    { label: "Apr 19", value: 42 },
    { label: "Apr 20", value: 16 },
    { label: "Apr 21", value: 26 },
    { label: "Apr 22", value: 43 },
    { label: "Apr 23", value: 22 },
    { label: "Apr 24", value: 74 },
    { label: "Apr 25", value: 35 },
    { label: "Apr 26", value: 13 },
    { label: "Apr 27", value: 73 },
    { label: "Apr 28", value: 19 },
    { label: "Apr 29", value: 61 },
    { label: "Apr 30", value: 86 },
    { label: "May 1", value: 27 },
    { label: "May 2", value: 58 },
    { label: "May 3", value: 50 },
    { label: "May 4", value: 71 },
    { label: "May 5", value: 91 },
    { label: "May 6", value: 94 },
    { label: "May 7", value: 70 },
    { label: "May 8", value: 24 },
    { label: "May 9", value: 38 },
    { label: "May 10", value: 50 },
    { label: "May 11", value: 61 },
    { label: "May 12", value: 40 },
    { label: "May 13", value: 40 },
    { label: "May 14", value: 84 },
    { label: "May 15", value: 89 },
    { label: "May 16", value: 61 },
    { label: "May 17", value: 94 },
    { label: "May 18", value: 57 },
    { label: "May 19", value: 41 },
    { label: "May 20", value: 30 },
    { label: "May 21", value: 15 },
    { label: "May 22", value: 15 },
    { label: "May 23", value: 46 },
    { label: "May 24", value: 58 },
    { label: "May 25", value: 41 },
    { label: "May 26", value: 44 },
    { label: "May 27", value: 80 },
    { label: "May 28", value: 39 },
    { label: "May 29", value: 14 },
    { label: "May 30", value: 67 },
    { label: "May 31", value: 36 },
    { label: "Jun 1", value: 36 },
    { label: "Jun 2", value: 88 },
    { label: "Jun 3", value: 18 },
    { label: "Jun 4", value: 83 },
    { label: "Jun 5", value: 16 },
    { label: "Jun 6", value: 57 },
    { label: "Jun 7", value: 62 },
    { label: "Jun 8", value: 73 },
    { label: "Jun 9", value: 83 },
    { label: "Jun 10", value: 28 },
    { label: "Jun 11", value: 16 },
    { label: "Jun 12", value: 93 },
    { label: "Jun 13", value: 14 },
    { label: "Jun 14", value: 81 },
    { label: "Jun 15", value: 60 },
    { label: "Jun 16", value: 69 },
    { label: "Jun 17", value: 89 },
    { label: "Jun 18", value: 19 },
    { label: "Jun 19", value: 61 },
    { label: "Jun 20", value: 78 },
    { label: "Jun 21", value: 28 },
    { label: "Jun 22", value: 55 },
    { label: "Jun 23", value: 90 },
    { label: "Jun 24", value: 23 },
    { label: "Jun 25", value: 25 },
    { label: "Jun 26", value: 82 },
    { label: "Jun 27", value: 85 },
    { label: "Jun 28", value: 21 },
    { label: "Jun 29", value: 16 },
    { label: "Jun 30", value: 84 },
  ],

  Volume: [
    { label: "Apr 1", value: 12 },
    { label: "Apr 2", value: 8 },
    { label: "Apr 3", value: 16 },
    { label: "Apr 4", value: 20 },
    { label: "Apr 5", value: 28 },
    { label: "Apr 6", value: 24 },
    { label: "Apr 7", value: 18 },
    { label: "Apr 8", value: 32 },
    { label: "Apr 9", value: 6 },
    { label: "Apr 10", value: 21 },
    { label: "Apr 11", value: 26 },
    { label: "Apr 12", value: 23 },
    { label: "Apr 13", value: 30 },
    { label: "Apr 14", value: 12 },
    { label: "Apr 15", value: 10 },
    { label: "Apr 16", value: 11 },
    { label: "Apr 17", value: 36 },
    { label: "Apr 18", value: 28 },
    { label: "Apr 19", value: 18 },
    { label: "Apr 20", value: 7 },
    { label: "Apr 21", value: 12 },
    { label: "Apr 22", value: 17 },
    { label: "Apr 23", value: 9 },
    { label: "Apr 24", value: 31 },
    { label: "Apr 25", value: 15 },
    { label: "Apr 26", value: 5 },
    { label: "Apr 27", value: 29 },
    { label: "Apr 28", value: 8 },
    { label: "Apr 29", value: 22 },
    { label: "Apr 30", value: 34 },
    { label: "May 1", value: 12 },
    { label: "May 2", value: 24 },
    { label: "May 3", value: 21 },
    { label: "May 4", value: 29 },
    { label: "May 5", value: 38 },
    { label: "May 6", value: 41 },
    { label: "May 7", value: 30 },
    { label: "May 8", value: 10 },
    { label: "May 9", value: 16 },
    { label: "May 10", value: 21 },
    { label: "May 11", value: 26 },
    { label: "May 12", value: 17 },
    { label: "May 13", value: 17 },
    { label: "May 14", value: 35 },
    { label: "May 15", value: 37 },
    { label: "May 16", value: 26 },
    { label: "May 17", value: 39 },
    { label: "May 18", value: 23 },
    { label: "May 19", value: 16 },
    { label: "May 20", value: 13 },
    { label: "May 21", value: 6 },
    { label: "May 22", value: 6 },
    { label: "May 23", value: 19 },
    { label: "May 24", value: 24 },
    { label: "May 25", value: 17 },
    { label: "May 26", value: 18 },
    { label: "May 27", value: 33 },
    { label: "May 28", value: 16 },
    { label: "May 29", value: 6 },
    { label: "May 30", value: 28 },
    { label: "May 31", value: 15 },
    { label: "Jun 1", value: 15 },
    { label: "Jun 2", value: 36 },
    { label: "Jun 3", value: 8 },
    { label: "Jun 4", value: 34 },
    { label: "Jun 5", value: 7 },
    { label: "Jun 6", value: 24 },
    { label: "Jun 7", value: 25 },
    { label: "Jun 8", value: 31 },
    { label: "Jun 9", value: 35 },
    { label: "Jun 10", value: 12 },
    { label: "Jun 11", value: 7 },
    { label: "Jun 12", value: 39 },
    { label: "Jun 13", value: 6 },
    { label: "Jun 14", value: 33 },
    { label: "Jun 15", value: 25 },
    { label: "Jun 16", value: 29 },
    { label: "Jun 17", value: 37 },
    { label: "Jun 18", value: 8 },
    { label: "Jun 19", value: 26 },
    { label: "Jun 20", value: 31 },
    { label: "Jun 21", value: 12 },
    { label: "Jun 22", value: 23 },
    { label: "Jun 23", value: 38 },
    { label: "Jun 24", value: 10 },
    { label: "Jun 25", value: 11 },
    { label: "Jun 26", value: 35 },
    { label: "Jun 27", value: 36 },
    { label: "Jun 28", value: 9 },
    { label: "Jun 29", value: 7 },
    { label: "Jun 30", value: 34 },
  ],

  ETH: [
    { label: "Apr 1", value: 5.42 },
    { label: "Apr 2", value: 5.18 },
    { label: "Apr 3", value: 5.25 },
    { label: "Apr 4", value: 5.34 },
    { label: "Apr 5", value: 5.58 },
    { label: "Apr 6", value: 5.49 },
    { label: "Apr 7", value: 5.43 },
    { label: "Apr 8", value: 5.64 },
    { label: "Apr 9", value: 5.08 },
    { label: "Apr 10", value: 5.37 },
    { label: "Apr 11", value: 5.46 },
    { label: "Apr 12", value: 5.41 },
    { label: "Apr 13", value: 5.48 },
    { label: "Apr 14", value: 5.21 },
    { label: "Apr 15", value: 5.19 },
    { label: "Apr 16", value: 5.2 },
    { label: "Apr 17", value: 5.71 },
    { label: "Apr 18", value: 5.55 },
    { label: "Apr 19", value: 5.33 },
    { label: "Apr 20", value: 5.16 },
    { label: "Apr 21", value: 5.24 },
    { label: "Apr 22", value: 5.35 },
    { label: "Apr 23", value: 5.2 },
    { label: "Apr 24", value: 5.62 },
    { label: "Apr 25", value: 5.31 },
    { label: "Apr 26", value: 5.12 },
    { label: "Apr 27", value: 5.58 },
    { label: "Apr 28", value: 5.14 },
    { label: "Apr 29", value: 5.43 },
    { label: "Apr 30", value: 5.74 },
    { label: "May 1", value: 5.28 },
    { label: "May 2", value: 5.47 },
    { label: "May 3", value: 5.41 },
    { label: "May 4", value: 5.6 },
    { label: "May 5", value: 5.82 },
    { label: "May 6", value: 5.86 },
    { label: "May 7", value: 5.62 },
    { label: "May 8", value: 5.22 },
    { label: "May 9", value: 5.35 },
    { label: "May 10", value: 5.46 },
    { label: "May 11", value: 5.55 },
    { label: "May 12", value: 5.38 },
    { label: "May 13", value: 5.38 },
    { label: "May 14", value: 5.72 },
    { label: "May 15", value: 5.77 },
    { label: "May 16", value: 5.56 },
    { label: "May 17", value: 5.89 },
    { label: "May 18", value: 5.54 },
    { label: "May 19", value: 5.41 },
    { label: "May 20", value: 5.29 },
    { label: "May 21", value: 5.11 },
    { label: "May 22", value: 5.11 },
    { label: "May 23", value: 5.39 },
    { label: "May 24", value: 5.48 },
    { label: "May 25", value: 5.37 },
    { label: "May 26", value: 5.39 },
    { label: "May 27", value: 5.74 },
    { label: "May 28", value: 5.36 },
    { label: "May 29", value: 5.12 },
    { label: "May 30", value: 5.57 },
    { label: "May 31", value: 5.34 },
    { label: "Jun 1", value: 5.34 },
    { label: "Jun 2", value: 5.81 },
    { label: "Jun 3", value: 5.18 },
    { label: "Jun 4", value: 5.76 },
    { label: "Jun 5", value: 5.15 },
    { label: "Jun 6", value: 5.44 },
    { label: "Jun 7", value: 5.49 },
    { label: "Jun 8", value: 5.61 },
    { label: "Jun 9", value: 5.73 },
    { label: "Jun 10", value: 5.26 },
    { label: "Jun 11", value: 5.15 },
    { label: "Jun 12", value: 5.88 },
    { label: "Jun 13", value: 5.12 },
    { label: "Jun 14", value: 5.78 },
    { label: "Jun 15", value: 5.51 },
    { label: "Jun 16", value: 5.59 },
    { label: "Jun 17", value: 5.81 },
    { label: "Jun 18", value: 5.17 },
    { label: "Jun 19", value: 5.53 },
    { label: "Jun 20", value: 5.64 },
    { label: "Jun 21", value: 5.28 },
    { label: "Jun 22", value: 5.46 },
    { label: "Jun 23", value: 5.85 },
    { label: "Jun 24", value: 5.22 },
    { label: "Jun 25", value: 5.23 },
    { label: "Jun 26", value: 5.76 },
    { label: "Jun 27", value: 5.78 },
    { label: "Jun 28", value: 5.19 },
    { label: "Jun 29", value: 5.16 },
    { label: "Jun 30", value: 5.84 },
  ],

  GEH: [
    { label: "Apr 1", value: 0.184 },
    { label: "Apr 2", value: 0.193 },
    { label: "Apr 3", value: 0.19 },
    { label: "Apr 4", value: 0.187 },
    { label: "Apr 5", value: 0.179 },
    { label: "Apr 6", value: 0.182 },
    { label: "Apr 7", value: 0.185 },
    { label: "Apr 8", value: 0.177 },
    { label: "Apr 9", value: 0.197 },
    { label: "Apr 10", value: 0.186 },
    { label: "Apr 11", value: 0.183 },
    { label: "Apr 12", value: 0.184 },
    { label: "Apr 13", value: 0.181 },
    { label: "Apr 14", value: 0.191 },
    { label: "Apr 15", value: 0.192 },
    { label: "Apr 16", value: 0.192 },
    { label: "Apr 17", value: 0.175 },
    { label: "Apr 18", value: 0.18 },
    { label: "Apr 19", value: 0.187 },
    { label: "Apr 20", value: 0.194 },
    { label: "Apr 21", value: 0.19 },
    { label: "Apr 22", value: 0.186 },
    { label: "Apr 23", value: 0.192 },
    { label: "Apr 24", value: 0.178 },
    { label: "Apr 25", value: 0.188 },
    { label: "Apr 26", value: 0.196 },
    { label: "Apr 27", value: 0.179 },
    { label: "Apr 28", value: 0.195 },
    { label: "Apr 29", value: 0.184 },
    { label: "Apr 30", value: 0.176 },
    { label: "May 1", value: 0.189 },
    { label: "May 2", value: 0.183 },
    { label: "May 3", value: 0.185 },
    { label: "May 4", value: 0.179 },
    { label: "May 5", value: 0.172 },
    { label: "May 6", value: 0.171 },
    { label: "May 7", value: 0.178 },
    { label: "May 8", value: 0.191 },
    { label: "May 9", value: 0.187 },
    { label: "May 10", value: 0.183 },
    { label: "May 11", value: 0.18 },
    { label: "May 12", value: 0.186 },
    { label: "May 13", value: 0.186 },
    { label: "May 14", value: 0.174 },
    { label: "May 15", value: 0.173 },
    { label: "May 16", value: 0.18 },
    { label: "May 17", value: 0.169 },
    { label: "May 18", value: 0.181 },
    { label: "May 19", value: 0.185 },
    { label: "May 20", value: 0.189 },
    { label: "May 21", value: 0.196 },
    { label: "May 22", value: 0.196 },
    { label: "May 23", value: 0.186 },
    { label: "May 24", value: 0.182 },
    { label: "May 25", value: 0.186 },
    { label: "May 26", value: 0.185 },
    { label: "May 27", value: 0.174 },
    { label: "May 28", value: 0.186 },
    { label: "May 29", value: 0.195 },
    { label: "May 30", value: 0.18 },
    { label: "May 31", value: 0.187 },
    { label: "Jun 1", value: 0.187 },
    { label: "Jun 2", value: 0.172 },
    { label: "Jun 3", value: 0.193 },
    { label: "Jun 4", value: 0.174 },
    { label: "Jun 5", value: 0.194 },
    { label: "Jun 6", value: 0.184 },
    { label: "Jun 7", value: 0.182 },
    { label: "Jun 8", value: 0.178 },
    { label: "Jun 9", value: 0.174 },
    { label: "Jun 10", value: 0.189 },
    { label: "Jun 11", value: 0.194 },
    { label: "Jun 12", value: 0.171 },
    { label: "Jun 13", value: 0.195 },
    { label: "Jun 14", value: 0.173 },
    { label: "Jun 15", value: 0.181 },
    { label: "Jun 16", value: 0.178 },
    { label: "Jun 17", value: 0.172 },
    { label: "Jun 18", value: 0.193 },
    { label: "Jun 19", value: 0.18 },
    { label: "Jun 20", value: 0.176 },
    { label: "Jun 21", value: 0.189 },
    { label: "Jun 22", value: 0.183 },
    { label: "Jun 23", value: 0.171 },
    { label: "Jun 24", value: 0.191 },
    { label: "Jun 25", value: 0.19 },
    { label: "Jun 26", value: 0.174 },
    { label: "Jun 27", value: 0.173 },
    { label: "Jun 28", value: 0.191 },
    { label: "Jun 29", value: 0.192 },
    { label: "Jun 30", value: 0.172 },
  ],
};
export const BAR_RAW = [
  { label: "J1", value: 2.1 },
  { label: "J2", value: 2.6 },
  { label: "F1", value: 3.4 },
  { label: "F2", value: 3.1 },
  { label: "M1", value: 2.8 },
  { label: "M2", value: 3.5 },
  { label: "A1", value: 4.2 },
  { label: "A2", value: 4.6 },
  { label: "M3", value: 5.1 },
  { label: "M4", value: 4.8 },
  { label: "J3", value: 3.9 },
  { label: "J4", value: 4.5 },
  { label: "A3", value: 5.5 },
  { label: "A4", value: 5.9 },
  { label: "S1", value: 6.2 },
  { label: "S2", value: 5.7 },
  { label: "O1", value: 5.8 },
  { label: "O2", value: 6.1 },
  { label: "N1", value: 4.9 },
  { label: "N2", value: 5.6 },
  { label: "D1", value: 6.8 },
  { label: "D2", value: 7.2 },
];

// ─── ANALYTICS DATA ────────────────────────────────────────────────────────────
export const LINE_DATA = [
  { month:"Jan", desktop:186, mobile:80  },
  { month:"Feb", desktop:305, mobile:200 },
  { month:"Mar", desktop:237, mobile:120 },
  { month:"Apr", desktop:73,  mobile:190 },
  { month:"May", desktop:209, mobile:130 },
  { month:"Jun", desktop:214, mobile:140 },
];
export const PIE_DATA = [
  { name:"Jan", value:186, fill:"var(--chart-1)" },
  { name:"Feb", value:305, fill:"var(--chart-2)" },
  { name:"Mar", value:237, fill:"var(--chart-3)" },
  { name:"Apr", value:173, fill:"var(--chart-4)" },
  { name:"May", value:209, fill:"var(--chart-5)" },
  { name:"Jun", value:214, fill:"var(--chart-6)" },
];
export const RADAR_DATA = [
  { month:"January",  desktop:186 },
  { month:"February", desktop:285 },
  { month:"March",    desktop:237 },
  { month:"April",    desktop:73  },
  { month:"May",      desktop:209 },
  { month:"June",     desktop:214 },
];
export const RADIAL_DATA = [
  { name:"Chrome",  visitors:275, fill:"var(--chart-1)" },
  { name:"Safari",  visitors:200, fill:"var(--chart-2)" },
  { name:"Firefox", visitors:187, fill:"var(--chart-3)" },
  { name:"Edge",    visitors:173, fill:"var(--chart-4)" },
  { name:"Other",   visitors:90,  fill:"var(--chart-5)" },
];

export const TABS = [
    { id:"pools",        label:"📋 Pools List" },
    { id:"overview",     label:"📊 Pool Overview" },
    { id:"my-positions", label:"📁 My Positions" },
    { id:"deposit",      label:"💰 Deposit" },
    { id:"withdraw",     label:"📤 Withdraw" },
    { id:"analytics",    label:"📈 Analytics" },
  ];

export const RANGE_POINT_MAP = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "7 Days": 7,
  "30 Days": 30,
  "90 Days": 90,
  "1H": 8,
  "4H": 12,
  "1D": 18,
  "1W": 30,
  "1M": 60,
  "6M": Infinity,
};

export function sliceChartDataByRange(data = [], range) {
  const limit = RANGE_POINT_MAP[range];

  if (!Array.isArray(data) || !data.length || !limit || limit === Infinity) {
    return data;
  }

  return data.slice(-limit);
}

const POOL_CHART_SOURCE_MAP = {
  AUM: "Liquidity",
  "Net Flow": "Volume",
  Price: "ETH",
  Yield: "GEH",
};

const POOL_CHART_DECIMALS = {
  AUM: 1,
  "Net Flow": 2,
  Price: 2,
  Yield: 2,
};

const POOL_CHART_OFFSETS = {
  AUM: 18,
  "Net Flow": 0.35,
  Price: 95,
  Yield: 1.4,
};

export function getPoolBySlug(slug) {
  return POOLS.find((pool) => pool.slug === slug) || null;
}

export function getPoolChartData(pool, metric, range) {
  const sourceKey = POOL_CHART_SOURCE_MAP[metric] || "Liquidity";
  const baseSeries = sliceChartDataByRange(CHART_RAW[sourceKey] || [], range);

  if (!pool) {
    return baseSeries;
  }

  const scaleKey =
    metric === "AUM"
      ? "aum"
      : metric === "Net Flow"
        ? "flow"
        : metric === "Price"
          ? "price"
          : "yield";

  const multiplier = pool.chartScale?.[scaleKey] || 1;
  const decimals = POOL_CHART_DECIMALS[metric] ?? 2;
  const offset = POOL_CHART_OFFSETS[metric] ?? 0;

  return baseSeries.map((point, index) => ({
    label: point.label,
    value: Number((point.value * multiplier + offset + index * 0.03).toFixed(decimals)),
  }));
}
