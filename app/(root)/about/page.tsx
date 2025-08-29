import { Metadata } from "next";
import { siteConfig } from "../../../config/site";
import { pagesConfig } from "../../../config/pages";

// Define the structure for About data
interface Education {
  degree: string;
  school: string;
  period: string;
}

interface Achievement {
  title: string;
  event: string;
  year: string;
}

interface AboutData {
  fullName: string;
  description: string;
  education: Education;
  achievements: Achievement[];
}

// About data
const aboutData: AboutData = {
  fullName: "John Relie Palor",
  description: "I'm a 4th year student learning web development with a passion for creating modern, responsive websites and applications.",
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "Cagayan State University",
    period: "2022-2026"
  },
  achievements: [
    {
      title: "4th Place Static Web Design",
      event: "Uniwide ICT Skills Olympics CSU",
      year: "2025"
    },
    {
      title: "3rd Place Static Web Design",
      event: "CSU-G Technolympics",
      year: "2024"
    }
  ]
};

export const metadata: Metadata = {
  title: `${pagesConfig.about.metadata.title} | ${siteConfig.name}`,
  description: "Learn more about John Relie Palor, a web developer passionate about creating modern web experiences.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground">
              {aboutData.description}
            </p>
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Education</h2>
            <div className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{aboutData.education.degree}</h3>
              <p className="text-lg text-muted-foreground">{aboutData.education.school}</p>
              <p className="text-muted-foreground">{aboutData.education.period}</p>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <div className="grid gap-4">
              {aboutData.achievements.map((achievement, index) => (
                <div key={index} className="rounded-lg border p-6">
                  <h3 className="text-xl font-semibold">{achievement.title}</h3>
                  <p className="text-lg text-muted-foreground">{achievement.event}</p>
                  <p className="text-muted-foreground">{achievement.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Note */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">A Note From Me</h2>
            <div className="rounded-lg border p-6">
              <p className="text-muted-foreground">
                As a 4th year student, I'm constantly learning and improving my skills in web development. 
                I'm passionate about creating user-friendly, accessible, and modern web experiences that 
                make a positive impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}