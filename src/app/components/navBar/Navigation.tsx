"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";
import Image from "next/image";
import React from "react";

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image src={"/images/logo.png"} alt={""} width={100} height={30}/>
                </Link>
            </div>
            <nav className={styles.navigation}>
                <Link href="/" className={pathname === "/" ? styles.tabActive : ""}>Home</Link>
                <Link href="/about-me" className={pathname === "/about-me" ? styles.tabActive : ""}>About me</Link>
                <Link href="/projects" className={pathname === "/projects" ? styles.tabActive : ""}>Projects</Link>
                <Link href="/contact" className={pathname === "/contact" ? styles.tabActive : ""}>Contact</Link>
            </nav>
        </div>
    );
}
