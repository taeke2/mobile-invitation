"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

const images = [
    "/images/main/main_image_01.jpg",
    "/images/main/main_image_02.jpg",
    "/images/main/main_image_03.jpg",
];


export default function MainSection() {
    const [heroH, setHeroH] = useState<number | null>(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHeroH(window.innerHeight);

        const onOri = () => setHeroH(window.innerHeight);
        window.addEventListener("orientationchange", onOri);

        return () => {
            window.removeEventListener("orientationchange", onOri);
        };
    }, []);

    // 이미지 전환
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3300); // 3.3초

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative overflow-hidden"
            style={{height: heroH ? `${heroH}px` : "100vh"}}
        >
            {images.map((src, idx) => (
                <Image
                    key={src}
                    src={src}
                    alt={`main image ${idx}`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className={`
                        object-cover object-center
                        absolute inset-0 p-5
                        transition-opacity duration-2000
                        ${idx === current ? "opacity-100" : "opacity-0"}
                    `}
                />
            ))}
        </section>
    );
}