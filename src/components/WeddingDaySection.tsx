"use client";

import {useMemo} from "react";
import CountUpNumber from "@/src/components/CountUpNumber";
import FadeInOnView from "@/src/components/FadeInOnView";

export default function WeddingDaySection() {
    // TODO: 웨딩데이는 FadeInOnView 빼기
    // D-day 계산 (컴포넌트 내부로 이동)
    const diffDays = useMemo(() => {
        if (typeof window === "undefined") return 0;

        const wedding = new Date("2026-05-09T18:30:00+09:00");
        const now = new Date();

        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const target = new Date(
            wedding.getFullYear(),
            wedding.getMonth(),
            wedding.getDate()
        ).getTime();

        return Math.max(0, Math.ceil((target - start) / (1000 * 60 * 60 * 24)));
    }, []);

    return (
        <section
            className="relative px-7 py-15 text-center text-black bg-[url('/images/paper_bg.jpg')] bg-cover bg-center">
            {/* 타이틀 SVG */}
            <FadeInOnView>
                <div className="mx-auto w-55 max-w-[70vw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/weddingDay.svg" alt="Wedding day" className="w-full h-auto"/>
                </div>
            </FadeInOnView>


            {/* 날짜 텍스트 */}
            <FadeInOnView>
                <div className="mt-7">
                    <div className="text-[13px] font-noto-sans-kr font-semibold">
                        2026년 5월 9일 토요일 | 오후 6시 30분
                    </div>
                    <div className="mt-2 text-[11px] text-[#ADA9A9] font-gowun-batang font-bold">
                        Saturday, May 9, 2026. PM 6:30
                    </div>
                </div>
            </FadeInOnView>

            {/* 구분선 */}
            {/*<FadeInOnView>
                <div className="mx-auto mt-7 h-px w-full max-w-md bg-[#ADA9A9]/60"/>
            </FadeInOnView>*/}

            {/* 달력 */}
            {(() => {
                const year = 2026;
                const monthIndex = 4; // 0-based: 4 = May
                const highlightDay = 9;

                const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun
                const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                const cells: Array<number | null> = [];
                for (let i = 0; i < firstDay; i++) cells.push(null);
                for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                while (cells.length % 7 !== 0) cells.push(null);

                const weekLabels = ["일", "월", "화", "수", "목", "금", "토"];

                return (
                    <FadeInOnView>
                        <div className="mt-10 mx-auto w-full max-w-md rounded-[10px] bg-white shadow-[0_0_1px_0px_rgba(255,255,255,0.1)]">

                            {/*<p className="my-3 font-bold font-gowun-batang">May. 2026</p>*/}

                            {/* 요일 */}
                            <div className="grid grid-cols-7 text-[11px] font-gowun-batang font-bold">
                                {weekLabels.map((w, idx) => (
                                    <div
                                        key={w}
                                        className={`py-4 ${idx === 0 ? "text-[#D67171]" : "text-black"}`}
                                    >
                                        {w}
                                    </div>
                                ))}
                            </div>

                            {/* 날짜 */}
                            <div className="grid grid-cols-7 gap-y-1.5 text-[11px] font-noto-sans-kr font-light">
                                {cells.map((d, i) => {
                                    const col = i % 7; // 0=Sun
                                    const isSunday = col === 0;
                                    const isHighlight = d === highlightDay;

                                    if (!d) return <div key={`e-${i}`} className="h-10"/>;

                                    return (
                                        <div key={`d-${i}`} className="flex justify-center">
                                            <div
                                                className={[
                                                    "h-7 w-7 flex items-center justify-center rounded-full",
                                                    isHighlight
                                                        ? "bg-[#A80000] text-white font-noto-sans-kr font-semibold"
                                                        : isSunday
                                                            ? "text-[#D67171]"
                                                            : "text-black",
                                                ].join(" ")}
                                            >
                                                {d}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </FadeInOnView>
                );
            })()}

            {/* 하단 구분선 */}
{/*            <FadeInOnView>
                <div className="mx-auto h-px w-full max-w-md bg-[#ADA9A9]/60"/>
            </FadeInOnView>*/}

            {/* D-day */}
            <FadeInOnView>
                <div className="mt-10 text-[14px] font-gowun-batang font-bold">
                    성택 · 현정 결혼식{" "} <span className="text-[#A80000]">D-</span>
                    <CountUpNumber
                        to={diffDays ?? 0}
                        from={0}
                        durationMs={3000}
                        padStart={2}
                        startOnView
                        threshold={0.3}
                        once
                        className="text-[#A80000] font-black"
                    />
                </div>
            </FadeInOnView>
        </section>
    );
}