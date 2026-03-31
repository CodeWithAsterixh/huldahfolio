import React, { useRef } from "react";
import { skillCategories } from "../../data/portfolio";
import { Section } from "../layout/Section";
import { Tag } from "../ui/Tag";
import { Heading } from "../ui/Typography";
import { useScrollProgress } from "../../hooks/useScrollProgress";

function ExpertiseItem({ category, idx }: Readonly<{ category: typeof skillCategories[0], idx: number }>) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { normalized: progress } = useScrollProgress(itemRef);

  return (
    <div
      ref={itemRef}
      data-scroll-animation="dynamic_toggle"
      data-scroll-variables="{type: 'scrolling'}"
      key={category.title}
      className="flex flex-col md:flex-row gap-8 py-12 relative overflow-hidden will-change-transform border-t border-white/5 first:border-t-0"
      style={{
        opacity: progress * 1.5,
        transform: `translateY(${(1 - progress) * 20}px)`
      }}
    >
      <div className="w-full md:w-1/3">
        <Heading
          as="h3"
          className="text-2xl md:text-3xl font-serif text-white/50 uppercase leading-none"
        >
          {category.title.split('-').map((part, i, arr) => (
            <React.Fragment key={`${category.title}-${part}-${i}`}>
              {part}{i < arr.length - 1 ? '-' : ''}<br />
            </React.Fragment>
          ))}
        </Heading>
      </div>
      <div className="w-full md:w-2/3">
        <div className="flex flex-wrap gap-4">
          {category.skills.map((skill, sIdx) => {
            // Offset progress for each tag to create a staggered reveal tied to scroll
            const staggerOffset = sIdx * 0.1;
            const tagProgress = Math.max(0, Math.min(1, (progress * 1.2 - staggerOffset) / 0.8));

            return (
              <div
                key={skill}
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: tagProgress,
                  transform: `translateY(${(1 - tagProgress) * 20}px) scale(${0.95 + tagProgress * 0.05})`,
                }}
              >
                <Tag>{skill}</Tag>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function HomeExpertise() {
  return (
    <Section id="skills" title="Expertise">
      <div className="flex flex-col">
        {skillCategories.map((category, idx) => (
          <ExpertiseItem key={category.title} category={category} idx={idx} />
        ))}
      </div>
    </Section>
  );
}
