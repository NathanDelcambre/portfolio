"use client";

import styles from "./aboutMe.module.css";
import { experiences } from "../../content/content";
import {useRef, useState} from "react";

export default function Experiences() {
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const panelsRef = useRef<Record<string, HTMLDivElement | null>>({});

    const toggle = (key: string) => {
        setOpen((s) => ({ ...s, [key]: !s[key] }));
    };

    return (
        <section className={styles.experiences} data-anim={"exp"}>
            <div className={styles.heading}>
                <h2 className={styles.sectionTitle} data-anim={"title"}>Experiences</h2>
                <h3 data-anim={"title"}>Discover the milestones that shaped my professional journey</h3>
            </div>

            {experiences.map((exp) => {
                const key = `${exp.role}-${exp.dates}`;
                const isOpen = open[key];
                const panelEl = panelsRef.current[key];
                const maxHeight = isOpen && panelEl ? panelEl.scrollHeight : 0;

                return (
                    <div className={styles.experience} key={key} data-anim={"exp-item"}>
                        <button
                            type="button"
                            className={styles.experienceHeader}
                            aria-expanded={isOpen}
                            aria-controls={`panel-${key}`}
                            onClick={() => toggle(key)}
                        >
                            <h3 className={styles.expTitle}>
                                <span className={styles.waveMask} aria-hidden="true"></span>
                                {exp.company} - {exp.role}
                            </h3>
                            <span className={styles.dates}>({exp.dates})</span>
                            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden>
                        <svg width="20" height="20" viewBox="0 0 24 24" className={styles.chevronIcon}>
                            <path
                                d="M6 9l6 6 6-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                        </button>
                        <div
                            id={`panel-${key}`}
                            className={styles.experiencePanel}
                            style={{maxHeight}}
                        >
                            <div
                                className={styles.experiencePanelInner}
                                ref={(el) => {
                                    panelsRef.current[key] = el;
                                }}
                            >
                                <div className={styles.experienceGrid}>
                                    {exp.blocks.map((block, i) => (
                                        <div className={styles.experienceDescription} key={i}>
                                            {block.heading && (
                                                <code className={styles.subject}>{block.heading}</code>
                                            )}
                                            <div className={styles.tagList}>
                                                {block.tags?.map((tag, j) => (
                                                    <div className={styles.tagChip} key={j}>{tag}</div>
                                                ))}
                                            </div>
                                            <ul className={styles.workDone}>
                                                {block.items.map((item, j) => (
                                                    <li key={j}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
