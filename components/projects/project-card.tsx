"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Icons } from "../common/icons";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

// Type wrapper to handle Vercel build type conflicts
type ProjectCardProps = {
  project: Omit<ProjectInterface, 'startDate' | 'endDate'> & {
    startDate: string | Date;
    endDate: string | Date;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasPrimaryLink = Boolean(project.websiteLink || project.githubLink);
  const primaryLink = project.websiteLink || project.githubLink || `/projects/${project.id}`;

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/95 transition-all duration-500 hover:-translate-y-1 hover:border-border hover:shadow-2xl hover:shadow-black/10"
      initial={{ opacity: 0, y: 56, scale: 0.96, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-120px" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-80" />
        <Image
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          src={project.companyLogoImg}
          alt={`${project.companyName} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 45vw"
        />
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-3 sm:p-4">
          <span className="rounded-full border border-border/70 bg-background/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-sm">
            {project.type}
          </span>
          <span className="rounded-full border border-border/70 bg-background/90 p-2 text-muted-foreground backdrop-blur-sm">
            {project.type === "Personal" ? (
              <Icons.userFill className="h-3.5 w-3.5" />
            ) : (
              <Icons.work className="h-3.5 w-3.5" />
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
        <div className="space-y-2.5">
          <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground sm:text-lg lg:text-xl">
            {project.companyName}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground lg:text-[15px]">
            {project.shortDescription}
          </p>
        </div>

        <div className="min-h-[2.25rem] lg:min-h-[2.5rem]">
          <ChipContainer textArr={project.category.slice(0, 3)} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/50 pt-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary lg:text-[15px]"
          >
            View Project
            <Icons.chevronRight className="h-4 w-4" />
          </Link>

          {hasPrimaryLink && (
            <Link
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Live
              <Icons.externalLink className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
