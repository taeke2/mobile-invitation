"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MainSection() {
    const [heroH, setHeroH] = useState<number | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHeroH(window.innerHeight);

        const onOri = () => setHeroH(window.innerHeight);
        window.addEventListener("orientationchange", onOri);

        return () => {
            window.removeEventListener("orientationchange", onOri);
        };
    }, []);

    return (
        <section
            className="relative overflow-hidden"
            style={{ height: heroH ? `${heroH}px` : "100vh" }}
        >
            <Image
                src="/images/main_image.jpg"
                alt="main image"
                fill
                priority
                sizes="100vw"
                className="object-cover scale-160 object-[35%_center] -translate-y-8"
            />

            {/* 가운데 타이포 */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pt-50">
                <div className="flex flex-col items-center gap-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/weare.svg" alt="We are" className="w-30 max-w-[70vw] h-auto" draggable={false} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/getting.svg" alt="getting" className="w-40 max-w-[78vw] h-auto" draggable={false} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/married.svg" alt="married" className="w-40 max-w-[78vw] h-auto mt-10" draggable={false} />
                </div>
            </div>

            {/* 이름 */}
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center z-10">
                <p className="font-bodoni-sc text-[12px] text-[#414141]">
                    TAEK<span className="font-bodoni-sc text-[8px]"> & </span>JUNG
                </p>
            </div>
        </section>
    );
}