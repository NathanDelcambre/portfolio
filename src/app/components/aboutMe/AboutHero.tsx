"use client";

import styles from "./aboutMe.module.css";
import Image from "next/image";
import Link from "next/link";
import { hero } from "../../content/content";
import { useTilt } from "../../hooks/useTilt";
import { useAboutGsap } from "../../hooks/useGsap";
import ScrollCue from "@/app/components/scrollCue/scrollCue";

export default function AboutHero() {
    const tilt = useTilt(30);
    const scope = useAboutGsap();

    return (
        <section ref={scope} className={styles.presentation}>
            <div className={styles.profilePicture}>
                <div
                    className={styles.profilePictureContainer}
                    ref={tilt.ref}
                    onMouseMove={tilt.handleMouseMove}
                    onMouseLeave={tilt.handleMouseLeave}
                >
                    <Image
                        src="/images/pp.jpg"
                        alt={`Photo de ${hero.name}`}
                        width={400}
                        height={600}
                        sizes="(max-width: 800px) 70vw, (max-width: 1100px) 40vw, 25vw"
                        className={styles.profileImg}
                        priority
                    />
                </div>
            </div>

            <div className={styles.generalInfos} data-anim="hero-copy">
                <h1 className={`${styles.name} ${styles.typewriter}`}>{hero.name}</h1>
                <p className={styles.role}>{hero.role}</p>
                <p className={styles.years}>{hero.years}</p>
                <div className={styles.buttons} data-anim="hero-ctas">
                    <Link
                        href="/pdf/Curriculum-Vitae_Nathan-DELCAMBRE.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.primaryBtn}
                    >
                        {hero.ctaPrimary}
                    </Link>
                    <Link href="/contact" className={styles.secondaryBtn}>
                        {hero.ctaSecondary}
                    </Link>
                </div>
            </div>

            <ScrollCue />
        </section>
    );
}
