import { useRef } from "react";
import type { Route } from "./+types/contact";
import { PageContainer, Section } from "../components/layout/Section";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Heading, Text } from "../components/ui/Typography";
import { Stack } from "../components/ui/Grid";
import { useScrollProgress } from "../hooks/useScrollProgress";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | Start a Project" },
    { name: "description", content: "Inquire about videography, editing, or social media management services." },
  ];
}

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { normalized: progress } = useScrollProgress(headingRef);

  return (
    <main className="bg-[#050505] min-h-screen">
      <Header />
      <PageContainer>
        <Section className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-24 pt-12">
            <Stack gap={8}>
              <div 
                ref={headingRef}
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{type: 'scrolling'}"
                style={{
                  opacity: progress * 1.5,
                  transform: `translateY(${(1 - progress) * 40}px) scale(${0.98 + progress * 0.02})`,
                }}
              >
                <Heading as="h1" className="text-5xl md:text-7xl font-serif">Let's <br /> create.</Heading>
              </div>
              <Text 
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-60 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                className="text-white/60 transition-all duration-1000 delay-300"
              >
                Whether you need a high-end commercial, a fast-paced music video, or a full social media strategy, 
                I'm here to help bring your vision to life.
              </Text>
              <div className="pt-8">
                <Text className="mb-2 text-white/40 uppercase text-xs font-bold tracking-widest">Current Location</Text>
                <Text className="text-white/40 max-w-xs">
                  Currently based in Lagos, Nigeria. Available for travel worldwide.
                </Text>
              </div>
            </Stack>

            <form className="flex flex-col gap-12 pt-4">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                { id: "service", label: "Service Type", type: "select", options: [
                  "Full Videography (Shoot + Edit)",
                  "Video Editing Only",
                  "Social Media Content Pack (Shorts/Reels)",
                  "Content Strategy & Consulting"
                ]}
              ].map((field, idx) => (
                <div 
                  key={field.id}
                  data-scroll-animation="dynamic_toggle"
                  data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  className="flex flex-col gap-2 group transition-all duration-1000"
                >
                  <label htmlFor={field.id} className="text-white/40 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-white">{field.label}</label>
                  {field.type === 'select' ? (
                    <select id={field.id} className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors appearance-none cursor-pointer">
                      {field.options?.map(opt => <option key={opt} className="bg-[#050505]">{opt}</option>)}
                    </select>
                  ) : (
                    <input 
                      id={field.id}
                      type={field.type} 
                      placeholder={field.placeholder}
                      className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors placeholder:text-white/10"
                    />
                  )}
                </div>
              ))}

              <div 
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                className="flex flex-col gap-2 group transition-all duration-1000 delay-500"
              >
                <label htmlFor="message" className="text-white/40 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-white">Message & Goals</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Tell me about your vision, timeline, and goals..."
                  className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors resize-none placeholder:text-white/10"
                />
              </div>

              <button 
                type="submit"
                onClick={(e) => e.preventDefault()}
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.1}"
                className="self-start px-16 py-6 bg-white text-black font-sans uppercase font-bold text-sm tracking-widest hover:bg-white/90 transition-all duration-700 rounded-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </Section>

        <Footer />
      </PageContainer>
    </main>
  );
}
