"use client";

import { useEffect, useRef, useState } from "react";

const SEC_PER_PX = 0.001;
const GAP_SEC = 0.005;
const REVERSE = true;

export default function WeAreGettingMarriedIntro() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const [svgText, setSvgText] = useState("");

    // SVG 로드
    useEffect(() => {
        let alive = true;

        (async () => {
            const res = await fetch("/svgs/gettingmarried2.svg", { cache: "no-store" });
            const text = await res.text();
            if (!alive) return;
            setSvgText(text);
        })();

        return () => {
            alive = false;
        };
    }, []);

    // 애니메이션 적용
    useEffect(() => {
        if (!svgText) return;
        const root = wrapRef.current;
        if (!root) return;

        const svg = root.querySelector("svg");
        if (!svg) return;

        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.display = "block";
        svg.style.width = "100%";
        svg.style.height = "auto";

        let paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
        if (REVERSE) paths = paths.reverse();

        let cumulativeDelay = 0;

        paths.forEach((p) => {
            p.style.fill = "none";
            p.style.strokeLinecap = "round";
            p.style.strokeLinejoin = "round";

            let length = 0;
            try {
                length = p.getTotalLength();
            } catch {
                return;
            }

            p.style.strokeDasharray = `${length}`;
            p.style.strokeDashoffset = `${length}`;

            const duration = Math.max(0.08, length * SEC_PER_PX);
            p.style.animation = `wgm-draw ${duration}s linear ${cumulativeDelay}s forwards`;

            cumulativeDelay += duration + GAP_SEC;
        });
    }, [svgText]);

    return (
        <div className="mx-auto w-[300px] max-w-[85vw]">
            <style jsx>{`
                @keyframes wgm-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>

            <div ref={wrapRef} dangerouslySetInnerHTML={{ __html: svgText }} />
        </div>
    );
}