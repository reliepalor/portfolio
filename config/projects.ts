import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
  videoUrl?: string; // optional demo video shown in modal
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export type ProjectViewMode = "user" | "admin";

export interface ProjectPreviewContent {
  shortDescription: string;
  companyLogoImg: string | string[];
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export interface ProjectPreviewSet {
  user: ProjectPreviewContent;
  admin?: ProjectPreviewContent;
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  liveDemoNote?: string;
  techStack: ValidSkills[];
  startDate: string;
  endDate: string;
  companyLogoImg: string | string[];
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
  adminPreview?: ProjectPreviewContent;
}

export function getProjectPreviews(project: ProjectInterface): ProjectPreviewSet {
  return {
    user: {
      shortDescription: project.shortDescription,
      companyLogoImg: project.companyLogoImg,
      descriptionDetails: project.descriptionDetails,
      pagesInfoArr: project.pagesInfoArr,
    },
    admin: project.adminPreview,
  };
}

export function getProjectPreviewByMode(
  project: ProjectInterface,
  mode: ProjectViewMode
): ProjectPreviewContent {
  const previews = getProjectPreviews(project);
  if (mode === "admin" && previews.admin) {
    return previews.admin;
  }

  return previews.user;
}

export const Projects: ProjectInterface[] = [
     //JAYA AI
  {
    id: "jaya",
    companyName: "Jaya | Just ask your AI",
    type: "Academics",
    category: ["Web Dev", "Full Stack", "AI"],
    shortDescription:
      "An AI-powered quiz platform that generates personalized quizzes on any topic in real time, using the Groq API for fast inference with OpenRouter as a fallback provider. Built with a TypeScript/Angular frontend and an Express.js backend handling AI-driven question generation, scoring, and adaptive feedback.",
    websiteLink: "https://jaya-ai.vercel.app/",
    githubLink: "https://github.com/reliepalor/quzzie.git",
    liveDemoNote: "Jaya AI generates custom quizzes on any topic using Groq (with OpenRouter as fallback) and turns learning into an interactive game.",    techStack: ["Typescript", "Angular", "express.js", "AI"],
    startDate: "2023-03-01", // adjust
    endDate: "2023-06-01",
    companyLogoImg: ["/projects/jaya/jaya3.png", "/projects/jaya/jaya2.png"],
    pagesInfoArr: [
      {
        title: " ",
        description: "",
        imgArr: ["/projects/jaya/jaya3.png", "/projects/jaya/jaya2.png"]
      },
    
    ],
    descriptionDetails: {
    paragraphs: [
      "Jaya AI is a full-stack quiz platform that turns any topic into a personalized, AI-generated quiz. Instead of static question banks, quizzes are generated on demand — the AI creates unique questions, answer choices, and explanations for whatever subject the user enters.",
      "The backend integrates the Groq API for fast AI inference, with OpenRouter configured as a fallback provider — [reasoning for fallback choice, once you confirm].",
      "[What you specifically built — once confirmed]",
    ],
    bullets: [
      "Built the quiz generation flow using Groq's API for low-latency AI responses.",
      "Configured OpenRouter as a fallback provider to maintain reliability [if AI service is down/rate-limited].",
      "Designed the frontend in Angular with TypeScript for a responsive, interactive quiz experience.",
      "Built the Express.js backend to handle AI requests, quiz session logic, and scoring.",
    ],
  },
  },

  //Digital Ecommerce
  {
    id: "videogame-ecommerce",
    companyName: "Outspace | Digital E-commerce",
    type: "Personal",
    category: ["Full Stack", "Web Dev", "API"],
    shortDescription:
  "A full-stack video game e-commerce platform with separate user and admin experiences — cart management, an order approval workflow, and a review & rating system on the customer side, backed by an admin dashboard with sales analytics and product key management. Built with ASP.NET Core Web API, Entity Framework Core, and Angular, secured with JWT authentication.",
    websiteLink: "https://outspace.vercel.app",
    githubLink: "https://github.com/reliepalor/videogames.git",
    liveDemoNote:
      "This live demo uses mock data and a mock environment, not the full production setup. Some features and data may be incomplete, inaccurate, or may not function as expected.\n\nCredentials for Admin\nAdmin: Admin@test.com\nPassword: Admin@123",
    techStack: [
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "JWT Authentication",
      "Angular",
      "Tailwind CSS",
      "SQL Server"
    ],
    startDate: "2025-12-01",
    endDate: "2026-01-20",
    companyLogoImg: ["/projects/videogames/images/outspace1.png", "/projects/videogames/images/outspace2.png"],
    pagesInfoArr: [
      {
        title: "User Welcome Page",
        description:
          "Users can view the Welcome Page with some videogames graphics.",
        imgArr: ["/projects/videogames/images/outspace1.png", "/projects/videogames/images/outspace2.png"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        title: "Games",
        description:
          "Users can view the available games.",
        imgArr: ["/projects/videogames/images/op-games.png"],
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        title: "Digital Products",
        description: "Users can view the available digital products.",
        imgArr: ["/projects/videogames/images/op-software.png"]
      },
      {
        title: "Order History",
        description:
          "Users can see their order history weather its Pending, Approved, or Rejected.",
        imgArr: ["/projects/videogames/images/op-orders.png"],
      },
      {
        title: "Carts",
        description: "Users can view their carts.",
        imgArr: ["/projects/videogames/images/op-cart.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: [
        "",
        
      ],
      bullets: [
        ""
      ],
    },
    adminPreview: {
      shortDescription:
        "Admin-side view for order approvals, product key assignment, sales analytics, and management tools.",
      companyLogoImg: "/projects/videogames/images/overview.png",
      descriptionDetails: {
        paragraphs: [
          "This admin-side preview demonstrates how the platform supports staff operations beyond customer purchasing flows.",
          "Administrators can monitor incoming orders, validate payments, assign product keys, and track revenue metrics from a centralized dashboard.",
        ],
        bullets: [
          "Review pending orders and approve or reject transactions.",
          "Assign digital product keys after successful approval.",
          "View sales and revenue insights for business monitoring.",
          "Manage catalog readiness for game and digital product listings.",
        ],
      },
      pagesInfoArr: [
        {
          title: "Admin Dashboard",
          description: "Centralized admin summary for order counts, sales overview, and management shortcuts.",
          imgArr: ["/projects/videogames/images/admin-dashboard.png"],
          videoUrl: "/projects/videogames/images/admin-dashboard.png",
        },
        {
          title: "Order Approval Panel",
          description: "Queue where admins verify purchases and decide approval/rejection status.",
          imgArr: ["/projects/videogames/images/approval.png"],
        },
      ],
    },
  },


  //Smart Library
  {
    id: "smart-lib",
    companyName: "Smart Lib | Digital Library Management",
    type: "Academics",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "A Laravel-based library system with QR-based book borrowing/returning, real-time book availability, and study space tracking.",
    websiteLink: undefined,
    githubLink: "https://github.com/reliepalor/library.git",
    liveDemoNote: "Live demo is not available yet.",
    techStack: ["Laravel", "PHP", "Firebase", "MySQL", "Tailwind CSS"],
    startDate: "2023-03-01", // adjust
    endDate: "2023-06-01",
    companyLogoImg: "/projects/smart-lib/dashboard.png",
    pagesInfoArr: [
      {
        title: "Librarian Dashboard",
        description: "Overview of Student List, number of student registered, charts and analytics.",
        imgArr: ["/projects/smart-lib/dashboard.png"]
      },
      {
        title: "QR Code Attendance",
        description: "Attendance tracking using QR Code, students can Borrow and return books using QR code scanning.",
        imgArr: ["/projects/smart-lib/qr.png", "/projects/smart-lib/qr1.png"],
      },
      {
        title: "Books",
        description: "Access to books from library and Internet books.",
        imgArr: ["/projects/smart-lib/books.png", "/projects/smart-lib/books1.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Smart Lib is a digital library management application designed to optimize both book and study space usage. Students can seamlessly register, check in, and borrow/return books using QR codes.",
        "The system provides real-time insights into available resources, making the library more efficient for both students and staff.",
      ],
      bullets: [
        "Developed a full-stack library management platform using Laravel.",
        "Implemented QR code scanning for book borrowing and returning.",
        "Tracked real-time availability of books and study spaces.",
        "Streamlined student registration and attendance tracking.",
      ],
    },
  },

  //Pet Ecommerce
  {
    id: "paw-haven",
    companyName: "Paw Haven | Pet Ecommerce",
    type: "Academics",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "A Laravel and Tailwind-based pet eCommerce platform where users can browse and order pets, accessories, and food, complete with email order confirmations.",
    websiteLink: undefined,
    githubLink: "https://github.com/reliepalor/pets.git",
    liveDemoNote: "Live demo is not available yet.",
    techStack: ["Laravel", "PHP", "Firebase", "MySQL", "Tailwind CSS"],
    startDate: "2023-01-01", 
    endDate: "2023-03-01",
    companyLogoImg: "/projects/paw-haven/vuew.png",
    pagesInfoArr: [
      {
        title: "Landing Page",
        description: "A clean landing page showcasing featured pets, products, and offers.",
        imgArr: ["/projects/paw-haven/vuew.png"],
      },
      {
        title: "Product Browsing",
        description: "Browse pets, accessories, and food with category filters.",
        imgArr: ["/projects/paw-haven/vuew.png"],
      },
      {
        title: "Order System",
        description: "Integrated checkout with order confirmation via email.",
        imgArr: ["/projects/paw-haven/vuew.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Paw Haven is a full-featured eCommerce web application tailored for pet lovers. Users can easily explore and purchase pets, accessories, and food items, all within a single platform.",
        "The system leverages Laravel and MySQL on the backend, with Tailwind CSS providing a responsive and modern design. Firebase is integrated for authentication and real-time functionality.",
        "A key highlight is the email notification system that confirms orders, ensuring users receive instant updates on their purchases.",
      ],
      bullets: [
        "Built a complete eCommerce platform using Laravel and Tailwind CSS.",
        "Implemented product browsing for pets, accessories, and food.",
        "Integrated Firebase for authentication and notifications.",
        "Added order confirmation system with automated email alerts.",
      ],
    },
  },


  
  // {
  //   id: "web-portfolio",
  //   companyName: "Personal Web Portfolio",
  //   type: "Personal",
  //   category: ["Web Dev", "Frontend", "UI/UX"],
  //   shortDescription:
  //     "A responsive portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
  //   websiteLink: undefined,
  //   githubLink: undefined,
  //   techStack: ["Next.js", "Typescript", "Tailwind CSS"],
  //   startDate: "2023-08-01",
  //   endDate: "2023-08-14",
  //   companyLogoImg: "/projects/portfolio/logo.png",
  //   pagesInfoArr: [
  //     {
  //       title: "Home Page",
  //       description: "Landing section with introduction and quick navigation.",
  //       imgArr: ["/projects/portfolio/logo.png"],
  //     },
  //     {
  //       title: "Projects Page",
  //       description: "Showcase of featured projects with details.",
  //       imgArr: ["/projects/portfolio/logo.png"],
  //     },
  //     {
  //       title: "Contact Page",
  //       description: "Simple contact form and social links.",
  //       imgArr: ["/projects/portfolio/logo.png"],
  //     },
  //   ],
  //   descriptionDetails: {
  //     paragraphs: [
  //       "My personal portfolio website highlights my technical skills and project experience. Built with Next.js and Tailwind CSS, it provides a clean and responsive design.",
  //       "The portfolio includes sections for featured projects, skills, and contact information.",
  //     ],
  //     bullets: [
  //       "Developed a responsive personal portfolio using Next.js and Tailwind CSS.",
  //       "Showcased featured projects with detailed descriptions.",
  //       "Implemented a clean UI with a focus on accessibility and responsiveness.",
  //     ],
  //   },
  // },



];

export const featuredProjects = Projects.slice(0, 4);
