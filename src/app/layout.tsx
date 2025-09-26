import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Outfit } from 'next/font/google';
import Navigation from "@/app/components/navBar/Navigation";
import styles from "@/app/page.module.css";

const outfit = Outfit({
  weight: "500",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Nathan Delcambre - Portfolio",
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
    <main>{children}</main>
    </body>
    </html>
  );
}
