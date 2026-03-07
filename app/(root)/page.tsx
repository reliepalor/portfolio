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
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">

        {/* Very subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Soft radial glow — bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.08) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left — Text */}
            <div className="space-y-10">

              {/* Availability badge */}
              <AnimatedText delay={0.05}>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  studying
                </span>
              </AnimatedText>

              {/* Name */}
              <AnimatedText delay={0.15}>
                <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold leading-[1.0] tracking-[-0.03em] text-foreground">
                  {siteConfig.authorName}
                </h1>
              </AnimatedText>

              {/* Tagline */}
              <AnimatedText delay={0.28}>
                <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-sm">
                  Exploring the world of web —{" "}
                  <span className="text-foreground font-normal">one pixel at a time.</span>
                </p>
              </AnimatedText>

              {/* Description with left rule */}
              <AnimatedText delay={0.4}>
                <div className="flex gap-5">
                  <div className="w-px flex-shrink-0 self-stretch bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                  <p className="text-sm text-muted-foreground leading-[1.85] max-w-xs">
                    {siteConfig.description}
                  </p>
                </div>
              </AnimatedText>

              {/* CTAs */}
              <AnimatedText delay={0.52}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    aria-label={`View ${siteConfig.authorName}'s GitHub profile`}
                    className="group inline-flex items-center gap-2.5 rounded-xl bg-foreground text-background px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-80 hover:shadow-xl hover:shadow-foreground/10 hover:-translate-y-px"
                  >
                    <Icons.gitHub className="w-4 h-4" />
                    GitHub
                  </Link>

                  <Link
                    href="/contact"
                    aria-label={`Contact ${siteConfig.authorName}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Let&apos;s connect
                    <Icons.contact className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </AnimatedText>

              {/* Scroll hint */}
              
            </div>

            {/* Right — Visual */}
            <div className="hidden lg:flex justify-end">
              <RightVisual />
            </div>
          </div>
        </div>

        {/* Scroll chevron */}
        <AnimatedText delay={0.9}>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <AnimatedText delay={0.65}>
                <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground/40 tracking-widest uppercase">
                  <div className="text-gray-700 w-6 h-px bg-muted-foreground/20" />
                  scroll to explore
                </div>
              </AnimatedText>
          </div>
        </AnimatedText>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <AnimatedSection
        className="container space-y-8 py-16 sm:py-20"
        id="skills"
      >
        {/* Section label */}
        <div className="mx-auto w-full max-w-[58rem]">
          <AnimatedText>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-muted-foreground/50 tracking-widest uppercase">
                  What I work with
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  {pagesConfig.skills.title}
                </h2>
              </div>
              {skills.length >= 12 && (
                <Link
                  href="/skills"
                  className="text-xs font-mono text-muted-foreground/50 hover:text-foreground transition-colors tracking-wider uppercase"
                >
                  View all →
                </Link>
              )}
            </div>
            {/* Section rule */}
            <div className="mt-6 h-px bg-gradient-to-r from-border via-border/50 to-transparent" />
          </AnimatedText>
        </div>

        <SkillsCard skills={skills} compactMobile />
      </AnimatedSection>

{/* ── Projects ──────────────────────────────────────────────────── */}
      <AnimatedSection
        direction="right"
        className="py-16 sm:py-20 border-t border-border/30"
        id="projects"
      >
        <div className="px-6 sm:px-12 lg:px-20">

          {/* Header */}
          <AnimatedText>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground/40 mb-1">
                  Selected work
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {pagesConfig.projects.title}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-200"
              >
                View all →
              </Link>
            </div>
            <div className="h-px w-full bg-border/30 mb-10" />
          </AnimatedText>

          {/* Project grid — 2 cols, card style like reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={0.1 * (index + 1)} direction="up">
                <Link
                  href={project.githubLink ?? project.websiteLink ?? `/projects/${project.id}`}
                  target="_blank"
                  className="group block rounded-2xl overflow-hidden border border-border/30 bg-muted/30 hover:border-border/60 transition-all duration-300"
                >
                  {/* Preview area — grey box with centered project name, like the reference screenshots */}
                  <div className="relative aspect-[16/10] bg-muted/50 flex items-center justify-center overflow-hidden">
                    <Image
                      src={project.companyLogoImg}
                      alt={`${project.companyName} preview`}
                      fill
                      className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
                    />


                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.02] transition-colors duration-300" />
                  </div>

                  {/* Card footer — title + tag */}
                  <div className="flex items-center justify-between px-5 py-4 border-t border-border/20">
                    <div>
                      <p className="text-sm font-medium text-foreground leading-none mb-1">
                        {project.companyName}
                      </p>
                      {project.techStack?.[0] && (
                        <p className="text-[11px] text-muted-foreground/50 font-mono">
                          {project.techStack[0]}
                        </p>
                      )}
                    </div>
                    <span className="text-muted-foreground/30 group-hover:text-muted-foreground text-sm transition-colors duration-200">
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
