"use client";

import styles from "./aboutMe.module.css";
import Image from "next/image";
import AutoCarousel from "./autoCarousel/autoCarousel";
import { interests } from "../../content/content";

export default function Interests() {
    return (
        <section className={styles.interests} data-anim="interests">
            <div className={styles.heading}>
                <h2 data-anim="title">Interests</h2>
                <h3 data-anim="title">Take a look at what inspires me beyond work</h3>
            </div>

            <AutoCarousel speed={60} gap={24} className={styles.carouselViewport}>
                {interests.map((it) => (
                    <Image
                        key={it.imageSrc}
                        src={it.imageSrc}
                        alt={it.imageAlt}
                        width={1200}
                        height={800}
                        sizes="(max-width:800px) 60vw, (max-width:1100px) 25vw, 20vw"
                        loading="lazy"
                        className={styles.white}
                    />
                ))}
            </AutoCarousel>
        </section>
    );
}
