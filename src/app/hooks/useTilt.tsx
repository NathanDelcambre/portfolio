import React, { useRef, useEffect } from "react";

export function useTilt(maxTilt: number = 12) {
    const ref = useRef<HTMLDivElement | null>(null);
    const idleRef = useRef<number | null>(null);
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const isHover = useRef(false);

    const loop = () => {
        const el = ref.current;
        if (!el) return;

        current.current.x += (target.current.x - current.current.x) * 0.05;
        current.current.y += (target.current.y - current.current.y) * 0.05;

        el.style.transform = `rotateX(${current.current.x}deg) rotateY(${current.current.y}deg)`;

        if (!isHover.current) {
            const t = Date.now() / 3000;
            target.current.x = Math.sin(t) * (maxTilt / 5);
            target.current.y = Math.cos(t * 0.9) * (maxTilt / 5);
        }

        idleRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        idleRef.current = requestAnimationFrame(loop);
        return () => {
            if (idleRef.current) cancelAnimationFrame(idleRef.current);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        isHover.current = true;

        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateY = ((x - midX) / midX) * maxTilt;
        const rotateX = ((midY - y) / midY) * maxTilt;

        target.current = { x: rotateX, y: rotateY };
    };

    const handleMouseLeave = () => {
        isHover.current = false;
    };

    return { ref, handleMouseMove, handleMouseLeave };
}
