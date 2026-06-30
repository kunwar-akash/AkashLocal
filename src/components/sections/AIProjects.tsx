import { motion } from 'framer-motion';
import { FlaskConical, Lightbulb, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { cn } from '@/lib/utils';
import type { AiProjectStatus } from '@/types';

const statusConfig: Record<AiProjectStatus, { label: string; icon: React.ReactNode; className: string }> = {
  completed: {
    label: 'Completed',
    icon: <CheckCircle size={12} />,
    className: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  'in-progress': {
    label: 'In Progress',
    icon: <Zap size={12} />,
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  experiment: {
    label: 'Experiment',
    icon: <FlaskConical size={12} />,
    className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  concept: {
    label: 'Concept',
    icon: <Lightbulb size={12} />,
    className: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
};

const statusBgColors: Record<AiProjectStatus, string> = {
  completed: '#10b981',
  'in-progress': '#3b82f6',
  experiment: '#f59e0b',
  concept: '#a855f7',
};

export function AIProjects() {
  const { aiEngineering } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="ai-projects" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// ai projects"
          title="AI Projects & Experiments"
          description="AI engineering experiments and research projects exploring LLM capabilities, prompt engineering, and intelligent automation across real use cases."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {aiEngineering.projects.map((project) => {
            const status = statusConfig[project.status];
            const color = statusBgColors[project.status];
            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="glass-card rounded-2xl border border-border p-5 flex flex-col group hover:border-primary/30 transition-all"
                whileHover={{ y: -4, scale: 1.01 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {status.icon}
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border',
                      status.className,
                    )}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                  {project.description}
                </p>

                {/* Outcome (if any) */}
                {project.outcome && (
                  <div className="glass-card rounded-xl border border-green-500/20 bg-green-500/5 p-3 mb-3">
                    <div className="flex items-start gap-1.5">
                      <ExternalLink size={12} className="text-green-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-green-400 leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/50">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-md bg-primary/5 text-muted-foreground border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Concept and Experiment projects are ideas and explorations — not presented as completed work.
        </motion.p>
      </div>
    </section>
  );
}
