"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const [copies, setCopies] = useState(2);

    const items = useMemo(() => {
        const arr = React.Children.toArray(children);
        return Array.from({ length: copies }, (_, i) =>
            arr.map((child, idx) => (
                <div key={`copy-${i}-${idx}`} style={{ flex: "0 0 auto" }}>
                    {child}
                </div>
            ))
        ).flat();
    }, [children, copies]);

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!viewport || !track) return;

        track.style.columnGap = `${gap}px`;
        (track.style as any).gap = `${gap}px`;

        const setup = () => {
            const totalWidth = track.scrollWidth;
            const singleSetWidth = Math.max(1, Math.floor(totalWidth / copies));
            const viewportWidth = viewport.clientWidth;
            const minTotal = viewportWidth + singleSetWidth;
            const minCopies = Math.max(2, Math.ceil(minTotal / singleSetWidth) + 1);

            if (minCopies !== copies) {
                setCopies(minCopies);
                return;
            }

            tweenRef.current?.kill();
            gsap.set(track, { x: 0 });

            const duration = singleSetWidth / speed;
            const wrapX = gsap.utils.wrap(-singleSetWidth, 0);

            const tween = gsap.to(track, {
                x: -singleSetWidth,
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

        const cleanup = setup();
        const ro = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                setup();
            });
        });
        ro.observe(viewport);
        ro.observe(track);

        return () => {
            tweenRef.current?.kill();
            ro.disconnect();
            cleanup && (cleanup as any)();
        };
    }, [speed, gap, copies, pauseOnHover]);

    return (
        <div
            ref={viewportRef}
            className={className}
            style={{
                overflow: "hidden",
                width: "100%",
            }}
        >
            <div
                ref={trackRef}
                style={{
                    display: "inline-flex",
                    willChange: "transform",
                }}
            >
                {items}
            </div>
        </div>
    );
}
