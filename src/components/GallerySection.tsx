"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FadeInOnView from "@/src/components/FadeInOnView";

type Props = {
    /** 기본 30장: /images/gallery/gallery1.jpg ~ gallery30.jpg */
    images?: string[];
    className?: string;
};

const BLUR_1x1 =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export default function GallerySection({ images, className }: Props) {
    // ✅ section4에서 쓰던 이미지 배열 생성까지 여기로 이동
    const defaultImages = useMemo(
        () => Array.from({ length: 40 }, (_, i) => `/images/gallery/gallery_${i + 1}.jpg`),
        []
    );

    const finalImages = images?.length ? images : defaultImages;

    const thumbs = useMemo(() => {
        const selectedIndexes = [1, 5, 17, 14, 35, 32];  //0-based index
        return selectedIndexes.map((i) => finalImages[i]);
    }, [finalImages]);

    // 썸네일(0~5) 개별 조정용 설정
    const thumbStyle = [
        // object-[x축_y축] ex)
        /*
        * object-[50%_50%]	정중앙
        * object-[50%_0%]	위쪽 중심
        * object-[50%_100%]	아래쪽 중심
        * object-[0%_50%]	왼쪽 중앙
        * object-[100%_50%]	오른쪽 중앙
        * */
        { pos: "object-[50%_25%]", scale: "scale-100" }, // 0번 (1행 1열)
        { pos: "object-[50%_5%]", scale: "scale-100" }, // 1번 (1행 2열)
        { pos: "object-[50%_40%]", scale: "scale-100" }, // 2번 (2행 1열)
        { pos: "object-[50%_70%]", scale: "scale-100" }, // 3번 (2행 2열)
        { pos: "object-[50%_60%]", scale: "scale-100" }, // 4번 (3행 1열)
        { pos: "object-[50%_50%]", scale: "scale-100" }, // 5번 (3행 2열)
    ] as const;

    const [open, setOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const close = () => setOpen(false);

    const openFirst = (idx: number) => {
        setStartIndex(0);
        setActiveIndex(0);
        setOpen(true);
    };

    // 모달 열릴 때 해당 인덱스로 스크롤 이동
    useEffect(() => {
        if (!open) return;
        const el = scrollerRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            const w = el.clientWidth;
            el.scrollTo({ left: w * startIndex, behavior: "instant" as ScrollBehavior });
        });
    }, [open, startIndex]);

    // ESC로 닫기, 방향키로 이동
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, activeIndex]);

    // 스크롤로 activeIndex 추적 (스크롤 스냅 기반)
    useEffect(() => {
        if (!open) return;
        const el = scrollerRef.current;
        if (!el) return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const w = el.clientWidth || 1;
                const idx = Math.round(el.scrollLeft / w);
                if (idx !== activeIndex) setActiveIndex(idx);
            });
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener("scroll", onScroll);
        };
    }, [open, activeIndex]);

    const scrollToIndex = (idx: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        const w = el.clientWidth;
        el.scrollTo({ left: w * idx, behavior: "smooth" });
    };

    const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1));
    const goNext = () => scrollToIndex(Math.min(finalImages.length - 1, activeIndex + 1));

    return (
        <section className={["px-6 py-20 text-center text-black bg-white", className].join(" ")}>
            {/* 타이틀 SVG */}
            <FadeInOnView>
                <div className="mx-auto w-40 max-w-[70vw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/gallery.svg" alt="Gallery" className="w-full h-auto" />
                </div>
            </FadeInOnView>

            {/* 안내 문구 */}
            <FadeInOnView>
                <div className="mt-7">
                    <p className="text-[13px] font-noto-sans-kr font-semibold">
                        사진을 클릭하시면 전체화면 보기가 가능합니다
                    </p>
                    <p className="mt-2 text-[11px] text-[#ADA9A9] font-gowun-batang font-bold">
                        Tap to view full screen
                    </p>
                </div>
            </FadeInOnView>

            {/* 썸네일 그리드 */}
            <div className="mt-10 space-y-2">
                {/* 1행 - 2:1 */}
                <FadeInOnView>
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                        {[0, 1].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative overflow-hidden bg-[#f3f3f3] h-20"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    className={[
                                        "object-cover transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>

                {/* 2행 - 2:1 */}
                <FadeInOnView>
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                        {[2, 3].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative overflow-hidden bg-[#f3f3f3] h-20"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    className={[
                                        "object-cover transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>

                {/* 3행 - 1:2 */}
                <FadeInOnView>
                    <div className="grid grid-cols-[1fr_2fr] gap-2">
                        {[4, 5].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative overflow-hidden bg-[#f3f3f3] h-20"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    className={[
                                        "object-cover transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>
            </div>

            <FadeInOnView>
                <p className="mt-10 font-gowun-batang text-[8px] text-[#6A6A6A] leading-3.5">
                    “ It was a million tiny little things that,<br />
                    when you added them all up,<br />
                    they meant we were supposed to be together. ”
                </p>
            </FadeInOnView>

            {/* 모달 */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-white/80"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gallery modal"
                >
                    {/* 바깥 클릭 닫기 */}
                    <button
                        type="button"
                        className="absolute inset-0 cursor-default"
                        onClick={close}
                        aria-label="Close modal background"
                    />

                    {/* 상단 컨트롤 */}
                    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 py-0.5">
                        <div className="text-black/80 text-[12px] font-noto-sans-kr">
                            {activeIndex + 1} / {finalImages.length}
                        </div>

                        <button
                            type="button"
                            onClick={close}
                            className="rounded-full bg-white/10 px-2 py-1 text-black text-[12px] hover:bg-black/20"
                            aria-label="Close modal"
                        >
                            X
                        </button>
                    </div>

                    {/* 하단 좌우 버튼 */}
                    <div className="absolute bottom-1 left-0 right-0 flex justify-between px-8 z-10">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={activeIndex === 0}
                            className="text-black text-2xl disabled:opacity-30"
                            aria-label="Previous image"
                        >
                            ‹
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            disabled={activeIndex === finalImages.length - 1}
                            className="text-black text-2xl disabled:opacity-30"
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </div>

                    {/* 이미지 스크롤러 */}
                    <div
                        ref={scrollerRef}
                        className={[
                            "absolute inset-0",
                            "overflow-x-auto overflow-y-hidden",
                            "snap-x snap-mandatory",
                            "flex",
                            "touch-pan-x",
                        ].join(" ")}
                    >
                        {finalImages.map((src, idx) => {
                            const near = Math.abs(idx - activeIndex) <= 1;

                            return (
                                <div key={src} className="relative h-full w-full flex-none snap-center">
                                    <div className="absolute inset-0 flex items-center justify-center px-4">
                                        <div className="relative w-full max-w-[520px] h-[78vh]">
                                            <Image
                                                src={src}
                                                alt={`gallery image ${idx + 1}`}
                                                fill
                                                className="object-contain"
                                                sizes="100vw"
                                                loading={near ? "eager" : "lazy"}
                                                priority={near}
                                                quality={75}
                                                placeholder="blur"
                                                blurDataURL={BLUR_1x1}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}