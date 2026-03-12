"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FadeInOnView from "@/src/components/FadeInOnView";

type Props = {
    copyText: (text: string) => void | Promise<void>;
};

const MapModal = ({
                      open,
                      onClose,
                  }: {
    open: boolean;
    onClose: () => void;
}) => {
    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;

        const prev = {
            overflow: document.body.style.overflow,
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
        };

        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            document.body.style.overflow = prev.overflow;
            document.body.style.position = prev.position;
            document.body.style.top = prev.top;
            document.body.style.width = prev.width;
            window.scrollTo(0, scrollY);
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-9998" role="dialog" aria-modal="true">
            <button
                type="button"
                onClick={onClose}
                className="absolute inset-0 bg-black/55"
                aria-label="지도 확대 닫기"
            />

            <div className="absolute left-1/2 top-1/2 w-[90%] max-w-[390px] -translate-x-1/2 -translate-y-1/2">
                <div
                    className="overflow-hidden rounded-[10px] bg-[url('/images/paper_bg.jpg')] bg-cover bg-center shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-end px-3 pt-3">
                        <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center text-[#AC5344] text-[30px] active:scale-[0.95]"
                            onClick={onClose}
                            aria-label="닫기"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="px-4 pb-6 pt-2">
                        <div className="mx-auto w-40 max-w-[70vw]">
                            <img src="/svgs/location.svg" alt="Location" className="w-full h-auto" />
                        </div>

                        <div className="mt-4 overflow-hidden border border-[#EFEFEF] bg-white">
                            <div className="overflow-x-scroll overflow-y-hidden map-scroll">
                                <Image
                                    src="/images/location.jpg"
                                    alt="확대된 지도"
                                    width={1400}
                                    height={260}
                                    className="block h-[260px] w-auto max-w-none"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="mt-7 text-center font-noto-sans-kr text-[15px] font-semibold text-black">
                            빌라드지디 논현
                        </div>

                        <div className="mt-3 text-center font-noto-sans-kr text-[15px] font-semibold text-black">
                            문의 02.547.3381
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function LocationSection({ copyText }: Props) {
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <>
            <section className="py-20 text-center text-black bg-white">
                <FadeInOnView>
                    <div className="mx-auto w-40 max-w-[70vw]">
                        <img src="/svgs/location.svg" alt="Location" className="w-full h-auto" />
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="mt-7">
                        <div className="text-[13px] font-noto-sans-kr font-semibold">빌라드지디 논현</div>

                        <div className="mt-7 flex items-center justify-center text-[11px] text-black font-gowun-batang font-normal">
                            <p>
                                하우스웨딩으로 진행되어 주차가 어려운 점 양해 부탁드립니다.
                                <br />
                                셔틀버스를 준비하였으니 대중교통 이용해주시면 감사하겠습니다.
                            </p>
                        </div>
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <button
                        type="button"
                        onClick={() => setMapOpen(true)}
                        className="mt-6 block w-full px-3 active:scale-[0.995]"
                        aria-label="지도 확대 보기"
                    >
                        <div className="overflow-hidden border border-[#EFEFEF]">
                            <Image
                                src="/images/location.jpg"
                                alt="map"
                                width={900}
                                height={560}
                                className="h-auto w-full"
                            />
                        </div>
                    </button>
                </FadeInOnView>

                <div className="px-6 mt-8 text-left">
                    {/* S - 지하철 */}
                    <FadeInOnView>
                        <div className="flex gap-2">
                            <div className="h-4 w-4 shrink-0 flex mt-0.5 items-center justify-center">
                                <img
                                    src="/svgs/bus.svg"
                                    alt="subway"
                                    className="h-[16px] w-[16px]"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">지하철 이용 시</div>
                                <div className="mt-3 space-y-2 text-[12px] font-noto-sans-kr">
                                    <p className="font-semibold">7호선, 분당선 강남구청역 2번출구</p>
                                </div>
                                <div className="mt-1 space-y-1 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*2번 출구 20m 직진, 버스승강장 옆 셔틀버스 이용</p>
                                </div>
                            </div>
                        </div>
                    </FadeInOnView>

                    {/* B - 버스 */}
                    <FadeInOnView>
                        <div className="mt-6 flex gap-2">
                            <div className="h-4 w-4 shrink-0 flex mt-0.5 items-center justify-center">
                                <img
                                    src="/svgs/subway.svg"
                                    alt="bus"
                                    className="h-[16px] w-[16px]"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">버스 이용 시</div>
                                <div className="mt-3 space-y-0.5 text-[12px] font-noto-sans-kr">
                                    <p className="font-semibold">242, 401, 3414, 301번 강남구청역 하차</p>
                                    <p className="font-semibold">342, 472, 3426, 4312번 강남보건소 하차</p>
                                </div>
                                <div className="mt-1 space-y-1 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*7호선, 분당선 강남구청역 2번출구에서 셔틀버스 이용</p>
                                </div>
                            </div>
                        </div>
                    </FadeInOnView>

                    {/* P - 자가용 */}
                    <FadeInOnView>
                        <div className="mt-6 flex gap-2">
                            <div className="h-4 w-4 shrink-0 flex mt-0.5 items-center justify-center">
                                <img
                                    src="/svgs/car.svg"
                                    alt="car"
                                    className="h-[16px] w-[16px]"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">자가용 이용 시</div>

                                <div className="mt-3 space-y-0.5 text-[12px] font-noto-sans-kr">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">
                                            제1주차장 :
                                            <span className="font-normal text-[12px]"> 서울 강남구 언주로126길 23 (논현동)</span>
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => copyText("서울 강남구 언주로126길 23 (논현동)")}
                                            className="shrink-0 active:scale-[0.9]"
                                            aria-label="제1주차장 주소 복사"
                                        >
                                            <img src="/svgs/copy.svg" alt="copy" className="h-3 w-3" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">
                                            제2주차장 :
                                            <span className="font-normal text-[12px]"> 서울 강남구 학동로 342 에스케이 허브블루</span>
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => copyText("서울 강남구 학동로 342 에스케이 허브블루")}
                                            className="shrink-0 active:scale-[0.9]"
                                            aria-label="제2주차장 주소 복사"
                                        >
                                            <img src="/svgs/copy.svg" alt="copy" className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-1 space-y-0.5 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*제1주차장은 발렛주차로 만차시 제2주차장으로 안내해드립니다.</p>
                                    <p>*제2주차장은 도보 10분 / 셔틀이용 가능합니다.</p>
                                </div>
                            </div>
                        </div>
                    </FadeInOnView>

                    {/* 셔틀버스 */}
                    <FadeInOnView>
                        <div className="mt-6 flex gap-2">
                            <div className="h-4 w-4 shrink-0 flex mt-0.5 items-center justify-center">
                                <img
                                    src="/svgs/shuttle.svg"
                                    alt="shuttle"
                                    className="h-[16px] w-[16px]"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">셔틀버스 운행 시간</div>
                                <div className="mt-3 space-y-0.5 text-[12px] font-noto-sans-kr">
                                    <p className="font-semibold">17:30 - 19:00 (90분간)</p>
                                    <p className="font-semibold">19:30 - 20:30 (60분간)</p>
                                </div>
                                <div className="mt-1 space-y-1 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*10분 간격으로 운행</p>
                                </div>
                            </div>
                        </div>
                    </FadeInOnView>
                </div>

                <FadeInOnView>
                    <div className="px-6 mt-6">
                        <a
                            href="https://www.naver.com"
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-10 w-full items-center justify-center rounded-md
                        bg-[#AC5344] text-white font-gowun-batang text-[13px] font-bold
                        shadow-[0_8px_18px_rgba(0,0,0,0.14)] active:scale-[0.99]"
                        >
                            주차 안내
                        </a>
                    </div>
                </FadeInOnView>
            </section>

            <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
        </>
    );
}