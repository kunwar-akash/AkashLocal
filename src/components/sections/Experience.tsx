import { motion } from 'framer-motion';
import { Building2, MapPin, CalendarDays, ChevronRight, Award } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { formatDateRange, getDuration } from '@/utils/date';

export function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// experience"
          title="Work Experience"
          description="Building quality-first engineering practices across enterprise telecom, SaaS, and recruitment platforms."
        />
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof portfolioData.experience)[0];
  index: number;
}) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      custom={index}
      className="relative"
    >
      <div className="glass-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors duration-300">
        <div className="p-6 pb-4 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="text-primary" size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-semibold text-sm">{exp.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground ml-13">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={12} className="text-primary/60" />
                  {formatDateRange(exp.startDate, exp.endDate)}
                  <span className="text-primary/60 font-mono">
                    ({getDuration(exp.startDate, exp.endDate)})
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-primary/60" />
                  {exp.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1.5 animate-pulse" />
                Current
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 capitalize">
                {exp.type}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Key Responsibilities
            </h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((r, i) => (
                <motion.li key={i} variants={staggerItem} className="flex items-start gap-2">
                  <ChevronRight size={14} className="text-primary/60 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{r}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {exp.achievements.map((a, i) => (
                <motion.li key={i} variants={staggerItem} className="flex items-start gap-2">
                  <Award size={13} className="text-yellow-400 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{a}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="px-6 pb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
