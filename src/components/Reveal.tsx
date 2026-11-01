"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

// One shared IntersectionObserver for every reveal on the page.
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function observe(el: Element, onShow: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  callbacks.set(el, onShow);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

// Returns a ref and whether the element has scrolled into view (latches true).
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => (ref.current ? observe(ref.current, () => setShown(true)) : undefined), []);
  return [ref, shown] as const;
}

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

// Fades and lifts its content in once scrolled into view.
export function Reveal({ as: Tag = "div", delay = 0, className, style, children }: RevealProps) {
  const [ref, shown] = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
