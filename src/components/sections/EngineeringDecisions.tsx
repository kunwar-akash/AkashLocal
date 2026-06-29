import { motion } from 'framer-motion';
import {
  Webhook,
  Bot,
  Search,
  Target,
  Brain,
  Network,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const decisionIcons: Record<string, React.ReactNode> = {
  Webhook: <Webhook size={20} />,
  Bot: <Bot size={20} />,
  Search: <Search size={20} />,
  Target: <Target size={20} />,
  Brain: <Brain size={20} />,
  Network: <Network size={20} />,
};

export function EngineeringDecisions() {
  const { engineeringDecisions } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="engineering-decisions" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[400px] bg-primary/4 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeader
          label="// decisions"
          title="Engineering Decisions"
          description="Six real decisions I've made — the context behind each one, what I chose, and what came out of it."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {engineeringDecisions.map((decision, index) => (
            <motion.div
              key={decision.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border flex flex-col group hover:border-primary/30 transition-all overflow-hidden"
              whileHover={{ y: -4 }}
            >
              {/* Color accent bar */}
              <div className="h-0.5 w-full" style={{ backgroundColor: decision.color }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${decision.color}18`, color: decision.color }}
                  >
                    {decisionIcons[decision.icon] ?? <Lightbulb size={20} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="text-xs font-mono font-bold tabular-nums"
                        style={{ color: decision.color }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-muted-foreground/50">·</span>
                      <span className="text-xs text-muted-foreground/60 truncate">{decision.domain}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                      {decision.title}
                    </h3>
                  </div>
                </div>

                {/* Context */}
                <div className="mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: decision.color }}
                  >
                    Context
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                    {decision.context}
                  </p>
                </div>

                {/* Decision */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Decision
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                    {decision.choice}
                  </p>
                </div>

                {/* Outcome */}
                <div
                  className="mt-auto -mx-6 -mb-6 px-6 py-4 border-t border-border/50"
                  style={{ backgroundColor: `${decision.color}08` }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: decision.color }}
                  >
                    Outcome
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                    {decision.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
