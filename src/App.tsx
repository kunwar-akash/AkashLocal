import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CustomCursor } from '@/components/common/CustomCursor';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { KonamiEasterEgg } from '@/components/common/KonamiEasterEgg';
import { Layout } from '@/components/layout/Layout';

// Lazy-load every page. Each becomes its own JS chunk that's only fetched
// when the user navigates to that route — not on initial page load.
const Home            = lazy(() => import('@/pages/Home'));
const AboutPage       = lazy(() => import('@/pages/About'));
const ProjectsPage    = lazy(() => import('@/pages/Projects'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetail'));
const CaseStudiesPage = lazy(() => import('@/pages/CaseStudies'));
const AIEngineeringPage = lazy(() => import('@/pages/AIEngineering'));
const HowIUseAIPage   = lazy(() => import('@/pages/HowIUseAI'));
const SkillsPage      = lazy(() => import('@/pages/Skills'));
const BlogPage        = lazy(() => import('@/pages/Blog'));
const BlogPostPage    = lazy(() => import('@/pages/BlogPost'));
const ResumePage      = lazy(() => import('@/pages/Resume'));
const ContactPage     = lazy(() => import('@/pages/Contact'));
const NotFoundPage    = lazy(() => import('@/pages/NotFound'));

// Minimal, visually on-brand page loader shown while a lazy chunk is fetching.
// Keeps Header + Footer visible so layout doesn't shift.
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <KonamiEasterEgg />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProjectDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/case-studies"
            element={
              <Suspense fallback={<PageLoader />}>
                <CaseStudiesPage />
              </Suspense>
            }
          />
          <Route
            path="/how-i-use-ai"
            element={
              <Suspense fallback={<PageLoader />}>
                <HowIUseAIPage />
              </Suspense>
            }
          />
          <Route
            path="/ai"
            element={
              <Suspense fallback={<PageLoader />}>
                <AIEngineeringPage />
              </Suspense>
            }
          />
          <Route
            path="/skills"
            element={
              <Suspense fallback={<PageLoader />}>
                <SkillsPage />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<PageLoader />}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<PageLoader />}>
                <BlogPostPage />
              </Suspense>
            }
          />
          <Route
            path="/resume"
            element={
              <Suspense fallback={<PageLoader />}>
                <ResumePage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
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
