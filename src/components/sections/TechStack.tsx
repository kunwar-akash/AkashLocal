import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

export function TechStack() {
  const { techStack } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="tech-stack" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// technologies"
          title="Technologies I Build With"
          description="The stack I use day-to-day to design, build, and ship software and AI-powered products."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techStack.map((category) => (
            <motion.div
              key={category.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: category.color }}
                >
                  {category.label}
                </h3>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-border/60 bg-background/50 text-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default"
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: tech.color }}
                    />
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
