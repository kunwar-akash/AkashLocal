import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem, fadeInUp } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const STATUS_LABEL: Record<string, string> = {
  'in-progress': 'Live',
  completed: 'Completed',
  maintained: 'Maintained',
  archived: 'Archived',
};
const STATUS_CLASS: Record<string, string> = {
  'in-progress': 'text-green-400 bg-green-400/10 border-green-400/20',
  completed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  maintained: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  archived: 'text-slate-400 bg-slate-400/10 border-slate-400/20',
};

function DetailCard({
  icon,
  label,
  items,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  color: string;
}) {
  const { ref, inView } = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="glass-card rounded-2xl border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color }}>{icon}</span>
        <h3 className="font-semibold text-foreground text-sm">{label}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li key={i} variants={staggerItem} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: color }} />
            <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioData.projects.find((p) => p.id === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <SEO
        title={`${project.title} — Akash Kunwar`}
        description={project.overview}
      />

      {/* Back nav */}
      <div className="pt-24 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section-padding pt-8 pb-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container-max relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_CLASS[project.status] ?? ''}`}
              >
                {STATUS_LABEL[project.status] ?? project.status}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {project.startDate} {project.endDate ? `— ${project.endDate}` : '— Present'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              <span className="gradient-text">{project.title}</span>
            </h1>
            <p className="text-lg text-primary/80 font-medium mb-4">{project.subtitle}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-all"
              >
                <ExternalLink size={15} /> View Live Project
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results strip */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 border-y border-border/50 bg-card/20">
        <div className="container-max">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {project.results.map((result, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-2.5"
              >
                <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-snug">{result}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detail cards */}
      <section className="section-padding">
        <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.features && project.features.length > 0 && (
            <DetailCard
              icon={<Lightbulb size={18} />}
              label="Key Features"
              items={project.features}
              color="#7C3AED"
            />
          )}
          {project.challenges && project.challenges.length > 0 && (
            <DetailCard
              icon={<AlertTriangle size={18} />}
              label="Challenges"
              items={project.challenges}
              color="#f59e0b"
            />
          )}
          {project.solutions && project.solutions.length > 0 && (
            <DetailCard
              icon={<TrendingUp size={18} />}
              label="Solutions"
              items={project.solutions}
              color="#22D3EE"
            />
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="glass-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold text-foreground text-sm mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="container-max mt-10 flex items-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-all"
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Case Studies →
          </Link>
        </div>
      </section>
    </>
  );
}
