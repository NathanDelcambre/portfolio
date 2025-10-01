"use client";
import styles from "./aboutMe.module.css";
import Image from "next/image";
import Card from "../components/card/card";
import {diplomas, experiences, formations, hero, interests, skills} from "../content/content";
import {useAboutGsap} from "../hooks/useGsap";
import AutoCarousel from "../components/autoCarousel/autoCarousel";
import {useRef, useState} from "react";
import {useTilt} from "../hooks/useTilt";
import Link from "next/link";
import ScrollCue from "@/app/components/scrollCue/scrollCue";

export default function AboutMePage() {
    const scope = useAboutGsap();
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const panelsRef = useRef<Record<string, HTMLDivElement | null>>({});
    const toggle = (key: string) => {
        setOpen((s) => {
            return {...s, [key]: !s[key]};
        });
    };
    const tilt = useTilt(30);

    return (
        <div ref={scope} className={styles.aboutMePage}>
            {/* Hero */}
            <section className={styles.presentation}>
                <div className={styles.profilePicture}>
                    <div className={styles.profilePictureContainer} ref={tilt.ref}
                         onMouseMove={tilt.handleMouseMove}
                         onMouseLeave={tilt.handleMouseLeave}>
                        <Image
                            src="/images/pp.jpg"
                            alt={`Photo de ${hero.name}`}
                            width={400}
                            height={400}
                            className={styles.profileImg}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.generalInfos} data-anim={"hero-copy"}>
                    <p className={styles.role}>{hero.role}</p>
                    <h1 className={styles.name}>{hero.name}</h1>
                    <p className={styles.location}>{hero.location}</p>
                    <div className={styles.buttons} data-anim={"hero-ctas"}>
                        <button className={styles.primaryBtn}>
                            <a href={"/pdf/Curriculum-Vitae_Nathan-DELCAMBRE.pdf"} target="CV - Nathan Delcambre"
                               rel="noopener noreferrer">
                                <p>{hero.ctaPrimary}</p>
                            </a>
                        </button>
                        <button className={styles.secondaryBtn}><Link href="/contact"><p>{hero.ctaSecondary}</p></Link>
                        </button>
                    </div>
                </div>
            </section>

            <ScrollCue />

            {/* Experiences */}
            <section className={styles.experiences} data-anim={"exp"}>
                <div className={styles.heading}>
                    <h2 className={styles.sectionTitle} data-anim={"title"}>Experiences</h2>
                    <h3 data-anim={"title"}>Discover the milestones that shaped my professional journey</h3>
                </div>

                {experiences.map((exp) => {
                    const key = `${exp.role}-${exp.dates}`;
                    const isOpen = open[key];
                    const panelEl = panelsRef.current[key];
                    const maxHeight = isOpen && panelEl ? panelEl.scrollHeight : 0;

                    return (
                        <div className={styles.experience} key={key} data-anim={"exp-item"}>
                            <button
                                type="button"
                                className={styles.experienceHeader}
                                aria-expanded={isOpen}
                                aria-controls={`panel-${key}`}
                                onClick={() => toggle(key)}
                            >
                                <h3>{exp.role}</h3>
                                <span className={styles.dates}>({exp.dates})</span>
                                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden>
                                    <svg width="20" height="20" viewBox="0 0 24 24" className={styles.chevronIcon}>
                                        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="4"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </button>
                            <div
                                id={`panel-${key}`}
                                className={styles.experiencePanel}
                                style={{maxHeight}}
                            >
                                <div
                                    className={styles.experiencePanelInner}
                                    ref={(el) => {
                                        panelsRef.current[key] = el;
                                    }}
                                >
                                    <div className={styles.experienceGrid}>
                                        {exp.blocks.map((block, i) => (
                                            <div className={styles.experienceDescription} key={i}>
                                                {block.heading && (
                                                    <code className={styles.subject}>{block.heading}</code>
                                                )}
                                                <div className={styles.tagList}>
                                                    {block.tags?.map((tag, j) => (
                                                        <div className={styles.tagChip} key={j}>{tag}</div>
                                                    ))}
                                                </div>
                                                <ul className={styles.workDone}>
                                                    {block.items.map((item, j) => (
                                                        <li key={j}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Skills */}
            <section className={styles.skills} data-anim={"skills"}>
                <div className={styles.heading}>
                    <h2 data-anim={"title"}>Skills</h2>
                    <h3 data-anim={"title"}>The different technologies and frameworks</h3>
                </div>

                <div className={styles.skillsGrid} data-anim={"skills"}>
                    {skills.map((s) => (
                        <div className={styles.skill} key={s.name} data-anim={"skill"}>
                            <Image className={styles.white} src={s.imageSrc} alt={s.imageAlt} width={80} height={80}/>
                            <p>{s.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Formations */}
            <section className={styles.formations} data-anim={"formations"}>
                <div className={styles.heading}>
                    <h2 className={styles.sectionTitle} data-anim={"title"}>Formations</h2>
                    <h3 data-anim={"title"}>The foundations that built my knowledge and skills</h3>
                </div>
                <div className={styles.cardsGrid} data-anim={"cards"}>
                    {formations.map((f) => (
                        <Card
                            key={f.school}
                            imageSrc={f.imageSrc}
                            imageAlt={f.imageAlt}
                            meta={f.dates}
                            title={f.school}
                            subtitle={f.diploma}
                        />
                    ))}
                </div>
            </section>

            {/* Certifications */}
            <section className={styles.otherDiplomas} data-anim={"formations"}>
                <div className={styles.heading}>
                    <h2 data-anim={"title"}>Certifications</h2>
                    <h3 data-anim={"title"}>Completing my profile with language certifications</h3>
                </div>

                <div className={styles.diplomasGrid} data-anim={"diplomas"}>
                    {diplomas.map((d) => (
                        <div className={styles.diploma} key={d.name} data-anim={"diploma"}>
                            <img className={styles.white} src={d.imageSrc} alt={d.imageAlt}/>
                            <p>{d.name}</p>
                            {d.subtitle && (
                                <p className={styles.secondaryText}>{d.subtitle}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Interests */}
            <section className={styles.interests} data-anim={"interests"}>
                <div className={styles.heading}>
                    <h2 data-anim={"title"}>Interests</h2>
                    <h3 data-anim={"title"}>Take a look at what inspires me beyond work</h3>
                </div>

                <AutoCarousel speed={60} gap={24} className={styles.carouselViewport}>
                    {interests.map((it) => (
                        <Image
                            key={it.imageSrc}
                            src={it.imageSrc}
                            alt={it.imageAlt}
                            width={1200}
                            height={800}
                            className={styles.white}
                        />
                    ))}
                </AutoCarousel>
            </section>
        </div>
    );
}
