import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { AIProjects } from '@/components/sections/AIProjects';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/utils/animations';

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

const ALL_FILTER = 'All';

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const tags = [ALL_FILTER, ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const [activeTag, setActiveTag] = useState(ALL_FILTER);

  const filtered = activeTag === ALL_FILTER
    ? projects
    : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <SEO
        title="Projects — Akash Kunwar"
        description="Production projects across enterprise telecom, AI SaaS, and full-stack engineering. Real work, real outcomes."
      />
      <PageHero
        label="// projects"
        title="Work That Ships"
        description="Production projects across enterprise ISP platforms, AI-powered SaaS products, and full-stack applications — built, validated, and delivered."
      />

      {/* Filter Tags */}
      <section className="px-4 sm:px-6 lg:px-8 pb-4">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding pt-8">
        <div className="container-max">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  className="glass-card rounded-2xl border border-border p-6 flex flex-col group hover:border-primary/30 transition-all"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-primary/70 font-medium">{project.subtitle}</p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_CLASS[project.status] ?? ''}`}
                    >
                      {STATUS_LABEL[project.status] ?? project.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.overview}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {project.results.slice(0, 2).map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Case Study <ArrowRight size={12} />
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
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              No projects found for this filter.
            </motion.div>
          )}
        </div>
      </section>

      <AIProjects />
    </>
  );
}
