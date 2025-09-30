"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useAboutGsap() {
    const scope = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set('[data-anim="hero-copy"] > *, [data-anim="hero-ctas"] > *', { opacity: 1, y: 0 });
                gsap.set('[data-anim="card"], [data-anim="diploma"], [data-anim="exp-item"]', { opacity: 1, y: 0 });
            });

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tlHero = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } });
                tlHero
                    .from('[data-anim="hero-img"]', { opacity: 0, scale: 0.92, filter: "blur(6px)" }, 0)
                    .from('[data-anim="hero-copy"] > *', { y: 24, opacity: 0, stagger: 0.08 }, 0.1)
                    .from('[data-anim="hero-ctas"] > *', { y: 18, opacity: 0, stagger: 0.06 }, 0.2);

                gsap.to('[data-anim="hero-img"]', {
                    y: 6,
                    duration: 3,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                });

                gsap.utils.toArray<HTMLElement>('[data-anim="title"]').forEach((el) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 24,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    });
                });

                gsap.utils.toArray<HTMLElement>('[data-anim="exp-item"]').forEach((wrap) => {
                    gsap.from(wrap, {
                        opacity: 0,
                        y: 24,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: wrap,
                            start: "top 80%",
                        },
                    });

                    wrap.querySelectorAll("ul li").forEach((li, i) => {
                        gsap.from(li, {
                            opacity: 0,
                            y: 12,
                            duration: 0.45,
                            delay: i * 0.05,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: wrap,
                                start: "top 75%",
                            },
                        });
                    });
                });

                gsap.utils.toArray<HTMLElement>('[data-anim="cards"]').forEach((grid) => {
                    const cards = grid.querySelectorAll<HTMLElement>('[data-anim="card"]');
                    gsap.from(cards, {
                        opacity: 0,
                        y: 24,
                        duration: 1.5,
                        stagger: 0.18,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: grid,
                            start: "top 80%",
                            toggleActions: "restart none none reverse",
                        },
                    });
                });

                gsap.utils.toArray<HTMLElement>('[data-anim="diploma"]').forEach((el, i) => {
                    gsap.from(el, {
                        opacity: 0,
                        y: 18,
                        scale: 0.96,
                        duration: 0.45,
                        delay: (i % 6) * 0.04,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el.parentElement as Element,
                            start: "top 85%",
                        },
                    });
                });

                gsap.to('[data-anim="hero"]', {
                    yPercent: -4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: '[data-anim="exp"]',
                        start: "top bottom",
                        end: "top center",
                        scrub: 0.5,
                    },
                });
            });

            return () => mm.revert();
        },
        { scope }
    );

    return scope;
}
