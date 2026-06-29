import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { blogPosts } from '@/data/blog';
import { staggerContainer, staggerItem } from '@/utils/animations';

const ALL = 'All';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const categories = [ALL, ...Array.from(new Set(blogPosts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filtered = activeCategory === ALL
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <SEO
        title="Blog — Akash Kunwar"
        description="Engineering insights on AI development, testing strategies, and building production software. Practical knowledge from real-world experience."
      />
      <PageHero
        label="// blog"
        title="Engineering Insights"
        description="Writing about AI engineering, testing strategies, and lessons from building production software. No fluff — only things I've actually done."
        accentColor="#7C3AED"
      />

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding pt-0">
        <div className="container-max">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sorted.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={staggerItem}
                  className="glass-card rounded-2xl border border-border overflow-hidden group hover:border-primary/30 transition-all flex flex-col"
                  whileHover={{ y: -3 }}
                >
                  {/* Cover strip */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: post.coverColor }} />

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${post.coverColor}18`,
                          color: post.coverColor,
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h2 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Tag size={9} /> {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {post.readTime} min
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Read <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {sorted.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No posts in this category yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
