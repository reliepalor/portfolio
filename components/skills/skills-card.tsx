import { skillsInterface } from "@/config/skills";

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
  return "hover:text-primary";
};

const getGroupLabel = (skillName: string) => {
  const normalized = skillName.trim().toLowerCase();

  const frontend = new Set(["html 5", "css 3", "typescript", "react", "angular", "tailwind css"]);
  const backend = new Set(["php", "laravel", ".net", "mysql", "firebase"]);
  const devTools = new Set([ "git & github", "git", "vercel","postman"]);

  if (frontend.has(normalized)) return "Frontend";
  if (backend.has(normalized)) return "Backend";
  if (devTools.has(normalized)) return "DevOps & Cloud";
  return "Others";
};

const groupOrder = ["Frontend", "Backend", "DevOps & Cloud", "Others"];

export default function SkillsCard({ skills, compactMobile = false }: SkillsCardProps) {
  const groupedSkills = groupOrder
    .map((label) => ({
      label,
      items: skills.filter((skill) => getGroupLabel(skill.name) === label),
    }))
    .filter((group) => group.items.length > 0);

  /* ── Mobile: grouped rows ── */
  const mobileView = (
    <div className="sm:hidden space-y-6">
      {groupedSkills.map((group) => (
        <div key={group.label}>
          {/* divider + label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] tracking-widest uppercase text-muted-foreground/50 font-sans whitespace-nowrap">
              {group.label}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {group.items.map((skill) => (
              <button
                key={skill.name}
                className={`flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 ${getHoverColorClass(skill.name)}`}
              >
                <skill.icon className="h-4 w-4 shrink-0" />
                <span>{skill.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  /* ── Desktop: two-column FAQ-style layout ── */
  const desktopView = (
    <div className="hidden sm:block w-full">
      {groupedSkills.map((group) => (
        <div key={group.label}>
          {/* top divider */}
          <div className="h-px bg-border" />
          <div className="py-5">
            <span className="text-xs tracking-widest uppercase text-muted-foreground/40 font-sans">
              {group.label}
            </span>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 cursor-default ${getHoverColorClass(skill.name)}`}
                >
                  <skill.icon className="h-4 w-4 shrink-0" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* bottom divider */}
      <div className="h-px bg-border" />
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
            className={`flex items-center gap-3 py-4 text-sm text-muted-foreground transition-colors duration-200 cursor-default ${getHoverColorClass(skill.name)}`}
          >
            <skill.icon className="h-4 w-4 shrink-0 ml-[11.5rem]" />
            <span>{skill.name}</span>
          </div>
          <div className="h-px bg-border" />
        </div>
      ))}
    </div>
  );
}
