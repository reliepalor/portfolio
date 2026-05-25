"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

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
            <Link
              href={item.link}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "h-10 w-10 p-2"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          </CustomTooltip>
        ))}
      </div>
    </motion.footer>
  );
}
