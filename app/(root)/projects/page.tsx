import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/common/animated-section";
import PageContainer from "@/components/common/page-container";
import LiveDemoButton from "@/components/projects/live-demo-button";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { pagesConfig } from "../../../config/pages";
import { Projects } from "../../../config/projects";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

const renderContent = (tabVal: string) => {
  let projectArr = Projects;
  if (tabVal === "personal") {
    projectArr = projectArr.filter((val) => val.type === "Personal");
  } else if (tabVal === "professional") {
    projectArr = projectArr.filter((val) => val.type === "Academics");
  }

  return (
    <div className="mx-auto my-5 w-full max-w-[1500px] px-2 sm:px-4 lg:px-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
        {projectArr.map((project, index) => (
          <AnimatedSection key={project.id} delay={0.08 * (index + 1)} direction="up">
            {(() => {
              const liveDemoHref = project.websiteLink ?? project.githubLink;
              const hasExternalLink = Boolean(liveDemoHref);

              return (
            <div className="group block transition-transform duration-200 hover:-translate-y-0.5">
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

              <div className="px-0 py-3.5">
                <p className="text-lg sm:text-xl font-normal text-foreground leading-[1.25] mb-1">
                  {project.companyName}
                </p>
                <p className="text-sm sm:text-base text-foreground/90 font-light leading-none">
                  {project.type}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {/* <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View Project
                  </Link> */}
                  <LiveDemoButton
                    href={liveDemoHref}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    note={project.liveDemoNote}
                    target={hasExternalLink ? "_blank" : undefined}
                    rel={hasExternalLink ? "noopener noreferrer" : undefined}
                  >
                    Live Demo
                  </LiveDemoButton>
                </div>
              </div>
            </div>
              );
            })()}
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const tabItems = [
    {
      value: "all",
      label: "All",
      content: renderContent("all"),
    },
    {
      value: "personal",
      label: "Personal",
      content: renderContent("personal"),
    },
    {
      value: "professional",
      label: "Academic",
      content: renderContent("professional"),
    },
  ];

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <ResponsiveTabs items={tabItems} defaultValue="all" />
    </PageContainer>
  );
}
