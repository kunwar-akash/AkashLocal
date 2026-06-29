import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { blogPosts } from '@/data/blog';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length === 0) return null;
  return (
    <div className="glass-card rounded-2xl border border-border p-5 sticky top-24">
      <p className="text-xs font-mono font-semibold tracking-widest uppercase text-primary mb-3">
        Contents
      </p>
      <ul className="space-y-2">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#section-${i}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors leading-snug block"
            >
              {h}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const { ref, inView } = useScrollAnimation();

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const headings = post.content
    .filter((s) => s.heading)
    .map((s) => s.heading as string);

  let sectionIndex = -1;

  return (
    <>
      <SEO
        title={`${post.title} — Akash Kunwar`}
        description={post.excerpt}
      />

      {/* Back */}
      <div className="pt-24 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> All Posts
          </Link>
        </div>
      </div>

      {/* Post Header */}
      <section className="section-padding pt-8 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: post.coverColor }}
          />
        </div>
        <div className="container-max relative z-10 max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-md"
                style={{ backgroundColor: `${post.coverColor}18`, color: post.coverColor }}
              >
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime} min read
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 text-xs">
                    <Tag size={11} /> {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="section-padding pt-0">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 max-w-5xl">
            {/* Article body */}
            <motion.article
              ref={ref}
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="prose-custom"
            >
              {post.content.map((section, i) => {
                if (section.heading) sectionIndex++;
                const idx = sectionIndex;
                return (
                  <motion.div key={i} variants={staggerItem} className="mb-8">
                    {section.heading && (
                      <h2
                        id={`section-${idx}`}
                        className="text-xl sm:text-2xl font-bold text-foreground mb-3 scroll-mt-24"
                      >
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed mb-3 text-sm sm:text-base">
                        {para}
                      </p>
                    ))}
                  </motion.div>
                );
              })}
            </motion.article>

            {/* TOC sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>

          <div className="max-w-5xl mt-10 pt-6 border-t border-border flex items-center gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> All Posts
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Discuss this →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
