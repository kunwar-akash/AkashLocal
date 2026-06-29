import { motion } from 'framer-motion';
import {
  Globe,
  Layers,
  Brain,
  GitMerge,
  Server,
  LayoutDashboard,
  Webhook,
  Sparkles,
  Zap,
  Target,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const capabilityIcons: Record<string, React.ReactNode> = {
  Globe: <Globe size={22} />,
  Layers: <Layers size={22} />,
  Brain: <Brain size={22} />,
  GitMerge: <GitMerge size={22} />,
  Server: <Server size={22} />,
  LayoutDashboard: <LayoutDashboard size={22} />,
  Webhook: <Webhook size={22} />,
  Sparkles: <Sparkles size={22} />,
  Zap: <Zap size={22} />,
  Target: <Target size={22} />,
};

export function WhatIBuild() {
  const { buildCapabilities } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="what-i-build" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// what i build"
          title="What I Build"
          description="From web applications to AI-powered tools — the types of software products and systems I design, build, and ship."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {buildCapabilities.map((cap) => (
            <motion.div
              key={cap.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5 flex flex-col group hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              {/* Top accent line */}
              <div
                className="w-full h-0.5 rounded-full mb-4 opacity-70"
                style={{ backgroundColor: cap.color }}
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 shrink-0"
                style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
              >
                {capabilityIcons[cap.icon] ?? <Lightbulb size={22} />}
              </div>

              {/* Title + description */}
              <h3 className="font-semibold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {cap.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${cap.color}12`, color: cap.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
