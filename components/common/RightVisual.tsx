"use client";

import React, { useState, useEffect } from 'react'
import { useTheme } from "next-themes";
import { AnimatedText } from './animated-text'
import Image from "next/image";
import { siteConfig } from "../../config/site";

type Props = { delay?: number };

const RightVisual = ({ delay = 0.4 }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileImg =
    mounted && resolvedTheme === "dark" ? "/profile-dark.png" : "/profileweb.png";

  return (
    <AnimatedText delay={delay}>
      <div
        className="group relative w-full overflow-hidden rounded-lg"
        onClick={() => setIsRevealed((prev) => !prev)}
      >
        <Image
          src={profileImg}
          alt={`${siteConfig.authorName}`}
          width={900}
          height={1080}
          sizes="(max-width: 798px) 92vw, (max-width: 1280px) 44vw, 500px"
          className={`h-auto w-full object-cover object-center cursor-pointer transition-[filter,transform] duration-700 ease-out will-change-[filter,transform] group-hover:blur-0 group-hover:scale-100 ${
            isRevealed ? "blur-0 scale-100" : "blur-[2px] scale-[1.02]"
          }`}
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
      </div>
    </AnimatedText>
  )
}

export default RightVisual