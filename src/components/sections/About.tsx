import { motion } from 'framer-motion';
import { Target, Lightbulb, Coffee, MapPin, Mail, Phone } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';

export function About() {
  const { personal, stats } = portfolioData;
  const { ref: leftRef, inView: leftInView } = useScrollAnimation();
  const { ref: rightRef, inView: rightInView } = useScrollAnimation();

  return (
    <section id="about" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// about me"
          title="What Drives the Build"
          description="A builder by nature — obsessed with shipping products that solve real problems, integrating AI where it multiplies impact, and engineering systems built to last."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="text-primary" size={20} />
                </div>
                <h3 className="font-semibold text-foreground">Professional Summary</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">{personal.summary}</p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Lightbulb className="text-cyan-400" size={20} />
                </div>
                <h3 className="font-semibold text-foreground">Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">{personal.mission}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: <MapPin size={14} />, value: personal.location },
                { icon: <Mail size={14} />, value: personal.email },
                { icon: <Phone size={14} />, value: personal.phone },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground glass-card rounded-xl p-3 border border-border/50"
                >
                  <span className="text-primary shrink-0">{item.icon}</span>
                  <span className="truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={rightRef}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            variants={fadeInRight}
            className="space-y-6"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={rightInView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-4 border border-border/50 hover-glow group"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix ?? ''}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1 leading-tight hidden group-hover:block">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Coffee className="text-orange-400" size={20} />
                </div>
                <h3 className="font-semibold text-foreground">Fun Facts</h3>
              </div>
              <ul className="space-y-2.5">
                {personal.funFacts.map((fact, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-primary mt-0.5 shrink-0">▸</span>
                    {fact}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
