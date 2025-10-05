import styles from "./page.module.css";
import { Rocket } from "lucide-react";

export default function Loading() {
    return (
        <div className={styles.loader}>
            <div className={styles.rocketWrapper}>
                <Rocket className={styles.rocketIcon} size={60} aria-hidden />
            </div>
            <span className={styles.text}>Loading<span className={styles.dots}>...</span></span>
        </div>
    );
}
