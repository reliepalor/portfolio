import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "../../components/common/icons";
import ContributionCard from "@/components/contributions/contribution-card";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredContributions } from "../../config/contributions";
import { experiences } from "../../config/experience";
import { pagesConfig } from "../../config/pages";
import { featuredProjects } from "../../config/projects";
import { siteConfig } from "../../config/site";
import { skills } from "../../config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/assets/image/profile-img.jpg";
import RightVisual from "@/components/common/RightVisual";

export const metadata: Metadata = {
  title: pagesConfig.home.metadata.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Web Developer",
    sameAs: [siteConfig.links.github, siteConfig.links.twitter],
  };

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
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="schema-software"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

    {/* ── Hero ─────────────────────────────────────────────────────────── */}
    <section className="bg-muted/20 overflow-x-clip">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-8 py-14 sm:px-8 md:px-10 lg:grid-cols-[0.72fr_1.3fr] lg:items-start lg:gap-16 lg:py-20">

        {/* Left — Text */}
        <div className="flex max-w-[31rem] flex-col pt-0 lg:justify-self-start lg:pt-2">

          {/* Heading */}
          <AnimatedText delay={0.05}>
            <h1 className="text-4xl sm:text-2xl lg:text-[3rem] font-normal tracking-[-0.03em] text-foreground leading-[0.98]">
              About me
            </h1>
          </AnimatedText>

          <AnimatedText delay={0.12}>
            <p className="mt-4 text-2xl sm:text-md lg:text-[1.10rem] font-normal text-foreground">
              I create premium templates for creatives.
            </p>
          </AnimatedText>

          {/* Description */}
          <AnimatedText delay={0.2}>
            <p className="mt-16 max-w-[34rem] text-[1.05rem] leading-[1.6] text-foreground [overflow-wrap:anywhere] break-words lg:mt-20">
              {siteConfig.description}
            </p>
          </AnimatedText>

        </div>

        {/* Right — Image only */}
        <div className="lg:mt-24 flex justify-center lg:justify-self-end lg:justify-end lg:pt-6">
          <div className="w-full max-w-[500px]">
            <RightVisual />
          </div>
        </div>

      </div>
    </section>

  {/* ── Skills ───────────────────────────────────────────────────────── */}
  <AnimatedSection
    className="mx-auto grid w-full max-w-[1760px] gap-10 px-4 py-16 sm:px-5 md:px-6 lg:grid-cols-[0.72fr_1.3fr] lg:items-start lg:gap-16 sm:py-20"
    id="skills"
  >
    {/* Section label */}
    <div className="w-full lg:pt-1">
      <AnimatedText>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-sans text-muted-foreground/50 tracking-widest uppercase">
              What I work with
            </p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-normal tracking-tight">
              Skills
            </h2>
          </div>
          {skills.length >= 12 && (
            <Link
              href="/skills"
              className="text-xs font-sans text-muted-foreground/50 hover:text-foreground transition-colors tracking-wider uppercase"
            >
              View all →
            </Link>
          )}
        </div>
      </AnimatedText>
    </div>

    <AnimatedText className="w-full lg:justify-self-end lg:max-w-[500px]">
      <SkillsCard skills={skills} compactMobile />
    </AnimatedText>
  </AnimatedSection>

      {/* ── Projects ──────────────────────────────────────────────────── */}
      <AnimatedSection
        direction="right"
        className="py-16 sm:py-20 border-t border-border/30"
        id="projects"
      >
        <div className="mx-auto w-full max-w-[1920px] px-3 sm:px-5 lg:px-6">

          {/* Header */}
          <AnimatedText>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-foreground/40 mb-1">
                  Selected work
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {pagesConfig.projects.title}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-[11px] font-sans tracking-widest uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-200"
              >
                View all →
              </Link>
            </div>
            <div className="h-px w-full bg-border/30 mb-10" />
          </AnimatedText>

          {/* Project grid — 2 cols, large preview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={0.1 * (index + 1)} direction="up">
                <Link
                  href={project.githubLink ?? project.websiteLink ?? `/projects/${project.id}`}
                  className="group block transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* Preview area */}
                  <div className="relative aspect-[16/10.2] rounded-md bg-[#e4e4e4] dark:bg-[#2a2a2a] overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-7">
                    <div className="relative h-[72%] w-[70%]">
                      <Image
                        src={project.companyLogoImg}
                        alt={`${project.companyName} preview`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>


                    <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/[0.02] dark:group-hover:bg-white/[0.03]" />
                  </div>

                  {/* Card footer — title + tag */}
                  <div className="px-0 py-3.5">
                    <div>
                      <p className="text-lg sm:text-xl font-normal text-foreground leading-[1.25] mb-1">
                        {project.companyName}
                      </p>
                      <p className="text-sm sm:text-base text-foreground/90 font-light leading-none">
                        {project.type}
                      </p>
                    </div>
                    <span className="hidden">
                      ↗
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </AnimatedSection>

    </ClientPageWrapper>
  );
}
