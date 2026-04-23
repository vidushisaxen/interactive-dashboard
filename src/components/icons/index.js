"use client";

import { forwardRef } from "react";
import { AutoLoop } from "./auto-loop";

import { ArrowDownIcon as ArrowDownIconRaw } from "./arrow-down";
import { ArrowDownLeftIcon as ArrowDownLeftIconRaw } from "./arrow-down-left";
import { ArrowLeftIcon as ArrowLeftIconRaw } from "./arrow-left";
import { ArrowRightIcon as ArrowRightIconRaw } from "./arrow-right";
import { ArrowUpIcon as ArrowUpIconRaw } from "./arrow-up";
import { ArrowUpRightIcon as ArrowUpRightIconRaw } from "./arrow-up-right";
import { BadgeAlertIcon as BadgeAlertIconRaw } from "./badge-alert";
import { BellIcon as BellIconRaw } from "./bell";
import { BookTextIcon as BookTextIconRaw } from "./book-text";
import { BotMessageSquareIcon as BotMessageSquareIconRaw } from "./bot-message-square";
import { CalendarDaysIcon as CalendarDaysIconRaw } from "./calendar-days";
import { ChartLineIcon as ChartLineIconRaw } from "./chart-line";
import { ChartSplineIcon as ChartSplineIconRaw } from "./chart-spline";
import { CheckIcon as CheckIconRaw } from "./check";
import { CheckCheckIcon as CheckCheckIconRaw } from "./check-check";
import { ChevronDownIcon as ChevronDownIconRaw } from "./chevron-down";
import { ChevronLeftIcon as ChevronLeftIconRaw } from "./chevron-left";
import { ChevronRightIcon as ChevronRightIconRaw } from "./chevron-right";
import { ChevronUpIcon as ChevronUpIconRaw } from "./chevron-up";
import { ChevronsLeftRightIcon as ChevronsLeftRightIconRaw } from "./chevrons-left-right";
import { CircleCheckIcon as CircleCheckIconRaw } from "./circle-check";
import { CircleDollarSignIcon as CircleDollarSignIconRaw } from "./circle-dollar-sign";
import { CircleHelpIcon as CircleHelpIconRaw } from "./circle-help";
import { ClockIcon as ClockIconRaw } from "./clock";
import { DownloadIcon as DownloadIconRaw } from "./download";
import { DollarSignIcon as DollarSignIconRaw } from "./dollar-sign";
import { DropletIcon as DropletIconRaw } from "./droplet";
import { EarthIcon as EarthIconRaw } from "./earth";
import { EyeIcon as EyeIconRaw } from "./eye";
import { EyeOffIcon as EyeOffIconRaw } from "./eye-off";
import { FileTextIcon as FileTextIconRaw } from "./file-text";
import { HandCoinsIcon as HandCoinsIconRaw } from "./hand-coins";
import { HomeIcon as HomeIconRaw } from "./home";
import { LayersIcon as LayersIconRaw } from "./layers";
import { LayoutGridIcon as LayoutGridIconRaw } from "./layout-grid";
import { LinkIcon as LinkIconRaw } from "./link";
import { LoaderCircleIcon as LoaderCircleIconRaw } from "./loader-circle";
import { LockIcon as LockIconRaw } from "./lock";
import { LockKeyholeIcon as LockKeyholeIconRaw } from "./lock-keyhole";
import { LogoutIcon as LogoutIconRaw } from "./logout";
import { MailboxIcon as MailboxIconRaw } from "./mailbox";
import { MapPinHouseIcon as MapPinHouseIconRaw } from "./map-pin-house";
import { MapPinIcon as MapPinIconRaw } from "./map-pin";
import { MapPinOffIcon as MapPinOffIconRaw } from "./map-pin-off";
import { MessageCircleIcon as MessageCircleIconRaw } from "./message-circle";
import { MessageSquareIcon as MessageSquareIconRaw } from "./message-square";
import { MoonIcon as MoonIconRaw } from "./moon";
import { PanelLeftOpenIcon as PanelLeftOpenIconRaw } from "./panel-left-open";
import { PlusIcon as PlusIconRaw } from "./plus";
import { ScanTextIcon as ScanTextIconRaw } from "./scan-text";
import { SearchIcon as SearchIconRaw } from "./search";
import { SendIcon as SendIconRaw } from "./send";
import { SettingsIcon as SettingsIconRaw } from "./settings";
import { ShieldCheckIcon as ShieldCheckIconRaw } from "./shield-check";
import { SlidersHorizontalIcon as SlidersHorizontalIconRaw } from "./sliders-horizontal";
import { SparklesIcon as SparklesIconRaw } from "./sparkles";
import { SunMediumIcon as SunMediumIconRaw } from "./sun-medium";
import { TimerIcon as TimerIconRaw } from "./timer";
import { TrendingUpIcon as TrendingUpIconRaw } from "./trending-up";
import { UserIcon as UserIconRaw } from "./user";
import { XIcon as XIconRaw } from "./x";

const extractTailwindSizeToken = (className, prefix) => {
  if (!className) return null;
  const match = className.match(new RegExp(`\\\\b${prefix}-(\\\\d+(?:\\\\.\\\\d+)?)\\\\b`));
  return match ? Number.parseFloat(match[1]) : null;
};

const inferPxSize = ({ className, size }) => {
  if (typeof size === "number") return size;

  const token =
    extractTailwindSizeToken(className, "size") ??
    extractTailwindSizeToken(className, "h") ??
    extractTailwindSizeToken(className, "w");

  if (typeof token !== "number" || Number.isNaN(token)) return undefined;
  return Math.round(token * 4);
};

const withInferredSize = (Icon) => {
  const Wrapped = forwardRef(({ className, size, ...props }, ref) => (
    <Icon
      ref={ref}
      className={
        className
          ? `inline-flex items-center justify-center leading-none ${className}`
          : "inline-flex items-center justify-center leading-none"
      }
      size={inferPxSize({ className, size })}
      {...props}
    />
  ));

  Wrapped.displayName = `WithInferredSize(${Icon.displayName || Icon.name || "Icon"})`;
  return Wrapped;
};

// --- Wrapped raw components (so existing `className="h-4 w-4"` continues to work) ---
const ArrowDownIcon = withInferredSize(ArrowDownIconRaw);
const ArrowDownLeftIcon = withInferredSize(ArrowDownLeftIconRaw);
const ArrowLeftIcon = withInferredSize(ArrowLeftIconRaw);
const ArrowRightIcon = withInferredSize(ArrowRightIconRaw);
const ArrowUpIcon = withInferredSize(ArrowUpIconRaw);
const ArrowUpRightIcon = withInferredSize(ArrowUpRightIconRaw);
const BadgeAlertIcon = withInferredSize(BadgeAlertIconRaw);
const BellIcon = withInferredSize(BellIconRaw);
const BookTextIcon = withInferredSize(BookTextIconRaw);
const BotMessageSquareIcon = withInferredSize(BotMessageSquareIconRaw);
const CalendarDaysIcon = withInferredSize(CalendarDaysIconRaw);
const ChartLineIcon = withInferredSize(ChartLineIconRaw);
const ChartSplineIcon = withInferredSize(ChartSplineIconRaw);
const CheckIcon = withInferredSize(CheckIconRaw);
const CheckCheckIcon = withInferredSize(CheckCheckIconRaw);
const ChevronDownIcon = withInferredSize(ChevronDownIconRaw);
const ChevronLeftIcon = withInferredSize(ChevronLeftIconRaw);
const ChevronRightIcon = withInferredSize(ChevronRightIconRaw);
const ChevronUpIcon = withInferredSize(ChevronUpIconRaw);
const ChevronsLeftRightIcon = withInferredSize(ChevronsLeftRightIconRaw);
const CircleCheckIcon = withInferredSize(CircleCheckIconRaw);
const CircleDollarSignIcon = withInferredSize(CircleDollarSignIconRaw);
const CircleHelpIcon = withInferredSize(CircleHelpIconRaw);
const ClockIcon = withInferredSize(ClockIconRaw);
const DownloadIcon = withInferredSize(DownloadIconRaw);
const DollarSignIcon = withInferredSize(DollarSignIconRaw);
const DropletIcon = withInferredSize(DropletIconRaw);
const EarthIcon = withInferredSize(EarthIconRaw);
const EyeIcon = withInferredSize(EyeIconRaw);
const EyeOffIcon = withInferredSize(EyeOffIconRaw);
const FileTextIcon = withInferredSize(FileTextIconRaw);
const HandCoinsIcon = withInferredSize(HandCoinsIconRaw);
const HomeIcon = withInferredSize(HomeIconRaw);
const LayersIcon = withInferredSize(LayersIconRaw);
const LayoutGridIcon = withInferredSize(LayoutGridIconRaw);
const LinkIcon = withInferredSize(LinkIconRaw);
const LoaderCircleIcon = withInferredSize(LoaderCircleIconRaw);
const LockIcon = withInferredSize(LockIconRaw);
const LockKeyholeIcon = withInferredSize(LockKeyholeIconRaw);
const LogoutIcon = withInferredSize(LogoutIconRaw);
const MailboxIcon = withInferredSize(MailboxIconRaw);
const MapPinHouseIcon = withInferredSize(MapPinHouseIconRaw);
const MapPinIcon = withInferredSize(MapPinIconRaw);
const MapPinOffIcon = withInferredSize(MapPinOffIconRaw);
const MessageCircleIcon = withInferredSize(MessageCircleIconRaw);
const MessageSquareIcon = withInferredSize(MessageSquareIconRaw);
const MoonIcon = withInferredSize(MoonIconRaw);
const PanelLeftOpenIcon = withInferredSize(PanelLeftOpenIconRaw);
const PlusIcon = withInferredSize(PlusIconRaw);
const ScanTextIcon = withInferredSize(ScanTextIconRaw);
const SearchIcon = withInferredSize(SearchIconRaw);
const SendIcon = withInferredSize(SendIconRaw);
const SettingsIcon = withInferredSize(SettingsIconRaw);
const ShieldCheckIcon = withInferredSize(ShieldCheckIconRaw);
const SlidersHorizontalIcon = withInferredSize(SlidersHorizontalIconRaw);
const SparklesIcon = withInferredSize(SparklesIconRaw);
const SunMediumIcon = withInferredSize(SunMediumIconRaw);
const TimerIcon = withInferredSize(TimerIconRaw);
const TrendingUpIcon = withInferredSize(TrendingUpIconRaw);
const UserIcon = withInferredSize(UserIconRaw);
const XIcon = withInferredSize(XIconRaw);

// Loop by default (no hover needed)
const LoaderCircle = forwardRef((props, ref) => (
  <AutoLoop ref={ref} Icon={LoaderCircleIcon} {...props} />
));

LoaderCircle.displayName = "LoaderCircle";
export {
  // Base lucide names
  ArrowDownLeftIcon as ArrowDownLeft,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ArrowUpRightIcon as ArrowUpRight,
  BellIcon as Bell,
  BotMessageSquareIcon as BotMessageSquare,
  EyeIcon as Eye,
  EyeOffIcon as EyeOff,
  ChevronDownIcon as ChevronDown,
  ChevronLeftIcon as ChevronLeft,
  ChevronRightIcon as ChevronRight,
  ChevronUpIcon as ChevronUp,
  CircleHelpIcon as CircleHelp,
  DownloadIcon as Download,
  PlusIcon as Plus,
  SearchIcon as Search,
  SettingsIcon as Settings,
  SlidersHorizontalIcon as SlidersHorizontal,
  SparklesIcon as Sparkles,
  SunMediumIcon as SunMedium,
  UserIcon as User,
  XIcon as X,
  SendIcon as Send,
  MessageCircleIcon as MessageCircle,

  // App-specific / legacy names mapped to closest Lucide Animated icons
  ArrowDownIcon as ArrowDownToLine,
  ArrowUpIcon as ArrowUpFromLine,
  ArrowRightIcon as MoveRight,
  ChevronsLeftRightIcon as ArrowRightLeft,
  CalendarDaysIcon as CalendarClock,
  ClockIcon as Clock3,
  FileTextIcon as ReceiptText,
  FileTextIcon as FileText,
  LinkIcon as ExternalLink,
  MailboxIcon as Mail,
  ScanTextIcon as QrCode,
  SendIcon as SendHorizontal,
  SendIcon as SendHorizonal,
  SlidersHorizontalIcon as Filter,
  MapPinIcon as Pin,
  MapPinOffIcon as PinOff,
  LogoutIcon as LogOut,
  BadgeAlertIcon as ShieldAlert,
  BellIcon as BellRing,
  CircleCheckIcon as CheckCircle2,
  SparklesIcon as Crown,
  ChartLineIcon as CandlestickChart,
  TimerIcon as TimerReset,
  CircleDollarSignIcon as Wallet,
  CircleDollarSignIcon as WalletCards,
  DollarSignIcon as Coins,
  DropletIcon as Droplets,
  CircleDollarSignIcon as CreditCard,
  MapPinHouseIcon as Building2,
  UserIcon as UserRound,
  EarthIcon as Globe,
  MessageSquareIcon as MessageSquareText,
  MessageCircleIcon as PhoneCall,
  MoonIcon as MoonStar,
  LayersIcon as Layers3,
  LayoutGridIcon as LayoutGrid,
  ChartSplineIcon as ChartSpline,
  TrendingUpIcon as TrendingUp,
  HandCoinsIcon as HandCoins,
  BookTextIcon as BookOpen,
  ChartLineIcon as BarChart3,
  LayersIcon as BriefcaseBusiness,
  MapPinHouseIcon as Landmark,
  LockIcon as Lock,
  LockKeyholeIcon as LockKeyhole,
  ShieldCheckIcon as ShieldCheck,
  CheckCheckIcon as CheckCheck,
  CheckIcon as Check,

  // Icons that should loop by default
  LoaderCircle,

  // Shadcn/ui primitive icon names
  XIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PanelLeftOpenIcon as PanelLeftIcon,
};

// Optional: direct access to wrapped icon components
export {
  ArrowDownIcon,
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  BadgeAlertIcon,
  BellIcon,
  BookTextIcon,
  BotMessageSquareIcon,
  CalendarDaysIcon,
  ChartLineIcon,
  ChartSplineIcon,
  CheckCheckIcon,
  ChevronsLeftRightIcon,
  CircleCheckIcon,
  CircleDollarSignIcon,
  CircleHelpIcon,
  ClockIcon,
  DollarSignIcon,
  DropletIcon,
  EarthIcon,
  EyeIcon,
  EyeOffIcon,
  FileTextIcon,
  HandCoinsIcon,
  HomeIcon,
  LayersIcon,
  LayoutGridIcon,
  LinkIcon,
  LockIcon,
  LockKeyholeIcon,
  LogoutIcon,
  MailboxIcon,
  MapPinHouseIcon,
  MapPinIcon,
  MapPinOffIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  MoonIcon,
  PanelLeftOpenIcon,
  PlusIcon,
  ScanTextIcon,
  SearchIcon,
  SendIcon,
  SettingsIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SunMediumIcon,
  TimerIcon,
  TrendingUpIcon,
  UserIcon,
  DownloadIcon,
};
