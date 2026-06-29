import { useState, useEffect, useRef } from 'react';

interface UseTypingEffectOptions {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export function useTypingEffect({
  strings,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}: UseTypingEffectOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentString = strings[currentIndex] ?? '';

    const tick = () => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        setDisplayText(currentString.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentString.length) {
          setIsPaused(true);
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pauseDuration);
          return;
        }
      } else {
        setDisplayText(currentString.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          if (loop || currentIndex < strings.length - 1) {
            setCurrentIndex((prev) => (prev + 1) % strings.length);
          }
        }
      }
    };

    if (!isPaused) {
      timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, isPaused, currentIndex, strings, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return { displayText, isTyping: !isDeleting && !isPaused };
}
