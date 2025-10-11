"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projects.module.css";
import { PROJECTS } from "../content/content"
import { Globe, Code2 } from "lucide-react";

const ALL_FILTERS = [
    { key: "frontend", label: "Frontend" },
    { key: "nextjs", label: "NextJS" },
    { key: "angular", label: "Angular" },
    { key: "vuejs", label: "VueJS" },
    { key: "flutter", label: "Flutter" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" }
] as const;

export default function ProjectsPage() {
    const [active, setActive] = useState<string[]>([]);

    const toggle = (key: string) => {
        setActive((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const clear = () => setActive([]);

    const filtered = useMemo(() => {
        if (active.length === 0) return PROJECTS;
        return PROJECTS.filter((p) => p.tags.some((t) => active.includes(t)));
    }, [active]);

    function truncate(text: string, max = 140) {
        if (!text) return "";
        if (text.length <= max) return text;
        return text.slice(0, max).trimEnd().replace(/[,.!?;:]*$/, "") + "…";
    }

    return (
        <div className={styles.projectsPage}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        Projects
                    </motion.h2>

                    <div className={styles.filtersRow}>
                        <div className={styles.chips} role="toolbar" aria-label="Filtres projets">
                            <button
                                type="button"
                                className={`${styles.chip} ${active.length === 0 ? styles.chipActive : ""}`}
                                onClick={clear}
                                aria-pressed={active.length === 0}
                            >
                                All
                            </button>

                            {ALL_FILTERS.map((f) => {
                                const isOn = active.includes(f.key);
                                return (
                                    <button
                                        key={f.key}
                                        type="button"
                                        className={`${styles.chip} ${isOn ? styles.chipActive : ""}`}
                                        onClick={() => toggle(f.key)}
                                        aria-pressed={isOn}
                                    >
                                        {f.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </header>

                <section className={styles.gridWrap}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((p) => (
                            <motion.article
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.6 }}
                                className={styles.card}
                            >
                                <div className={styles.media}>
                                    <Image
                                        src={p.imageSrc}
                                        alt={p.name}
                                        width={640}
                                        height={360}
                                        className={styles.img}
                                        priority={false}
                                    />
                                </div>

                                <div className={styles.content}>
                                    <h3 className={styles.cardTitle}>{p.name}</h3>
                                    <div className={styles.tags}>
                                        {p.tags.map((t) => (
                                            <button
                                                key={p.id + t}
                                                type="button"
                                                className={styles.tag}
                                                title={`Filtrer par ${t}`}
                                            >
                                                {labelFromKey(t)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className={styles.desc}>
                                        {truncate(p.description, 140)}{" "}
                                        <span className={styles.seeMore}>See more</span>
                                    </p>

                                    <div className={styles.actions}>
                                        {p.siteUrl && (
                                            <Link
                                                href={p.siteUrl}
                                                className={styles.btn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open site for ${p.name}`}
                                            >
                                                <Globe className={styles.btnIcon} aria-hidden="true"/>
                                                <span>Visit site</span>
                                            </Link>
                                        )}
                                        {p.repoUrl && (
                                            <Link
                                                href={p.repoUrl}
                                                className={styles.btnGhost}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open GitHub repo for ${p.name}`}
                                            >
                                                <Code2 className={styles.btnIcon} aria-hidden="true"/>
                                                <span>GitHub</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
}

function labelFromKey(key: string) {
    const found = ALL_FILTERS.find((f) => f.key === key);
    return found?.label ?? key;
}
