import Rating from "@/components/skills/rating";
import { skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  skills: skillsInterface[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {skills.map((skill, id) => (
        <div
          key={id}
          className="relative overflow-hidden rounded-lg border bg-background font-raleway p-1 transition-all duration-300 hover:shadow-md"
        >
          <div
            className={`flex h-[120px] flex-col items-center justify-center rounded-md p-4 transition-all duration-300 hover:bg-opacity-10 ${
              skill.name === "HTML 5"
                ? "hover:text-[#E34F26]"
                : skill.name === "CSS 3"
                ? "hover:text-[#1572B6]"
                : skill.name === "JavaScript"
                ? "hover:text-[#F7DF1E]"
                : skill.name === "React"
                ? "hover:text-[#61DAFB]"
                : skill.name === "Tailwind CSS"
                ? "hover:text-[#06B6D4]"
                : skill.name === "PHP"
                ? "hover:text-[#777BB4]"
                : skill.name === "Laravel"
                ? "hover:text-[#FF2D20]"
                : skill.name === "C#"
                ? "hover:text-[#239120]"
                : skill.name === ".NET MAUI"
                ? "hover:text-[#512BD4]"
                : skill.name === "MySQL"
                ? "hover:text-[#4479A1]"
                : skill.name === "Firebase"
                ? "hover:text-[#FFCA28]"
                : skill.name === "Git & GitHub"
                ? "hover:text-[#535353]"
                : skill.name === "Vercel"
                ? "hover:text-[#4c4c4c]"
                : "hover:text-primary"
            }`}
          >
            <skill.icon
              size={30}
              className={`transition-all duration-300 ${
                skill.name === "HTML 5"
                  ? "hover:text-[#E34F26]"
                  : skill.name === "CSS 3"
                  ? "hover:text-[#1572B6]"
                  : skill.name === "JavaScript"
                  ? "hover:text-[#F7DF1E]"
                  : skill.name === "React"
                  ? "hover:text-[#61DAFB]"
                  : skill.name === "Tailwind CSS"
                  ? "hover:text-[#06B6D4]"
                  : skill.name === "PHP"
                  ? "hover:text-[#777BB4]"
                  : skill.name === "Laravel"
                  ? "hover:text-[#FF2D20]"
                  : skill.name === "C#"
                  ? "hover:text-[#239120]"
                  : skill.name === ".NET MAUI"
                  ? "hover:text-[#512BD4]"
                  : skill.name === "MySQL"
                  ? "hover:text-[#4479A1]"
                  : skill.name === "Firebase"
                  ? "hover:text-[#FFCA28]"
                  : skill.name === "Git & GitHub"
                  ? "hover:text-[#535353]"
                  : skill.name === "Vercel"
                  ? "hover:text-[#4c4c4c]"
                  : "hover:text-primary"
              }`}
            />
            <h3 className="mt-2 text-sm font-medium text-center transition-colors duration-300 hover:text-primary">
              {skill.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
