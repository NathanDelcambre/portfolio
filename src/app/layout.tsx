import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css";
import React from "react";
import { Outfit } from 'next/font/google';
import Navigation from "@/app/components/navBar/navBar";
import ThemeToggle from "@/app/components/themeToggle/themeToggle";
import SimpleAudioPlayer from "@/app/components/audioPlayer/audioPlayer";
import Starfield from "@/app/components/starField/starField";

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
    <Navigation/>
    <Starfield
        density={3}
        layers={5}
        baseSpeed={0.003}
        interactive
    />
    <main>
      {children}
    </main>
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© 2025 Nathan Delcambre. All rights reserved.</p>
      </div>
    </footer>
    <SimpleAudioPlayer />
    <ThemeToggle />
    </body>
    </html>
  );
}
