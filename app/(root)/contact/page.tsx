import { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

import PageContainer from "@/components/common/page-container";
import { siteConfig } from "@/config/site";
import { pagesConfig } from "../../../config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

const contactLinks = [
  {
    label: "Email",
    value: "reliepalor15@gmail.com",
    href: "mailto:reliepalor15@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "@reliepalor",
    href: siteConfig.links.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="mx-auto w-full max-w-2xl">
        {/* Status + resume */}
        <div className="rounded-2xl border border-border/60 bg-background p-6 sm:p-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground">
            {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> */}
            Open to work
          </span>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Looking for a full-stack or AI developer? Grab my resume or reach
            out directly below.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/JohnReliePalor_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Link>
            <Link
              href="mailto:reliepalor15@gmail.com"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/60 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </Link>
          </div>
        </div>

        {/* Contact links */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-2 rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-medium">{value}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          I usually respond within a day.
        </p>
      </div>
    </PageContainer>
  );
}