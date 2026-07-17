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
import ProjectCardImageCarousel from "@/components/projects/project-card-image-carousel";
import LiveDemoButton from "@/components/projects/live-demo-button";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { featuredContributions } from "../../config/contributions";
import { experiences } from "../../config/experience";
import { pagesConfig } from "../../config/pages";
import { Projects } from "../../config/projects";
import { siteConfig } from "../../config/site";
import { skills } from "../../config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/assets/image/profile-img.jpg";
import RightVisual from "@/components/common/RightVisual";
import SplashWrapper from "@/components/ui/splashWrapper";

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
    <>
      <SplashWrapper>

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
      <section className="overflow-x-clip flex justify-center items-center mx-auto">
        <div className="mx-auto flex w-full max-w-[850px] flex-col gap-6 px-6 py-12 sm:px-8 lg:flex-row lg:items-start lg:gap-8 lg:py-16">

          {/* Left — Text */}
          <div className="flex max-w-[26rem] flex-col lg:order-2 lg:pt-2">

            <AnimatedText delay={0.05}>
              <h1 className="text-4xl font-normal tracking-[-0.03em] text-foreground leading-[0.98] lg:text-[2.5rem]">
                About me
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.12}>
              <p className="mt-3 text-lg font-normal text-foreground/90 lg:text-[1.05rem]">
                Building software with curiosity and purpose.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="mt-5 max-w-[28rem] text-[0.95rem] leading-[1.65] text-muted-foreground text-justify">
                {siteConfig.description}
              </p>
            </AnimatedText>

          </div>

          {/* Right — Image only */}
          <div className="flex justify-center lg:order-1 lg:justify-start">
            <div className="w-full max-w-[290px] shrink-0 mx-4">
              <RightVisual delay={0.4} />
            </div>
          </div>

        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <AnimatedSection
        className="mx-auto flex w-full max-w-[790px] flex-col gap-6 px-6 py-12 sm:px-8 lg:py-16"
        id="skills"
      >
        {/* Section label */}
        <AnimatedText>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-sans text-muted-foreground/50 tracking-widest uppercase">
                What I work with
              </p>
              <h2 className="mt-2 text-4xl font-normal tracking-tight lg:text-5xl">
                Skills
              </h2>
            </div>
          </div>
        </AnimatedText>

        <AnimatedText className="w-full">
          <SkillsCard skills={skills} compactMobile />
        </AnimatedText>
      </AnimatedSection>

       {/* ── Projects ──────────────────────────────────────────────────── */}
      <AnimatedSection
        direction="right"
        className="border-t border-border/30 py-12 lg:py-16"
        id="projects"
      >
        <div className="mx-auto w-full max-w-[850px] px-6 sm:px-8">
          <AnimatedText>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[11px] font-sans text-muted-foreground/50 tracking-widest uppercase">
                  Selected work
                </p>
                <h2 className="mt-2 text-4xl font-normal tracking-tight sm:text-5xl">
                  {pagesConfig.projects.title}
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-sans text-muted-foreground/50 transition-colors tracking-wider uppercase hover:text-foreground"
              >
                View all →
              </Link>
            </div>
          </AnimatedText>

          {/* Project grid — 2 cols, compact preview cards */}
          <AnimatedText>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
              {Projects.map((project, index) => (
                <AnimatedSection key={project.id} delay={0.1 * (index + 1)} direction="up">
                  {(() => {
                    const liveDemoHref = project.websiteLink ?? project.githubLink;
                    const hasExternalLink = Boolean(liveDemoHref);

                    return (
                      <div className="group block transition-transform duration-200 hover:-translate-y-0.5">
                        <Link href={`/projects/${project.id}`} className="block">
                           {/* Preview area */}
                           <div className="relative aspect-[16/10.2] overflow-hidden rounded-md bg-[#e4e4e4] p-2 flex items-center justify-center dark:bg-[#2a2a2a] sm:p-3">
                             <ProjectCardImageCarousel
                               images={Array.isArray(project.companyLogoImg) ? project.companyLogoImg : [project.companyLogoImg]}
                               alt={`${project.companyName} preview`}
                               className="transition-transform duration-300 group-hover:scale-[1.03]"
                             />

                            <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/[0.02] dark:group-hover:bg-white/[0.03]" />
                          </div>

                          {/* Card footer — title + tag */}
                          <div className="px-0 py-3">
                            <p className="mb-1 text-base font-normal leading-[1.25] text-foreground sm:text-lg">
                              {project.companyName}
                            </p>
                          </div>
                        </Link>

                        <div className="-mt-1 px-0 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <LiveDemoButton
                              href={liveDemoHref}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                              note={project.liveDemoNote}
                              target={hasExternalLink ? "_blank" : undefined}
                              rel={hasExternalLink ? "noopener noreferrer" : undefined}
                            >
                              Live Demo
                            </LiveDemoButton>
                            <div className="-my-3 flex flex-wrap items-center gap-2">
                              <ChipContainer textArr={project.techStack.slice(0, 4)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </AnimatedSection>
              ))}
            </div>
          </AnimatedText>
        </div>
      </AnimatedSection>

        </ClientPageWrapper>
      </SplashWrapper>
    </>
  );
}
