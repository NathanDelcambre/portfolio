import styles from "./aboutMe.module.css";
import AboutHero from "../components/aboutMe/AboutHero";
import Skills from "../components/aboutMe/Skills";
import Formations from "../components/aboutMe/Formations";
import Diplomas from "../components/aboutMe/Diplomas";
import Experiences from "@/app/components/aboutMe/Experiences";
import Interests from "@/app/components/aboutMe/Interests";

export default function AboutMePage() {
    return (
        <div className={styles.aboutMePage}>
            <AboutHero />
            <Experiences />
            <Skills />
            <Formations />
            <Diplomas />
            <Interests />
        </div>
    );
}
