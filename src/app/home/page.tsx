"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useAboutGsap } from "@/app/hooks/useGsap";
import { CARDS } from "@/app/content/content";

export default function Home() {
    const scope = useAboutGsap();

    return (
        <div ref={scope} className={styles.homePage}>
            <main className={styles.main}>
                <div className={styles.homeContent}>
                    <div className={styles.homeHeader}>
                        <p className={styles.subtitle}>
                          <span className={styles.typewriter} data-chars="56">
                            Hi, I’m <b className={styles.blue}>Nathan</b> — a french software engineer...
                          </span>
                        </p>
                    </div>
                    <div className={styles.buttonsGrid}>
                        {CARDS.map((card, i) => {
                            const MainIcon = card.icon;
                            return (
                                <div key={i} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <MainIcon className={styles.cardIcon} size={22} aria-hidden />
                                        <span className={styles.cardTitle}>{card.title}</span>
                                    </div>

                                    <p className={styles.cardTagline}>{card.tagline}</p>

                                    <div
                                        className={`${styles.actions} ${
                                            card.actions.length === 1 ? styles.oneAction : ""
                                        }`}
                                    >
                                        {card.actions.map((action, idx) => {
                                            const Icon = action.icon;
                                            const linkProps =
                                                action.external
                                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                                    : {};

                                            return (
                                                <Link
                                                    key={idx}
                                                    href={action.href}
                                                    className={styles.cta}
                                                    aria-label={action.ariaLabel || action.label}
                                                    {...linkProps}
                                                >
                                                    <span>{action.label}</span>
                                                    {Icon ? <Icon size={18} aria-hidden /> : null}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
