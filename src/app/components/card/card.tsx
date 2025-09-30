"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import type { ReactNode } from "react";

type CardProps = {
    imageSrc: string;
    imageAlt: string;
    title?: string;
    subtitle?: string;
    meta?: string;
    href?: string;
    className?: string;
    children?: ReactNode;
};

export default function Card({
                                 imageSrc,
                                 imageAlt,
                                 title,
                                 subtitle,
                                 meta,
                                 href,
                                 className = "",
                                 children,
                             }: CardProps) {
    const content = (
        <div className={`${styles.card} ${className}`} data-anim={"card"}>
            <div className={styles.cardImage}>
                <Image src={imageSrc} alt={imageAlt} width={1200} height={800} />

                {meta && (
                    <div className={styles.topLeft}>
                        <span className={styles.chip}>{meta}</span>
                    </div>
                )}

                <div className={styles.bottomLeft}>
                    {title && <span className={styles.chip}>{title}</span>}
                    {subtitle && <span className={styles.chip}>{subtitle}</span>}
                    {children}
                </div>
            </div>
        </div>
    );

    return href ? (
        <Link href={href} className={styles.linkWrap}>
            {content}
        </Link>
    ) : (
        content
    );
}
