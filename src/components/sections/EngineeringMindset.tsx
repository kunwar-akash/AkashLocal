import { motion } from 'framer-motion';
import {
  Network,
  Search,
  Target,
  Settings2,
  Shield,
  Brain,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const mindsetIcons: Record<string, React.ReactNode> = {
  Network: <Network size={22} />,
  Search: <Search size={22} />,
  Target: <Target size={22} />,
  Settings2: <Settings2 size={22} />,
  Shield: <Shield size={22} />,
  Brain: <Brain size={22} />,
  BookOpen: <BookOpen size={22} />,
};

export function EngineeringMindset() {
  const { aiEngineering } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="mindset" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// mindset"
          title="My Engineering Mindset"
          description="Core principles that guide how I approach every technical challenge — from production incidents to AI-assisted development."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {aiEngineering.mindset.map((card, index) => (
            <motion.div
              key={card.title}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5 group hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.01 }}
              style={{ '--card-color': card.color } as React.CSSProperties}
            >
              {/* Accent bar */}
              <div
                className="w-full h-0.5 rounded-full mb-4 opacity-60"
                style={{ backgroundColor: card.color }}
              />

              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}18`, color: card.color }}
                >
                  {mindsetIcons[card.icon] ?? <Lightbulb size={22} />}
                </div>
                <div>
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-wider"
                    style={{ color: card.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
