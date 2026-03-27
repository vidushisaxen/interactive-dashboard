"use client";

import { LogOut, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const LogoutDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-(--overlay) bg-background/95 p-0">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key="logout-dialog-content"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="p-6"
            >
              <DialogHeader className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.25 }}
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                >
                  <LogOut className="h-6 w-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.12, duration: 0.28 }}
                >
                  <DialogTitle className="text-lg font-semibold">
                    Sign out?
                  </DialogTitle>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.16, duration: 0.28 }}
                >
                  <DialogDescription>
                    You are about to log out of your account. Any unsaved actions
                    may be lost.
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.25 }}
              >
                <DialogFooter className="mt-4 gap-2 sm:justify-end">
                  <Button variant="outline" onClick={onClose} className="cursor-pointer">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>

                  <Button variant="destructive" onClick={onConfirm} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </DialogFooter>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
