"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.28,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground transition-all duration-300 hover:bg-muted"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Icons.sun className="h-4 w-4" />
          ) : (
            <Icons.moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const lastScrollY = React.useRef<number>(0);
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [pillStyle, setPillStyle] = React.useState({ left: 0, width: 0 });

  const isItemActive = React.useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }

      return pathname.startsWith(href);
    },
    [pathname]
  );

  const updatePillPosition = React.useCallback(() => {
    const activeIndex = items?.findIndex((item) => isItemActive(item.href));

    if (typeof activeIndex === "number" && activeIndex >= 0) {
      const el = itemRefs.current[activeIndex];

      if (el) {
        setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
      }
    }
  }, [isItemActive, items]);

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  React.useEffect(() => {
    const scrollThreshold = 10;
    const directionThreshold = 8;

    const onScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);

      if (currentScrollY <= scrollThreshold) {
        setIsVisible(true);
        setScrolled(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      setScrolled(true);

      if (currentScrollY > lastScrollY.current + directionThreshold) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - directionThreshold) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    updatePillPosition();
  }, [updatePillPosition]);

  React.useEffect(() => {
    const onResize = () => updatePillPosition();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [updatePillPosition]);

  return (
    <motion.div
      animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-3xl items-center justify-between rounded-2xl border border-border/70 bg-background/75 px-4 py-2 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          scrolled && "bg-background/90 shadow-lg dark:shadow-black/35"
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex select-none items-center gap-2">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-foreground/80" />
            <span className="text-base font-raleway tracking-tight text-foreground">
              {siteConfig.username}
            </span>
          </Link>
        </motion.div>

        {items?.length ? (
          <nav className="relative hidden items-center gap-1 md:flex">
            <motion.span
              layout
              className="pointer-events-none absolute inset-y-0 rounded-full bg-muted"
              style={pillStyle}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
            {items.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={item.disabled ? "#" : item.href}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={cn(
                    "relative z-10 flex items-center rounded-full px-4 py-1.5 text-sm font-medium font-raleway transition-colors duration-200",
                    isItemActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                    item.disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          <ThemeToggleButton />

          <motion.button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showMobileMenu ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-center"
              >
                {showMobileMenu ? (
                  <Icons.close className="h-4 w-4" />
                ) : (
                  <Icons.menu className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showMobileMenu && items && (
          <motion.div
            key="mobile-dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="p-2">
              {items.map((item, index) => {
                const isActive = isItemActive(item.href);

                return (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={mobileItemVariants}
                  >
                    <Link
                      href={item.disabled ? "#" : item.href}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium font-raleway transition-colors duration-150",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                        item.disabled && "cursor-not-allowed opacity-40"
                      )}
                    >
                      <span>{item.title}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-dot"
                          className="h-1.5 w-1.5 rounded-full bg-foreground/80"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {children && (
              <>
                <div className="mx-4 border-t border-border/60" />
                <div className="p-4">{children}</div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
