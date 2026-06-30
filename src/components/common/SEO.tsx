import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
}: SEOProps) {
  const { pathname } = useLocation();
  // Canonical reflects the current route, not always the homepage
  const canonicalUrl = pathname === '/'
    ? SITE_CONFIG.url
    : `${SITE_CONFIG.url}${pathname}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akash Kunwar',
    jobTitle: 'AI Product Engineer | Full-Stack Builder',
    email: 'kunwarakash89@gmail.com',
    url: SITE_CONFIG.url,
    sameAs: [
      'https://linkedin.com/in/akashkunwaronline',
      'https://github.com/akashkunwar',
    ],
    knowsAbout: [
      'AI Engineering',
      'LLM Integration',
      'React',
      'TypeScript',
      'Full-Stack Development',
      'Software Quality Engineering',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'IN',
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE_CONFIG.keywords.join(', ')} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:image" content={`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`} />
      <meta name="twitter:creator" content="@akashkunwar" />

      {/* Canonical — per-page, not always root */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
