"use client"
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  MoveRight,
  ReceiptText,
  Search,
  SendHorizontal,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import NotificationsSheet from "./Notificationsheet";
import ProfileSheet from "./ProfileSheet";
import MoveMoneySheet from "./MoveMoneySheet";
import RequestMoneySheet from "./RequestMoneySheet";
import TransferMoneySheet from "./TransferMoneySheet";
import SettingsSheet from "./SettingsSheet";
import LogoutDialog from "./LogoutDialog";

const FinanceTopbar = ({ onNav }) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMoveMoney, setOpenMoveMoney] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openTransfer, setOpenTransfer] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleProfileAction = (action) => {
    setProfileMenuOpen(false);

    if (action === "profile") {
      setOpenProfile(true);
      return;
    }

    if (action === "settings") {
      setOpenSettings(true);
      return;
    }

    if (action === "logout") {
      setOpenLogout(true);
      return;
    }

    onNav?.(action);
  };

  return (
    <>
      <TooltipProvider delayDuration={120}>
        <header className="sticky top-0 z-40 flex h-21 items-center justify-between border-b border-border/60 bg-background/80 px-6 backdrop-blur supports-backdrop-filter:bg-background/70 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search accounts, spending, transactions..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="h-11 w-[320px] rounded-2xl pl-10"
              />
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setOpenNotifications(true)}
                  className="relative h-11 w-11 rounded-2xl cursor-pointer"
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenMoveMoney(true)}
              className="h-11 rounded-2xl cursor-pointer"
            >
              <MoveRight className="mr-2 h-4 w-4" />
              Move Money
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenRequest(true)}
              className="h-11 rounded-2xl cursor-pointer"
            >
              <ReceiptText className="mr-2 h-4 w-4" />
              Request
            </Button>

            <Button
              type="button"
              onClick={() => setOpenTransfer(true)}
              className="h-11 rounded-2xl cursor-pointer"
            >
              Transfer
              <SendHorizontal className="ml-2 h-4 w-4" />
            </Button>

            <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="ml-2 h-11 rounded-2xl px-3 cursor-pointer"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-bold">
                      JK
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown
                    className={`ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-56 rounded-2xl border border-border/60 bg-popover/95 p-2 shadow-lg backdrop-blur"
              >
                <DropdownMenuItem
                  onClick={() => handleProfileAction("profile")}
                  className="rounded-xl px-3 py-2"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleProfileAction("settings")}
                  className="rounded-xl px-3 py-2"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleProfileAction("logout")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </TooltipProvider>

      <NotificationsSheet
        open={openNotifications}
        onOpenChange={setOpenNotifications}
      />
      <ProfileSheet
        open={openProfile}
        onOpenChange={setOpenProfile}
        onOpenSettings={() => setOpenSettings(true)}
        onOpenLogout={() => setOpenLogout(true)}
      />
      <MoveMoneySheet
        open={openMoveMoney}
        onOpenChange={setOpenMoveMoney}
      />
      <RequestMoneySheet
        open={openRequest}
        onOpenChange={setOpenRequest}
      />
      <TransferMoneySheet
        open={openTransfer}
        onOpenChange={setOpenTransfer}
      />
      <SettingsSheet open={openSettings} onOpenChange={setOpenSettings} />
      <LogoutDialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => setOpenLogout(false)}
      />
    </>
  );
};

export default FinanceTopbar;
