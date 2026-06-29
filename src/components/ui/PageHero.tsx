import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  accentColor?: string;
}

export function PageHero({ label, title, description, accentColor = '#7C3AED' }: PageHeroProps) {
  return (
    <section className="section-padding pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      <div className="container-max relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-3xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-3 block">
            {label}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
            <span className="gradient-text">{title}</span>
          </h1>
          {description && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
