"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./themeToggle.module.css";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        const saved = window.localStorage.getItem("theme") as Theme | null;
        const initial = saved ?? getSystemTheme();
        setTheme(initial);

        document.documentElement.classList.toggle("dark", initial === "dark");
        document.documentElement.style.colorScheme = initial;
    }, []);

    const toggle = () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        document.documentElement.style.colorScheme = next;
        window.localStorage.setItem("theme", next);
    };

    if (theme === null) return null;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={styles.themeToggleFab}
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
