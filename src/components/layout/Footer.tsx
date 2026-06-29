import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { NAV_ITEMS } from '@/constants';

export function Footer() {
  const { personal } = portfolioData;
  const year = new Date().getFullYear();

  const socialIcons: Record<string, React.ReactNode> = {
    LinkedIn: <Linkedin size={18} />,
    GitHub: <Github size={18} />,
    Email: <Mail size={18} />,
  };

  return (
    <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-2xl font-bold gradient-text mb-2">{personal.name}</p>
            <p className="text-sm text-muted-foreground mb-4">{personal.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Building products, integrating AI, shipping fast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              {personal.social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.platform !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  aria-label={link.label}
                >
                  <span className="text-primary/60 group-hover:text-primary transition-colors">
                    {socialIcons[link.platform]}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            © {year} {personal.name}. Built with{' '}
            <Heart size={12} className="text-red-500 inline" fill="currentColor" />
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
