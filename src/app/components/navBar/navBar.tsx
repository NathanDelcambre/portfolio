"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navBar.module.css";
import Image from "next/image";
import React from "react";
import { NavItems } from "@/app/content/content";
import { motion, LayoutGroup } from "framer-motion";

export default function NavBar() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const menuId = "primary-navigation";

    React.useEffect(() => setOpen(false), [pathname]);

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = open ? "hidden" : (prevOverflow || "");
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow || "";
        };
    }, [open]);

    return (
        <div className={styles.header}>
            <Link href="/home" aria-label="Accueil">
                <div className={styles.logo} />
            </Link>

            <button
                type="button"
                className={styles.menuToggle}
                aria-controls={menuId}
                aria-expanded={open}
                aria-label={open ? "Close" : "Open"}
                onClick={() => setOpen(v => !v)}
            >
                <span className={`${styles.bar} ${open ? styles.barTopOpen : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barMidOpen : ""}`} />
                <span className={`${styles.bar} ${open ? styles.barBotOpen : ""}`} />
            </button>

            <LayoutGroup id="nav">
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
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className={styles.indicator}
                                        transition={{ type: "spring", stiffness: 150, damping: 45, mass: 1 }}
                                    />
                                )}
                                <Icon className={styles.navIcon} aria-hidden="true" />
                                <span className={styles.navLabel}>{title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </LayoutGroup>

            <div className={styles.githubLink}>
                <Link href={"https://github.com/NathanDelcambre"} target="_blank">
                    <Image className={styles.githubPicture} src={"/images/gh_logo.png"} alt="" width={150} height={150} />
                </Link>
            </div>

            <div id={menuId} className={`${styles.mobileMenu} ${open ? styles.open : ""}`} aria-hidden={!open}>
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
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className={styles.indicatorMobile}
                                        transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.5 }}
                                    />
                                )}
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
