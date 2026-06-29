import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Building2, CalendarDays, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { ResumeDownload } from '@/components/common/ResumeDownload';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem, fadeInUp } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { formatDateRange } from '@/utils/date';

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  const { ref, inView } = useScrollAnimation();
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="mb-12"
    >
      <h2 className="text-lg font-bold text-foreground mb-5 pb-2 border-b border-border flex items-center gap-2">
        <span className="text-primary font-mono text-xs tracking-widest uppercase">//</span> {title}
      </h2>
      {children}
    </motion.section>
  );
}

// ─── Summary ─────────────────────────────────────────────────────────────────
function Summary() {
  const { personal } = portfolioData;
  return (
    <ResumeSection title="Professional Summary">
      <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
        {personal.summary}
      </motion.p>
      <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed mt-3">
        {personal.mission}
      </motion.p>
    </ResumeSection>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceSection() {
  const { experience } = portfolioData;
  return (
    <ResumeSection title="Experience">
      {experience.map((exp) => (
        <motion.div key={exp.id} variants={staggerItem} className="mb-8 last:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-bold text-foreground">{exp.role}</h3>
              <p className="text-primary font-semibold text-sm flex items-center gap-1.5">
                <Building2 size={13} />
                {exp.companyUrl ? (
                  <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
            </div>
            <div className="text-xs text-muted-foreground flex flex-col items-start sm:items-end gap-1">
              <span className="flex items-center gap-1">
                <CalendarDays size={11} />
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={11} /> {exp.location}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{exp.description}</p>
          <ul className="space-y-1.5">
            {exp.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-2" />
                {r}
              </li>
            ))}
          </ul>
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Key Achievements</p>
              <ul className="space-y-1.5">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle size={13} className="text-green-400 shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </ResumeSection>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────
function SkillsSection() {
  const { skills } = portfolioData;
  return (
    <ResumeSection title="Skills">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map((group) => (
          <motion.div key={group.id} variants={staggerItem}>
            <p className="text-sm font-semibold text-foreground mb-2">{group.category}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((s) => (
                <span key={s.name} className="tech-tag">{s.name}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </ResumeSection>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function EducationSection() {
  const { education } = portfolioData;
  return (
    <ResumeSection title="Education">
      {education.map((edu) => (
        <motion.div key={edu.id} variants={staggerItem} className="mb-5 last:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
            <div>
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <GraduationCap size={15} className="text-primary" />
                {edu.degree}
              </h3>
              <p className="text-sm text-primary font-medium">{edu.field}</p>
              <p className="text-sm text-muted-foreground">{edu.institution}</p>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              <p>{edu.startYear} — {edu.endYear}</p>
              {edu.grade && (
                <p className="text-primary font-semibold">CGPA: {edu.grade}</p>
              )}
            </div>
          </div>
          {edu.description && (
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{edu.description}</p>
          )}
        </motion.div>
      ))}
    </ResumeSection>
  );
}

// ─── Certifications ───────────────────────────────────────────────────────────
function CertificationsSection() {
  const { certifications } = portfolioData;
  return (
    <ResumeSection title="Certifications">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            variants={staggerItem}
            className="glass-card rounded-xl border border-border p-4"
          >
            <div className="flex items-start gap-2">
              <Award size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.date}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cert.skills?.map((s) => (
                    <span key={s} className="tech-tag">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ResumeSection>
  );
}

// ─── Resume Page ──────────────────────────────────────────────────────────────
export default function ResumePage() {
  const { personal } = portfolioData;

  return (
    <>
      <SEO
        title="Resume — Akash Kunwar"
        description="Full resume — AI Product Engineer, Full-Stack Builder, SDET. Experience at DigiMantra Labs on EarthLink, VeriHire, and HyreWorks."
      />
      <PageHero
        label="// resume"
        title="Professional Profile"
        description="AI Product Engineer and Software Engineer with experience delivering production software for enterprise-scale platforms."
      />

      <section className="section-padding pt-0">
        <div className="container-max max-w-4xl">
          {/* Contact strip + download */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="glass-card rounded-2xl border border-border p-6 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">{personal.name}</h1>
              <p className="text-primary font-semibold">{personal.title}</p>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={12} /> {personal.location}
                </span>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={12} /> {personal.email}
                </a>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone size={12} /> {personal.phone}
                </span>
              </div>
            </div>
            <ResumeDownload variant="primary" size="lg" label="Download PDF" />
          </motion.div>

          <Summary />
          <ExperienceSection />
          <SkillsSection />
          <EducationSection />
          <CertificationsSection />
        </div>
      </section>
    </>
  );
}
