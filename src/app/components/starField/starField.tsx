"use client";
import {useEffect, useMemo, useRef} from "react";
import styles from "./starField.module.css";

type Star = {
    x: number;
    y: number;
    z: number;
    r: number;
    c: string;
    vx?: number;
    vy?: number;
};

type Props = {
    density?: number;
    layers?: number;
    baseSpeed?: number;
    interactive?: boolean;
    starColorVars?: string[];
    backgroundVars?: string[];
};

export default function Starfield({
                                      density = 0.18,
                                      layers = 5,
                                      baseSpeed = 0.03,
                                      starColorVars = [
                                          "--color-star-warm",
                                          "--color-star-secondary",
                                          "--color-star-primary",
                                          "--color-star-secondary-accent",
                                          "--color-star-secondary-soft",
                                      ],
                                      backgroundVars = [
                                          "--color-background"
                                      ],
                                  }: Props) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const starsRef = useRef<Star[]>([]);
    const motionOk = useMemo(
        () =>
            typeof window !== "undefined" &&
            !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
        []
    );

    const resolveColors = (): string[] => {
        const style = getComputedStyle(document.documentElement);
        return starColorVars
            .map((v) => style.getPropertyValue(v).trim())
            .filter(Boolean);
    };

    const resolveBackground = (): string => {
        const style = getComputedStyle(document.documentElement);
        const [v1, v2, v3] = backgroundVars.map((v) =>
            style.getPropertyValue(v).trim()
        );
        return `radial-gradient(ellipse at 50% 120%, ${v1} 0%, ${v2} 55%, ${v3} 100%)`;
    };

    const generateStars = (w: number, h: number, starColors: string[]) => {
        const area = (w * h) / 10000;
        const total = Math.max(50, Math.floor(area * density));
        const arr: Star[] = [];
        for (let i = 0; i < total; i++) {
            const z = 1 + Math.floor(Math.random() * layers);
            const size = z === 1 ? 3 : z === 2 ? 2 : 1;
            const angle = Math.random() * Math.PI * 2;
            const speed = (baseSpeed * (1.6 / z)) * (0.7 + Math.random() * 0.6);

            arr.push({
                x: Math.random(),
                y: Math.random(),
                z,
                r: size + Math.random() * 0.7,
                c: starColors[(Math.random() * starColors.length) | 0],
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
            });
        }
        starsRef.current = arr;
    };

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = 0,
            h = 0,
            dpr = 1;

        const starColors = resolveColors();
        const background = resolveBackground();

        const resize = () => {
            dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            generateStars(w, h, starColors);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        let t0 = performance.now();

        const animate = (t: number) => {
            const dt = Math.min(0.05, (t - t0) / 1000);
            t0 = t;

            ctx.clearRect(0, 0, w, h);
            const speed = motionOk ? baseSpeed : 0;

            for (const s of starsRef.current) {
                const jitter = 0.8;
                const ang = Math.atan2(s.vy || 0, s.vx || 0);
                const spd = Math.hypot(s.vx || 0, s.vy || 0);
                const angNew = ang + (Math.random() - 0.5) * jitter * dt;
                s.vx = Math.cos(angNew) * spd;
                s.vy = Math.sin(angNew) * spd;

                s.x += (s.vx || 0) * dt;
                s.y += (s.vy || 0) * dt;
                if (s.x > 1) s.x -= 1;
                if (s.x < 0) s.x += 1;
                if (s.y > 1) s.y -= 1;
                if (s.y < 0) s.y += 1;

                const px = s.x * w;
                const py = s.y * h;

                ctx.save();
                ctx.shadowBlur = 20 / s.z;
                ctx.shadowColor = "#ffffff";
                ctx.globalAlpha = 0.2 / s.z;
                ctx.fillStyle = s.c;
                ctx.beginPath();
                ctx.arc(px + 0.5, py + 0.5, s.r, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        const wrapper = canvas.parentElement as HTMLElement;
        wrapper.style.background = background;

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [density, layers, baseSpeed, motionOk]);

    return (
        <div className={styles.wrapper} aria-hidden="true">
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
