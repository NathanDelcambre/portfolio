"use client";

import React, { useRef, useState } from "react";
import styles from "./contact.module.css";
import {useAboutGsap} from "../hooks/useGsap";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

export default function ContactPage() {
    const scope = useAboutGsap();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [copied, setCopied] = useState(false);
    const email = "nathan.delcambre@gmail.com";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy error :", err);
        }
    };

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("sending");

        try {
            await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, formRef.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
            setStatus("success");
            formRef.current.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <div ref={scope} className={styles.contactPage}>
            <section className={styles.contact}>
                <div className={styles.heading}>
                    <h2 className={styles.sectionTitle} data-anim={"title"}>Contact</h2>
                    <h3 className={styles.subtitle} data-anim={"title"}>Do not hesitate to contact me, I will answer you if there are no
                        waves to surf</h3>
                </div>

                <form ref={formRef} onSubmit={sendEmail} className={styles.form}>
                    <div className={styles.rowContainer}>
                        <div className={styles.row}>
                            <label htmlFor="firstName" className={styles.label}>First name</label>
                            <input placeholder={"..."} type="text" id="firstName" name="firstName" required className={styles.input}/>
                        </div>

                        <div className={styles.row}>
                            <label htmlFor="lastName" className={styles.label}>Last name</label>
                            <input placeholder={"..."} type="text" id="lastName" name="lastName" required className={styles.input}/>
                        </div>

                        <div className={styles.row}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input placeholder={"..."} type="email" id="email" name="email" required className={styles.input}/>
                        </div>

                        <div className={styles.row}>
                            <label htmlFor="subject" className={styles.label}>Object</label>
                            <input placeholder={"..."} type="text" id="subject" name="subject" required className={styles.input}/>
                        </div>

                        <div className={`${styles.row} ${styles.fullWidth}`}>
                            <label htmlFor="message" className={styles.label}>Message</label>
                            <textarea placeholder={""} id="message" name="message" rows={4} required className={styles.textarea}/>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className={styles.button}
                    >
                        {status === "sending" ? "Travelling..." : "🚀 Send"}
                    </button>

                    {status === "success" && (
                        <p className={styles.success}>✅ Message sent with success !</p>
                    )}
                    {status === "error" && (
                        <p className={styles.error}>❌ An error occured. Try again later !</p>
                    )}
                </form>
            </section>

                <section className={styles.coords}>
                    <div className={styles.heading}>
                        <h2 className={styles.sectionTitle} data-anim={"title"}>Get in touch</h2>
                        <h3 className={styles.subtitle} data-anim={"title"}>My digital buffet, help yourself as much as you want</h3>
                    </div>
                    <div className={styles.linksGrid} data-anim={"cards"}>
                        <div className={styles.coordsItem}>
                            <div className={styles.iconBox}>
                                <Image src="/images/links/phone2.svg" alt="telephone" width={64} height={64}
                                       className={styles.icon}/>
                            </div>
                            <p>0750827752</p>
                        </div>

                        <div className={styles.coordsItem}>
                            <div className={styles.iconBox}>
                                <Image src="/images/links/gmail.png" alt="gmail" width={64} height={64}
                                       className={styles.icon}/>
                            </div>

                            <div className={styles.tooltip}>
                                <a href={`mailto:${email}`} className={styles.coordsLink}>Mail</a>
                                <div className={styles.tooltipBox}>
                                    <span className={styles.tooltipText}>{email}</span>
                                    <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                                        {copied ? <Check size={16}/> : <Copy size={16}/>}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.coordsItem}>
                            <div className={styles.iconBox}>
                                <Image src="/images/links/linkedIn.png" alt="linkedIn" width={64} height={64}
                                       className={styles.icon}/>
                            </div>
                            <Link href="https://www.linkedin.com/in/nathan-delcambre/" target="_blank"
                                  className={styles.coordsLink}>LinkedIn</Link>
                        </div>

                        <div className={styles.coordsItem}>
                            <div className={styles.iconBox}>
                                <Image src="/images/skills/github2.svg" alt="github" width={64} height={64}
                                       className={styles.icon}/>
                            </div>
                            <Link href="https://github.com/NathanDelcambre" target="_blank"
                                  className={styles.coordsLink}>GitHub</Link>
                        </div>
                    </div>
                </section>
        </div>
    );
}
