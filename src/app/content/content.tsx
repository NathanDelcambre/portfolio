import type {Hero, Experience, Formation, Diploma, Interest, Skill} from "./types";

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
                heading: "FINAL YEAR PROJECT",
                tags: [
                    "Project management",
                    "SharePoint",
                    "PowerAutomate"
                ],
                items: [
                    "Conducted a project management process harmonization initiative within the customer project department, delivering a comprehensive recommendation guide and deployed a SharePoint hub architecture.",
                    "Performed a comparative study of documentation and task management tools; produced ready-to-use templates (release notes, reports, slides) to standardize practices and accelerate onboarding.",
                ],
            },
            {
                heading: "CLOUD GAMING",
                tags: [
                    "JavaScript",
                    "Dana",
                    "Real-Time"
                ],
                items: [
                    "Integrated into a multinational, multi-technology team to deliver a UI in a real-time Cloud Gaming context.",
                    "Contributed to the in-game ribbon and profile management, implemented using the Dana framework and middleware integration."
                ],
            },
            {
                heading: "CUSTOMER PROJECT",
                tags: [
                    "JavaScript",
                    "Dana",
                    "UI/UX",
                    "STB"
                ],
                items: [
                    "Developed JavaScript features bridging client middleware (APIs) and the Dana framework.",
                    "Implemented services and adapters for data flow and business logic, integrated into application screens."
                ],
            },
            {
                heading: "R&D DEPARTMENT",
                tags: [
                    "Android",
                    "Components",
                    "Benchmark"
                ],
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
                heading: "DUT INTERNSHIP",
                tags: [
                    "Android",
                    "Compose",
                    "Kotlin",
                    "Mobile"
                ],
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
        imageSrc: "/images/formations/lpr.jpg",
        imageAlt: "Lycée scientifique",
    },
    {
        dates: "2020 – 2022",
        school: "IUT des Pays de l'Adour",
        diploma: "DUT Informatique",
        imageSrc: "/images/formations/iut.jpg",
        imageAlt: "IUT Informatique",
    },
    {
        dates: "2022 – 2025",
        school: "IMT Atlantique",
        diploma: "Software Engineering",
        imageSrc: "/images/formations/imt.jpg",
        imageAlt: "IMT Atlantique",
    },
];

export const diplomas: Diploma[] = [
    { name: "Projet Voltaire", subtitle: "Business Level", imageSrc: "/images/certifications/projetVoltaire.png", imageAlt: "Projet Voltaire" },
    { name: "TOEIC", subtitle: "945/990", imageSrc: "/images/certifications/toeic.png", imageAlt: "TOEIC" },
    { name: "IELTS", subtitle: "7.0/9.0", imageSrc: "/images/certifications/ielts.png", imageAlt: "IELTS" },
];

export const interests: Interest[] = [
    { title: "Go surfing", imageSrc: "/images/interests/surf.jpg", imageAlt: "surf" },
    { title: "Go surfing", imageSrc: "/images/interests/surf2.jpg", imageAlt: "surf" },
    { title: "Lifesaving", imageSrc: "/images/interests/lifesaving.jpg", imageAlt: "lifesaving" },
    { title: "Paddleboard", imageSrc: "/images/interests/paddle.jpg", imageAlt: "paddle" },
    { title: "SNA", imageSrc: "/images/interests/SNA.jpg", imageAlt: "SNA" },
    { title: "Travels", imageSrc: "/images/interests/sea.jpg", imageAlt: "sea" },
    { title: "POSCA", imageSrc: "/images/interests/painting.jpg", imageAlt: "posca" }
];

export const skills: Skill[] = [
    { name: "Android Studio", imageSrc: "/images/skills/androidstudio.png", imageAlt: "android" },
    { name: "Angular", imageSrc: "/images/skills/angular.png", imageAlt: "angular" },
    { name: "React", imageSrc: "/images/skills/react.png", imageAlt: "react" },
    { name: "Vue", imageSrc: "/images/skills/vue.svg", imageAlt: "vue" },
    { name: "Compose", imageSrc: "/images/skills/jetpackcompose.png", imageAlt: "compose" },
    { name: "NextJS", imageSrc: "/images/skills/nextjs.png", imageAlt: "nextjs" },
    { name: "NodeJS", imageSrc: "/images/skills/nodejs.png", imageAlt: "nodejs" },
    { name: "Spring Boot", imageSrc: "/images/skills/spring.svg", imageAlt: "spring" },
    { name: "Tailwind", imageSrc: "/images/skills/tailwind.png", imageAlt: "tailwind" },
    { name: "Shadcn", imageSrc: "/images/skills/shadcn.svg", imageAlt: "shadcn" },
    { name: "Vercel", imageSrc: "/images/skills/vercel.svg", imageAlt: "vercel" },
    { name: "SQL", imageSrc: "/images/skills/mysql.png", imageAlt: "mysql" },
    { name: "GitHub", imageSrc: "/images/skills/github.svg", imageAlt: "github" },
    { name: "Figma", imageSrc: "/images/skills/figma.svg", imageAlt: "figma" },
    { name: "Java", imageSrc: "/images/skills/java.svg", imageAlt: "java" },
    { name: "JavaScript", imageSrc: "/images/skills/js.svg", imageAlt: "js" },
    { name: "TypeScript", imageSrc: "/images/skills/ts.svg", imageAlt: "ts" },
    { name: "Python", imageSrc: "/images/skills/python.svg", imageAlt: "python" },
    { name: "Kotlin", imageSrc: "/images/skills/kotlin.svg", imageAlt: "kotlin" },
    { name: "MS365", imageSrc: "/images/skills/ms365.png", imageAlt: "ms365" }
];
