import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Target, CheckCircle, Layers,
  Code, TestTube, Lightbulb, Settings,
  ArrowRight, ChevronDown,
  Award, AlertTriangle,
  Network, FileText,
} from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { staggerContainer, staggerItem, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PhilosophyCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface FrameworkStep {
  num: number;
  title: string;
  short: string;
  detail: string;
  bullets: string[];
  color: string;
}

interface UseCaseExample {
  title: string;
  description: string;
}

interface UseCaseTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  examples: UseCaseExample[];
}

interface WorkflowStep {
  num: number;
  label: string;
  sub: string;
  isAI?: boolean;
}

interface Tool {
  name: string;
  category: string;
  color: string;
  use: string;
}

interface CaseStudy {
  id: string;
  project: string;
  title: string;
  challenge: string;
  thought: string;
  strategy: string;
  execution: string;
  result: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ImpactMetric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

interface Differentiator {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHILOSOPHY: PhilosophyCard[] = [
  {
    icon: Brain,
    title: 'AI Amplifies Thinking — It Doesn\'t Replace It',
    description: 'The clearest thinking produces the best AI results. I define the problem, the constraints, and the expected outcome first. AI executes on that clarity — not in place of it.',
    color: '#7C3AED',
  },
  {
    icon: Target,
    title: 'Outcomes First, Tools Second',
    description: 'I choose AI tools based on what the problem actually needs — not what\'s trending. The question is always "does this produce better results?" — never "does this use AI?"',
    color: '#22D3EE',
  },
  {
    icon: CheckCircle,
    title: 'Human Judgment Is the Final Gate',
    description: 'AI generates candidates. I review them. Every AI output I ship has been read, evaluated, and validated — no blind automation, no unchecked generation reaching users.',
    color: '#a855f7',
  },
  {
    icon: Layers,
    title: 'Systems Thinking Before Prompting',
    description: 'I understand the system before I design the AI integration. A well-designed system makes AI effective. A poorly designed one makes it produce noise faster.',
    color: '#3b82f6',
  },
];

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    num: 1,
    title: 'Understand the Problem',
    short: 'Define what\'s actually broken or needed.',
    detail: 'Most failures begin with solving the wrong problem. Before any tool is chosen, I spend time identifying what\'s actually broken, who is affected, and what a good outcome truly looks like.',
    bullets: [
      'What is the root cause, not just the symptom?',
      'Who is affected and how does it impact them?',
      'What does "solved" look like in measurable terms?',
      'What constraints limit the solution space?',
    ],
    color: '#7C3AED',
  },
  {
    num: 2,
    title: 'Break Down Complexity',
    short: 'Decompose into solvable component parts.',
    detail: 'Complex problems are almost always collections of smaller, solvable problems. I map the components, their dependencies, and the order of operations before designing anything.',
    bullets: [
      'What are the independent components?',
      'What are the dependencies and sequencing?',
      'Where are the system boundaries?',
      'Which parts are well-understood vs. ambiguous?',
    ],
    color: '#6366f1',
  },
  {
    num: 3,
    title: 'Design the Solution',
    short: 'Choose an approach with clear trade-offs.',
    detail: 'Before writing a single prompt or line of code, I design the solution at a conceptual level. I consider multiple approaches, evaluate trade-offs, and commit to one before executing.',
    bullets: [
      'What are the viable solution approaches?',
      'What are the trade-offs of each?',
      'What does "done" look like — specifically?',
      'What could go wrong and how would I know?',
    ],
    color: '#8b5cf6',
  },
  {
    num: 4,
    title: 'Identify AI Leverage Points',
    short: 'Determine where AI genuinely adds value.',
    detail: 'Not every step benefits from AI. I specifically identify where AI creates leverage: tasks that are repetitive, pattern-based, scale-dependent, or require broad exploration — and where it doesn\'t.',
    bullets: [
      'Where is the bottleneck that AI can address?',
      'Is this task repetitive, analytical, or creative at scale?',
      'What\'s the cost of an AI error here vs. a human one?',
      'Does AI need context I can actually provide?',
    ],
    color: '#a855f7',
  },
  {
    num: 5,
    title: 'Build and Integrate',
    short: 'Execute with engineering discipline.',
    detail: 'Implementation follows design. When AI is involved, I treat prompts as engineered systems — structured, parameterized, and maintainable — not one-off queries.',
    bullets: [
      'Prompts are structured templates, not ad-hoc questions',
      'Edge cases and failure modes are designed for explicitly',
      'AI integration points are isolated and testable',
      'The system works without AI if the integration fails',
    ],
    color: '#22D3EE',
  },
  {
    num: 6,
    title: 'Validate Results',
    short: 'Review AI outputs critically before they ship.',
    detail: 'AI outputs are candidates, not conclusions. Every output is reviewed against real criteria: accuracy, completeness, and fitness for the specific context. Anything that doesn\'t pass review doesn\'t ship.',
    bullets: [
      'Does the output address the actual requirement?',
      'What would a wrong answer look like — did I check for it?',
      'Are edge cases covered in the output?',
      'Would I stake my name on this result?',
    ],
    color: '#10b981',
  },
  {
    num: 7,
    title: 'Optimize and Scale',
    short: 'Build patterns that survive beyond the first use.',
    detail: 'The goal isn\'t a one-time solution — it\'s a reusable system. I document what worked, refine the approach based on results, and build repeatable patterns that others can use.',
    bullets: [
      'What prompt templates and patterns can be reused?',
      'What documentation does this process need?',
      'How does this scale as the problem grows?',
      'What feedback loops confirm it\'s working over time?',
    ],
    color: '#f59e0b',
  },
];

const USE_CASE_TABS: UseCaseTab[] = [
  {
    id: 'dev',
    label: 'Development',
    icon: Code,
    examples: [
      { title: 'Architecture Planning', description: 'Using AI to explore design patterns, evaluate trade-offs, and stress-test architectural decisions before committing to implementation.' },
      { title: 'Code Generation', description: 'Generating structured code scaffolding, boilerplate, and implementation templates from clear specifications — then reviewing critically before use.' },
      { title: 'Debugging Assistance', description: 'Feeding error traces, logs, and context to AI for pattern analysis — AI narrows the search space, I confirm the root cause.' },
      { title: 'Documentation', description: 'Converting structured technical data (API specs, test plans, incident reports) into consistent, stakeholder-ready documentation at speed.' },
      { title: 'Code Refactoring', description: 'Identifying refactoring candidates, generating alternatives, and reviewing improvements — AI accelerates exploration, I decide what ships.' },
      { title: 'Rapid Prototyping', description: 'Compressing idea-to-working-prototype timelines using AI for scaffolding and iteration, while maintaining engineering quality in the final output.' },
    ],
  },
  {
    id: 'qa',
    label: 'Quality Engineering',
    icon: TestTube,
    examples: [
      { title: 'Test Case Generation', description: 'Generating comprehensive test cases from user story descriptions, acceptance criteria, and edge case patterns I might not have considered manually.' },
      { title: 'Boundary Value Discovery', description: 'Using AI to systematically explore the decision boundaries in complex systems — particularly effective for AI-powered features with probabilistic outputs.' },
      { title: 'API Contract Testing', description: 'Generating Postman test scripts and validation logic from API specs, then reviewing for accuracy before adding to the regression suite.' },
      { title: 'Regression Planning', description: 'Analyzing feature changes to identify which existing test cases are most likely to be affected — risk-based planning at scale.' },
      { title: 'RCA Analysis', description: 'Feeding structured production logs to AI for pattern correlation across microservices — AI surfaces probable failure sequences, I confirm and act.' },
      { title: 'Edge Case Discovery', description: 'Systematically exploring edge cases for complex business logic — AI generates scenarios based on the rule space, I validate they\'re meaningful.' },
    ],
  },
  {
    id: 'product',
    label: 'Product',
    icon: Lightbulb,
    examples: [
      { title: 'Feature Requirement Analysis', description: 'Analyzing user stories and requirements for ambiguity, missing constraints, and potential conflict — catching gaps before development begins.' },
      { title: 'User Journey Mapping', description: 'Generating alternative user flow scenarios, identifying friction points, and validating that edge cases in the journey are accounted for in the design.' },
      { title: 'Competitive Research Synthesis', description: 'Summarizing and structuring large volumes of research material into structured insights — AI accelerates reading, I synthesize the conclusions.' },
      { title: 'Acceptance Criteria Drafting', description: 'Converting high-level feature descriptions into specific, testable acceptance criteria — then reviewing for completeness before sprint planning.' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    icon: Settings,
    examples: [
      { title: 'Release Note Automation', description: 'Converting JIRA ticket summaries and technical change logs into structured, stakeholder-ready release notes — reducing documentation overhead per sprint.' },
      { title: 'Incident Report Drafting', description: 'Structuring production incident timelines, root cause summaries, and corrective actions from raw investigation notes into formal incident reports.' },
      { title: 'Knowledge Management', description: 'Structuring institutional knowledge, team processes, and investigation playbooks into searchable, reusable documentation formats.' },
      { title: 'Workflow Automation Design', description: 'Identifying repetitive manual processes across QA and engineering workflows and designing AI-augmented alternatives that reduce cycle time without sacrificing quality.' },
    ],
  },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  { num: 1, label: 'Define Problem', sub: 'Clarify the real question' },
  { num: 2, label: 'Research Context', sub: 'Gather relevant information' },
  { num: 3, label: 'Design Prompt', sub: 'Structure the AI request' },
  { num: 4, label: 'AI Output', sub: 'Generate candidates', isAI: true },
  { num: 5, label: 'Human Review', sub: 'Apply judgment' },
  { num: 6, label: 'Implement', sub: 'Execute with quality' },
  { num: 7, label: 'Test & Validate', sub: 'Verify the outcome' },
  { num: 8, label: 'Ship', sub: 'Deliver with confidence' },
];

const TOOLS: Tool[] = [
  { name: 'Claude', category: 'LLM', color: '#d4732a', use: 'Architecture, analysis, complex reasoning, long-context review' },
  { name: 'ChatGPT', category: 'LLM', color: '#10a37f', use: 'Documentation drafting, test case generation, ideation' },
  { name: 'Gemini', category: 'LLM', color: '#4285f4', use: 'Research synthesis, multimodal analysis' },
  { name: 'Claude Code', category: 'Dev Tool', color: '#7C3AED', use: 'AI-assisted development, architecture decisions, code review' },
  { name: 'GitHub Copilot', category: 'Dev Tool', color: '#6e5494', use: 'Inline code completion, boilerplate acceleration' },
  { name: 'Cursor', category: 'Dev Tool', color: '#22D3EE', use: 'AI-native IDE for rapid iteration and context-aware edits' },
  { name: 'MCP Servers', category: 'Integration', color: '#a855f7', use: 'Custom AI tool integrations and workflow orchestration' },
  { name: 'VS Code', category: 'IDE', color: '#0078d4', use: 'Primary development environment' },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'verihire-boundary',
    project: 'VeriHire',
    title: 'Testing a Non-Deterministic AI Screening System',
    challenge: 'VeriHire\'s AI candidate screening algorithm produced different scores each run. Standard regression tests failed randomly — not because the AI was wrong, but because they were testing the wrong thing. The question wasn\'t "what\'s the exact score?" — it was "is the AI making correct decisions?"',
    thought: 'Realized that behavioral consistency mattered more than value precision. A qualified candidate should consistently outrank an unqualified one. The right test wasn\'t "did it return 87%?" — it was "did it classify this candidate correctly across 20 runs?"',
    strategy: 'Used ChatGPT and Claude to generate diverse candidate profiles at specific competency levels — highly qualified, borderline, and clearly unqualified — then designed boundary test cases that probed the critical 60% shortlisting threshold specifically.',
    execution: 'Built partition-based test sets with behavioral assertions, not fixed-value assertions. Ran 20 iterations per boundary condition to establish statistical consistency. Created reusable prompt templates that could generate new test profiles from user story inputs in minutes.',
    result: 'Caught a scoring weight regression two weeks before an enterprise client onboarding that would have sent unqualified candidates to the shortlist. The defect was invisible to exact-match tests but immediately visible in boundary behavioral tests.',
    color: '#7C3AED',
    icon: TestTube,
  },
  {
    id: 'earthlink-rca',
    project: 'EarthLink',
    title: 'Compressing Production Incident RCA from Hours to Minutes',
    challenge: 'Production failures at EarthLink spanned 5+ microservices (provisioning, billing, account management). Manually correlating logs across service boundaries took 2-3 hours per incident — high-pressure time with customer impact accumulating every minute.',
    thought: 'Log correlation is pattern recognition at scale — exactly where AI creates leverage. The engineer\'s job is knowing which logs to provide, how to structure the query, and how to interpret the output. That judgment doesn\'t go away; AI just speeds up the pattern search.',
    strategy: 'Structured log extracts from different services into a consistent format optimized for AI analysis. Created reusable RCA prompt templates for common incident categories: auth failures, provisioning errors, billing discrepancies. Each template included the log format, the system context, and the expected output structure.',
    execution: 'When an incident fired, I extracted structured log segments from the relevant service boundaries, fed them through the appropriate template, and used Claude to surface correlation patterns and probable failure sequences. I then confirmed the hypothesis and executed the fix.',
    result: 'Mean time to diagnosis dropped by roughly 40-50% for structured incident types. Investigation narrowed to the specific service boundary within minutes instead of hours. The saved time translated directly into faster customer impact resolution and cleaner post-incident reports.',
    color: '#22D3EE',
    icon: Network,
  },
  {
    id: 'earthlink-docs',
    project: 'EarthLink',
    title: 'Scaling API Test Documentation Across 20+ Stakeholders',
    challenge: 'Test coverage documentation for EarthLink\'s API layer needed to be accurate, consistent, and understandable by both engineering and business stakeholders. Manual documentation took 2-3 days per release cycle and was inconsistently formatted — some stakeholders couldn\'t interpret the technical content.',
    thought: 'Documentation is structured writing from structured data. Postman collections had all the data: endpoints, request/response formats, expected behavior. The challenge was converting technical data into a consistent, readable format — a transformation AI handles well when given a clear template.',
    strategy: 'Defined a documentation template specifying exactly what each API doc should include: endpoint purpose, expected behavior, key parameters, response scenarios, error cases, and test coverage summary. Designed prompts that converted structured Postman data into this template format consistently.',
    execution: 'Exported Postman collection data, structured it into AI-parseable format, and ran it through the template prompt. Reviewed each generated doc for accuracy, filled in context the automation couldn\'t capture, and delivered the final set.',
    result: 'Documentation turnaround dropped from 2-3 days to 4-6 hours per release cycle. Business stakeholders could review API coverage and test scenarios without requiring an engineering walkthrough. Consistency improved significantly — every doc followed the same structure.',
    color: '#a855f7',
    icon: FileText,
  },
];

const DECISIONS_USE_AI = [
  'Generating diverse test cases from a defined rule space — scales output beyond manual throughput',
  'First-pass RCA on structured logs — AI narrows the pattern search before human investigation',
  'Converting structured technical data into stakeholder-ready documentation',
  'Exploring edge cases and failure modes across a complex problem space',
  'Generating API contract test templates from existing endpoint specifications',
  'Drafting structured reports from raw investigation or analysis notes',
  'Exploring alternative approaches or architectural trade-offs at the design stage',
];

const DECISIONS_GO_MANUAL = [
  'Final validation of any output before it reaches users — human review is always the last gate',
  'Architectural decisions that require business context AI doesn\'t have',
  'Communicating directly with stakeholders on complex, nuanced issues',
  'Debugging non-deterministic, race-condition, or environment-specific failures',
  'Writing the actual test assertions — accuracy is non-negotiable here',
  'Risk-based prioritization decisions that require understanding of customer impact',
  'Any judgment call where being wrong has high cost and AI can\'t know the full context',
];

const IMPACT: ImpactMetric[] = [
  { value: 40, suffix: '+', label: 'Production Releases', description: 'Shipped with AI-augmented validation workflows — zero critical escapes' },
  { value: 40, suffix: '%', prefix: '~', label: 'Defect Rate Reduced', description: 'Through AI-assisted RCA, proactive analysis, and structured test generation' },
  { value: 50, suffix: '%', prefix: '~', label: 'Faster Incident Diagnosis', description: 'For structured incident types using AI-powered log correlation templates' },
  { value: 300, suffix: '+', label: 'Features Validated', description: 'With AI-supported test planning, boundary analysis, and coverage review' },
];

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Brain,
    title: 'Engineering Depth, Not Tool Depth',
    description: 'I understand systems at the infrastructure level — authentication flows, service boundaries, data dependencies. This depth makes AI dramatically more useful: I know exactly what context to provide, what output to expect, and what result to distrust.',
    color: '#7C3AED',
  },
  {
    icon: CheckCircle,
    title: 'Quality-First Validation',
    description: 'My background in validating production systems means I apply the same rigor to AI outputs that I apply to code. Every AI result I act on has been evaluated against real criteria — not accepted because it looked plausible.',
    color: '#22D3EE',
  },
  {
    icon: Target,
    title: 'Problem-First Thinking',
    description: 'I define the problem clearly before reaching for any tool. AI applied to the wrong problem — faster — is still wrong. The quality of the question determines the quality of the answer. I spend time on the question.',
    color: '#a855f7',
  },
  {
    icon: Layers,
    title: 'Cross-Domain Application',
    description: 'I apply AI across the full engineering lifecycle — testing, development, documentation, analysis, and operations. Not siloed to one domain. This cross-domain perspective helps me see leverage points that specialists miss.',
    color: '#3b82f6',
  },
  {
    icon: Award,
    title: 'Production-Grade Judgment',
    description: '40+ releases shipped to millions of users gives me a clear sense of what failure costs. That context shapes every AI integration decision: I think about edge cases, failure modes, and what happens when the AI gets it wrong — before it ships.',
    color: '#10b981',
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center section-padding pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="container-max w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={staggerItem} className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-4">
              // how i use ai
            </motion.p>
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5"
            >
              <span className="text-foreground">How I Use AI to</span>{' '}
              <span className="gradient-text">Solve Problems</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
              I use AI as a force multiplier — to understand problems faster, generate better options,
              automate repetitive work, and ship more reliable solutions. The thinking stays mine.
              AI accelerates the execution.
            </motion.p>
            <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-8">
              {['Systems Thinker', 'Problem Solver', 'Engineering First', 'Quality-Driven'].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20 bg-primary/5 text-primary">
                  {b}
                </span>
              ))}
            </motion.div>
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                View Case Studies <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
              >
                Let's Work Together
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Framework preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-3xl border border-border p-6">
              <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">My Problem-Solving Loop</p>
              <div className="space-y-2">
                {FRAMEWORK_STEPS.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{step.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Philosophy ────────────────────────────────────────────────────────────────

function PhilosophySection() {
  const { ref, inView } = useScrollAnimation();
  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// my ai philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The Principles I Work By</h2>
          <p className="text-muted-foreground mt-2">Four beliefs that shape every AI decision I make — not aspirational, but operational.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {PHILOSOPHY.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className="glass-card rounded-2xl border border-border p-6 group hover:border-primary/30 transition-all"
                whileHover={{ y: -3 }}
              >
                <div className="h-0.5 w-full rounded-full mb-5" style={{ backgroundColor: card.color }} />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-foreground mb-2 leading-snug">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Framework ─────────────────────────────────────────────────────────────────

function FrameworkSection() {
  const [activeStep, setActiveStep] = useState(0);
  const { ref, inView } = useScrollAnimation();
  const step = FRAMEWORK_STEPS[activeStep]!;

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// problem-solving framework</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How I Approach Every Problem</h2>
          <p className="text-muted-foreground mt-2">A repeatable 7-step process that applies whether the problem is a production incident, a product feature, or an engineering challenge.</p>
        </motion.div>

        {/* Desktop: two-panel */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Step list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="absolute left-4 top-5 bottom-5 w-px bg-border" />
            <div className="space-y-1">
              {FRAMEWORK_STEPS.map((s, i) => (
                <motion.button
                  key={s.num}
                  variants={staggerItem}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`relative w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                    activeStep === i
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-card/60 border border-transparent'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all z-10"
                    style={{
                      backgroundColor: activeStep === i ? s.color : `${s.color}20`,
                      color: activeStep === i ? '#fff' : s.color,
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold leading-snug ${activeStep === i ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {s.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.num}
                </div>
                <div>
                  <p className="text-xs font-mono text-muted-foreground">Step {step.num} of {FRAMEWORK_STEPS.length}</p>
                  <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">{step.detail}</p>
              <div className="space-y-2">
                {step.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ backgroundColor: step.color }} />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6 pt-5 border-t border-border">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((p) => p - 1)}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={activeStep === FRAMEWORK_STEPS.length - 1}
                  onClick={() => setActiveStep((p) => p + 1)}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-2">
          {FRAMEWORK_STEPS.map((s, i) => {
            const isOpen = activeStep === i;
            return (
              <div key={s.num} className="glass-card rounded-2xl border border-border overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 p-4 text-left"
                  onClick={() => setActiveStep(isOpen ? -1 : i)}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.num}
                  </div>
                  <span className="flex-1 font-semibold text-foreground text-sm">{s.title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-border/50 pt-3">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.detail}</p>
                        <div className="space-y-2">
                          {s.bullets.map((b) => (
                            <div key={b} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full shrink-0 mt-2" style={{ backgroundColor: s.color }} />
                              <span className="text-xs text-muted-foreground">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Use Cases ─────────────────────────────────────────────────────────────────

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('dev');
  const { ref, inView } = useScrollAnimation();
  const current = USE_CASE_TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-8 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// real use cases</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Where I Apply AI</h2>
          <p className="text-muted-foreground mt-2">Real examples across engineering, quality, product, and operations — not theoretical possibilities.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {USE_CASE_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-transparent'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {current.examples.map((ex, i) => (
              <motion.div
                key={ex.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl border border-border p-5 group hover:border-primary/30 transition-all"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{ex.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ex.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Workflow ──────────────────────────────────────────────────────────────────

function WorkflowSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// workflow</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">My End-to-End AI Workflow</h2>
          <p className="text-muted-foreground mt-2">Every AI-assisted task I work on follows this sequence. The AI step is one of eight — not the whole process.</p>
        </motion.div>

        {/* Flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-0"
        >
          {WORKFLOW_STEPS.map((s, i) => (
            <motion.div key={s.num} variants={staggerItem} className="flex flex-col md:flex-row items-center">
              {/* Step card */}
              <div
                className={`relative flex flex-col items-center text-center px-4 py-4 rounded-2xl border transition-all min-w-[110px] ${
                  s.isAI
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border glass-card'
                }`}
              >
                {s.isAI && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground whitespace-nowrap">
                    AI Step
                  </span>
                )}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mb-2 shrink-0"
                  style={{ backgroundColor: s.isAI ? '#7C3AED' : '#64748b' }}
                >
                  {s.num}
                </div>
                <p className="text-xs font-bold text-foreground leading-tight">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.sub}</p>
              </div>

              {/* Arrow */}
              {i < WORKFLOW_STEPS.length - 1 && (
                <>
                  <ArrowRight size={16} className="hidden md:block text-border mx-1 shrink-0" />
                  <div className="md:hidden w-px h-4 bg-border mx-auto" />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 p-5 rounded-2xl border border-primary/15 bg-primary/5"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary font-semibold">Key insight:</span> Step 4 (AI Output) is where AI is involved. The seven steps around it — problem definition, context research, prompt design, human review, implementation, testing, and delivery — are engineering discipline. That discipline is what makes the AI step produce something useful.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Tools ─────────────────────────────────────────────────────────────────────

function ToolsSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-8 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// ai tools</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Tools I Work With</h2>
          <p className="text-muted-foreground mt-2">Supporting actors — not the headline. The judgment behind the tool use is what matters.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {TOOLS.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="glass-card rounded-xl border border-border p-4 group hover:border-primary/30 transition-all"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-foreground text-sm">{tool.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-md font-medium"
                  style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                >
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{tool.use}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

function CaseStudiesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// case studies</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">AI Applied to Real Problems</h2>
          <p className="text-muted-foreground mt-2">Three detailed examples from production work — challenge, thought process, AI strategy, execution, result.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          {CASE_STUDIES.map((cs) => {
            const Icon = cs.icon;
            const isOpen = expanded === cs.id;
            return (
              <motion.div
                key={cs.id}
                variants={staggerItem}
                className={`glass-card rounded-2xl border overflow-hidden transition-colors ${isOpen ? 'border-primary/30' : 'border-border'}`}
              >
                {/* Header */}
                <button
                  type="button"
                  className="w-full flex items-start gap-4 p-6 text-left"
                  onClick={() => setExpanded(isOpen ? null : cs.id)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${cs.color}15`, color: cs.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: `${cs.color}15`, color: cs.color }}
                      >
                        {cs.project}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base leading-snug">{cs.title}</h3>
                    {!isOpen && (
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{cs.challenge}</p>
                    )}
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-border/50 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                          { label: 'Challenge', content: cs.challenge, color: '#ef4444' },
                          { label: 'Thought Process', content: cs.thought, color: '#f59e0b' },
                          { label: 'AI Strategy', content: cs.strategy, color: '#7C3AED' },
                          { label: 'Execution', content: cs.execution, color: '#3b82f6' },
                        ].map(({ label, content, color }) => (
                          <div key={label}>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color }}>{label}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
                          </div>
                        ))}
                        <div className="md:col-span-2 p-4 rounded-xl border border-primary/15 bg-primary/5">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Result</p>
                          <p className="text-sm text-foreground leading-relaxed font-medium">{cs.result}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Decisions ─────────────────────────────────────────────────────────────────

function DecisionsSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// engineering judgment</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">When AI Helps — and When It Doesn't</h2>
          <p className="text-muted-foreground mt-2">Knowing when NOT to use AI is as important as knowing when to use it. This is where engineering maturity shows.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Use AI */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInLeft}
            className="glass-card rounded-2xl border border-green-500/20 p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-400" />
              </div>
              <h3 className="font-bold text-foreground">When AI Accelerates</h3>
            </div>
            <div className="space-y-3">
              {DECISIONS_USE_AI.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle size={13} className="text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Go manual */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInRight}
            className="glass-card rounded-2xl border border-amber-500/20 p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <AlertTriangle size={16} className="text-amber-400" />
              </div>
              <h3 className="font-bold text-foreground">When Manual Is Better</h3>
            </div>
            <div className="space-y-3">
              {DECISIONS_GO_MANUAL.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Impact ─────────────────────────────────────────────────────────────────────

function ImpactSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      <div className="container-max relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// impact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Outcomes From AI-Augmented Work</h2>
          <p className="text-muted-foreground mt-2">Real numbers from production work — not estimates, not hypotheticals.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {IMPACT.map((m) => (
            <motion.div
              key={m.label}
              variants={staggerItem}
              className="glass-card rounded-2xl border border-border p-6 text-center"
              whileHover={{ y: -3 }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">
                <AnimatedCounter value={m.value} prefix={m.prefix ?? ''} suffix={m.suffix} />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
              <p className="text-xs text-muted-foreground leading-tight">{m.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Differentiators ───────────────────────────────────────────────────────────

function DifferentiatorsSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding bg-card/20">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="mb-10 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-2 block">// what makes me different</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">The Competitive Advantage</h2>
          <p className="text-muted-foreground mt-2">Anyone can say they use AI. What differentiates is judgment — knowing what to ask, what to trust, and what to ship.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                variants={staggerItem}
                className={`glass-card rounded-2xl border border-border p-6 group hover:border-primary/30 transition-all ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                whileHover={{ y: -3 }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${d.color}15`, color: d.color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section-padding">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/20 overflow-hidden p-10 sm:p-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(34,211,238,0.05) 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">// ready to work together?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Have a Problem That Needs Solving?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm sm:text-base">
              I'm available for engineering roles, AI product work, and interesting technical challenges.
              If you have a problem that AI might help solve — let's talk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
              >
                See My Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HowIUseAIPage() {
  return (
    <>
      <SEO
        title="How I Use AI to Solve Problems — Akash Kunwar"
        description="My framework for applying AI to real engineering problems — from production incident analysis to test case generation, API documentation, and software development."
      />
      <Hero />
      <PhilosophySection />
      <FrameworkSection />
      <UseCasesSection />
      <WorkflowSection />
      <ToolsSection />
      <CaseStudiesSection />
      <DecisionsSection />
      <ImpactSection />
      <DifferentiatorsSection />
      <CTASection />
    </>
  );
}
