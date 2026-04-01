import { useRef } from "react";
import { Link } from "react-router";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { Section } from "../layout/Section";
import { Stack } from "../ui/Grid";
import { Heading, Text } from "../ui/Typography";

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { normalized: heroProgress } = useScrollProgress(heroRef);

  let heroBlur = 0;
  if (heroProgress < 0.99) {
    heroBlur = (1 - heroProgress) * 30;
  }

  return (
    <Section id="about" className="relative overflow-hidden">
      <div className="flex flex-col gap-12 pt-8 relative z-10">
        <div
          ref={heroRef}
          data-scroll-animation="dynamic_toggle"
          data-scroll-variables="{type: 'scrolling'}"
          style={{
            opacity: heroProgress,
            transform: `scale(${0.95 + heroProgress * 0.05})`,
            filter: `blur(${heroBlur}px)`,
            transition: 'none'
          }}
        >
          <Heading as="h1" className="max-w-4xl text-balance">
            Videographer & Video-Editor
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 items-start">
          <div
            data-scroll-animation="dynamic_toggle"
            data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.1}"
            className="aspect-[4/3] rounded-3xl overflow-hidden bg-black/20 border border-white/10 transition-all duration-1000"
          >
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"
              alt="Creative Work"
              className="w-full h-full object-cover"
            />
          </div>
          <Stack gap={6} className="pt-2 flex justify-center flex-col">
            <div
              data-scroll-animation="dynamic_toggle"
              data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
              className="transition-all duration-1000 delay-200"
            >
              <Text>
                My name is Huldah Peter. I'm a professional Videographer and Video Editor based in Lagos, Nigeria.
                I have experience in creating and editing music, dance, scenery and social media videos
                (such as Reels and TikTok). I'm eager to work hard to fuel my skills and help brands tell their stories.
              </Text>
            </div>
            <div className="pt-4">
              <Link
                to="/contact"
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-4', threshold: 0.1}"
                className="px-8 py-4 bg-white text-black font-sans uppercase font-bold text-xs tracking-widest hover:bg-white/90 transition-all duration-700 rounded-full inline-block"
                data-cursor="pointer"
              >
                Start a Project
              </Link>
            </div>
          </Stack>
        </div>
      </div>
    </Section>
  );
}
