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
import { featuredSkills } from "../../config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/assets/image/profile-img.jpg";

export const metadata: Metadata = {
  title: pagesConfig.home.metadata.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  // Structured data for personal portfolio
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

      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/20">
        {/* Floating geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-2000" />
          <div className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-primary/50 rounded-full animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            
            {/* Left Column - Content */}
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

            {/* Right Column - Visual Element */}
            <div className="relative flex justify-center lg:justify-end">
              <AnimatedText delay={0.5}>
                <div className="relative">
                  {/* Floating Card Container */}
                  <div className="relative bg-card border border-border/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                    {/* Profile Image with Modern Frame */}
                    <div className="relative mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-sm hover:shadow-lg" />  
                      <Image
                        src={profileImg}
                        height={120}
                        width={120}
                        sizes="120px"
                        className="relative rounded-full w-[120px] h-[120px] hover:scale-105 duration-200 ease-in-out object-cover border-2 border-background cursor-pointer"
                        alt={`${siteConfig.authorName} - Developer Portfolio`}
                        priority
                      />
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-3 text-center">
                      <div className="text-sm text-muted-foreground font-mono">
                        Web Developer
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex justify-center gap-6 text-xs ">
                        <div className="w-[7rem] text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-60" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary/40 rounded-full opacity-40" />
                  </div>

                  {/* Floating Background Elements */}
                  <div className="absolute -z-10 top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
                  <div className="absolute -z-10 -bottom-4 -left-4 w-16 h-16 bg-primary/3 rounded-full blur-lg" />
                </div>
              </AnimatedText>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimatedText delay={1.2}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <Icons.chevronDown className="h-5 w-5 animate-bounce" />
            </div>
          </div>
        </AnimatedText>
      </section>

      {/* Rest of the sections remain the same */}
      <AnimatedSection
        className="container space-y-6 bg-muted py-10"
        id="skills"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <AnimatedText
            as="h2"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            {pagesConfig.skills.title}
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.2}
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {pagesConfig.skills.description}
          </AnimatedText>
        </div>
        <SkillsCard skills={featuredSkills} />
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/skills">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>

      <AnimatedSection
        direction="right"
        className="container space-y-6 py-10 my-14"
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
        <div className="mx-auto grid justify-center gap-4 md:w-full lg:grid-cols-3">
          {featuredProjects.map((exp, index) => (
            <AnimatedSection
              key={exp.id}
              delay={0.1 * (index + 1)}
              direction="up"
            >
              <ProjectCard project={exp as any} />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedText delay={0.4} className="flex justify-center">
          <Link href="/projects">
            <Button variant={"outline"} className="rounded-xl">
              <Icons.chevronDown className="mr-2 h-4 w-4" /> View All
            </Button>
          </Link>
        </AnimatedText>
      </AnimatedSection>

    </ClientPageWrapper>
  );
}