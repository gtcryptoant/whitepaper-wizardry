
import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

const RevealOnScroll = ({
  children,
  className,
  threshold = 0.1,
  delay = 0,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisibleRef.current) {
          isVisibleRef.current = true;
          if (ref.current) {
            ref.current.classList.add("visible");
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transform translate-y-8 transition-all duration-700",
        "visible:opacity-100 visible:translate-y-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
