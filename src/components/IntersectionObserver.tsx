import { useEffect, useRef, ReactNode } from 'react';

interface IntersectionObserverProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const IntersectionObserver = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
}: IntersectionObserverProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default IntersectionObserver;