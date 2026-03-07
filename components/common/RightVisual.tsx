import React from 'react'
import { AnimatedText } from './animated-text'
import Image from "next/image";
import blurProfileImg from "@/assets/image/blurprofile.png";
import profileImg from "@/assets/image/profile-img.jpg";
import { siteConfig } from "../../config/site";

const RightVisual = () => {
  return (
    <AnimatedText delay={0.4}>
      <div className="group relative w-full overflow-hidden rounded-lg">
        <Image
          src={blurProfileImg}
          alt={`${siteConfig.authorName}`}
          width={900}
          height={1080}
          sizes="(max-width: 798px) 92vw, (max-width: 1280px) 44vw, 500px"
          className="h-auto w-full object-cover cursor-pointer object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          priority
        />
        <Image
          src={blurProfileImg}
          alt={`${siteConfig.authorName} blurred`}
          fill
          sizes="(max-width: 748px) 82vw, (max-width: 1220px) 34vw, 300px"
          className="pointer-events-none cursor-pointer absolute inset-0 object-cover object-center transition-opacity duration-700 ease-out group-hover:opacity-0"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
      </div>
    </AnimatedText>
  )
}

export default RightVisual
