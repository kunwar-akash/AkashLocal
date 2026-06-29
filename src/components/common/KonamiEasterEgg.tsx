import { useKonamiCode } from '@/hooks/useKonamiCode';
import { motion, AnimatePresence } from 'framer-motion';

export function KonamiEasterEgg() {
  const triggered = useKonamiCode();

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/90 backdrop-blur-sm"
        >
          <motion.div
            className="text-center p-8 max-w-lg"
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold gradient-text mb-4">You found me!</h2>
            <p className="text-muted-foreground font-mono text-sm leading-relaxed mb-4">
              &gt; Nice keyboard skills, tester! 🕹️
              <br />
              &gt; Just like in testing — you found the hidden path.
              <br />
              &gt; That&apos;s exactly the mindset I bring to QA.
              <br />
              &gt; <span className="text-primary animate-pulse">_</span>
            </p>
            <p className="text-xs text-muted-foreground">
              ↑ ↑ ↓ ↓ ← → ← → B A — classic Konami code
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This easter egg disappears in 5 seconds...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
