import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { downloadResume } from '@/utils/download';
import { cn } from '@/lib/utils';

interface ResumeDownloadProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showIcon?: boolean;
  /** Applied to the outer wrapper div (use for visibility/layout: "hidden sm:block") */
  className?: string;
  /** Called after the download is successfully triggered */
  onSuccess?: () => void;
}

const sizeMap = {
  sm: { padding: 'px-3 py-1.5', text: 'text-xs', gap: 'gap-1.5', icon: 12 as const },
  md: { padding: 'px-4 py-2',   text: 'text-sm', gap: 'gap-2',   icon: 15 as const },
  lg: { padding: 'px-6 py-3',   text: 'text-sm', gap: 'gap-2',   icon: 15 as const },
};

const variantMap = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
  outline: 'border border-border text-foreground hover:bg-accent',
  ghost:   'text-muted-foreground hover:text-foreground hover:bg-accent',
};

export function ResumeDownload({
  variant = 'outline',
  size = 'md',
  label = 'Resume',
  showIcon = true,
  className,
  onSuccess,
}: ResumeDownloadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { padding, text, gap, icon: iconSize } = sizeMap[size];

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await downloadResume();
      toast.success('Resume download started!');
      onSuccess?.();
    } catch {
      toast.error('Resume is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('relative inline-block group', className)}>
      {!isLoading && (
        <span
          role="tooltip"
          aria-hidden="true"
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50',
            'px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-md',
            'bg-foreground text-background',
            'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100',
            'transition-all duration-200 pointer-events-none',
          )}
        >
          Download Resume
          <span
            aria-hidden="true"
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"
          />
        </span>
      )}

      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={isLoading}
        aria-label="Download Resume"
        aria-busy={isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          padding, text, gap,
          variantMap[variant],
        )}
        whileHover={isLoading ? {} : { scale: 1.05 }}
        whileTap={isLoading ? {} : { scale: 0.95 }}
      >
        {isLoading ? (
          <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
        ) : (
          showIcon && <Download size={iconSize} aria-hidden="true" />
        )}
        <span>{isLoading ? 'Downloading...' : label}</span>
      </motion.button>
    </div>
  );
}
