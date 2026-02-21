"use client";

import Image from "next/image";
import WeAreGettingMarriedIntro from "@/src/components/WeAreGettingMarriedIntro";

export default function Home() {
    return (
        <main className="min-h-screen bg-black flex justify-center">
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
                    {/* 이름 넣기 */}
                    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center z-10">
                        <p className="text-[11px] text-[#414141] tracking-[0.1em]">
                            TAEK & JUNG
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}