import { motion } from 'framer-motion';
import {
  Cpu,
  MessageSquare,
  GitMerge,
  Bot,
  Network,
  Zap,
  FileText,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';

const capabilityIcons: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  GitMerge: <GitMerge size={22} />,
  Bot: <Bot size={22} />,
  Network: <Network size={22} />,
  Zap: <Zap size={22} />,
  FileText: <FileText size={22} />,
  Sparkles: <Sparkles size={22} />,
};

export function AIInProduction() {
  const { aiCapabilities } = portfolioData;
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="ai-in-production" className="section-padding relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeader
          label="// ai in production"
          title="AI in Production"
          description="How I integrate AI into real products — not just using AI tools, but implementing LLM-powered capabilities that solve actual user problems."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {aiCapabilities.map((cap) => (
            <motion.div
              key={cap.id}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-5 flex flex-col group hover:border-primary/30 transition-all"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${cap.color}18`, color: cap.color }}
                >
                  {capabilityIcons[cap.icon] ?? <Lightbulb size={22} />}
                </div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-tight">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                {cap.description}
              </p>

              {/* Examples */}
              <div className="pt-3 border-t border-border/50 space-y-1.5">
                {cap.examples.map((example) => (
                  <div key={example} className="flex items-center gap-2">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: cap.color }}
                    />
                    <span className="text-xs text-muted-foreground">{example}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
