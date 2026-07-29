"use client";

import { FileDown, RotateCw } from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

const hoverColors: Record<string, string> = {
  Github: "#333333",
  LinkedIn: "#0077B5",
  Gmail: "#DB4437",
};

const RESUME_PATH = "/JohnReliePalor_Resume.pdf";
const RESUME_FILENAME = "JohnReliePalor_Resume.pdf";
const RESUME_ACCENT = "#4CAF50";

// Minimum time the ring animates for, so it always feels deliberate and
// premium rather than an instant flash — even if the file loads instantly.
const MIN_RING_DURATION = 2.4; // seconds

type ResumeStatus = "idle" | "loading" | "ready" | "error";

const CIRCLE_RADIUS = 19;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function ResumeDownloadButton() {
  const [status, setStatus] = React.useState<ResumeStatus>("idle");
  const [pdfUrl, setPdfUrl] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const objectUrlRef = React.useRef<string | null>(null);
  const ringControls = useAnimationControls();

  const cleanupObjectUrl = React.useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => cleanupObjectUrl();
  }, [cleanupObjectUrl]);

  const loadResume = React.useCallback(async () => {
    if (status === "loading") return;

    setStatus("loading");
    ringControls.set({ strokeDashoffset: CIRCUMFERENCE });

    // Kick off the fixed-duration ring animation and the real fetch
    // at the same time — whichever finishes last determines when the
    // modal opens, so the ring never looks rushed or cut short.
    const ringAnimation = ringControls.start({
      strokeDashoffset: 0,
      transition: { duration: MIN_RING_DURATION, ease: [0.65, 0, 0.35, 1] },
    });

    const fetchResume = (async () => {
      const res = await fetch(RESUME_PATH);
      if (!res.ok) throw new Error("Failed to fetch resume");
      const blob = await res.blob();
      cleanupObjectUrl();
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      return url;
    })();

    try {
      const [, url] = await Promise.all([ringAnimation, fetchResume]);
      setPdfUrl(url);
      setStatus("ready");
      setModalOpen(true);
    } catch (err) {
      setStatus("error");
    }
  }, [status, ringControls, cleanupObjectUrl]);

  const handleClick = () => {
    if (status === "idle") loadResume();
    if (status === "error") loadResume();
  };

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setTimeout(() => {
        setStatus("idle");
      }, 200);
    }
  };

  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <>
      <CustomTooltip
        icon={isError ? RotateCw : FileDown}
        text={isError ? "Retry download" : "Download Resume"}
      >
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.08, y: -2 } : undefined}
          whileTap={!isLoading ? { scale: 0.93 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-busy={isLoading}
          aria-label={isError ? "Retry resume download" : "Download resume"}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "relative h-10 w-10 p-2 text-muted-foreground transition-colors duration-200",
            isError && "text-destructive"
          )}
          onMouseEnter={(e) => {
            if (isLoading || isError) return;
            e.currentTarget.style.color = RESUME_ACCENT;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "";
          }}
        >
          {/* Circular progress ring */}
          {isLoading && (
            <svg
              className="pointer-events-none absolute inset-0 -rotate-90"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <circle
                cx="20"
                cy="20"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.15}
                strokeWidth="2"
              />
              <motion.circle
                cx="20"
                cy="20"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={ringControls}
              />
            </svg>
          )}

          <motion.span
            animate={isLoading ? { opacity: 0.45, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {isError ? (
              <RotateCw className="h-5 w-5" />
            ) : (
              <FileDown className="h-5 w-5" strokeWidth={1.75} />
            )}
          </motion.span>
        </motion.button>
      </CustomTooltip>

      <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="flex h-[85vh] w-[95vw] max-w-3xl flex-col p-0 sm:rounded-xl">
          <DialogHeader className="flex-row items-center justify-between space-y-0 border-b border-border/60 px-5 py-4">
            <DialogTitle className="text-base font-semibold">
              Resume Preview
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex-1 overflow-hidden bg-muted/20">
            {pdfUrl && (
              <motion.iframe
                key="pdf-frame"
                src={pdfUrl}
                title="Resume PDF preview"
                className="h-full w-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border/60 px-5 py-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                download={RESUME_FILENAME}
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "gap-2 transition-transform active:scale-95"
                )}
              >
                <FileDown className="h-4 w-4" strokeWidth={1.75} />
                Download
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    const revealAfterIdle = () => {
      window.clearTimeout(hideTimeout);
      setIsVisible(false);

      hideTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    };

    window.addEventListener("scroll", revealAfterIdle, { passive: true });

    return () => {
      window.removeEventListener("scroll", revealAfterIdle);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 18 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 bottom-6 z-40 pointer-events-none",
        className
      )}
    >
      <div className="container flex items-center justify-center gap-8 py-4 md:py-0 pointer-events-auto">
        {SocialLinks.map((item, ind) => (
          <CustomTooltip icon={item.icon} text={item.username} key={ind}>
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href={item.link}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                  "h-10 w-10 p-2 text-muted-foreground transition-colors duration-200 hover:bg-transparent"
                )}
                onMouseEnter={(e) => {
                  const color = hoverColors[item.name];
                  if (color) {
                    e.currentTarget.style.color = color;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            </motion.div>
          </CustomTooltip>
        ))}

        <ResumeDownloadButton />
      </div>
    </motion.footer>
  );
}