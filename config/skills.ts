import { Icons } from "../components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "HTML 5",
    description:
      "Structure web content beautifully with the latest version of HyperText Markup Language.",
    rating: 5,
    icon: Icons.html5,
  },
  {
    name: "CSS 3",
    description:
      "Style web pages creatively with the latest iteration of Cascading Style Sheets.",
    rating: 5,
    icon: Icons.css3,
  },
  {
    name: "JavaScript",
    description:
      "Create interactive and dynamic web experiences with the versatile scripting language.",
    rating: 5,
    icon: Icons.javascript,
  },
  {
    name: "React",
    description:
      "Craft interactive user interfaces using components, state, props, and virtual DOM.",
    rating: 5,
    icon: Icons.react,
  },
  {
    name: "Tailwind CSS",
    description:
      "Design beautiful, modern websites faster with a utility-first CSS framework.",
    rating: 5,
    icon: Icons.tailwindcss,
  },
  {
    name: "PHP",
    description:
      "Server-side scripting language widely used for building dynamic web applications.",
    rating: 5,
    icon: Icons.php,
  },

    {
    name: "Laravel",
    description:
      "A PHP framework for building modern web applications with clean and elegant syntax.",
    rating: 5,
    icon: Icons.laravel,
  },
  {
    name: "C#",
    description:
      "Versatile programming language for backend, desktop, and cross-platform apps.",
    rating: 5,
    icon: Icons.csharp,
  },
  {
    name: ".NET MAUI",
    description:
      "Cross-platform framework for building native desktop and mobile apps using .NET.",
    rating: 5,
    icon: Icons.dotnet,
  },
  {
    name: "MySQL",
    description:
      "Manage and organize relational databases efficiently for data-driven applications.",
    rating: 5,
    icon: Icons.mysql,
  },
  {
    name: "Firebase",
    description:
      "Google's platform for building web and mobile apps with authentication, database, and hosting.",
    rating: 5,
    icon: Icons.firebase,
  },
  
    {
    name: "Git & GitHub",
    description:
      "Version control system and platform for managing code repositories and collaboration.",
    rating: 4,
    icon: Icons.gitHub,
  },

];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 8);
