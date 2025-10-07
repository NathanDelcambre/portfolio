"use client";

import Image from "next/image";
import Starfield from "@/app/components/starField/starField";

export default function Background() {
    return (
        <div className="bg-root">
            <div className="bg-starfield">
                <Starfield density={3} layers={5} baseSpeed={0.003} interactive />
            </div>

            <div className="bg-light">
                <Image
                    src="/images/bg-light.jpg"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                />
            </div>
        </div>
    );
}
