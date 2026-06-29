import { motion } from 'framer-motion';
import { GraduationCap, Star, CalendarDays } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

export function Education() {
  const { education } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="education" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// education"
          title="Academic Background"
          description="A strong engineering foundation from Shoolini University, complemented by continuous learning in QA and software quality practices."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative max-w-3xl mx-auto"
        >
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div key={edu.id} variants={staggerItem} className="relative pl-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="absolute left-4 top-6 w-5 h-5 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30"
                />

                <div className="glass-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="text-primary" size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-primary text-sm font-medium">{edu.field}</p>
                        <p className="text-muted-foreground text-sm">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays size={12} className="text-primary/60" />
                        {edu.startYear} – {edu.endYear ?? 'Present'}
                      </span>
                      {edu.grade && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          <Star size={10} fill="currentColor" />
                          {edu.gradeType === 'cgpa' ? 'CGPA' : 'Grade'}: {edu.grade}
                          {edu.gradeType === 'cgpa' ? '/10' : '%'}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {edu.description}
                    </p>
                  )}

                  {edu.activities && edu.activities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {edu.activities.map((act) => (
                        <span key={act} className="tech-tag text-xs">{act}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
