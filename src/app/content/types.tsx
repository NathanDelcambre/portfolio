export type ExperienceBlock = {
    heading?: string;
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
