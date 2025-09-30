import type { Hero, Experience, Formation, Diploma, Interest } from "./types";

export const hero: Hero = {
    role: "SOFTWARE ENGINEER",
    name: "Nathan DELCAMBRE",
    location: "Nantes, Loire-Atlantique (44)",
    ctaPrimary: "See my Resume",
    ctaSecondary: "Contact Me",
};

export const experiences: Experience[] = [
    {
        role: "Junior Software Engineer",
        company: "Wiztivi",
        dates: "Sep 2022 – Sep 2025",
        blocks: [
            {
                heading: "📝 FINAL YEAR PROJECT",
                items: [
                    "Conducted a project management process harmonization initiative within the customer project department, delivering a comprehensive recommendation guide and deployed a SharePoint hub architecture.",
                    "Performed a comparative study of documentation and task management tools; produced ready-to-use templates (release notes, reports, slides) to standardize practices and accelerate onboarding.",
                ],
            },
            {
                heading: "🎮 CLOUD GAMING",
                items: [
                    "Integrated into a multinational, multi-technology team to deliver a UI in a real-time Cloud Gaming context.",
                    "Contributed to the in-game ribbon and profile management, implemented using the Dana framework and middleware integration."
                ],
            },
            {
                heading: "🌋 CUSTOMER PROJECT",
                items: [
                    "Developed JavaScript features bridging client middleware (APIs) and the Dana framework.",
                    "Implemented services and adapters for data flow and business logic, integrated into application screens."
                ],
            },
            {
                heading: "🤖 R&D DEPARTMENT",
                items: [
                    "Focused on Android TV native features. Optimized Rails and ScrollView for limited-resource set-top boxes, integrated with the Dana Android renderer.",
                    "Conducted a responsiveness study with Flutter on Android TV to enable responsive mobile/TV apps using Dana."
                ],
            },
        ],
    },
    {
        role: "Software Developer Intern",
        company: "Wiztivi",
        dates: "Apr 2021 – Jul 2021",
        blocks: [
            {
                heading: "🐢 DUT INTERNSHIP",
                items: [
                    "Android application development training in Android Studio (TV-style UI).",
                    "Benchmarked item rails (including Jetpack Compose) with Espresso and JUnit. Study about LazyRow, containerization, RecyclerView.",
                    "Wrote a final report and dissertation."
                ],
            },
        ],
    },
];

export const formations: Formation[] = [
    {
        dates: "2015 – 2018",
        school: "Lycée du pays de Retz",
        diploma: "Baccalauréat Scientifique",
        imageSrc: "/images/lpr.jpg",
        imageAlt: "Lycée scientifique",
    },
    {
        dates: "2020 – 2022",
        school: "IUT des Pays de l'Adour",
        diploma: "DUT Informatique",
        imageSrc: "/images/iut.jpg",
        imageAlt: "IUT Informatique",
    },
    {
        dates: "2022 – 2025",
        school: "IMT Atlantique",
        diploma: "Software Engineering",
        imageSrc: "/images/imt.jpg",
        imageAlt: "IMT Atlantique",
    },
];

export const diplomas: Diploma[] = [
    { name: "Projet Voltaire", subtitle: "Business Level", imageSrc: "/images/projetVoltaire.png", imageAlt: "Projet Voltaire" },
    { name: "TOEIC", subtitle: "945/990", imageSrc: "/images/toeic.png", imageAlt: "TOEIC" },
    { name: "IELTS", subtitle: "7.0/9.0", imageSrc: "/images/ielts.png", imageAlt: "IELTS" },
];

export const interests: Interest[] = [
    { title: "Go surfing", imageSrc: "/images/surf.jpg", imageAlt: "surf" },
    { title: "Go surfing", imageSrc: "/images/surf2.jpg", imageAlt: "surf" },
    { title: "Lifesaving", imageSrc: "/images/lifesaving.jpg", imageAlt: "lifesaving" },
    { title: "Paddleboard", imageSrc: "/images/paddle.jpg", imageAlt: "paddle" },
    { title: "SNA", imageSrc: "/images/SNA.jpg", imageAlt: "SNA" },
    { title: "Travels", imageSrc: "/images/sea.jpg", imageAlt: "sea" },
    { title: "POSCA", imageSrc: "/images/painting.jpg", imageAlt: "posca" }
];
