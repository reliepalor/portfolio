import React from 'react'
import { AnimatedText } from './animated-text'
import profileImg from "@/assets/image/profile-img.jpg";
import { siteConfig } from "../../config/site";
import { Link } from 'lucide-react';
import { Icons } from './icons';
import { Metadata } from 'next';
import { pagesConfig } from '@/config/pages';

export const metadata: Metadata = {
  title: pagesConfig.home.metadata.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};


const LeftVisual = () => {
      const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Web Developer",
    sameAs: [siteConfig.links.github, siteConfig.links.twitter],
  };

  // Structured data for website as a software application (template)
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
  };
  return (
            <div className="space-y-8 lg:space-y-12">
              {/* Status Indicator */}
              <AnimatedText delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  studying...
                </div>
              </AnimatedText>

              {/* Main Heading with Unique Typography */}
              <div className="space-y-4">
                <AnimatedText delay={0.2}>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[0.9] tracking-tight">
                    <span className="block text-muted-foreground/60 text-lg font-mono mb-2">
                    </span>
                    <span className="block font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {siteConfig.authorName}
                    </span>
                    <span className="block text-muted-foreground/60 text-lg font-mono mt-2">
                    </span>
                  </h1>
                </AnimatedText>
                
                <AnimatedText delay={0.4}>
                  <div className="text-xl sm:text-2xl text-muted-foreground font-light">
                    <span>Exploring the world of web</span>
                    <br />
                    <span className="text-black dark:text-gray-100">One pixel at a time</span>
                  </div>
                </AnimatedText>
              </div>

              {/* Description with Modern Layout */}
              <AnimatedText delay={0.6}>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-2 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent" />
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {siteConfig.description}
                  </p>
                </div>
              </AnimatedText>

              {/* Action Buttons with Unique Style */}
              <AnimatedText delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    className="group relative overflow-hidden rounded-xl bg-foreground text-background px-8 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-foreground/25"
                    aria-label={`View ${siteConfig.authorName}'s GitHub profile`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icons.gitHub className="w-5 h-5" />
                      Github
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
                    aria-label={`Contact ${siteConfig.authorName}`}
                  >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span className="font-medium">Let's connect</span>
                    <Icons.contact className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedText>

              {/* Minimalist Navigation Hint */}
              <AnimatedText delay={1.0}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
                  <div className="w-4 h-px bg-muted-foreground/30" />
                  scroll to explore
                </div>
              </AnimatedText>
            </div>
  )
}

export default LeftVisual
