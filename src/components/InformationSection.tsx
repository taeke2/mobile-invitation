"use client";

import { useRef, useState } from "react";

export default function InformationSection() {
    const [infoPage, setInfoPage] = useState(0); // 0 or 1
    const INFO_TOTAL = 2;

    // 스와이프 추가
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const goPrevInfo = () => setInfoPage((p) => Math.max(0, p - 1));
    const goNextInfo = () => setInfoPage((p) => Math.min(INFO_TOTAL - 1, p + 1));

    // 터치 스와이프 추가
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.changedTouches[0].clientX;

        if (touchStartX.current == null || touchEndX.current == null) return;

        const diff = touchStartX.current - touchEndX.current;
        const threshold = 40; // 너무 민감하지 않게

        if (diff > threshold) {
            goNextInfo(); // 왼쪽으로 밀면 다음 페이지
        } else if (diff < -threshold) {
            goPrevInfo(); // 오른쪽으로 밀면 이전 페이지
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <section className="px-6 py-20 text-center text-black bg-[#EDEDED]">
            {/* 타이틀 SVG */}
            <div className="mx-auto w-40 max-w-[70vw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/svgs/information.svg" alt="Information" className="w-full h-auto" />
            </div>

            {/* 서브 타이틀 (페이지별) */}
            <div className="mt-7 font-noto-sans-kr text-[13px] font-semibold">
                안내 사항
            </div>

            {/* 카드 + 슬라이드 */}
            <div className="mt-7">
                <div
                    className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_10px_28px_rgba(0,0,0,0.10)] touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative">
                        <div className="overflow-hidden">
                            <div
                                className="flex w-[200%] transition-transform duration-300 ease-out"
                                style={{ transform: `translateX(-${infoPage * 50}%)` }}
                            >
                                {/* page 1 */}
                                <div className="w-1/2 shrink-0 px-6 pt-7 h-[330px] flex flex-col">
                                    <p className="font-noto-sans-kr text-[13px] font-semibold text-black">
                                        [ 단독 건물 좌석 안내 ]
                                    </p>

                                    <div className="h-[80px] flex items-center justify-center">
                                        <p className="font-gowun-batang text-[11.5px] font-bold text-center">
                                            1부 예식 후 식사는 1층,
                                            <br />
                                            예식과 동시에 식사는 2층
                                            <span className="font-normal">에 착석해주시기 바랍니다.</span>
                                        </p>
                                    </div>

                                    <div className="mx-auto w-full border-t border-dashed border-[#AC5344]" />

                                    <div className="flex-1 flex items-center justify-center">
                                        <p className="font-gowun-batang text-[11px] text-black text-center">
                                            저희 결혼식은 단독 건물에서
                                            <br />
                                            1부와 2부로 나뉘어 진행됩니다.
                                            <br />
                                            <br />
                                            1층은 1부 예식 종료 후
                                            <br />
                                            2부 시작과 함께 식사가 가능하며,
                                            <br />
                                            2층은 1부 예식 중에도 식사 이용이 가능합니다.
                                            <br />
                                            <br />
                                            층별 안내에 따라 편하게 이용해주시기 바라며,
                                            <br />
                                            즐거운 시간 보내실 수 있도록 준비하겠습니다.
                                        </p>
                                    </div>
                                </div>

                                {/* page 2 */}
                                <div className="w-1/2 shrink-0 px-6 pt-7 h-[330px] flex flex-col">
                                    <p className="font-noto-sans-kr text-[13px] font-semibold text-black">
                                        [ 2부 예식 안내 ]
                                    </p>

                                    <div className="h-[80px] flex items-center justify-center">
                                        <p className="font-gowun-batang text-[11.5px] font-bold text-center">
                                            1부 예식 후,<br />
                                            2부 예식이 이어집니다.
                                        </p>
                                    </div>

                                    <div className="mx-auto w-full border-t border-dashed border-[#AC5344]" />

                                    <div className="flex-1 flex items-center justify-center">
                                        <div className="font-gowun-batang text-[11px] text-black text-center">
                                            2부에는 작은 이벤트가 준비되어 있으니
                                            <br />
                                            늦은 시간이지만
                                            <br />
                                            끝까지 함께해주시면 감사하겠습니다.
                                            <br />
                                            <br />
                                            2부 예식이 마무리된 후에는
                                            <br />
                                            감사의 마음을 담아 예식에 사용된
                                            <br />
                                            꽃을 나누어 드릴 예정입니다.
                                            <br />
                                            <br />
                                            함께한 순간을 오래도록 기억해주시길 바랍니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 하단 네비게이션 */}
                    <div className="flex items-center justify-center gap-4 pb-4">
                        <button
                            type="button"
                            onClick={goPrevInfo}
                            disabled={infoPage === 0}
                            className={[
                                "px-2 py-1 text-[10px] text-[#6B6B6B] active:scale-[0.96]",
                                infoPage === 0 ? "cursor-not-allowed opacity-30" : "opacity-100",
                            ].join(" ")}
                            aria-label="이전 안내"
                        >
                            {"<"}
                        </button>

                        <div className="font-noto-sans-kr text-[10px] text-[#6B6B6B]">
                            {infoPage + 1}/{INFO_TOTAL}
                        </div>

                        <button
                            type="button"
                            onClick={goNextInfo}
                            disabled={infoPage === INFO_TOTAL - 1}
                            className={[
                                "px-2 py-1 text-[10px] text-[#6B6B6B] active:scale-[0.96]",
                                infoPage === INFO_TOTAL - 1 ? "cursor-not-allowed opacity-30" : "opacity-100",
                            ].join(" ")}
                            aria-label="다음 안내"
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}