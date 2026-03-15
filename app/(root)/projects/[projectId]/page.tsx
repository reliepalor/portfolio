import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "../../../../components/common/icons";
import ProjectModeContent from "@/components/projects/project-mode-content";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "../../../../config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/assets/image/profile-img.jpg";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function Project({ params }: ProjectPageProps) {
  let project = Projects.find((val) => val.id === params.projectId);
  if (!project) {
    redirect("/projects");
  }

  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-fit"
          )}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:gap-10">
        <section className="space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 sm:p-7 lg:p-8">
          <time
            dateTime={Date.now().toString()}
            className="block text-sm text-muted-foreground"
          >
            {formatDateFromObj(new Date(project.startDate))}
          </time>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <h1 className="max-w-3xl font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {project.companyName}
            </h1>

            <div className="flex items-center gap-3">
              {project.githubLink && (
                <CustomTooltip text="Link to the source code.">
                  <Link href={project.githubLink} target="_blank" className="rounded-md border border-border/60 p-2 text-muted-foreground transition-colors hover:text-foreground">
                    <Icons.gitHub className="h-5 w-5" />
                  </Link>
                </CustomTooltip>
              )}
              {project.websiteLink && (
                <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                  <Link href={project.websiteLink} target="_blank" className="rounded-md border border-border/60 p-2 text-muted-foreground transition-colors hover:text-foreground">
                    <Icons.externalLink className="h-5 w-5" />
                  </Link>
                </CustomTooltip>
              )}
            </div>
          </div>

          <ChipContainer textArr={project.category} />
        </section>

        <aside className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-6 lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
            Project Author
          </p>
          <Link
            href={siteConfig.links.github}
            className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/70 p-3 text-sm"
          >
            <Image
              src={profileImg}
              alt={siteConfig.authorName}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{siteConfig.authorName}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </aside>
      </div>

      <section className="mt-8 space-y-6 rounded-2xl border border-border/60 bg-background/60 p-5 sm:mt-10 sm:p-7 lg:p-8">
        <h2 className="font-heading text-2xl leading-tight sm:text-3xl">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </section>

      <section className="mt-8 rounded-2xl border border-border/60 bg-background/60 p-5 sm:mt-10 sm:p-7 lg:p-8">
        <ProjectModeContent project={project} />
      </section>

      <div className="mt-10 flex justify-center border-t border-border/50 pt-8 sm:mt-12 sm:pt-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
