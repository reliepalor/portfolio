"use client";

import { skillsInterface } from "@/config/skills";
import { motion } from "framer-motion";
import { Icons } from "@/components/common/icons";

interface SkillsCardProps {
  skills: skillsInterface[];
  compactMobile?: boolean;
}

const getHoverColorClass = (skillName: string) => {
  const normalized = skillName.trim().toLowerCase();

  if (normalized === "html 5") return "hover:text-[#E34F26]";
  if (normalized === "css 3") return "hover:text-[#1572B6]";
  if (normalized === "typescript") return "hover:text-[#F7DF1E]";
  if (normalized === "react") return "hover:text-[#61DAFB]";
  if (normalized === "angular") return "hover:text-[#DD0031]";
  if (normalized === "tailwind css") return "hover:text-[#06B6D4]";
  if (normalized === "php") return "hover:text-[#777BB4]";
  if (normalized === "laravel") return "hover:text-[#FF2D20]";
  if (normalized === ".net maui" || normalized === ".net")
    return "hover:text-[#512BD4]";
  if (normalized === "mysql") return "hover:text-[#4479A1]";
  if (normalized === "firebase") return "hover:text-[#FFCA28]";
  if (normalized === "git & github" || normalized === "git")
    return "hover:text-[#535353]";
  if (normalized === "postman") return "hover:text-[#FF2D20]";
  if (normalized === "vercel") return "hover:text-[#4c4c4c]";
  if (normalized === "next.js") return "hover:text-[#000000] dark:hover:text-white";
  if (normalized === "node.js") return "hover:text-[#339933]";
  if (normalized === "postgresql") return "hover:text-[#336791]";
  if (normalized === "docker") return "hover:text-[#2496ED]";
  return "hover:text-primary";
};

const getGroupLabel = (skillName: string) => {
  const normalized = skillName.trim().toLowerCase();
  const frontend = new Set([
    "html 5",
    "css 3",
    "typescript",
    "react",
    "angular",
    "tailwind css",
    "javascript",
    "next.js",
  ]);

  const backend = new Set(["php", "laravel", ".net", "express", "express.js", "node.js"]);

  const database = new Set([
    "mysql",
    "firebase",
    "mssql",
    "ms sql",
    "supabase",
    "postgresql",
  ]);

  const tools = new Set(["git & github", "git", "postman", "vercel", "docker"]);

  if (frontend.has(normalized)) return "Frontend";
  if (backend.has(normalized)) return "Backend";
  if (database.has(normalized)) return "Database";
  if (tools.has(normalized)) return "Tools";
  return "";
};

// Left column: Frontend, Backend
// Right column: Database, Tools
const leftGroupOrder = ["Frontend", "Backend"];
const rightGroupOrder = ["Database", "Tools"];

export default function SkillsCard({ skills, compactMobile = false }: SkillsCardProps) {
  const buildGroups = (order: string[]) =>
    order
      .map((label) => ({
        label,
        items: skills.filter((skill) => getGroupLabel(skill.name) === label),
      }))
      .filter((group) => group.items.length > 0);

  const leftGroups = buildGroups(leftGroupOrder);
  const rightGroups = buildGroups(rightGroupOrder);
  const allGroups = [...leftGroups, ...rightGroups];

  const renderGroup = (group: { label: string; items: skillsInterface[] }, index: number) => (
    <motion.div
      key={group.label}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.38, delay: index * 0.12, ease: "easeOut" }}
    >
      <div className="py-3.5">
        <span className="text-[11px] tracking-widest uppercase text-muted-foreground/40 font-sans">
          {group.label}
        </span>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2">
          {group.items.map((skill) => {
            const Icon = (Icons as any)[skill.icon];
            return (
              <div
                key={skill.name}
                className={`flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors duration-200 cursor-default ${getHoverColorClass(skill.name)}`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" /> : null}
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  const Divider = () => <div className="col-span-2 h-px bg-border" />;

  /* ── Mobile: grouped rows, single column ── */
  const mobileView = (
    <div className="sm:hidden space-y-5">
      {allGroups.map((group, index) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, delay: index * 0.18, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground/50 font-sans whitespace-nowrap">
              {group.label}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-3">
            {group.items.map((skill) => {
              const Icon = (Icons as any)[skill.icon];
              return (
                <button
                  key={skill.name}
                  className={`flex items-center gap-2 text-[13px] text-muted-foreground transition-colors duration-200 ${getHoverColorClass(skill.name)}`}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" /> : null}
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );

  /* ── Desktop: two-column layout — Frontend/Backend left, Database/Tools right ──
     A single grid with full-width divider rows keeps the left/right lines
     perfectly aligned regardless of how many items each group contains. ── */
  const desktopView = (
    <div className="hidden sm:grid w-full grid-cols-[1fr_1fr] gap-x-10">
      <Divider />
      {leftGroups.map((group, index) => (
        <div key={group.label} className="contents">
          <div className="py-0.5">{renderGroup(group, index)}</div>
          <div className="py-0.5">
            {rightGroups[index]
              ? renderGroup(rightGroups[index], index + leftGroups.length)
              : null}
          </div>
          <Divider />
        </div>
      ))}
      {rightGroups.slice(leftGroups.length).map((group, i) => {
        const index = i + leftGroups.length;
        return (
          <div key={group.label} className="contents">
            <div className="py-0.5" />
            <div className="py-0.5">{renderGroup(group, index + leftGroups.length)}</div>
            <Divider />
          </div>
        );
      })}
    </div>
  );

  if (compactMobile) {
    return (
      <>
        {mobileView}
        {desktopView}
      </>
    );
  }

  /* fallback: flat list */
  return (
    <div className="w-full">
      <div className="h-px bg-border" />
      {skills.map((skill) => (
        <div key={skill.name}>
          <div
            className={`flex items-center gap-3 py-3.5 text-[13px] text-muted-foreground transition-colors duration-200 cursor-default ${getHoverColorClass(skill.name)}`}
          >
            {(() => {
              const Icon = (Icons as any)[skill.icon];
              return Icon ? <Icon className="h-3.5 w-3.5 shrink-0 ml-[11.5rem]" /> : null;
            })()}
            <span>{skill.name}</span>
          </div>
          <div className="h-px bg-border" />
        </div>
      ))}
    </div>
  );
}