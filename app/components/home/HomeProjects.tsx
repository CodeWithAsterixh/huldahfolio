import React, { useRef } from "react";
import { Link } from "react-router";
import { Section } from "../layout/Section";
import { Grid, Stack } from "../ui/Grid";
import { Heading, Text } from "../ui/Typography";
import { Tag } from "../ui/Tag";
import { projects } from "../../data/portfolio";
import { useScrollProgress } from "../../hooks/useScrollProgress";

function ProjectCard({ project, index }: Readonly<{ project: typeof projects[0], index: number }>) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { normalized: progress } = useScrollProgress(cardRef);

  return (
    <Link
      to={`/work/${project.id}`}
      ref={cardRef}
      data-scroll-animation="dynamic_toggle"
      data-scroll-variables="{type: 'scrolling'}"
      className="group block relative overflow-hidden will-change-transform"
      style={{
        opacity: progress * 1.5,
        transform: `translateY(${(1 - progress) * 40}px) scale(${0.98 + progress * 0.02})`,
      }}
    >
      <Stack gap={6}>
        <div className="aspect-video rounded-3xl overflow-hidden bg-black/20 border border-white/10 group-hover:border-white/20 transition-all duration-700">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
          />
        </div>
        <div className="flex justify-between items-start px-2 gap-4">
          <Stack gap={1} className="min-w-0">
            <Heading as="h3" className="text-xl md:text-2xl font-serif">{project.title}</Heading>
            <Text className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{project.category}</Text>
          </Stack>
          <div className="flex-shrink-0">
            <Tag>{project.id.includes('video') ? 'Video' : 'Photos'}</Tag>
          </div>
        </div>
      </Stack>
    </Link>
  );
}

export function HomeProjects() {
  return (
    <Section id="projects" title="Selected Work">
      <Grid columns={1} className="md:grid-cols-2 lg:grid-cols-2 gap-12 pt-8">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </Grid>
    </Section>
  );
}
