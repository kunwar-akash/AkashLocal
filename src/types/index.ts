// ─── Personal Info ────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  avatar?: string;
  resumeUrl: string;
  social: SocialLink[];
  funFacts: string[];
  mission: string;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo?: string;
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  proficiency: number;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export type ProjectStatus = "in-progress" | "completed" | "maintained" | "archived";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  description: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  status: ProjectStatus;
  featured: boolean;
  startDate: string;
  endDate: string | null;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  tags: string[];
}

// ─── Education ────────────────────────────────────────────────────────────────

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
  grade?: string;
  gradeType?: "cgpa" | "percentage" | "gpa";
  description?: string;
  activities?: string[];
  logo?: string;
}

// ─── Certifications ───────────────────────────────────────────────────────────

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo?: string;
  skills?: string[];
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
  icon: string;
  category: "impact" | "leadership" | "recognition" | "milestone";
  date?: string;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: string;
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  responseTime: string;
}

// ─── Portfolio (root) ─────────────────────────────────────────────────────────

export interface Portfolio {
  personal: PersonalInfo;
  stats: Stat[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: Project[];
  education: EducationItem[];
  certifications: Certification[];
  achievements: Achievement[];
  contact: ContactInfo;
  buildCapabilities: BuildCapability[];
  aiCapabilities: AiCapability[];
  techStack: TechCategory[];
  engineeringPhilosophy: PhilosophyPrinciple[];
  engineeringDecisions: EngineeringDecision[];
  aiEngineering: AiEngineeringData;
}

// ─── SDE Positioning ──────────────────────────────────────────────────────────

export interface BuildCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  color: string;
}

export interface AiCapability {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
  color: string;
}

export interface TechItem {
  name: string;
  color: string;
}

export interface TechCategory {
  id: string;
  label: string;
  color: string;
  items: TechItem[];
}

export interface PhilosophyPrinciple {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// ─── Engineering Decisions ────────────────────────────────────────────────────

export interface EngineeringDecision {
  id: string;
  title: string;
  context: string;
  choice: string;
  outcome: string;
  domain: string;
  color: string;
  icon: string;
}

// ─── AI Engineering ───────────────────────────────────────────────────────────

export type AiSkillLevel = 'active' | 'experimenting' | 'learning';
export type AiSkillCat = 'prompt-engineering' | 'workflow' | 'tools' | 'methodology';
export type AiToolCategory = 'ai-model' | 'ide' | 'devtool' | 'productivity';
export type AiProjectStatus = 'concept' | 'experiment' | 'in-progress' | 'completed';

export interface AiSkillCard {
  name: string;
  icon: string;
  description: string;
  level: AiSkillLevel;
  category: AiSkillCat;
}

export interface AiTool {
  name: string;
  icon: string;
  description: string;
  usage: string;
  category: AiToolCategory;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ProblemCard {
  id: string;
  problem: string;
  approach: string;
  solution: string;
  impact: string;
  category: string;
  icon: string;
}

export interface AiProject {
  id: string;
  title: string;
  description: string;
  status: AiProjectStatus;
  technologies: string[];
  outcome?: string;
  tags: string[];
}

export interface AiImpactMetric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: string;
}

export interface MindsetCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface AiEngineeringData {
  skills: AiSkillCard[];
  toolkit: AiTool[];
  workflow: WorkflowStep[];
  problemsSolved: ProblemCard[];
  projects: AiProject[];
  impact: AiImpactMetric[];
  mindset: MindsetCard[];
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface AnimationVariants {
  hidden: Record<string, number | string>;
  visible: Record<string, number | string | object>;
}

export type Theme = "light" | "dark" | "system";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
