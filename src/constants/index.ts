import type { NavItem } from '@/types';

export const SITE_CONFIG = {
  name: 'Akash Kunwar',
  title: 'Akash Kunwar | AI Product Engineer & Full-Stack Builder',
  description:
    'AI Product Engineer who builds web applications, integrates LLMs into real products, and ships production software. Experienced in React, TypeScript, REST APIs, and AI engineering.',
  url: 'https://akashkunwar.dev',
  ogImage: '/og-image.png',
  author: 'Akash Kunwar',
  keywords: [
    'AI Product Engineer',
    'Full-Stack Developer',
    'AI Engineer',
    'LLM Integration',
    'Software Engineer',
    'Founding Engineer',
    'AI Builder',
    'React Developer',
    'TypeScript Developer',
    'AI Integration',
    'Prompt Engineer',
    'AI Workflow Design',
    'Generative AI',
    'Agentic AI',
    'REST API',
    'DigiMantra Labs',
    'EarthLink',
  ],
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'How I Use AI', href: '/how-i-use-ai' },
  { label: 'AI Engineering', href: '/ai' },
  { label: 'Skills', href: '/skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2,
} as const;

export const ANIMATION_DELAY = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
  stagger: 0.1,
} as const;

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const SCROLL_THRESHOLD = 100;

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  whatIBuild: 'what-i-build',
  aiInProduction: 'ai-in-production',
  experience: 'experience',
  skills: 'skills',
  techStack: 'tech-stack',
  aiSkills: 'ai-skills',
  aiToolkit: 'ai-toolkit',
  projects: 'projects',
  aiProjects: 'ai-projects',
  problemsSolved: 'problems-solved',
  aiWorkflow: 'ai-workflow',
  engineeringPhilosophy: 'engineering-philosophy',
  engineeringDecisions: 'engineering-decisions',
  aiImpact: 'ai-impact',
  education: 'education',
  achievements: 'achievements',
  contact: 'contact',
} as const;

export const SKILL_LEVEL_MAP: Record<string, number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 95,
};

export const RESUME_PATH = '/resume/Akash_Kunwar_Resume.pdf';
export const RESUME_FILENAME = 'Akash_Kunwar_Resume.pdf';

export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const;
