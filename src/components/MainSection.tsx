"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
    "/images/main/main_01.jpg",
    "/images/main/main_02.jpg",
    "/images/main/main_03.jpg",
    "/images/main/main_04.jpg",
    "/images/main/main_05.jpg",
    "/images/main/main_06.jpg",
    "/images/main/main_07.jpg",
    "/images/main/main_08.jpg",
    "/images/main/main_09.jpg",
];

type Props = {
    paused?: boolean;
};

export default function MainSection({ paused = false }: Props) {
    const [heroH, setHeroH] = useState<number | null>(null);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setHeroH(window.innerHeight);

        const onOri = () => setHeroH(window.innerHeight);
        window.addEventListener("orientationchange", onOri);

        return () => {
            window.removeEventListener("orientationchange", onOri);
        };
    }, []);

    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3300);

        return () => clearInterval(interval);
    }, [paused]);

    const preventDefault = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    return (
        <section
            className="relative overflow-hidden"
            style={{ height: heroH ? `${heroH}px` : "100vh" }}
            onContextMenu={preventDefault}
        >
            {images.map((src, idx) => (
                <Image
                    key={src}
                    src={src}
                    alt={`main image ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    draggable={false}
                    onContextMenu={preventDefault}
                    onDragStart={preventDefault}
                    className={`
                        absolute inset-0 object-cover object-center p-5
                        select-none transition-opacity duration-2000
                        ${idx === current ? "opacity-100" : "opacity-0"}
                    `}
                />
            ))}

            <div
                className="absolute inset-0 z-10"
                onContextMenu={preventDefault}
                onDragStart={preventDefault}
                style={{
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                }}
            />
        </section>
    );
}