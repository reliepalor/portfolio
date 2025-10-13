"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatedSection } from "./animated-section";
import { AnimatedText } from "./animated-text";
import ProjectCard from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons";
import Link from "next/link";
import { pagesConfig } from "../../config/pages";
import { featuredProjects } from "../../config/projects";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 256; // w-64 = 256px
      const gap = 16; // gap-4 = 16px
      const scrollPosition = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const cardWidth = 256;
        const gap = 16;
        const scrollLeft = scrollRef.current.scrollLeft;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setCurrentIndex(index);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <AnimatedSection
      direction="right"
      className="container space-y-6 py-8 sm:py-10 my-8 sm:my-14"
      id="projects"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <AnimatedText
          as="h2"
          className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
        >
          {pagesConfig.projects.title}
        </AnimatedText>
        <AnimatedText
          as="p"
          delay={0.2}
          className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
        >
          {pagesConfig.projects.description}
        </AnimatedText>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredProjects.map((exp, index) => (
            <div key={exp.id} className="flex-shrink-0 w-64">
              <AnimatedSection
                delay={0.1 * (index + 1)}
                direction="up"
              >
                <ProjectCard project={exp as any} />
              </AnimatedSection>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatedText delay={0.4} className="flex justify-center">
        <Link href="/projects">
          <Button variant={"outline"} className="rounded-xl">
            <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
          </Button>
        </Link>
      </AnimatedText>
    </AnimatedSection>
  );
}
