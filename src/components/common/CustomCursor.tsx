import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Performance note: mouse position is tracked through Framer Motion's
// MotionValue subscription system — it never triggers React re-renders.
// Only isHovering and isVisible (rare, event-driven state) use useState.
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  // MotionValues update without React re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows mouse quickly
  const dotX = useSpring(mouseX, { mass: 0.2, stiffness: 800, damping: 30 });
  const dotY = useSpring(mouseY, { mass: 0.2, stiffness: 800, damping: 30 });

  // Ring trails slightly behind
  const ringX = useSpring(mouseX, { mass: 0.5, stiffness: 400, damping: 30 });
  const ringY = useSpring(mouseY, { mass: 0.5, stiffness: 400, damping: 30 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Update motion values — zero React renders
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);

      // Glow follows cursor via direct DOM style — no React render
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hovering =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');
      setIsHovering(hovering);
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
  }, [mouseX, mouseY, isVisible]);

  if (window.matchMedia('(hover: none)').matches) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* style.x/y drives position via MotionValue (no React renders).
          animate only fires on isHovering / isVisible changes — rare events. */}
      <motion.div
        className="cursor-dot hidden md:block"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: isHovering ? 1.5 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />

      <motion.div
        className="cursor-ring hidden md:block"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: isHovering ? 1.8 : 1, opacity: isVisible ? 0.6 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
