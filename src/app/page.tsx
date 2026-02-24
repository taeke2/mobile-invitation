"use client";

import {useMemo} from "react";
import Image from "next/image";
import WeAreGettingMarriedIntro from "@/src/components/WeAreGettingMarriedIntro";
import FadeInOnView from "@/src/components/FadeInOnView";
import CountUpNumber from "@/src/components/CountUpNumber";
import GallerySection from "@/src/components/GallerySection";

export default function Home() {
    // section3 캘린더 날짜 계산
    const diffDays = useMemo(() => {
        if (typeof window === "undefined") return 0;

        const wedding = new Date("2026-05-09T18:30:00+09:00");
        const now = new Date();

        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ).getTime();

        const target = new Date(
            wedding.getFullYear(),
            wedding.getMonth(),
            wedding.getDate()
        ).getTime();

        return Math.max(0, Math.ceil((target - start) / (1000 * 60 * 60 * 24)));
    }, []);

    // section4 갤러리 배열 관리
    const galleryImages = useMemo(
        () => Array.from({length: 30}, (_, i) => `/images/gallery/gallery${i + 1}.jpg`),
        []
    );

    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                {/* section01 */}
                <section className="relative min-h-screen overflow-hidden">
                    {/* 메인 이미지 */}
                    <Image
                        src="/images/main_image.jpg"
                        alt="main image"
                        fill
                        priority
                        className="object-cover scale-140 object-[35%_center]"
                    />
                    {/* 상단 오버레이(그 위에 글씨/로고) */}
                    <div className="relative pt-10 text-center z-10">
                        <WeAreGettingMarriedIntro/>
                    </div>
                    {/* 이름 */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center z-10">
                        <p className="font-bodoni-sc text-[12px] text-[#414141]">
                            TAEK<span className={"font-bodoni-sc text-[8px]"}> & </span>JUNG
                        </p>
                    </div>
                </section>

                {/* section2 */}
                <section className="px-6 py-24 text-center text-black">
                    <div className="mx-auto font-gowun-batang">
                        {/* 타이틀 */}
                        <FadeInOnView>
                            <h2 className="font-black text-[16px]">
                                저희 결혼합니다
                            </h2>
                        </FadeInOnView>

                        {/* 본문(시/문구) */}
                        <div className="mt-10 text-[12px]">
                            <FadeInOnView>
                                <p>
                                    사랑은 소유가 아니라<br/>
                                    동행임을 아는 두 사람은<br/><br/>

                                    잡은 손을 놓지 않되<br/>
                                    함부로 잡아끌지 않을 것이며<br/><br/>
                                </p>
                            </FadeInOnView>
                            <FadeInOnView>
                                <p>
                                    서로의 두 눈을 고요히 바라보아<br/>
                                    말하지 않아도 같은 쪽으로 걸어가리라<br/><br/>

                                    -박미라, ‘아름다운 날에 부치다’ 중에서<br/><br/>
                                </p>
                            </FadeInOnView>
                            <FadeInOnView>
                                <p>
                                    저희 두 사람 이제 믿음과 사랑으로<br/>
                                    한 길을 가려 합니다.<br/><br/>

                                    그 시작의 한 걸음, 함께 축복해 주시면 감사하겠습니다.
                                </p>
                            </FadeInOnView>
                        </div>


                        {/* 하단 이름 */}
                        <FadeInOnView>
                            <div className="font-black mt-10 text-[12px]">
                                신랑 허성택 · 신부 이현정
                            </div>
                        </FadeInOnView>
                    </div>
                </section>

                {/* section3 */}
                <section className="relative px-10 py-15 text-center text-black bg-[url('/images/paper_bg.jpg')] bg-cover bg-center">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-55 max-w-[70vw]">
                        {/* svg는 img로 쓰는게 가장 간단/안전 */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/weddingDay.svg" alt="Wedding day" className="w-full h-auto"/>
                    </div>

                    {/* 날짜 텍스트 */}
                    <div className="mt-7">
                        <div className="text-[15px] font-noto-sans-kr font-semibold">
                            2026년 5월 9일 토요일 | 오후 6시 30분
                        </div>
                        <div className="mt-2 text-[12px] text-[#ADA9A9] font-gowun-batang font-bold">
                            Saturday, May 9, 2026 | PM 6:30
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="mx-auto mt-7 h-px w-full max-w-md bg-[#ADA9A9]/60"/>

                    {/* 달력 */}
                    {(() => {
                        const year = 2026;
                        const monthIndex = 4; // 0-based: 4 = May
                        const highlightDay = 9;

                        const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun
                        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                        // 캘린더 셀(빈칸 포함) 만들기
                        const cells: Array<number | null> = [];
                        for (let i = 0; i < firstDay; i++) cells.push(null);
                        for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                        while (cells.length % 7 !== 0) cells.push(null);

                        const weekLabels = ["일", "월", "화", "수", "목", "금", "토"];

                        return (
                            <div className="my-4 mx-auto w-full max-w-md">
                                {/* 요일 */}
                                <div className="grid grid-cols-7 text-[13px] font-noto-sans-kr font-semibold">
                                    {weekLabels.map((w, idx) => (
                                        <div
                                            key={w}
                                            className={`py-4 ${idx === 0 ? "text-[#c44]" : "text-black"}`}
                                        >
                                            {w}
                                        </div>
                                    ))}
                                </div>

                                {/* 날짜 */}
                                <div className="grid grid-cols-7 gap-y-1 text-[13px] font-noto-sans-kr font-light">
                                    {cells.map((d, i) => {
                                        const col = i % 7; // 0=Sun
                                        const isSunday = col === 0;
                                        const isHighlight = d === highlightDay;

                                        if (!d) return <div key={`e-${i}`} className="h-10"/>;

                                        return (
                                            <div key={`d-${i}`} className="flex justify-center">
                                                <div
                                                    className={[
                                                        "h-8 w-8 flex items-center justify-center rounded-full",
                                                        isHighlight
                                                            ? "bg-[#A80000] text-white font-noto-sans-kr font-bold"
                                                            : isSunday ? "text-[#D67171]" : "text-black",
                                                    ].join(" ")}
                                                >
                                                    {d}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })()}

                    {/* 하단 구분선 */}
                    <div className="mx-auto h-px w-full max-w-md bg-[#ADA9A9]/60"/>

                    {/* D-day */}
                    <div className="mt-10 text-[16px] font-gowun-batang font-bold">
                        성택 · 현정 결혼식이{" "}
                        <CountUpNumber
                            to={diffDays ?? 0}      // 처음엔 0, 마운트 후 실제 값
                            from={0}
                            durationMs={1200}
                            padStart={2}
                            startOnView
                            threshold={0.3}
                            once
                            className="text-[#A80000] font-black"
                        />
                        일 남았습니다
                    </div>
                </section>

                {/* section4 */}
                <section className="px-6 py-24 text-center text-black bg-white">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/gallery.svg" alt="Gallery" className="w-full h-auto" />
                    </div>

                    {/* 안내 문구 */}
                    <div className="mt-6">
                        <p className="text-[15px] font-noto-sans-kr font-semibold">
                            사진을 클릭하시면 전체화면 보기가 가능합니다
                        </p>
                        <p className="mt-2 text-[12px] text-[#ADA9A9] font-gowun-batang font-bold">
                            Tap to view full screen
                        </p>
                    </div>

                    <GallerySection images={galleryImages} />
                </section>

            </div>
        </main>
    );
}