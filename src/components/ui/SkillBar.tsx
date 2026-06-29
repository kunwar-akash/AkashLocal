import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Skill } from '@/types';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: Skill;
  color?: string;
  delay?: number;
}

const levelColors: Record<string, string> = {
  beginner:     'from-slate-400 to-slate-500',
  intermediate: 'from-blue-400 to-cyan-500',
  advanced:     'from-blue-500 to-indigo-600',
  expert:       'from-blue-600 to-violet-600',
};

export function SkillBar({ skill, color, delay = 0 }: SkillBarProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const gradientClass = levelColors[skill.level] ?? 'from-blue-500 to-cyan-500';

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-xs px-1.5 py-0.5 rounded font-mono capitalize',
              skill.level === 'expert'
                ? 'bg-violet-500/10 text-violet-400'
                : skill.level === 'advanced'
                ? 'bg-blue-500/10 text-blue-400'
                : skill.level === 'intermediate'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'bg-slate-500/10 text-slate-400',
            )}
          >
            {skill.level}
          </span>
          <span className="text-xs text-muted-foreground font-mono w-8 text-right">
            {skill.proficiency}%
          </span>
        </div>
      </div>

      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: color ? `${color}20` : undefined }}
        role="progressbar"
        aria-valuenow={skill.proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
      >
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', gradientClass)}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}
