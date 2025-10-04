import {LucideIcon} from "lucide-react";

export type NavTab = {
    icon: LucideIcon;
    title: string;
    link: string;
}

export type ExperienceBlock = {
    heading?: string;
    tags?: string[];
    items: string[];
};

export type Experience = {
    role: string;
    company: string;
    dates: string;
    blocks: ExperienceBlock[];
};

export type Formation = {
    dates: string;
    school: string;
    diploma: string;
    imageSrc: string;
    imageAlt: string;
};

export type Diploma = {
    name: string;
    subtitle?: string;
    imageSrc: string;
    imageAlt: string;
    tooltip?: string;
};

export type Interest = {
    title: string;
    imageSrc: string;
    imageAlt: string;
};

export type Hero = {
    role: string;
    name: string;
    location: string;
    ctaPrimary: string;
    ctaSecondary: string;
};

export type Skill = {
    name: string;
    imageSrc: string;
    imageAlt: string;
};

export type CardAction = {
    label: string;
    href: string;
    icon?: LucideIcon;
    external?: boolean;
    ariaLabel?: string;
};

export type HomeCard = {
    title: string;
    tagline: string;
    icon: LucideIcon;
    actions: CardAction[];
};
