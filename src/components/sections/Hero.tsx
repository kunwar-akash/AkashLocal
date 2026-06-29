import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

const TYPING_STRINGS = [
  'AI Product Engineer',
  'Full-Stack Builder',
  'LLM Integrator',
  'Systems Thinker',
  'Rapid Prototyper',
  'Problem Solver',
];

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Mail: <Mail size={18} />,
};

export function Hero() {
  const { personal, stats } = portfolioData;
  const { displayText, isTyping } = useTypingEffect({
    strings: TYPING_STRINGS,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center section-padding pt-24"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-max w-full relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to Founding Engineer &amp; AI Product roles
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="text-foreground">{personal.name.split(' ')[0]}</span>{' '}
              <span className="gradient-text">{personal.name.split(' ')[1]}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-8 sm:h-10"
          >
            <p className="text-xl sm:text-2xl font-mono text-primary">
              {displayText}
              <span
                className={`inline-block w-0.5 h-5 sm:h-6 bg-primary ml-0.5 align-middle ${
                  isTyping ? 'animate-pulse' : 'opacity-0'
                }`}
              />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {personal.summary.split('.')[0]}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MapPin size={14} className="text-primary" />
            {personal.location}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Get In Touch
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex items-center gap-4"
          >
            {personal.social.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target={link.platform !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {iconMap[link.icon]}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 w-full max-w-2xl"
          >
            {stats.slice(0, 3).map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="glass-card rounded-2xl p-4 sm:p-5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix ?? ''}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator — anchored to section (min-h-screen), never overlaps content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground pointer-events-none"
      >
        <span className="text-xs">Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
