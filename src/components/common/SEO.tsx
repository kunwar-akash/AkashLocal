import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
}: SEOProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akash Kunwar',
    jobTitle: 'AI Product Engineer | Full-Stack Builder',
    email: 'kunwarakash89@gmail.com',
    url: SITE_CONFIG.url,
    sameAs: ['https://linkedin.com/in/akashkunwaronline'],
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
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_CONFIG.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:image" content={SITE_CONFIG.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_CONFIG.ogImage} />
      <meta name="twitter:creator" content="@akashkunwar" />

      {/* Canonical */}
      <link rel="canonical" href={SITE_CONFIG.url} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
