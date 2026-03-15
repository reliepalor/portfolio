"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  getProjectPreviewByMode,
  getProjectPreviews,
  ProjectInterface,
  ProjectViewMode,
} from "@/config/projects";

type VideoModal = { title: string; videoUrl: string } | null;

export default function ProjectModeContent({ project }: { project: ProjectInterface }) {
  const previews = useMemo(() => getProjectPreviews(project), [project]);
  const hasAdminPreview = Boolean(previews.admin);
  const [mode, setMode] = useState<ProjectViewMode>("user");
  const [videoModal, setVideoModal] = useState<VideoModal>(null);

  const openVideo = useCallback((title: string, videoUrl: string) => {
    setVideoModal({ title, videoUrl });
  }, []);

  const closeVideo = useCallback(() => {
    setVideoModal(null);
  }, []);

  const activeContent = useMemo(
    () => getProjectPreviewByMode(project, mode),
    [mode, project]
  );

  return (
    <>
      {/* ── Video demo modal ─────────────────────────────────────────────── */}
      <Dialog open={Boolean(videoModal)} onOpenChange={(open) => { if (!open) closeVideo(); }}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-5 pt-5 pb-0">
            <DialogTitle className="text-base font-medium">{videoModal?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {videoModal && (
              <video
                key={videoModal.videoUrl}
                src={videoModal.videoUrl}
                controls
                autoPlay
                className="h-full w-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

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

                {/* Images — full width, play button overlay if videoUrl present */}
                <div className="mt-4 space-y-4">
                  {page.imgArr.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="group relative w-full overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        src={img}
                        alt={img}
                        width={1280}
                        height={720}
                        className="w-full object-cover"
                        priority
                      />

                      {/* Play button — bottom-left, low opacity on mobile, full on desktop hover */}
                      {page.videoUrl && (
                        <button
                          type="button"
                          onClick={() => openVideo(page.title, page.videoUrl!)}
                          aria-label={`Play demo video for ${page.title}`}
                          className="absolute bottom-3 left-3 opacity-40 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
                        >
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white ring-2 ring-white/30 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                            <Icons.play className="ml-0.5 h-5 w-5" />
                          </span>
                        </button>
                      )}
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
