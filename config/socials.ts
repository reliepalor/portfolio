import { Icons } from "../components/common/icons";
import { siteConfig } from "./site";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: `@${siteConfig.username}`,
    icon: Icons.gitHub,
    link: siteConfig.links.github,
  },
  {
    name: "LinkedIn",
    username: siteConfig.authorName,
    icon: Icons.linkedin,
    link: siteConfig.links.linkedin,
  },
  {
    name: "Resume",
    username: "View / Download",
    icon: Icons.resume,
    link: siteConfig.links.resume,
  },
  {
    name: "Gmail",
    username: "reliepalor15@gmail.com",
    icon: Icons.gmail,
    link: `mailto:${siteConfig.gmail + ""}@gmail.com`,
  },
];
