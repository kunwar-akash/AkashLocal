import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { Skills } from '@/components/sections/Skills';
import { TechStack } from '@/components/sections/TechStack';

export default function SkillsPage() {
  return (
    <>
      <SEO
        title="Skills — Akash Kunwar"
        description="Full technical skill set — programming languages, frontend, backend, AI/LLMs, development tools, and quality engineering expertise."
      />
      <PageHero
        label="// skills & tech"
        title="Tools of the Trade"
        description="A practical breakdown of what I work with — not aspirational, but actual proficiency levels across the stack I use to build and ship."
        accentColor="#22D3EE"
      />
      <Skills />
      <TechStack />
    </>
  );
}
