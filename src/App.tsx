import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CustomCursor } from '@/components/common/CustomCursor';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { KonamiEasterEgg } from '@/components/common/KonamiEasterEgg';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import AboutPage from '@/pages/About';
import ProjectsPage from '@/pages/Projects';
import ProjectDetailPage from '@/pages/ProjectDetail';
import CaseStudiesPage from '@/pages/CaseStudies';
import AIEngineeringPage from '@/pages/AIEngineering';
import SkillsPage from '@/pages/Skills';
import BlogPage from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPost';
import ResumePage from '@/pages/Resume';
import ContactPage from '@/pages/Contact';
import NotFoundPage from '@/pages/NotFound';

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <KonamiEasterEgg />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/ai" element={<AIEngineeringPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card border border-border text-foreground',
        }}
      />
    </>
  );
}
