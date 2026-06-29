import { motion } from 'framer-motion';
import {
  Search,
  Layers,
  Target,
  MessageSquare,
  Zap,
  CheckCircle,
  Settings2,
  Rocket,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stepIcons: Record<string, React.ReactNode> = {
  Search: <Search size={20} />,
  Layers: <Layers size={20} />,
  Target: <Target size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  Zap: <Zap size={20} />,
  CheckCircle: <CheckCircle size={20} />,
  Settings2: <Settings2 size={20} />,
  Rocket: <Rocket size={20} />,
};

const stepColors = [
  '#3b82f6', '#06b6d4', '#a855f7', '#f59e0b',
  '#10b981', '#ec4899', '#f97316', '#6366f1',
];

export function AIWorkflow() {
  const { aiEngineering } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="ai-workflow" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// how i work"
          title="How I Use AI to Solve Problems"
          description="A structured, repeatable approach to applying AI tools for real engineering and business challenges."
        />

        <div ref={ref} className="relative max-w-4xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent hidden sm:block md:-translate-x-px" />

          <div className="space-y-6 md:space-y-0">
            {aiEngineering.workflow.map((step, index) => {
              const isEven = index % 2 === 0;
              const color = stepColors[index % stepColors.length];
              const delay = index * 0.1;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative flex items-start gap-4 md:gap-0 md:mb-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card — left or right half */}
                  <div
                    className={`flex-1 md:max-w-[calc(50%-2.5rem)] ${
                      isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    } ml-12 sm:ml-16 md:ml-0`}
                  >
                    <motion.div
                      className="glass-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'md:flex-row-reverse md:justify-start' : ''
                        }`}
                      >
                        <span
                          className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center dot + step number — absolute for mobile, relative for desktop */}
                  <div
                    className="absolute left-0 sm:left-2 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 border-background z-10 shrink-0"
                    style={{ backgroundColor: `${color}20`, borderColor: color }}
                  >
                    <span style={{ color }}>
                      {stepIcons[step.icon] ?? <Lightbulb size={20} />}
                    </span>
                  </div>

                  {/* Empty spacer for the other side on desktop */}
                  <div className="hidden md:block flex-1 md:max-w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
