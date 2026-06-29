import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { AIInProduction } from '@/components/sections/AIInProduction';
import { AISkills } from '@/components/sections/AISkills';
import { AIToolkit } from '@/components/sections/AIToolkit';
import { AIWorkflow } from '@/components/sections/AIWorkflow';
import { AIProjects } from '@/components/sections/AIProjects';
import { AIImpact } from '@/components/sections/AIImpact';

export default function AIEngineeringPage() {
  return (
    <>
      <SEO
        title="AI Engineering — Akash Kunwar"
        description="AI Product Engineering in practice — LLM integration, agentic workflows, prompt engineering, and building AI-powered systems that work in production."
      />
      <PageHero
        label="// ai engineering"
        title="AI in Production"
        description="Not demos. Not wrappers. Real AI capabilities integrated into real software, solving real problems at production scale."
        accentColor="#a855f7"
      />
      <AIInProduction />
      <AISkills />
      <AIToolkit />
      <AIWorkflow />
      <AIProjects />
      <AIImpact />
    </>
  );
}
