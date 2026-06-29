import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube2,
  Webhook,
  Database,
  Cloud,
  Code2,
  Terminal,
  LayoutDashboard,
  Headphones,
  GitBranch,
  Brain,
  Globe,
  Server,
  Wrench,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SkillBar } from '@/components/ui/SkillBar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { cn } from '@/lib/utils';

const categoryIcons: Record<string, React.ReactNode> = {
  TestTube: <TestTube2 size={16} />,
  Webhook: <Webhook size={16} />,
  Database: <Database size={16} />,
  Cloud: <Cloud size={16} />,
  Code: <Code2 size={16} />,
  Terminal: <Terminal size={16} />,
  LayoutDashboard: <LayoutDashboard size={16} />,
  HeadphonesIcon: <Headphones size={16} />,
  GitBranch: <GitBranch size={16} />,
  Brain: <Brain size={16} />,
  Globe: <Globe size={16} />,
  Server: <Server size={16} />,
  Wrench: <Wrench size={16} />,
};

export function Skills() {
  const { skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>(skills[0]?.id ?? '');
  const { ref, inView } = useScrollAnimation();

  const activeSkillGroup = skills.find((s) => s.id === activeCategory);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="// skills"
          title="Technical Skills"
          description="A comprehensive toolkit built through hands-on experience with enterprise production environments and Agile delivery."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0"
          >
            {skills.map((category) => (
              <motion.button
                key={category.id}
                variants={staggerItem}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap lg:whitespace-normal',
                  'border',
                  activeCategory === category.id
                    ? 'bg-primary/10 text-primary border-primary/30 shadow-sm shadow-primary/10'
                    : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent',
                )}
                whileHover={{ x: activeCategory !== category.id ? 4 : 0 }}
              >
                <span
                  className={cn(
                    'shrink-0 transition-colors',
                    activeCategory === category.id ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {categoryIcons[category.icon] ?? <Code2 size={16} />}
                </span>
                <span className="flex-1">{category.category}</span>
                <span className="hidden lg:inline text-xs text-muted-foreground/60 shrink-0">
                  {category.skills.length}
                </span>
              </motion.button>
            ))}
          </motion.div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeSkillGroup && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${activeSkillGroup.color}20` }}
                    >
                      <span style={{ color: activeSkillGroup.color }}>
                        {categoryIcons[activeSkillGroup.icon] ?? <Code2 size={20} />}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{activeSkillGroup.category}</h3>
                      <p className="text-xs text-muted-foreground">
                        {activeSkillGroup.skills.length} skills
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {activeSkillGroup.skills.map((skill, index) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        color={activeSkillGroup.color}
                        delay={index * 0.08}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">All Technologies</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skills
              .flatMap((cat) => cat.skills)
              .map((skill) => (
                <motion.span
                  key={skill.name}
                  className="tech-tag cursor-default"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {skill.name}
                </motion.span>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
