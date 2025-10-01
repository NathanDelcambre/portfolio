"use client";

import { Mouse } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./scrollCue.module.css";

export default function ScrollCue({ threshold = 100 }: { threshold?: number }) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || window.pageYOffset || 0;
            const o = Math.max(0, Math.min(1, 1 - y / threshold));
            setOpacity(o);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return (
        <button
            type="button"
            aria-label="Scroll down"
            className={styles.scrollCueFixed}
            style={{ opacity, pointerEvents: opacity < 0.1 ? "none" : "auto" }}
            onClick={() =>
                window.scrollTo({ top: window.innerHeight * 0.7, behavior: "smooth" })
            }
        >
            <Mouse size={50} aria-hidden />
            <span className={styles.scrollText}>Scroll</span>
        </button>
    );
}
