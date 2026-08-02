"use client";

import React, { useEffect, useState } from "react";

type Day = { date: string; contributionCount: number };
type Week = { contributionDays: Day[] };
type Calendar = { totalContributions: number; weeks: Week[] };

const GithubDotGraph = () => {
  const [data, setData] = useState<Calendar | null>(null);
  const [hovered, setHovered] = useState<{ day: Day; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) setData(json);
      })
      .catch(() => setData(null));
  }, []);

  if (!data) return null;

  const max = Math.max(
    ...data.weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount))
  );

  const cellColor = (count: number) => {
    if (count === 0) return "bg-muted-foreground/10";
    const ratio = count / max;
    if (ratio > 0.75) return "bg-foreground";
    if (ratio > 0.4) return "bg-foreground/70";
    if (ratio > 0.15) return "bg-foreground/45";
    return "bg-foreground/25";
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const profileUrl = "https://github.com/" + username;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm tracking-wide text-muted-foreground">
                <p className="mt-4 text-xs tracking-wide text-muted-foreground">
        {data.totalContributions.toLocaleString()} contributions in the last year
      </p>
        </span>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-10"
        >
          @{username}
        </a>
      </div>

      <div className="relative">
        {hovered && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md transition-opacity duration-150"
            style={{ left: hovered.x, top: hovered.y - 8 }}
          >
            <span className="font-medium">
              {hovered.day.contributionCount}{" "}
              {hovered.day.contributionCount === 1 ? "contribution" : "contributions"}
            </span>
            <span className="block text-background/70">
              {formatDate(hovered.day.date)}
            </span>
            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground" />
          </div>
        )}

        <div className="flex gap-[3px] overflow-x-auto pb-2">
          {data.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day, di) => (
                <div
                  key={di}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const parent = e.currentTarget.closest(".relative")!.getBoundingClientRect();
                    setHovered({
                      day,
                      x: rect.left - parent.left + rect.width / 2,
                      y: rect.top - parent.top,
                    });
                  }}
                  onMouseLeave={() => setHovered(null)}
                  className={
                    "h-[11px] w-[11px] rounded-[2px] transition-all duration-150 ease-out hover:scale-125 hover:outline hover:outline-1 hover:outline-foreground/40 " +
                    cellColor(day.contributionCount)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default GithubDotGraph;