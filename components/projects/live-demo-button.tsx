"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LiveDemoButtonProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  note?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export default function LiveDemoButton({
  href,
  className,
  children,
  note,
  target,
  rel,
}: LiveDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canProceed = Boolean(href);

  if (!note) {
    if (!href) {
      return (
        <button type="button" className={className} disabled>
          {children}
        </button>
      );
    }

    return (
      <Link href={href} className={className} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Live Demo Notice</DialogTitle>
            <DialogDescription className="whitespace-pre-line">{note}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {canProceed ? (
              <>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button asChild>
                  <Link href={href!} target={target} rel={rel}>
                    Continue to Demo
                  </Link>
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsOpen(false)}>Okay</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}