import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'),
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" style={{ opacity: isVisible ? 1 : 0 }} />

      <motion.div
        className="cursor-dot hidden md:block"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', mass: 0.2, stiffness: 800, damping: 30 }}
      />

      <motion.div
        className="cursor-ring hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ type: 'spring', mass: 0.5, stiffness: 400, damping: 30 }}
      />
    </>
  );
}
