import { ValidPages } from "./constants";
import { siteConfig } from "./site";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: siteConfig.name,
      description: `${siteConfig.authorName}'s portfolio website.`,
    },
  },
  skills: {
    title: "Tech Stack",
    description: "Key skills that define my professional identity.",
    metadata: {
      title: siteConfig.name,
      description:
        `${siteConfig.authorName}'s key skills that define their professional identity.`,
    },
  },
  projects: {
    title: "Projects",
    description: "Showcasing impactful projects and technical achievements.",
    metadata: {
      title: siteConfig.name,
      description: `${siteConfig.authorName}'s projects in building web applications.`,
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: siteConfig.name,
      description: `Contact ${siteConfig.authorName}.`,
    },
  },
  contributions: {
    title: "Contributions",
    description: "Open-source contributions and community involvement.",
    metadata: {
      title: siteConfig.name,
      description:
        `${siteConfig.authorName}'s open-source contributions and community involvement.`,
    },
  },
  resume: {
    title: "Resume",
    description: `${siteConfig.authorName}'s resume.`,
    metadata: {
      title: siteConfig.name,
      description: `${siteConfig.authorName}'s resume.`,
    },
  },
  experience: {
    title: "Experience",
    description: "Professional journey and career timeline.",
    metadata: {
      title: siteConfig.name,
      description:
        `${siteConfig.authorName}'s professional journey and experience timeline.`,
    },
  },
  about: {
    title: "About",
    description: "Learn more about John Relie Palor, a web developer passionate about creating modern web experiences.",
    metadata: {
      title: siteConfig.name,
      description: "Learn more about John Relie Palor, a web developer passionate about creating modern web experiences.",
    },
  },
};
