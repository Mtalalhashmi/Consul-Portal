import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target?: number;
  end?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = "",
  threshold = 0.5,
}) => {
  const finalTarget = target ?? end ?? 0;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const startTime = performance.now();

          function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(finalTarget * eased);

            setCount(isNaN(currentVal) ? 0 : currentVal);

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              setCount(finalTarget);
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(entry.target);
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [finalTarget, duration, threshold]);

  return (
    <span ref={ref} className={`counter ${className}`} data-target={finalTarget}>
      {prefix}
      {(count ?? 0).toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
