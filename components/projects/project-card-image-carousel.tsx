"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ProjectCardImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ProjectCardImageCarousel({
  images,
  alt,
  className = "",
}: ProjectCardImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<string[]>([]);

  const validImages = images.filter((src) => !failedSrcs.includes(src));

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [validImages.length]);

  useEffect(() => {
    if (activeIndex >= validImages.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, validImages.length]);

  if (validImages.length === 0) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence initial={false}>
        {validImages.map((src, index) =>
          index === activeIndex ? (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center p-3 sm:p-4"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className={`object-contain ${className}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 45vw"
                onError={() =>
                  setFailedSrcs((prev) =>
                    prev.includes(src) ? prev : [...prev, src]
                  )
                }
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
