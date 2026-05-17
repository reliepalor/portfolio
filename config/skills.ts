// Use icon keys (strings) instead of importing components here

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: string;
}

export const skillsUnsorted: skillsInterface[] = [

  {
    name: "Typescript",
    description:
      "Create interactive and dynamic web experiences with the versatile scripting language.",
    rating: 5,
    icon: "typescript",
  },
  {
    name: "React",
    description:
      "Craft interactive user interfaces using components, state, props, and virtual DOM.",
    rating: 5,
    icon: "react",
  },
  {
    name: "Angular",
    description: "",
    rating: 5,
    icon: "angular",
  },
  {
    name: "Tailwind CSS",
    description:
      "Design beautiful, modern websites faster with a utility-first CSS framework.",
    rating: 5,
    icon: "tailwindcss",
  },
  {
    name: "PHP",
    description:
      "Server-side scripting language widely used for building dynamic web applications.",
    rating: 5,
    icon: "php",
  },

    {
    name: "Laravel",
    description:
      "A PHP framework for building modern web applications with clean and elegant syntax.",
    rating: 5,
    icon: "laravel",
  },

  {
    name: ".NET",
    description:
      "Cross-platform framework for building native desktop and mobile apps using .NET.",
    rating: 5,
    icon: "dotnet",
  },
  {
    name: "MySQL",
    description:
      "Manage and organize relational databases efficiently for data-driven applications.",
    rating: 5,
    icon: "mysql",
  },
  {
    name: "Firebase",
    description:
      "Google's platform for building web and mobile apps with authentication, database, and hosting.",
    rating: 5,
    icon: "firebase",
  },
  
    {
    name: "Git",
    description:
      "Version control system and platform for managing code repositories and collaboration.",
    rating: 4,
    icon: "gitHub",
  },
      {
    name: "Postman",
    description:
      "Version control system and platform for managing code repositories and collaboration.",
    rating: 4,
    icon: "post",
  },
    {
      name: "Vercel",
      description: "Platform for frontend hosting and edge functions.",
      rating: 4,
      icon: "vercel",
    },
    {
      name: "Supabase",
      description: "An open-source Firebase alternative — Postgres, Auth, and realtime.",
      rating: 4,
      icon: "supabase",
    },
    {
      name: "MS SQL",
      description: "Microsoft SQL Server — relational database system.",
      rating: 4,
      icon: "mssql",
    },
    {
      name: "Express.js",
      description: "Fast, unopinionated, minimalist web framework for Node.js.",
      rating: 5,
      icon: "express",
    },

];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 8);
