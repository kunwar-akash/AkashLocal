import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Zap,
} from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { cardHoverVariants } from '@/utils/animations';
import { formatDateRange } from '@/utils/date';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  'in-progress': { label: 'Live',      color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  completed:     { label: 'Completed', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  maintained:    { label: 'Maintained',color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  archived:      { label: 'Archived',  color: 'text-slate-400 bg-slate-400/10 border-slate-400/20' },
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[project.status] ?? statusConfig.completed;

  return (
    <motion.article
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className={cn(
        'relative rounded-2xl border border-border bg-card overflow-hidden',
        'transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10',
        featured && 'ring-1 ring-primary/20',
      )}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-primary/80 font-medium mt-0.5">{project.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', status.color)}>
              {status.label}
            </span>
            {featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                <Zap size={10} /> Featured
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.overview}</p>

        <p className="text-xs text-muted-foreground font-mono mb-4">
          {formatDateRange(project.startDate, project.endDate)}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="space-y-1.5">
          {project.results.slice(0, 2).map((result, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle size={14} className="text-green-400 shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">{result}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
              {project.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                  <ul className="space-y-1.5">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-xs text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.challenges.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Challenges</h4>
                  <ul className="space-y-1.5">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">⚡</span>
                        <span className="text-xs text-muted-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.solutions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Solutions</h4>
                  <ul className="space-y-1.5">
                    {project.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-green-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View on GitHub"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              aria-label="Visit live site"
            >
              <ExternalLink size={14} /> Visit Site
            </a>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? <><ChevronUp size={14} /> Less</> : <><ChevronDown size={14} /> Details</>}
        </button>
      </div>
    </motion.article>
  );
}
