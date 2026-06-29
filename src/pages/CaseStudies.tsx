import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { ProblemsSolved } from '@/components/sections/ProblemsSolved';
import { EngineeringDecisions } from '@/components/sections/EngineeringDecisions';

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Case Studies — Akash Kunwar"
        description="Engineering problem-solving in practice — real production challenges, the decisions made, and the outcomes delivered."
      />
      <PageHero
        label="// case studies"
        title="Problems I've Solved"
        description="Engineering isn't about knowing the answer in advance. It's about debugging the right thing, making defensible tradeoffs, and shipping the fix."
        accentColor="#7C3AED"
      />
      <ProblemsSolved />
      <EngineeringDecisions />
    </>
  );
}
