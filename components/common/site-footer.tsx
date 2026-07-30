"use client";

import { FileDown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { ResumeModal } from "@/components/common/resume-modal";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

const hoverColors: Record<string, string> = {
  Github: "#333333",
  LinkedIn: "#0077B5",
  Gmail: "#DB4437",
};

const RESUME_ACCENT = "#4CAF50";

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
        {SocialLinks.filter((item) => item.name !== "Resume").map((item, ind) => (
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

        <ResumeModal>
          <CustomTooltip icon={FileDown} text="Download Resume">
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                  "h-10 w-10 p-2 text-muted-foreground transition-colors duration-200 hover:bg-transparent cursor-pointer inline-flex items-center justify-center"
                )}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = RESUME_ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                }}
              >
                <FileDown className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </motion.div>
          </CustomTooltip>
        </ResumeModal>
      </div>
    </motion.footer>
  );
}