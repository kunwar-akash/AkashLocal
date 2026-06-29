import { motion } from 'framer-motion';
import {
  Code2,
  Search,
  Settings2,
  Rocket,
  Brain,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const philosophyIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={22} />,
  Search: <Search size={22} />,
  Settings2: <Settings2 size={22} />,
  Rocket: <Rocket size={22} />,
  Brain: <Brain size={22} />,
  Shield: <Shield size={22} />,
};

export function EngineeringPhilosophy() {
  const { engineeringPhilosophy } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="engineering-philosophy" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// how i think"
          title="How I Think"
          description="The engineering principles behind how I approach every problem — from architecture decisions to shipping code."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {engineeringPhilosophy.map((principle, index) => (
            <motion.div
              key={principle.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-6 group hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                {/* Number + icon */}
                <div className="shrink-0">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${principle.color}18`, color: principle.color }}
                  >
                    {philosophyIcons[principle.icon] ?? <Lightbulb size={22} />}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: principle.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="mt-4 h-px opacity-30 rounded-full"
                style={{ backgroundColor: principle.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
