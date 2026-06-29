import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={cn('mb-12', align === 'center' ? 'text-center' : 'text-left', className)}
    >
      <motion.span
        variants={fadeInUp}
        className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 font-mono"
      >
        {label}
      </motion.span>

      <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'text-muted-foreground text-base sm:text-lg leading-relaxed',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl',
          )}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        variants={fadeInUp}
        className={cn(
          'mt-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent',
          align === 'center' ? 'w-24 mx-auto' : 'w-24',
        )}
      />
    </motion.div>
  );
}
