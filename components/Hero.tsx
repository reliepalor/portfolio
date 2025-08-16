import { Spotlight } from './ui/spotlight'
import { cn } from "@/utils/cn";
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import ShimmerButton from './ui/ShimmerButton';
import { FaLocationArrow } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='pb-20 pt-36 min-h-screen'>
        <div className="hidden relative border-2 border-dashed border-green-500 h-full">
            <Spotlight className='-top-40 -left-10 md:-left-32 md:-top-20' fill='red'/>
            <Spotlight className='top-10 left-full h-[80vh] w-[50vw]' fill='purple'/>
            <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue'/>
        </div>

        <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-white dark:bg-black">
              <div
                className={cn(
                  "absolute inset-0",
                  "[background-size:40px_40px]",
                  "[background-image:linear-gradient(to_right,#e4e4e7_1.5px,transparent_.5px),linear-gradient(to_bottom,#e4e4e7_.5px,transparent_.5px)]",
                  "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                )}
              />
              {/* Radial gradient for the container to give a faded look */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
             
             <div className='flex justify-center relative my-20 z-10'>
                <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
                  <h2 className='text-center text-sm uppercase tracking-widest'>Learning every day.</h2>
                  <TextGenerateEffect 
                  className='text-center text-[40px] md:text-5xl lg:text-6xl'
                  words="Turning ideas into projects as I grow into a Web Developer." />

                  <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
                    Hi, I&apos;m Relie, Aspiring Web Developer.
                  </p>
                  
                  <a href="#about">
                    <ShimmerButton title='Show Projects' 
                    icon={<FaLocationArrow />}
                    position='right'/>
                  </a>
                </div>
                
             </div>
        </div>

  
    </div>
  )
}

export default Hero
