import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  GitMerge,
  Cpu,
  Bot,
  Sparkles,
  Code2,
  Wind,
  Network,
  Zap,
  Layers,
  Rocket,
  Settings2,
  Target,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import type { AiSkillCat } from '@/types';

const skillIcons: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={20} />,
  GitMerge: <GitMerge size={20} />,
  Cpu: <Cpu size={20} />,
  Bot: <Bot size={20} />,
  Sparkles: <Sparkles size={20} />,
  Code2: <Code2 size={20} />,
  Wind: <Wind size={20} />,
  Network: <Network size={20} />,
  Zap: <Zap size={20} />,
  Layers: <Layers size={20} />,
  Rocket: <Rocket size={20} />,
  Settings2: <Settings2 size={20} />,
  Target: <Target size={20} />,
  Lightbulb: <Lightbulb size={20} />,
};

const levelConfig = {
  active: { label: 'Active', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
  experimenting: { label: 'Experimenting', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  learning: { label: 'Learning', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

const categoryConfig: Record<AiSkillCat, { label: string; color: string }> = {
  'prompt-engineering': { label: 'Prompt Engineering', color: '#a855f7' },
  'workflow': { label: 'Workflow', color: '#06b6d4' },
  'tools': { label: 'Tools', color: '#3b82f6' },
  'methodology': { label: 'Methodology', color: '#10b981' },
};

const FILTER_OPTIONS: Array<{ value: AiSkillCat | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'tools', label: 'Tools' },
  { value: 'methodology', label: 'Methodology' },
  { value: 'prompt-engineering', label: 'Prompting' },
  { value: 'workflow', label: 'Workflow' },
];

export function AISkills() {
  const { aiEngineering } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<AiSkillCat | 'all'>('all');
  const { ref, inView } = useScrollAnimation();

  const filtered = activeFilter === 'all'
    ? aiEngineering.skills
    : aiEngineering.skills.filter((s) => s.category === activeFilter);

  return (
    <section id="ai-skills" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// ai & problem solving"
          title="AI Engineering & Problem Solving"
          description="How I leverage AI tools, prompt engineering, and systematic thinking to solve complex engineering problems faster and more effectively."
        />

        <div className="space-y-8">
          {/* Filter tabs — entrance animation tied to inView */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-2"
          >
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium border transition-all',
                  activeFilter === opt.value
                    ? 'bg-primary/10 text-primary border-primary/30 shadow-sm shadow-primary/10'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent',
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>

          {/* Cards grid — independent from inView, always responds to filter changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((skill) => {
                const catColor = categoryConfig[skill.category].color;
                const level = levelConfig[skill.level];
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="glass-card rounded-2xl border border-border p-5 group hover:border-primary/30 transition-all"
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${catColor}18`, color: catColor }}
                      >
                        {skillIcons[skill.icon] ?? <Lightbulb size={20} />}
                      </div>
                      <span
                        className={cn(
                          'text-xs font-medium px-2 py-0.5 rounded-full border',
                          level.className,
                        )}
                      >
                        {level.label}
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-border/50">
                      <span
                        className="text-xs font-medium"
                        style={{ color: catColor }}
                      >
                        {categoryConfig[skill.category].label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
