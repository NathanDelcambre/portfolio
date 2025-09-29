"use client";

import styles from "./aboutMe.module.css";
import Image from "next/image";

export default function AboutMePage() {
    return (
        <div className={styles.aboutMePage}>
            <section className={styles.presentation}>
                <div className={styles.profilePicture}>
                    <div className={styles.profilePictureContainer}>
                        <Image
                            src="/images/pp.jpg"
                            alt="Photo de Nathan Delcambre"
                            width={400}
                            height={400}
                            className={styles.profileImg}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.generalInfos}>
                    <p className={styles.role}>SOFTWARE ENGINEER</p>
                    <h1 className={styles.name}>Nathan DELCAMBRE</h1>
                    <p className={styles.location}>Nantes, Loire-Atlantique (44)</p>

                    <div className={styles.buttons}>
                        <button className={styles.primaryBtn}>Download CV</button>
                        <button className={styles.secondaryBtn}>Contact Me</button>
                    </div>
                </div>
            </section>
            <section className={styles.experiences}>
                <h2 className={styles.sectionTitle}>Experiences</h2>

                <div className={styles.experience}>
                    <div className={styles.experienceHeader}>
                        <h3>Junior Software Engineer</h3>
                        <span>- Wiztivi</span>
                        <span className={styles.dates}>Sep 2022 – Sep 2025</span>
                    </div>
                    <ul className={styles.experienceList}>
                        <p>
                            <strong className={styles.subject}>Final Year Project</strong>
                            <li>Conducted a project management process harmonization initiative within the customer
                                project department, aimed at improving consistency across multiple project managers.
                                Delivered a comprehensive recommendation guide covering the entire project lifecycle:
                                phase definition, routines and meetings, required deliverables, client and internal
                                governance models, change management practices, monitoring approaches, KPI definition,
                                and standardized naming conventions.
                            </li>
                            <li>Performed a comparative study of documentation and task management tools, selecting the
                                most appropriate solutions for the department’s needs. Developed ready-to-use document
                                templates (release notes, reporting, slides) to standardize practices and accelerate
                                project onboarding.
                            </li>
                            <li>Designed and deployed a SharePoint hub architecture to centralize documentation, improve
                                information flow, and support workflow automation through PowerAutomate.
                            </li>
                        </p>
                        <p>
                            <strong className={styles.subject}>Cloud Gaming in Finland</strong>
                            <li>Integrated into a Finnish team to deliver a user interface in a real-time Cloud Gaming
                                context. Contributed to the development of the in-game ribbon (menu system) and the
                                profile management module, implemented using the proprietary Dana framework and
                                communicating with the middleware stack.
                            </li>
                        </p>
                        <p>
                            <strong className={styles.subject}>Customer project</strong>
                            <li>Developed JavaScript features to ensure communication between client middleware (APIs)
                                and the Dana framework. Implemented associated services and adapters to handle data flow
                                and business logic, and integrated these features into the appropriate application
                                screens.
                            </li>
                        </p>
                        <p>
                            <strong className={styles.subject}>R&D Department</strong>
                            <li>Worked within the native features team, focusing on Android TV. Studied and optimized
                                the use of native components such as Rails and ScrollView to improve performance on
                                set-top boxes with limited resources, and integrated these features with the Dana
                                Android renderer.
                            </li>
                            <li>In a second phase, conducted a responsiveness study on applications developed with
                                Flutter and deployed on Android TV, with the objective of enabling the creation of
                                responsive mobile and TV applications using the Dana framework.
                            </li>
                        </p>
                    </ul>
                </div>
                <div className={styles.experience}>
                    <div className={styles.experienceHeader}>
                        <h3>Software Developer Intern</h3>
                        <span>- Wiztivi</span>
                        <span className={styles.dates}>April 2021 - July 2021</span>
                    </div>
                    <ul className={styles.experienceList}>
                        <p>
                            <strong className={styles.subject}>End of DUT internship</strong>
                            <li>Android application development training. Using Android Studio to create a TV-style
                                application.
                            </li>
                            <li>Study of the various item rails (including Jetpack Compose) and benchmark of their
                                performance with Espresso and JUnit tests.
                                As a native, canonical component, RecyclerView ensures performance and broad
                                compatibility compared to newer abstractions like LazyRow..
                            </li>
                            <li>Writing a report and a final year dissertation.</li>
                        </p>
                    </ul>
                </div>
            </section>
            <hr className={styles.separationLine}/>
            <section className={styles.formations}>
                <h2 className={styles.sectionTitle}>Formations</h2>

                <div className={styles.cardsGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/lpr.jpg" alt="Lycée scientifique"/>
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.secondaryText}>2015 - 2018</p>
                            <h3>Lycée du pays de Retz</h3>
                            <p>Baccalauréat Scientifique</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/iut.jpg" alt="IUT Informatique"/>
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.secondaryText}>2020 - 2022</p>
                            <h3>IUT d'Anglet</h3>
                            <p>DUT Informatique</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/imt.jpg" alt="IMT Atlantique"/>
                        </div>
                        <div className={styles.cardContent}>
                            <p className={styles.secondaryText}>2022 - 2025</p>
                            <h3>IMT Atlantique</h3>
                            <p>Ingénierie logicielle</p>
                        </div>
                    </div>
                </div>
                <p>Through these different training courses I had the opportunity to take different secondary exams to complete and strengthen my profile:</p>
                <div className={styles.diplomasGrid}>
                    <div className={styles.diploma}>
                        <img className={styles.white} src="/images/projetVoltaire.png" alt="pv"/>
                        <p>Projet Voltaire</p>
                        <p className={styles.secondaryText}>Business Level</p>
                    </div>
                    <div className={styles.diploma}>
                        <img className={styles.white} src="/images/toeic.png" alt="toeic"/>
                        <p>TOEIC</p>
                        <p className={styles.secondaryText}>945/990</p>
                    </div>
                    <div className={styles.diploma}>
                        <img className={styles.white} src="/images/ielts.png" alt="ielts"/>
                        <p>IELTS</p>
                        <p className={styles.secondaryText}>7.0/9.0</p>
                    </div>
                </div>
            </section>
            <hr className={styles.separationLine}/>
            <section className={styles.interests}>
                <h2 className={styles.sectionTitle}>Interests</h2>
                <div className={styles.cardsGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/surf.jpg" alt="surf"/>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Go surfing</h3>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/lifesaving.jpg" alt="lifesaving"/>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Lifesaving</h3>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img src="/images/paddle.jpg" alt="paddle"/>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>Paddleboard</h3>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
