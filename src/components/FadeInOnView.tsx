"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FadeInOnView.tsx
 * - 여기 상단 상수만 조절하면 전체 애니메이션 속도/이동거리 통일됨
 */
const FADE_DURATION_MS = 3000;      // 페이드/이동 애니메이션 속도 (ms)
const START_TRANSLATE_CLASS = "translate-y-20"; // 처음 위치 (아래로 8)
const THRESHOLD = 0.4;             // 화면에 얼마나 들어오면 트리거할지

export default function FadeInOnView({
                                         children,
                                         className = "",
                                     }: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    setVisible(true);
                    io.disconnect(); // 한 번만 실행하고 끝 (원하면 제거 가능)
                }
            },
            { threshold: THRESHOLD }
        );

        io.observe(el);

        return () => {
            io.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={[
                "transition-all ease-out",
                visible ? "opacity-100 translate-y-0" : `opacity-0 ${START_TRANSLATE_CLASS}`,
                className,
            ].join(" ")}
            style={{ transitionDuration: `${FADE_DURATION_MS}ms` }}
        >
            {children}
        </div>
    );
}