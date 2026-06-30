import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;

    // Respect reduced motion — show final value immediately, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    const startTime = performance.now();
    let rafId: number;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
