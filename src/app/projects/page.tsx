"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./projects.module.css";
import { PROJECTS } from "../content/content";
import { Globe, Code2, Images as ImagesIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_FILTERS = [
    { key: "frontend", label: "Frontend" },
    { key: "nextjs", label: "NextJS" },
    { key: "angular", label: "Angular" },
    { key: "vuejs", label: "VueJS" },
    { key: "nuxtjs", label: "Nuxt" },
    { key: "flutter", label: "Flutter" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" },
] as const;

export default function ProjectsPage() {
    const [active, setActive] = useState<string[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const toggle = (key: string) => {
        setActive((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    };

    const clear = () => setActive([]);

    const filtered = useMemo(() => {
        if (active.length === 0) return PROJECTS;
        return PROJECTS.filter((p) => p.tags.some((t) => active.includes(t)));
    }, [active]);

    const selected = useMemo(() => PROJECTS.find((p) => p.id === selectedId) || null, [selectedId]);

    function truncate(text: string, max = 140) {
        if (!text) return "";
        if (text.length <= max) return text;
        return text.slice(0, max).trimEnd().replace(/[,.!?;:]*$/, "") + "…";
    }

    const openImages = (id: string) => {
        setSelectedId(id);
        setImageIndex(0);
    };

    const closeImages = useCallback(() => setSelectedId(null), []);

    useEffect(() => {
        if (!selected) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeImages();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [selected, closeImages]);

    const nextImage = () => {
        if (!selected) return;
        const imgs = selected.images?.length ? selected.images : [selected.imageSrc];
        setImageIndex((i) => (i + 1) % imgs.length);
    };
    const prevImage = () => {
        if (!selected) return;
        const imgs = selected.images?.length ? selected.images : [selected.imageSrc];
        setImageIndex((i) => (i - 1 + imgs.length) % imgs.length);
    };

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
                                layoutId={`card-${p.id}`}
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{
                                    opacity: selectedId && selectedId !== p.id ? 0.25 : 1,
                                    y: 0,
                                    scale: 1,
                                }}
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
                                                onClick={() => toggle(t)}
                                                title={`Filtrer par ${t}`}
                                            >
                                                {labelFromKey(t)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className={styles.desc}>{truncate(p.description, 140)} </p>

                                    <div className={styles.actions}>
                                        {p.siteUrl && (
                                            <Link
                                                href={p.siteUrl}
                                                className={styles.btn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open site for ${p.name}`}
                                            >
                                                <Globe className={styles.btnIcon} aria-hidden="true" />
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
                                                <Code2 className={styles.btnIcon} aria-hidden="true" />
                                                <span>GitHub</span>
                                            </Link>
                                        )}

                                        <Link
                                            href={`/projects/${p.id}#images`}
                                            className={`${styles.btnGhost} ${styles.notMobile}`}
                                            aria-haspopup="dialog"
                                            aria-expanded={selectedId === p.id}
                                            aria-controls="gallery-overlay"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openImages(p.id);
                                            }}
                                        >
                                            <ImagesIcon className={styles.btnIcon} aria-hidden="true" />
                                            <span>Images</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </section>
            </main>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        id="gallery-overlay"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selected.name} – Galerie d'images`}
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.backdrop}
                            onClick={closeImages}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <div className={styles.lightbox}>
                            <motion.article layoutId={`card-${selected.id}`} className={styles.cardCentered}>
                                <div className={styles.media}>
                                    <Image
                                        src={selected.imageSrc}
                                        alt={selected.name}
                                        width={960}
                                        height={540}
                                        className={styles.img}
                                        priority
                                    />
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.cardTitle}>{selected.name}</h3>
                                    <p className={styles.desc}>{truncate(selected.description, 180)}</p>
                                    <div className={styles.actionsRowEnd}>
                                        {selected.siteUrl && (
                                            <Link href={selected.siteUrl} className={styles.btn} target="_blank" rel="noopener noreferrer">
                                                <Globe className={styles.btnIcon} aria-hidden="true" />
                                                <span>Visit site</span>
                                            </Link>
                                        )}
                                        {selected.repoUrl && (
                                            <Link href={selected.repoUrl} className={styles.btnGhost} target="_blank" rel="noopener noreferrer">
                                                <Code2 className={styles.btnIcon} aria-hidden="true" />
                                                <span>GitHub</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.article>

                            <motion.aside
                                className={styles.gallery}
                                initial={{ x: 40, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 40, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                            >
                                <button className={styles.close} onClick={closeImages} aria-label="Fermer la galerie">
                                    <X aria-hidden="true" />
                                </button>

                                <div className={styles.galleryViewport}>
                                    <button className={styles.navLeft} onClick={prevImage} aria-label="Image précédente">
                                        <ChevronLeft aria-hidden="true" />
                                    </button>

                                    <div className={styles.galleryStage}>
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.div
                                                key={imageIndex}
                                                className={styles.galleryImgWrap}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <GalleryImage project={selected} index={imageIndex} />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <button className={styles.navRight} onClick={nextImage} aria-label="Image suivante">
                                        <ChevronRight aria-hidden="true" />
                                    </button>
                                </div>

                                <div className={styles.thumbs} role="tablist" aria-label="Vignettes">
                                    {(selected.images?.length ? selected.images : [selected.imageSrc]).map((src, i) => (
                                        <button
                                            key={src + i}
                                            role="tab"
                                            aria-selected={imageIndex === i}
                                            className={`${styles.thumb} ${imageIndex === i ? styles.thumbActive : ""}`}
                                            onClick={() => setImageIndex(i)}
                                        >
                                            <img src={src} alt="" className={styles.thumbImg} />
                                        </button>
                                    ))}
                                </div>
                            </motion.aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function labelFromKey(key: string) {
    const found = ALL_FILTERS.find((f) => f.key === key);
    return found?.label ?? key;
}

function GalleryImage({ project, index }: { project: any; index: number }) {
    const imgs: string[] = project.images?.length ? project.images : [project.imageSrc];
    const src = imgs[index] ?? imgs[0];
    return (
        <Image
            src={src}
            alt={project.name}
            width={900}
            height={900}
            className={styles.galleryImage}
            priority
        />
    );
}