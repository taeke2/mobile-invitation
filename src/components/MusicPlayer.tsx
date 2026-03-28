"use client";

import { useEffect, useRef } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const startedRef = useRef(false);

    useEffect(() => {
        const startMusic = () => {
            if (startedRef.current) return;
            if (!audioRef.current) return;

            startedRef.current = true;

            audioRef.current.play().catch(() => {
                startedRef.current = false;
            });

            removeListeners();
        };

        const removeListeners = () => {
            document.removeEventListener("touchstart", startMusic);
            document.removeEventListener("click", startMusic);
            window.removeEventListener("scroll", startMusic);
        };

        document.addEventListener("touchstart", startMusic, { passive: true });
        document.addEventListener("click", startMusic);
        window.addEventListener("scroll", startMusic, { passive: true });

        return () => {
            removeListeners();
        };
    }, []);

    return (
        <audio ref={audioRef} loop preload="auto">
            <source src="/music/test2.mp3" type="audio/mpeg" />
        </audio>
    );
}