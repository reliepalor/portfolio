import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: string;
  endDate: string;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "paw-haven",
    companyName: "Paw Haven - Pet Ecommerce",
    type: "Professional",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "A Laravel and Tailwind-based pet eCommerce platform where users can browse and order pets, accessories, and food, complete with email order confirmations.",
    websiteLink: undefined,
    githubLink: undefined,
    techStack: ["Laravel", "PHP", "Firebase", "MySQL", "Tailwind CSS"],
    startDate: "2023-01-01", 
    endDate: "2023-03-01",
    companyLogoImg: "/projects/paw-haven/logo.png", // placeholder
    pagesInfoArr: [
      {
        title: "Landing Page",
        description: "A clean landing page showcasing featured pets, products, and offers.",
        imgArr: ["/projects/paw-haven/landing.png"], // placeholder
      },
      {
        title: "Product Browsing",
        description: "Browse pets, accessories, and food with category filters.",
        imgArr: ["/projects/paw-haven/products.png"], // placeholder
      },
      {
        title: "Order System",
        description: "Integrated checkout with order confirmation via email.",
        imgArr: ["/projects/paw-haven/orders.png"], // placeholder
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
  {
    id: "smart-lib",
    companyName: "Smart Lib: Digital Library Management",
    type: "Professional",
    category: ["Web Dev", "Full Stack", "UI/UX"],
    shortDescription:
      "A Laravel-based library system with QR-based book borrowing/returning, real-time book availability, and study space tracking.",
    websiteLink: undefined,
    githubLink: undefined,
    techStack: ["Laravel", "PHP", "Firebase", "MySQL", "Tailwind CSS"],
    startDate: "2023-03-01", // adjust
    endDate: "2023-06-01",
    companyLogoImg: "/projects/smart-lib/dashboard.png", // placeholder
    pagesInfoArr: [
      {
        title: "Librarian Dashboard",
        description: "Overview of Student List, number of student registered, charts and analytics.",
        imgArr: ["/projects/smart-lib/dashboard.png"] // placeholder
      },
      {
        title: "QR Code Attendance",
        description: "Attendance tracking using QR Code, students can Borrow and return books using QR code scanning.",
        imgArr: ["/projects/smart-lib/qr.png", "/projects/smart-lib/qr1.png"], // placeholder
      },
      {
        title: "Books",
        description: "Access to books from library and Internet books.",
        imgArr: ["/projects/smart-lib/books.png", "/projects/smart-lib/books1.png"], // placeholder
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
  {
    id: "math-games",
    companyName: "Math Quest (Elementary Math Games)",
    type: "Personal",
    category: ["Web Dev", "Frontend", "UI/UX"],
    shortDescription:
      "A collection of interactive math games for elementary students, designed to make learning fun and engaging.",
    websiteLink: undefined,
    githubLink: undefined,
    techStack: ["HTML 5", "CSS 3", "Javascript"],
    startDate: "2023-07-01", // adjust
    endDate: "2023-07-14",
    companyLogoImg: "/projects/math-games/math-bg.png", // placeholder
    pagesInfoArr: [
      {
        title: "Games",
        description: "Selection of interactive math games with different levels.",
        imgArr: ["/projects/math-games/games.png"], // placeholder
      },
      {
        title: "Game Description",
        description: "Interactive gameplay with description for children to follow instructions.",
        imgArr: ["/projects/math-games/description.png"], // placeholder
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Math Quest is a set of browser-based math games built to help elementary students practice essential arithmetic skills while having fun.",
        "Each game comes with multiple levels, increasing in difficulty to match students' learning pace.",
      ],
      bullets: [
        "Created multiple interactive math games with different levels.",
        "Built with vanilla HTML, CSS, and JavaScript for simplicity.",
        "Focused on making math engaging for younger learners.",
      ],
    },
  },
  {
    id: "web-portfolio",
    companyName: "Personal Web Portfolio",
    type: "Personal",
    category: ["Web Dev", "Frontend", "UI/UX"],
    shortDescription:
      "A responsive portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.",
    websiteLink: undefined,
    githubLink: undefined,
    techStack: ["Next.js", "Typescript", "Tailwind CSS"],
    startDate: "2023-08-01",
    endDate: "2023-08-14",
    companyLogoImg: "/projects/portfolio/logo.png", // placeholder
    pagesInfoArr: [
      {
        title: "Home Page",
        description: "Landing section with introduction and quick navigation.",
        imgArr: ["/projects/portfolio/logo.png"], // placeholder
      },
      {
        title: "Projects Page",
        description: "Showcase of featured projects with details.",
        imgArr: ["/projects/portfolio/logo.png"], // placeholder
      },
      {
        title: "Contact Page",
        description: "Simple contact form and social links.",
        imgArr: ["/projects/portfolio/logo.png"], // placeholder
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "My personal portfolio website highlights my technical skills and project experience. Built with Next.js and Tailwind CSS, it provides a clean and responsive design.",
        "The portfolio includes sections for featured projects, skills, and contact information.",
      ],
      bullets: [
        "Developed a responsive personal portfolio using Next.js and Tailwind CSS.",
        "Showcased featured projects with detailed descriptions.",
        "Implemented a clean UI with a focus on accessibility and responsiveness.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
