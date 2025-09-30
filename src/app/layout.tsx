import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Outfit } from 'next/font/google';
import Navigation from "@/app/components/navBar/navBar";
import styles from "@/app/page.module.css";

const outfit = Outfit({
  weight: "500",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Nathan Delcambre - Software Engineer",
  description: "Software engineer - Portfolio presenting different projects done",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.className}>
    <body>
    <header className={styles.header}>
      <Navigation/>
    </header>
    <main>
      {children}
    </main>
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© 2025 Nathan Delcambre. All rights reserved.</p>
        <nav>
          <a href="/">Home</a>
          <a href="/about-me">About</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className={styles.socials}>
          <a href="https://github.com/NathanDelcambre" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/nathan-delcambre/" target="_blank">LinkedIn</a>
        </div>
      </div>
    </footer>
    </body>
    </html>
  );
}
