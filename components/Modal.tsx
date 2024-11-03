"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "./ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="bg-transparent border-none flex items-center justify-center  max-w-2xl">
          <DialogClose></DialogClose>
          <DialogTitle className="sr-only">Create-Post</DialogTitle>
          <DialogDescription className="sr-only">Create-Post</DialogDescription>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
