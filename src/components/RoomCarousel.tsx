"use client";

import { useEffect, useRef, type ReactNode, type PointerEvent, type MouseEvent } from "react";

const INTERVAL = 4000;
const DRAG_THRESHOLD = 6;
const TOUCH_IDLE = 5000;

// Scroll positions where each card's left edge meets the track's padding.
function stops(track: HTMLDivElement) {
  const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const max = track.scrollWidth - track.clientWidth;
  return Array.from(track.children, (el) => Math.min((el as HTMLElement).offsetLeft - pad, max));
}

function nearestIndex(track: HTMLDivElement) {
  const points = stops(track);
  let best = 0;
  points.forEach((p, i) => {
    if (Math.abs(p - track.scrollLeft) < Math.abs(points[best] - track.scrollLeft)) best = i;
  });
  return best;
}

// Horizontal snap row that auto-advances, can be dragged with a mouse and swiped on touch.
export function RoomCarousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, pointerId: 0 });
  const pause = useRef({ hover: false, focus: false, drag: false, touchUntil: 0, visible: false });

  // Auto-advance one card at a time, looping to the start after the last one.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      pause.current.visible = entry.isIntersecting;
    });
    observer.observe(track);

    const id = setInterval(() => {
      const p = pause.current;
      if (!p.visible || p.hover || p.focus || p.drag || Date.now() < p.touchUntil || document.hidden) return;
      const points = stops(track);
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      const next = atEnd ? 0 : points[Math.min(nearestIndex(track) + 1, points.length - 1)];
      track.scrollTo({ left: next, behavior: "smooth" });
    }, INTERVAL);

    return () => {
      clearInterval(id);
      observer.disconnect();
    };
  }, []);

  // Mouse drag only; touch and pen keep native scrolling and snapping.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || e.button !== 0) {
      pause.current.touchUntil = Date.now() + TOUCH_IDLE;
      return;
    }
    const track = e.currentTarget;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: track.scrollLeft, pointerId: e.pointerId };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d.active) return;
    const track = e.currentTarget;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      // Capture only once it is a real drag, so plain clicks still reach the links.
      d.moved = true;
      pause.current.drag = true;
      track.setPointerCapture(d.pointerId);
      track.style.scrollSnapType = "none";
      track.style.cursor = "grabbing";
    }
    track.scrollLeft = d.startScroll - dx;
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    const track = e.currentTarget;
    if (track.hasPointerCapture(d.pointerId)) track.releasePointerCapture(d.pointerId);
    track.style.cursor = "";
    track.scrollTo({ left: stops(track)[nearestIndex(track)], behavior: "smooth" });
    // Restore snapping after the settle animation so it does not cut it short.
    setTimeout(() => {
      track.style.scrollSnapType = "";
      pause.current.drag = false;
    }, 500);
  }

  // Swallow the click that ends a drag so it does not open a card.
  function onClickCapture(e: MouseEvent<HTMLDivElement>) {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
      onMouseEnter={() => (pause.current.hover = true)}
      onMouseLeave={() => (pause.current.hover = false)}
      onFocus={() => (pause.current.focus = true)}
      onBlur={() => (pause.current.focus = false)}
      className="relative flex cursor-grab snap-x snap-mandatory scroll-px-[clamp(1rem,4vw,4rem)] gap-4 overflow-x-auto px-[clamp(1rem,4vw,4rem)] pb-6 select-none [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}
