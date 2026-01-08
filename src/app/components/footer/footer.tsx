import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© 2025 Nathan Delcambre. All rights reserved.</p>
            </div>
        </footer>
    );
}
