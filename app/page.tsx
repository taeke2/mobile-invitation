"use client";

import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import WeAreGettingMarriedIntro from "../components/WeAreGettingMarriedIntro";

export default function Home() {
    const [showIntro, setShowIntro] = useState(true);

    // 인트로 종료 타이머
    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 3000);  // 3초
        return () => clearTimeout(timer);
    }, []);

    // 인트로 동안 스크롤 잠금
    useEffect(() => {
        if (!showIntro) return;

        const originalOverflow = document.body.style.overflow;
        const originalTouchAction = document.body.style.touchAction;

        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.touchAction = originalTouchAction;
        };
    }, [showIntro]);

    return (
        <main className="min-h-screen bg-black flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                {/* 인트로 */}
                <AnimatePresence>
                    {showIntro && (
                        <motion.div
                            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
                            initial={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.8}}
                        >
                            <WeAreGettingMarriedIntro />
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className="relative min-h-screen overflow-hidden">
                    <Image
                        src="/images/main_image.jpg"
                        alt="main image"
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="relative pt-14 text-center">
                        <h1 className="text-bold text-2xl font-bold">
                            성택 & 현정
                        </h1>
                    </div>
                </section>
            </div>
        </main>
    );
}
