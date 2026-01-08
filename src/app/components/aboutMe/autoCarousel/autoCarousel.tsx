"use client";

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

type AutoCarouselProps = {
    children: React.ReactNode;
    speed?: number;
    gap?: number;
    className?: string;
    pauseOnHover?: boolean;
};

export default function AutoCarousel({
                                         children,
                                         speed = 60,
                                         gap = 24,
                                         className = "",
                                         pauseOnHover = true,
                                     }: AutoCarouselProps) {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const setRef = useRef<HTMLDivElement | null>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const items = useMemo(() => React.Children.toArray(children), [children]);

    const setup = () => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const firstSet = setRef.current;
        if (!viewport || !track || !firstSet) return;

        (track.style as any).gap = `${gap}px`;

        tweenRef.current?.kill();
        gsap.set(track, { x: 0 });

        const setWidth = firstSet.scrollWidth;

        if (!setWidth || speed <= 0) return;

        const duration = setWidth / speed;
        const wrapX = gsap.utils.wrap(-setWidth, 0);

        const tween = gsap.to(track, {
            x: -setWidth,
            duration,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: (x: string) => `${wrapX(parseFloat(x))}px`,
            },
        });
        tweenRef.current = tween;

        if (pauseOnHover) {
            const pause = () => tween.pause();
            const play = () => tween.play();
            viewport.addEventListener("mouseenter", pause);
            viewport.addEventListener("mouseleave", play);
            return () => {
                viewport.removeEventListener("mouseenter", pause);
                viewport.removeEventListener("mouseleave", play);
            };
        }
    };

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        let af = requestAnimationFrame(() => {
            setup();
        });

        const ro = new ResizeObserver(() => {
            cancelAnimationFrame(af);
            af = requestAnimationFrame(() => {
                setup();
            });
        });

        ro.observe(viewport);
        ro.observe(track);

        return () => {
            cancelAnimationFrame(af);
            tweenRef.current?.kill();
            ro.disconnect();
        };
    }, [gap, speed, pauseOnHover, items.length]);

    return (
        <div
            ref={viewportRef}
            className={className}
            style={{ overflow: "hidden", width: "100%" }}
            aria-roledescription="carousel"
        >
            <div
                ref={trackRef}
                style={{
                    display: "inline-flex",
                    willChange: "transform",
                    alignItems: "center",
                }}
            >
                <div ref={setRef} style={{ display: "inline-flex", alignItems: "center", gap }}>
                    {items.map((child, idx) => (
                        <div key={`a-${idx}`} style={{ flex: "0 0 auto" }}>
                            {child}
                        </div>
                    ))}
                </div>

                <div style={{ display: "inline-flex", alignItems: "center", gap }}>
                    {items.map((child, idx) => (
                        <div key={`b-${idx}`} style={{ flex: "0 0 auto" }}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div[aria-roledescription="carousel"] > div {
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}
