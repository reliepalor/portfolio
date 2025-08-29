"use client";
import { siteConfig } from "@/config/site";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function GithubRedirectCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full h-fit max-w-sm overflow-hiddenshadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 mt-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div
        className={`h-1 bg-gradient-to-r from-red-500 to-red-500 transition-all duration-300 ease-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </Card>
  );
}
