import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/constants';

interface SEOProps {
  title?: string;
  description?: string;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data: object) {
  let el = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEO({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
}: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = pathname === '/' ? SITE_CONFIG.url : `${SITE_CONFIG.url}${pathname}`;

  useEffect(() => {
    document.title = title;

    setMeta('description', description);
    setMeta('keywords', SITE_CONFIG.keywords.join(', '));
    setMeta('author', SITE_CONFIG.author);
    setMeta('robots', 'index, follow, max-image-preview:large');

    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:site_name', SITE_CONFIG.name, 'property');
    setMeta('og:image', `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:locale', 'en_IN', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`);
    setMeta('twitter:creator', '@akashkunwar');

    setLink('canonical', canonicalUrl);

    setJsonLd({
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
    });
  }, [title, description, canonicalUrl]);

  return null;
}
