import { Metadata } from "next";
import Link from "next/link";

import PageContainer from "@/components/common/page-container";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { pagesConfig } from "../../../config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border/60 bg-background p-5 sm:p-7">
          <h2 className="text-xl font-semibold tracking-tight">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your idea, feedback, or collaboration request.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <aside className="rounded-2xl border border-border/60 bg-muted/20 p-5 sm:p-7">
          <h2 className="text-xl font-semibold tracking-tight">Contact details</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Prefer direct links? You can reach me through any of these channels.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              href={`mailto:${siteConfig.gmail}.@gmail.com`}
              className="block rounded-lg border border-border/60 bg-background px-4 py-3 text-sm transition-colors hover:bg-muted"
            >
              Email: {siteConfig.gmail}.@gmail.com
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border/60 bg-background px-4 py-3 text-sm transition-colors hover:bg-muted"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border/60 bg-background px-4 py-3 text-sm transition-colors hover:bg-muted"
            >
              LinkedIn
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            I usually respond as soon as I can.
          </p>
        </aside>
        </div>
    </PageContainer>
  );
}
