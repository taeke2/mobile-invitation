"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FadeInOnView from "@/src/components/FadeInOnView";

type Props = {
    images?: string[];
    className?: string;
};

const BLUR_1x1 =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const preventDefault = (e: React.SyntheticEvent) => {
    e.preventDefault();
};

export default function GallerySection({ images, className }: Props) {
    const defaultImages = useMemo(
        () => Array.from({ length: 40 }, (_, i) => `/images/gallery/gallery_${i + 1}.jpg`),
        []
    );

    const finalImages = images?.length ? images : defaultImages;

    const thumbs = useMemo(() => {
        const selectedIndexes = [1, 5, 17, 14, 35, 32];
        return selectedIndexes.map((i) => finalImages[i]);
    }, [finalImages]);

    const thumbStyle = [
        { pos: "object-[50%_25%]", scale: "scale-100" },
        { pos: "object-[50%_5%]", scale: "scale-100" },
        { pos: "object-[50%_40%]", scale: "scale-100" },
        { pos: "object-[50%_70%]", scale: "scale-100" },
        { pos: "object-[50%_60%]", scale: "scale-100" },
        { pos: "object-[50%_50%]", scale: "scale-100" },
    ] as const;

    const [open, setOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const close = () => setOpen(false);

    useEffect(() => {
        if (!open) return;

        const scrollY = window.scrollY;

        const prev = {
            overflow: document.body.style.overflow,
            position: document.body.style.position,
            top: document.body.style.top,
            width: document.body.style.width,
            touchAction: document.body.style.touchAction,
        };

        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.style.touchAction = "none";

        return () => {
            document.body.style.overflow = prev.overflow;
            document.body.style.position = prev.position;
            document.body.style.top = prev.top;
            document.body.style.width = prev.width;
            document.body.style.touchAction = prev.touchAction;
            window.scrollTo(0, scrollY);
        };
    }, [open]);

    const openFirst = (idx: number) => {
        setStartIndex(0);
        setActiveIndex(0);
        setOpen(true);
    };

    useEffect(() => {
        if (!open) return;
        const el = scrollerRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            const w = el.clientWidth;
            el.scrollTo({ left: w * startIndex, behavior: "instant" as ScrollBehavior });
        });
    }, [open, startIndex]);

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
        <section
            className={["px-6 py-20 text-center text-black bg-white", className].join(" ")}
            onContextMenu={preventDefault}
        >
            <FadeInOnView>
                <div className="mx-auto w-40 max-w-[70vw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/gallery.svg" alt="Gallery" className="h-auto w-full" />
                </div>
            </FadeInOnView>

            <FadeInOnView>
                <div className="mt-7">
                    <p className="font-noto-sans-kr text-[13px] font-semibold">
                        사진을 클릭하시면 전체화면 보기가 가능합니다
                    </p>
                    <p className="mt-2 font-gowun-batang text-[11px] font-bold text-[#ADA9A9]">
                        Tap to view full screen
                    </p>
                </div>
            </FadeInOnView>

            <div className="mt-10 space-y-2">
                <FadeInOnView>
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                        {[0, 1].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative h-20 overflow-hidden bg-[#f3f3f3]"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    draggable={false}
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    className={[
                                        "object-cover select-none transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />

                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    style={{
                                        WebkitTouchCallout: "none",
                                        WebkitUserSelect: "none",
                                        userSelect: "none",
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="grid grid-cols-[2fr_1fr] gap-2">
                        {[2, 3].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative h-20 overflow-hidden bg-[#f3f3f3]"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    draggable={false}
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    className={[
                                        "object-cover select-none transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />

                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    style={{
                                        WebkitTouchCallout: "none",
                                        WebkitUserSelect: "none",
                                        userSelect: "none",
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="grid grid-cols-[1fr_2fr] gap-2">
                        {[4, 5].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openFirst(i)}
                                className="relative h-20 overflow-hidden bg-[#f3f3f3]"
                            >
                                <Image
                                    src={thumbs[i]}
                                    alt={`gallery thumbnail ${i + 1}`}
                                    fill
                                    draggable={false}
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    className={[
                                        "object-cover select-none transition-transform duration-300 hover:scale-[1.02]",
                                        thumbStyle[i]?.pos ?? "object-center",
                                        thumbStyle[i]?.scale ?? "scale-100",
                                    ].join(" ")}
                                    sizes="(max-width:420px) 90vw, 420px"
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL={BLUR_1x1}
                                />

                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={preventDefault}
                                    onDragStart={preventDefault}
                                    style={{
                                        WebkitTouchCallout: "none",
                                        WebkitUserSelect: "none",
                                        userSelect: "none",
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </FadeInOnView>
            </div>

            <FadeInOnView>
                <p className="mt-10 font-gowun-batang text-[8px] leading-3.5 text-[#6A6A6A]">
                    “ It was a million tiny little things that,
                    <br />
                    when you added them all up,
                    <br />
                    they meant we were supposed to be together. ”
                </p>
            </FadeInOnView>

            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-[#efefee]"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gallery modal"
                    onContextMenu={preventDefault}
                    onTouchMove={(e) => e.preventDefault()}
                    onWheel={(e) => e.preventDefault()}
                >
                    {/* 바깥 클릭 닫기 */}
                    <button
                        type="button"
                        className="absolute inset-0 cursor-default"
                        onClick={close}
                        aria-label="Close modal background"
                    />

                    {/* 상단 로고 */}
                    <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
                        <img
                            src="/svgs/taek&jung.svg"
                            alt="Taek & Jung"
                            className="h-auto w-[100px] max-w-[45vw]"
                        />
                    </div>

                    {/* 닫기 버튼 */}
                    <button
                        type="button"
                        onClick={close}
                        className="absolute right-5 top-1 z-20 text-[30px] text-[#a9a7a4] font-thin active:scale-95"
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                    {/* 하단 장수 표시 */}
                    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
                        <div className="font-gowun-batang text-[12px] font-medium tracking-[0.02em] text-[#6b6966]">
                            &lt;&nbsp; {activeIndex + 1} / {finalImages.length} &nbsp;&gt;
                        </div>
                    </div>

                    {/* 좌우 버튼 */}
                    {/*<div className="pointer-events-none absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-6">*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        onClick={goPrev}*/}
                    {/*        disabled={activeIndex === 0}*/}
                    {/*        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[22px] text-[#5c5148] shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition active:scale-95 disabled:opacity-30"*/}
                    {/*        aria-label="Previous image"*/}
                    {/*    >*/}
                    {/*        ‹*/}
                    {/*    </button>*/}

                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        onClick={goNext}*/}
                    {/*        disabled={activeIndex === finalImages.length - 1}*/}
                    {/*        className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[22px] text-[#5c5148] shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition active:scale-95 disabled:opacity-30"*/}
                    {/*        aria-label="Next image"*/}
                    {/*    >*/}
                    {/*        ›*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                    {/* 이미지 스크롤러 */}
                    <div
                        ref={scrollerRef}
                        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden touch-pan-x"
                    >
                        {finalImages.map((src, idx) => {
                            const near = Math.abs(idx - activeIndex) <= 1;

                            return (
                                <div key={src} className="relative h-full w-full flex-none snap-center">
                                    <div className="absolute inset-0 flex items-center justify-center px-3 pt-5">
                                        <div className="relative h-full max-h-[80vh] w-full max-w-[670px] overflow-hidden">

                                            {/* 🔹 배경 (꽉 채움 + 블러) */}
                                            {/*<Image*/}
                                            {/*    src={src}*/}
                                            {/*    alt="bg"*/}
                                            {/*    fill*/}
                                            {/*    className="object-cover scale-110 blur-xl brightness-90"*/}
                                            {/*    sizes="100vw"*/}
                                            {/*/>*/}

                                            {/* 🔹 실제 이미지 (안 잘림) */}
                                            <Image
                                                src={src}
                                                alt={`gallery image ${idx + 1}`}
                                                fill
                                                draggable={false}
                                                onContextMenu={preventDefault}
                                                onDragStart={preventDefault}
                                                className="object-contain select-none"
                                                sizes="100vw"
                                                loading={near ? "eager" : "lazy"}
                                                priority={near}
                                                quality={75}
                                                placeholder="blur"
                                                blurDataURL={BLUR_1x1}
                                            />

                                            {/* 🔹 보호 레이어 */}
                                            <div
                                                className="absolute inset-0 z-10"
                                                onContextMenu={preventDefault}
                                                onDragStart={preventDefault}
                                                style={{
                                                    WebkitTouchCallout: "none",
                                                    WebkitUserSelect: "none",
                                                    userSelect: "none",
                                                }}
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