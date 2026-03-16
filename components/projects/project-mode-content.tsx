"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Icons } from "@/components/common/icons";
import {
  getProjectPreviewByMode,
  getProjectPreviews,
  ProjectInterface,
  ProjectViewMode,
} from "@/config/projects";

export default function ProjectModeContent({ project }: { project: ProjectInterface }) {
  const previews = useMemo(() => getProjectPreviews(project), [project]);
  const hasAdminPreview = Boolean(previews.admin);
  const [mode, setMode] = useState<ProjectViewMode>("user");

  const activeContent = useMemo(
    () => getProjectPreviewByMode(project, mode),
    [mode, project]
  );

  return (
    <>
      {/* ── Mode toggle ──────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-muted/20 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-xl leading-tight">Preview Mode</h2>
          <p className="text-sm text-muted-foreground">
            Switch between user and admin views for this project showcase.
          </p>
        </div>
        <div className="inline-flex w-fit rounded-xl border border-border/70 bg-background p-1">
          <button
            type="button"
            onClick={() => setMode("user")}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              mode === "user" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setMode("admin")}
            disabled={!hasAdminPreview}
            className={`rounded-lg px-4 py-2 text-sm transition-colors ${
              mode === "admin"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            } ${!hasAdminPreview ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        <section>
          <h2 className="mb-3 font-heading text-2xl leading-tight sm:text-3xl">
            Overview
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {activeContent.shortDescription}
          </p>
        </section>

        {/* Hero image */}
        <section>
          <Image
            src={activeContent.companyLogoImg}
            alt={`${project.companyName} ${mode} preview`}
            width={1280}
            height={720}
            className="w-full rounded-xl border bg-muted object-cover transition-colors"
            priority
          />
        </section>

        {/* Description — only when there is actual content */}
        {(activeContent.descriptionDetails.paragraphs.some((p) => p.trim().length > 0) ||
          activeContent.descriptionDetails.bullets.some((b) => b.trim().length > 0)) && (
          <section>
          
          </section>
        )}

        {/* Page Info */}
        <section>
          <h2 className="mb-5 font-heading text-2xl leading-tight sm:text-3xl">
            Page Info
          </h2>

          <div className="space-y-8">
            {activeContent.pagesInfoArr.map((page, ind) => (
              <div key={ind} className="rounded-xl border border-border/60 bg-muted/15 p-4 sm:p-5">
                <h3 className="flex items-center font-heading text-lg leading-tight sm:text-xl">
                  <Icons.star className="mr-2 h-4 w-4 shrink-0" /> {page.title}
                </h3>
                {page.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {page.description}
                  </p>
                )}

                {/* Images — full width */}
                <div className="mt-4 space-y-4">
                  {page.imgArr.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative w-full overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        src={img}
                        alt={img}
                        width={1280}
                        height={720}
                        className="w-full object-cover"
                        priority
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
