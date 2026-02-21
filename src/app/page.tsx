"use client";

import Image from "next/image";
import WeAreGettingMarriedIntro from "@/src/components/WeAreGettingMarriedIntro";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                <section className="relative min-h-screen overflow-hidden">
                    <Image
                        src="/images/main_image.jpg"
                        alt="main image"
                        fill
                        priority
                        className="object-cover scale-140 object-[35%_center]"
                    />
                    {/* 상단 오버레이(그 위에 글씨/로고) */}
                    <div className="relative pt-10 text-center z-10">
                        <WeAreGettingMarriedIntro />
                    </div>
                    {/* 이름 */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center z-10">
                        <p className="font-bodoni-sc text-[12px] text-[#414141]">
                            TAEK<span className={"font-bodoni-sc text-[8px]"}> & </span>JUNG
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}