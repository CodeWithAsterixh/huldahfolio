import { useRef } from "react";
import { useParams, Link } from "react-router";
import type { Route } from "./+types/work.$id";
import { PageContainer, Section } from "../components/layout/Section";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Heading, Text } from "../components/ui/Typography";
import { Grid, Stack } from "../components/ui/Grid";
import { Tag } from "../components/ui/Tag";
import { VideoPlayer } from "../components/ui/VideoPlayer";
import { projects } from "../data/portfolio";
import { useScrollProgress } from "../hooks/useScrollProgress";

export function meta({ params }: Route.MetaArgs) {
  const project = projects.find((p) => p.id === params.id);
  return [
    { title: `${project?.title || "Project"} | Case Study` },
    { name: "description", content: project?.description || "Project detail" },
  ];
}

export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const heroRef = useRef<HTMLDivElement>(null);
  const { normalized: progress } = useScrollProgress(heroRef);

  if (!project) {
    return (
      <main className="bg-[#050505] min-h-screen py-24 text-center">
        <Heading as="h2">Project Not Found</Heading>
        <Link to="/" className="text-white/60 hover:text-white mt-8 inline-block underline underline-offset-4">
          Return to Home
        </Link>
      </main>
    );
  }

  const { caseStudy } = project;

  return (
    <main className="bg-[#050505] min-h-screen">
      <Header />
      <PageContainer>

        {/* Project Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <Stack gap={10}>
            <div 
              ref={heroRef}
              data-scroll-animation="dynamic_toggle"
              data-scroll-variables="{type: 'scrolling'}"
              style={{
                opacity: progress * 1.5,
                transform: `translateY(${(1 - progress) * 40}px) scale(${0.98 + progress * 0.02})`,
              }}
              className="flex flex-col gap-4 max-w-3xl"
            >
               <Text className="uppercase tracking-[.3em] text-[10px] font-bold text-white/40">{project.category}</Text>
               <Heading as="h1" className="text-5xl md:text-8xl leading-[0.9]">{project.title}</Heading>
            </div>
            
            <div
              data-scroll-animation="dynamic_toggle"
              data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.05}"
              className="transition-all duration-1000 delay-500"
            >
              {project.videoUrl ? (
                <VideoPlayer url={project.videoUrl} thumbnail={project.thumbnail} />
              ) : (
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                  <Text className="italic opacity-30 tracking-widest">Video content coming soon</Text>
                </div>
              )}
            </div>
          </Stack>
        </section>

        {/* Overview: The Brief & Goals - 2 Grid Layout */}
        {caseStudy && (
          <>
            <Section title="Project Overview">
              <Grid columns={2} className="items-center">
                <div 
                  data-scroll-animation="dynamic_toggle"
                  data-scroll-variables="{enterClass: 'opacity-100 translate-x-0', leaveClass: 'opacity-0 -translate-x-12', threshold: 0.1}"
                  className="pr-0 md:pr-12 py-8 transition-all duration-1000"
                >
                  <Stack gap={6}>
                    <Heading as="h3" className="text-2xl md:text-4xl text-balance">The Creative Vision</Heading>
                    <Text>{caseStudy.brief}</Text>
                    <div className="pt-4 flex flex-col gap-4 border-l border-white/20 pl-6">
                      <Heading as="h4" className="text-xs uppercase tracking-widest opacity-40">Impact</Heading>
                      <Text className="text-white brightness-125 italic">"{caseStudy.results}"</Text>
                    </div>
                  </Stack>
                </div>
                <div 
                  data-scroll-animation="dynamic_toggle"
                  data-scroll-variables="{enterClass: 'opacity-100 translate-x-0 rotate-1', leaveClass: 'opacity-0 translate-x-12 rotate-0', threshold: 0.1}"
                  className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-1000 delay-300"
                >
                   <img 
                    src={project.thumbnail} 
                    alt="Overview Visual" 
                    className="w-full h-full object-cover grayscale opacity-50"
                   />
                </div>
              </Grid>
            </Section>

            {/* Technical Execution Section */}
            <Section title="Execution">
               <Grid columns={2} className="gap-12 md:gap-24">
                  <Stack gap={12}>
                    <div>
                      <Heading as="h4" className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6">The Workflow</Heading>
                      <div className="flex flex-col gap-8">
                        {(caseStudy.workflow ?? [
                          { title: "Concept", description: "Mapping out the visual rhythm and key hooks." },
                          { title: "Execution", description: "Precision camera work and lighting setup." },
                          { title: "Post-Production", description: "Color grading and advanced audio mastering." }
                        ]).map((step, idx) => (
                          <div key={step.title} className="flex gap-6">
                            <span className="font-serif text-white/20 text-3xl">0{idx + 1}</span>
                            <div className="flex flex-col gap-2">
                              <Heading as="h4" className="text-lg md:text-xl">{step.title}</Heading>
                              <Text className="text-sm">{step.description}</Text>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Stack>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                    <Stack gap={10}>
                      {/* Gear List */}
                      {caseStudy.gear && (
                        <div>
                          <Heading as="h4" className="text-xs uppercase tracking-widest opacity-40 mb-4">Production Gear</Heading>
                          <div className="flex flex-wrap gap-2">
                             {caseStudy.gear.map(item => <Tag key={item}>{item}</Tag>)}
                          </div>
                        </div>
                      )}
                      
                      {/* Software */}
                      {caseStudy.software && (
                        <div>
                          <Heading as="h4" className="text-xs uppercase tracking-widest opacity-40 mb-4">Post-Production</Heading>
                          <div className="flex flex-wrap gap-2">
                             {caseStudy.software.map(item => <Tag key={item}>{item}</Tag>)}
                          </div>
                        </div>
                      )}

                      {/* Technical Specs */}
                      {caseStudy.technicalSpecs && (
                        <div className="pt-8 border-t border-white/10">
                           <Heading as="h4" className="text-xs uppercase tracking-widest opacity-40 mb-6">Technical Specs</Heading>
                           <ul className="grid grid-cols-2 gap-y-4">
                              {caseStudy.technicalSpecs.map(spec => (
                                <li key={spec} className="text-xs md:text-sm font-sans opacity-80 flex items-center gap-2">
                                  <div className="w-1 h-1 bg-white rounded-full" />
                                  {spec}
                                </li>
                              ))}
                           </ul>
                        </div>
                      )}
                    </Stack>
                  </div>
               </Grid>
            </Section>

            {/* Visual Gallery / BTS */}
            <Section title="Behind The Scenes">
               <Grid columns={3} className="pt-8 gap-4">
                  <div 
                    data-scroll-animation="dynamic_toggle"
                    data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.1}"
                    className="md:col-span-2 aspect-[16/6] rounded-2xl overflow-hidden bg-white/10 relative transition-all duration-1000"
                  >
                     <img 
                      src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                      alt="Studio" 
                      className="w-full h-full object-cover grayscale opacity-40"
                     />
                  </div>
                  <div 
                    data-scroll-animation="dynamic_toggle"
                    data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.1}"
                    className="aspect-square rounded-2xl overflow-hidden bg-white/10 relative transition-all duration-1000 delay-300"
                  >
                     <img 
                      src="https://images.unsplash.com/photo-1574717024458-388ee71551ee?auto=format&fit=crop&q=80&w=600" 
                      alt="Rigging" 
                      className="w-full h-full object-cover grayscale opacity-50"
                     />
                  </div>
               </Grid>
            </Section>
          </>
        )}

        {/* Case Study Footer Navigation */}
        <div className="py-32 border-t border-white/10 flex flex-col items-center text-center gap-10">
            <Stack gap={4}>
               <Heading as="h3" className="text-4xl md:text-6xl tracking-tight">Need a professional eye?</Heading>
               <Text className="max-w-xl mx-auto text-white/60">Available for freelance videography, high-end video editing, and content strategy worldwide.</Text>
            </Stack>
            <Link 
              to="/contact" 
              className="px-14 py-6 bg-white text-black font-sans uppercase font-bold text-sm tracking-[0.2em] hover:bg-white/90 transition-all rounded-full"
            >
              Start Collaboration
            </Link>
            <Link 
              to="/" 
              className="text-white/40 mt-12 hover:text-white transition-colors text-xs uppercase tracking-widest underline underline-offset-4 link-underline"
            >
               Back to all projects
            </Link>
        </div>

        <Footer />
      </PageContainer>
    </main>
  );
}
