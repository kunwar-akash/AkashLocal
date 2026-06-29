import { motion } from 'framer-motion';
import { Rocket, TrendingDown, Timer, Award, Users, CheckCircle } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={24} />,
  TrendingDown: <TrendingDown size={24} />,
  Timer: <Timer size={24} />,
  Award: <Award size={24} />,
  Users: <Users size={24} />,
  CheckCircle: <CheckCircle size={24} />,
};

const categoryColors: Record<string, string> = {
  milestone:   'from-blue-500/20 to-cyan-500/20 border-blue-500/20',
  impact:      'from-green-500/20 to-emerald-500/20 border-green-500/20',
  recognition: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/20',
  leadership:  'from-purple-500/20 to-violet-500/20 border-purple-500/20',
};

const categoryIconColors: Record<string, string> = {
  milestone:   'text-blue-400',
  impact:      'text-green-400',
  recognition: 'text-yellow-400',
  leadership:  'text-purple-400',
};

export function Achievements() {
  const { achievements } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="achievements" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// achievements"
          title="Key Achievements"
          description="Measurable impact delivered across production releases, defect reduction, and enterprise-scale quality assurance."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement) => {
            const gradientClass = categoryColors[achievement.category] ?? categoryColors.milestone;
            const iconColorClass =
              categoryIconColors[achievement.category] ?? categoryIconColors.milestone;

            return (
              <motion.div
                key={achievement.id}
                variants={staggerItem}
                className={cn(
                  'relative rounded-2xl border bg-gradient-to-br p-6',
                  'hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group',
                  gradientClass,
                )}
                whileHover={{ scale: 1.02 }}
              >
                <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-background/40 text-muted-foreground capitalize">
                  {achievement.category}
                </span>

                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-background/30',
                    iconColorClass,
                  )}
                >
                  {iconMap[achievement.icon] ?? <Award size={24} />}
                </div>

                {achievement.metric && (
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold gradient-text">
                      {achievement.metric.startsWith('~') ? (
                        <>
                          ~
                          <AnimatedCounter
                            value={parseInt(achievement.metric.replace(/[^0-9]/g, ''))}
                            suffix={achievement.metric.replace(/[^%+]/g, '')}
                          />
                        </>
                      ) : (
                        <AnimatedCounter
                          value={parseInt(achievement.metric.replace(/[^0-9]/g, ''))}
                          suffix={achievement.metric.replace(/[^%+]/g, '')}
                        />
                      )}
                    </span>
                    {achievement.metricLabel && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {achievement.metricLabel}
                      </span>
                    )}
                  </div>
                )}

                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
