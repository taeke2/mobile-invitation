"use client";

import { useEffect, useRef, useState } from "react";

const SEC_PER_PX = 0.001;       // 쓰기 속도 조절 (낮을수록 빠름)
const GAP_SEC = 0.005;          // 간격 속도 조절 (낮을수록 빠름)
const REVERSE = true;           // 그리기 순서 반대 (true면 반대)

export default function Intro() {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const [svgText, setSvgText] = useState("");

    useEffect(() => {
        let alive = true;

        (async () => {
            const res = await fetch("/svgs/wearegettingmarried.svg", { cache: "no-store" });
            const text = await res.text();
            if (!alive) return;
            setSvgText(text);
        })();

        return () => {
            alive = false;
        };
    }, []);

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
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
            <style jsx>{`
                @keyframes wgm-draw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
            `}</style>

            <div
                ref={wrapRef}
                className="w-[320px] max-w-[85vw]"
                dangerouslySetInnerHTML={{ __html: svgText }}
            />
        </div>
    );
}
