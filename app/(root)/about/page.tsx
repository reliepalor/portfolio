import { Metadata } from "next";
import { Briefcase, Code2, GraduationCap, Trophy, ArrowUpRight } from "lucide-react";

import PageContainer from "@/components/common/page-container";
import { siteConfig } from "../../../config/site";
import { pagesConfig } from "../../../config/pages";

interface Education {
  degree: string;
  school: string;
  period: string;
}

interface Achievement {
  title: string;
  event: string;
  year: string;
}

interface FreelanceProject {
  name: string;
  description: string;
}

const aboutData = {
  fullName: "John Relie Palor",
  description:
    "Dedicated to the craft of web development, building modern, responsive websites while improving through patience, discipline, and constant learning.",
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "Cagayan State University",
    period: "2022 – 2026",
  } as Education,
  achievements: [
    {
      title: "Static Web Design",
      event: "Uniwide ICT Skills Olympics CSU",
      year: "2025",
    },
    {
      title: "Static Web Design",
      event: "CSU-G Technolympics",
      year: "2024",
    },
  ] as Achievement[],
  freelanceProjects: [
    {
      name: "Jaya",
      description: "AI-powered quiz generator with multi-LLM fallback.",
    },
    {
      name: "Outspace",
      description: "E-commerce platform built end-to-end for a client.",
    },
  ] as FreelanceProject[],
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description:
    "Learn more about John Relie Palor, a web developer passionate about creating modern web experiences.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <PageContainer
      title={pagesConfig.about?.title ?? "About"}
      description={pagesConfig.about?.description ?? "A little about my path so far."}
    >
      <div className="mx-auto w-full max-w-3xl space-y-10">
        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {aboutData.fullName}
          </h1>
          <p className="text-lg text-muted-foreground">
            {aboutData.description}
          </p>
        </div>

        {/* Internship — highlighted, pinned at top */}
        <section
          className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75
          group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 sm:p-8
          transition-colors hover:border-foreground/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/30 transition-colors group-hover:bg-muted/60">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Internship
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  Software Engineer Intern · KMBI Inc.
                </h2>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Contributed to a live inventory management system built with
            .NET, C#, and SQL Server, deployed on Microsoft Azure using
            agile sprints. Tested and documented the APIs with Postman and
            Swagger.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["C#", ".NET", "SQL Server", "Azure", "Postman", "Swagger"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </section>

        {/* Freelance */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Freelance</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Designed, built, and delivered complete systems for clients
            from initial requirements to a working product in production.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {aboutData.freelanceProjects.map((project) => (
              <div
                key={project.name}
                className="group rounded-xl border border-border/60 bg-muted/20 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-muted/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{project.name}</h3>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-border/60 p-5 text-sm text-muted-foreground">
              Plus a few other client projects delivered along the way.
            </div>
          </div>
        </section>

        {/* Capstone / Research */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150 space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">
              Capstone &amp; research systems
            </h2>
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/20 p-5 transition-colors hover:bg-muted/40">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Alongside freelance work, I&apos;ve developed capstone and
              research systems for university clients helping students turn
              their thesis concepts into working, presentable software.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
          <div className="rounded-xl border border-border/60 p-6 transition-colors hover:border-foreground/30">
            <h3 className="text-xl font-semibold">
              {aboutData.education.degree}
            </h3>
            <p className="text-muted-foreground">{aboutData.education.school}</p>
            <p className="text-sm text-muted-foreground">
              {aboutData.education.period}
            </p>
          </div>
        </section>

        {/* Achievements */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold tracking-tight">Achievements</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aboutData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="rounded-xl border border-border/60 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30"
              >
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.event}
                </p>
                <p className="text-xs text-muted-foreground">
                  {achievement.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}