"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navBar.module.css";
import Image from "next/image";
import React from "react";
import { NavItems } from "@/app/content/content";

export default function NavBar() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const menuId = "primary-navigation";

    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);

        const prevOverflow = document.body.style.overflow;
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = prevOverflow || "";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow || "";
        };
    }, [open]);

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/home" aria-label="Accueil">
                    <Image src={"/images/logo.png"} alt="" width={90} height={25} />
                </Link>
            </div>

            <button
                type="button"
                className={styles.menuToggle}
                aria-controls={menuId}
                aria-expanded={open}
                aria-label={open ? "Close" : "Open"}
                onClick={() => setOpen((v) => !v)}
            >
                <span className={`${styles.bar} ${open ? styles.barTopOpen : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barMidOpen : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barBotOpen : ""}`} />
            </button>

            <nav className={styles.navigation} aria-label="Navigation principale">
                {NavItems.map(({ icon: Icon, title, link }) => {
                    const isActive = pathname === link;
                    return (
                        <Link
                            key={link}
                            href={link}
                            aria-current={isActive ? "page" : undefined}
                            className={`${styles.navLink} ${isActive ? styles.tabActive : ""}`}
                        >
                            <Icon className={styles.navIcon} aria-hidden="true" />
                            <span className={styles.navLabel}>{title}</span>
                        </Link>
                    );
                })}
            </nav>

            <div
                id={menuId}
                className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
                aria-hidden={!open}
            >
                <div className={styles.mobileInner}>
                    {NavItems.map(({ icon: Icon, title, link }) => {
                        const isActive = pathname === link;
                        return (
                            <Link
                                key={link}
                                href={link}
                                className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ""}`}
                                onClick={() => setOpen(false)}
                            >
                                <Icon className={styles.navIcon} aria-hidden="true" />
                                <span>{title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
