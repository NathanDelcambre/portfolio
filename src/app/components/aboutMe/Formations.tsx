import styles from "./aboutMe.module.css";
import Card from "../../components/card/card";
import { formations } from "../../content/content";

export default function Formations() {
    return (
        <section className={styles.formations} data-anim="formations">
            <div className={styles.heading}>
                <h2 className={styles.sectionTitle} data-anim="title">
                    Formations
                </h2>
                <h3 data-anim="title">
                    The foundations that built my knowledge and skills
                </h3>
            </div>
            <div className={styles.cardsGrid}>
                {formations.map((f) => (
                    <Card
                        key={f.school}
                        imageSrc={f.imageSrc}
                        imageAlt={f.imageAlt}
                        meta={f.dates}
                        title={f.school}
                        subtitle={f.diploma}
                    />
                ))}
            </div>
        </section>
    );
}
