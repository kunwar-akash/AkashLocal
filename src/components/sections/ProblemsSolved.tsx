import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  Bot,
  Shield,
  AlertTriangle,
  Rocket,
  Webhook,
  ChevronDown,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { cn } from '@/lib/utils';

const problemIcons: Record<string, React.ReactNode> = {
  Network: <Network size={20} />,
  Bot: <Bot size={20} />,
  Shield: <Shield size={20} />,
  AlertTriangle: <AlertTriangle size={20} />,
  Rocket: <Rocket size={20} />,
  Webhook: <Webhook size={20} />,
};

const categoryColors: Record<string, string> = {
  'API & Integration': '#3b82f6',
  'AI Validation': '#a855f7',
  'Production Debugging': '#ef4444',
  'Incident Management': '#f97316',
  'Release Strategy': '#10b981',
  'API Testing': '#06b6d4',
};

export function ProblemsSolved() {
  const { aiEngineering } = portfolioData;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { ref, inView } = useScrollAnimation();

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="problems-solved" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// complex problems"
          title="Complex Problems Solved"
          description="Real engineering challenges from production environments, and the structured approaches I took to solve them."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {aiEngineering.problemsSolved.map((problem) => {
            const color = categoryColors[problem.category] ?? '#6366f1';
            const isExpanded = expandedId === problem.id;
            return (
              <motion.div
                key={problem.id}
                variants={staggerItem}
                className={cn(
                  'glass-card rounded-2xl border transition-all',
                  isExpanded ? 'border-primary/40' : 'border-border hover:border-primary/20',
                )}
              >
                <button
                  onClick={() => toggle(problem.id)}
                  className="w-full text-left p-5"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}18`, color }}
                    >
                      {problemIcons[problem.icon] ?? <Lightbulb size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${color}15`, color }}
                        >
                          {problem.category}
                        </span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-muted-foreground shrink-0"
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </div>
                      <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                        {problem.problem}
                      </p>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-border/50 pt-4">
                        {[
                          { label: 'Problem', text: problem.problem, color: '#ef4444' },
                          { label: 'Approach', text: problem.approach, color: '#f59e0b' },
                          { label: 'Solution', text: problem.solution, color: '#3b82f6' },
                          { label: 'Impact', text: problem.impact, color: '#10b981' },
                        ].map(({ label, text, color: labelColor }) => (
                          <div key={label}>
                            <p
                              className="text-xs font-semibold uppercase tracking-wider mb-1"
                              style={{ color: labelColor }}
                            >
                              {label}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
