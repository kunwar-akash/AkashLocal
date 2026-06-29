import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, CheckCircle, Zap } from 'lucide-react';
import { Hero } from '@/components/sections/Hero';
import { SEO } from '@/components/common/SEO';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem, fadeInUp } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SITE_CONFIG } from '@/constants';

// ─── Stats Strip ──────────────────────────────────────────────────────────────
function StatsStrip() {
  const { stats } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-border/50 bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                <AnimatedCounter value={stat.value} prefix={stat.prefix ?? ''} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── What I Build Preview ─────────────────────────────────────────────────────
function WhatIBuildPreview() {
  const { buildCapabilities } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex items-end justify-between mb-10"
        >
          <div ref={ref}>
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">
              // what i build
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Products I Ship
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            All Work <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {buildCapabilities.slice(0, 8).map((cap) => (
            <motion.div
              key={cap.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5 flex flex-col group hover:border-primary/30 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="h-0.5 w-full rounded-full mb-4 opacity-70" style={{ backgroundColor: cap.color }} />
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
              >
                <Zap size={18} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{cap.description}</p>
              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border/50">
                {cap.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-md" style={{ backgroundColor: `${cap.color}12`, color: cap.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 sm:hidden text-center">
          <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
            All Work <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Projects ────────────────────────────────────────────────────────
function FeaturedProjectsPreview() {
  const { projects } = portfolioData;
  const { ref, inView } = useScrollAnimation();
  const featured = projects.filter((p) => p.featured);

  const statusColor: Record<string, string> = {
    'in-progress': 'text-green-400 bg-green-400/10 border-green-400/20',
    completed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };

  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex items-end justify-between mb-10"
        >
          <div ref={ref}>
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">
              // featured work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            All Projects <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featured.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-6 group hover:border-primary/30 transition-all"
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary/70 font-medium">{project.subtitle}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${statusColor[project.status] ?? ''}`}>
                  {project.status === 'in-progress' ? 'Live' : 'Completed'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.overview}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 5).map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <div className="space-y-1.5 mb-5">
                {project.results.slice(0, 2).map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-green-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">{r}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Link
                  to={`/projects/${project.id}`}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Case Study →
                </Link>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={12} /> Visit
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── AI Preview ────────────────────────────────────────────────────────────────
function AIPreview() {
  const { aiCapabilities } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex items-end justify-between mb-10"
        >
          <div ref={ref}>
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">
              // ai engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              AI in Production
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl text-sm">
              Not just using AI tools — implementing LLM-powered capabilities that solve real product problems.
            </p>
          </div>
          <Link
            to="/ai"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Explore AI <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {aiCapabilities.slice(0, 4).map((cap) => (
            <motion.div
              key={cap.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5 group hover:border-primary/30 transition-all"
              whileHover={{ y: -3 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shrink-0 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
              >
                <Zap size={18} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/ai"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-all text-sm font-medium"
          >
            Full AI Engineering Page <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/20 overflow-hidden p-10 sm:p-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(34,211,238,0.05) 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">
              // open to opportunities
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Let's Build Something
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Have an idea, a challenge, or an opportunity? I'm available for founding engineer roles,
              AI product engineering, and interesting technical problems.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
              >
                See My Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SEO
        title={SITE_CONFIG.title}
        description={SITE_CONFIG.description}
      />
      <Hero />
      <StatsStrip />
      <WhatIBuildPreview />
      <FeaturedProjectsPreview />
      <AIPreview />
      <CTABanner />
    </>
  );
}
