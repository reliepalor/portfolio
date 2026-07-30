"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";

interface ResumeModalProps {
  children: React.ReactNode;
}

export function ResumeModal({ children }: ResumeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </span>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl w-[95vw] h-[85vh] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="sr-only">Resume Preview</DialogTitle>
            <DialogDescription className="sr-only">
              Preview and download John Relie Palor&apos;s resume
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 w-full rounded-md overflow-hidden bg-muted">
            <iframe
              src={`${siteConfig.links.resume}#toolbar=0`}
              className="h-full w-full"
              title="Resume Preview"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button size="sm" asChild>
              <a
                href={siteConfig.links.resume}
                download="JohnReliePalor_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

