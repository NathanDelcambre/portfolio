import styles from "./aboutMe.module.css";
import Image from "next/image";
import { skills } from "../../content/content";

export default function Skills() {
    return (
        <section className={styles.skills} data-anim="skills">
            <div className={styles.heading}>
                <h2 data-anim="title">Skills</h2>
                <h3 data-anim="title">The different technologies and frameworks seen</h3>
            </div>

            <div className={styles.skillsGrid}>
                {skills.map((s) => (
                    <div className={styles.skill} key={s.name}>
                        <Image
                            src={s.imageSrc}
                            alt={s.imageAlt}
                            width={80}
                            height={80}
                            loading="lazy"
                        />
                        <p>{s.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
