import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Outfit } from 'next/font/google';
import Navigation from "@/app/components/navBar/navBar";
import ThemeToggle from "@/app/components/themeToggle/themeToggle";
import SimpleAudioPlayer from "@/app/components/audioPlayer/audioPlayer";
import Background from "@/app/components/background/background";
import Script from "next/script";
import Footer from "@/app/components/footer/footer";

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
      <html lang="en" className={outfit.className} suppressHydrationWarning={true}>
          <head>
              <Script src="/js/theme-init.js" strategy="beforeInteractive" />
              <title></title>
          </head>
          <body>
              <Navigation/>
              <Background/>
              <main>{children}</main>
              <Footer />
              <SimpleAudioPlayer/>
              <ThemeToggle/>
          </body>
      </html>
  );
}
