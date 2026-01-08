import styles from "./aboutMe.module.css";
import Link from "next/link";
import Image from "next/image";
import { diplomas } from "../../content/content";

export default function Diplomas() {
    return (
        <section className={styles.otherDiplomas} data-anim="formations">
            <div className={styles.heading}>
                <h2 data-anim="title">Certifications</h2>
                <h3 data-anim="title">
                    Completing my profile with language and lifesaving certifications
                </h3>
            </div>

            <div className={styles.diplomasGrid}>
                {diplomas.map((d) => (
                    <Link key={d.name} target="_blank" href={d.link}>
                        <div
                            className={`${styles.diploma} ${styles.white}`}
                            data-anim="diploma"
                            title={d.tooltip}
                        >
                            <Image
                                src={d.imageSrc}
                                alt={d.imageAlt}
                                width={80}
                                height={80}
                                loading="lazy"
                            />
                            <p>{d.name}</p>
                            {d.subtitle && (
                                <p className={styles.secondaryText}>{d.subtitle}</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
