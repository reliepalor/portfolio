import React from 'react'
import { AnimatedText } from './animated-text'
import Image from "next/image";
import profileImg from "@/assets/image/profile-img.jpg";
import { siteConfig } from "../../config/site";

const RightVisual = () => {
  return (
            <div className="relative flex justify-center lg:justify-end">
              <AnimatedText delay={0.5}>
                <div className="relative">
                  {/* Floating Card Container */}
                  <div className="relative bg-card border border-border/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                    {/* Profile Image with Modern Frame */}
                    <div className="relative mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-sm hover:shadow-lg" />  
                      <Image
                        src={profileImg}
                        height={120}
                        width={120}
                        sizes="120px"
                        className="relative rounded-full w-[120px] h-[120px] hover:scale-105 duration-200 ease-in-out object-cover border-2 border-background cursor-pointer"
                        alt={`${siteConfig.authorName} - Developer Portfolio`}
                        priority
                      />
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-3 text-center">
                      <div className="text-sm text-muted-foreground font-mono">
                        Web Developer
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex justify-center gap-6 text-xs ">
                        <div className="w-[7rem] text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                        <div className="w-px bg-border" />
                        <div className="text-center">
                          <div className="font-bold text-primary"></div>
                          <div className="text-muted-foreground"></div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-60" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-primary/40 rounded-full opacity-40" />
                  </div>

                  {/* Floating Background Elements */}
                  <div className="absolute -z-10 top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
                  <div className="absolute -z-10 -bottom-4 -left-4 w-16 h-16 bg-primary/3 rounded-full blur-lg" />
                </div>
              </AnimatedText>
            </div>
  )
}

export default RightVisual
