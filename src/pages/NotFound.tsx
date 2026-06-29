import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/common/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Page Not Found" description="This page doesn't exist." />
      <div className="min-h-screen flex items-center justify-center section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4">// 404</p>
          <h1 className="text-7xl sm:text-9xl font-extrabold gradient-text mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Page Not Found</h2>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            This page doesn't exist. Maybe it was moved, or maybe you typed the URL wrong.
            Either way, let's get you back on track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              <Home size={16} /> Go Home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
