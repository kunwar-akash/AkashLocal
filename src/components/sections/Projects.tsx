import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | 'featured' | 'in-progress' | 'completed';

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Featured' },
  { key: 'in-progress', label: 'Live' },
  { key: 'completed', label: 'Completed' },
];

export function Projects() {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const { ref, inView } = useScrollAnimation();

  const filtered = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return p.featured;
    return p.status === activeFilter;
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// projects"
          title="Featured Projects"
          description="Enterprise-scale projects spanning telecom, SaaS recruitment, and employee management platforms — each demanding rigorous quality ownership."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeFilter === f.key
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:bg-accent',
              )}
            >
              {f.label}
              <span className="ml-1.5 text-xs opacity-60">
                (
                {f.key === 'all'
                  ? projects.length
                  : f.key === 'featured'
                  ? projects.filter((p) => p.featured).length
                  : projects.filter((p) => p.status === f.key).length}
                )
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} featured={project.featured} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-12"
          >
            No projects match the selected filter.
          </motion.p>
        )}
      </div>
    </section>
  );
}
