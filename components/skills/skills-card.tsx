import { skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  skills: skillsInterface[];
  compactMobile?: boolean;
}

const getHoverColorClass = (skillName: string) => {
  if (skillName === "HTML 5") return "hover:text-[#E34F26]";
  if (skillName === "CSS 3") return "hover:text-[#1572B6]";
  if (skillName === "JavaScript") return "hover:text-[#F7DF1E]";
  if (skillName === "React") return "hover:text-[#61DAFB]";
  if (skillName === "Tailwind CSS") return "hover:text-[#06B6D4]";
  if (skillName === "PHP") return "hover:text-[#777BB4]";
  if (skillName === "Laravel") return "hover:text-[#FF2D20]";
  if (skillName === "C#") return "hover:text-[#239120]";
  if (skillName === ".NET MAUI") return "hover:text-[#512BD4]";
  if (skillName === "MySQL") return "hover:text-[#4479A1]";
  if (skillName === "Firebase") return "hover:text-[#FFCA28]";
  if (skillName === "Git & GitHub") return "hover:text-[#535353]";
  if (skillName === "Vercel") return "hover:text-[#4c4c4c]";
  return "hover:text-primary";
};

const getMobileGroupLabel = (skillName: string) => {
  const frontend = new Set([
    "HTML 5",
    "CSS 3",
    "JavaScript",
    "React",
    "Tailwind CSS",
  ]);
  const backend = new Set(["PHP", "Laravel", "C#", "MySQL", "Firebase"]);
  const devTools = new Set([".NET MAUI", "Git & GitHub", "Vercel"]);

  if (frontend.has(skillName)) return "Frontend";
  if (backend.has(skillName)) return "Backend";
  if (devTools.has(skillName)) return "DevOps & Cloud";
  return "Others";
};

export default function SkillsCard({
  skills,
  compactMobile = false,
}: SkillsCardProps) {
  if (compactMobile) {
    const groupOrder = ["Frontend", "Backend", "DevOps & Cloud", "Others"];
    const groupedSkills = groupOrder
      .map((label) => ({
        label,
        items: skills.filter((skill) => getMobileGroupLabel(skill.name) === label),
      }))
      .filter((group) => group.items.length > 0);

    return (
      <div className="space-y-6">
        <div className="sm:hidden space-y-5">
          {groupedSkills.map((group) => (
            <div key={group.label} className="space-y-2">
              <h3 className="text-sm font-semibold text-center">{group.label}</h3>
              <div className="grid grid-cols-2 gap-2">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border bg-background px-3 text-xs font-medium ${getHoverColorClass(skill.name)}`}
                  >
                    <skill.icon className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="relative overflow-hidden rounded-lg border bg-background font-raleway p-1 transition-all duration-300 hover:shadow-md"
            >
              <div
                className={`flex h-[120px] flex-col items-center justify-center rounded-md p-4 transition-all duration-300 ${getHoverColorClass(skill.name)}`}
              >
                <skill.icon className="h-[30px] w-[30px] transition-all duration-300" />
                <h3 className="mt-2 text-sm font-medium text-center transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="relative overflow-hidden rounded-lg border bg-background font-raleway p-1 transition-all duration-300 hover:shadow-md"
        >
          <div
            className={`flex h-[120px] flex-col items-center justify-center rounded-md p-4 transition-all duration-300 ${getHoverColorClass(skill.name)}`}
          >
            <skill.icon className="h-[30px] w-[30px] transition-all duration-300" />
            <h3 className="mt-2 text-sm font-medium text-center transition-colors duration-300">
              {skill.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
