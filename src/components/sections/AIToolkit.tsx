import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Bot,
  Sparkles,
  Code2,
  GitBranch,
  Terminal,
  Github,
  Webhook,
  LayoutDashboard,
  Monitor,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp } from '@/utils/animations';
import { cn } from '@/lib/utils';
import type { AiToolCategory } from '@/types';

const toolIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={24} />,
  Bot: <Bot size={24} />,
  Sparkles: <Sparkles size={24} />,
  Code2: <Code2 size={24} />,
  GitBranch: <GitBranch size={24} />,
  Terminal: <Terminal size={24} />,
  Github: <Github size={24} />,
  Webhook: <Webhook size={24} />,
  LayoutDashboard: <LayoutDashboard size={24} />,
  Monitor: <Monitor size={24} />,
};

const categoryColors: Record<AiToolCategory, string> = {
  'ai-model': '#a855f7',
  'ide': '#3b82f6',
  'devtool': '#06b6d4',
  'productivity': '#10b981',
};

const categoryLabels: Record<AiToolCategory, string> = {
  'ai-model': 'AI Model',
  'ide': 'IDE',
  'devtool': 'Dev Tool',
  'productivity': 'Productivity',
};

const FILTER_OPTIONS: Array<{ value: AiToolCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All Tools' },
  { value: 'ai-model', label: 'AI Models' },
  { value: 'ide', label: 'IDE' },
  { value: 'devtool', label: 'Dev Tools' },
  { value: 'productivity', label: 'Productivity' },
];

export function AIToolkit() {
  const { aiEngineering } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<AiToolCategory | 'all'>('all');
  const { ref, inView } = useScrollAnimation();

  const filtered = activeFilter === 'all'
    ? aiEngineering.toolkit
    : aiEngineering.toolkit.filter((t) => t.category === activeFilter);

  const getCount = (value: AiToolCategory | 'all') =>
    value === 'all'
      ? aiEngineering.toolkit.length
      : aiEngineering.toolkit.filter((t) => t.category === value).length;

  return (
    <section id="ai-toolkit" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// ai toolkit"
          title="My AI Toolkit"
          description="The tools I actively use to build, analyze, test, and solve engineering problems with AI assistance."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="space-y-6"
        >
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_OPTIONS.map((opt) => {
              const count = getCount(opt.value);
              const isActive = activeFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary border-primary/40 shadow-sm shadow-primary/10 scale-105'
                      : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-border/80',
                  )}
                >
                  {opt.label}
                  <span
                    className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-[20px] text-center',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category label */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="h-px w-12 bg-border" />
            <span className="font-mono">
              Showing{' '}
              <span className="text-primary font-semibold">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'tool' : 'tools'}
              {activeFilter !== 'all' && (
                <> in <span className="text-primary font-semibold">{FILTER_OPTIONS.find((o) => o.value === activeFilter)?.label}</span></>
              )}
            </span>
            <span className="h-px w-12 bg-border" />
          </div>

          {/* Tool cards grid */}
          <div className="relative min-h-[200px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((tool, index) => {
                  const color = categoryColors[tool.category];
                  return (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="glass-card rounded-2xl border border-border p-5 flex flex-col gap-3 group hover:border-primary/30 transition-all"
                      whileHover={{ y: -4, scale: 1.01 }}
                    >
                      {/* Tool header */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          {toolIcons[tool.icon] ?? <Lightbulb size={24} />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {tool.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                        </div>
                      </div>

                      {/* Usage text — always visible */}
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                        {tool.usage}
                      </p>

                      {/* Category badge */}
                      <span
                        className="self-start text-xs font-medium px-2.5 py-1 rounded-lg"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {categoryLabels[tool.category]}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
