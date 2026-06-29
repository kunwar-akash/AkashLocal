import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { EngineeringPhilosophy } from '@/components/sections/EngineeringPhilosophy';
import { EngineeringDecisions } from '@/components/sections/EngineeringDecisions';
import { Education } from '@/components/sections/Education';
import { Achievements } from '@/components/sections/Achievements';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About — Akash Kunwar"
        description="AI Product Engineer and Full-Stack Builder. My story, philosophy, and the engineering journey behind building production software with AI."
      />
      <PageHero
        label="// about me"
        title="The Person Behind the Code"
        description="From engineering student to AI Product Engineer — building production software, integrating LLMs, and shipping products that make a real impact."
      />
      <About />
      <Experience />
      <EngineeringPhilosophy />
      <EngineeringDecisions />
      <Education />
      <Achievements />
    </>
  );
}
