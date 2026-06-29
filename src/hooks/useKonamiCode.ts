import { useState, useEffect } from 'react';
import { KONAMI_CODE } from '@/constants';

export function useKonamiCode(): boolean {
  const [triggered, setTriggered] = useState(false);
  const [, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (JSON.stringify(next) === JSON.stringify([...KONAMI_CODE])) {
          setTriggered(true);
          setTimeout(() => setTriggered(false), 5000);
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return triggered;
}
