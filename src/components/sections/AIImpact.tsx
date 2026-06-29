import { motion } from 'framer-motion';
import {
  Rocket,
  CheckCircle,
  MessageSquare,
  FlaskConical,
  TrendingDown,
  Users,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const metricIcons: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={22} />,
  CheckCircle: <CheckCircle size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  FlaskConical: <FlaskConical size={22} />,
  TrendingDown: <TrendingDown size={22} />,
  Users: <Users size={22} />,
};

const metricColors = [
  '#6366f1', '#10b981', '#a855f7', '#f59e0b', '#ef4444', '#06b6d4',
];

export function AIImpact() {
  const { aiEngineering } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="ai-impact" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// impact"
          title="AI-Powered Impact"
          description="Measurable outcomes from applying systematic engineering, AI-assisted approaches, and structured problem-solving."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {aiEngineering.impact.map((metric, index) => {
            const color = metricColors[index % metricColors.length];
            return (
              <motion.div
                key={metric.label}
                variants={staggerItem}
                className="glass-card rounded-2xl border border-border p-5 text-center group hover:border-primary/30 transition-all"
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  {metricIcons[metric.icon] ?? <Lightbulb size={22} />}
                </div>

                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color }}
                >
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix ?? ''}
                    suffix={metric.suffix}
                  />
                </div>

                <p className="text-xs font-medium text-foreground leading-tight mb-1.5">
                  {metric.label}
                </p>

                <p className="text-xs text-muted-foreground leading-tight hidden group-hover:block">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
