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

// ✅ 공통 이벤트 막기
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
            {/* 타이틀 */}
            <FadeInOnView>
                <div className="mx-auto w-40 max-w-[70vw]">
                    <img src="/svgs/gallery.svg" alt="Gallery" className="w-full h-auto" />
                </div>
            </FadeInOnView>

            {/* 안내 */}
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

            {/* 썸네일 */}
            <div className="mt-10 space-y-2">
                {[0, 1, 2].map((row) => {
                    const layouts = [
                        [0, 1],
                        [2, 3],
                        [4, 5],
                    ];

                    const gridCols = [
                        "grid-cols-[2fr_1fr]",
                        "grid-cols-[2fr_1fr]",
                        "grid-cols-[1fr_2fr]",
                    ];

                    return (
                        <FadeInOnView key={row}>
                            <div className={`grid ${gridCols[row]} gap-2`}>
                                {layouts[row].map((i) => (
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

                                        {/* 🔥 저장 방지 오버레이 */}
                                        <div
                                            className="absolute inset-0 z-10"
                                            onContextMenu={preventDefault}
                                            onDragStart={preventDefault}
                                            style={{ WebkitTouchCallout: "none" }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </FadeInOnView>
                    );
                })}
            </div>

            {/* 모달 */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-white/80"
                    role="dialog"
                    aria-modal="true"
                    onContextMenu={preventDefault}
                >
                    <button className="absolute inset-0" onClick={close} />

                    <div
                        ref={scrollerRef}
                        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory touch-pan-x"
                    >
                        {finalImages.map((src, idx) => (
                            <div key={src} className="relative w-full flex-none snap-center">
                                <div className="absolute inset-0 flex items-center justify-center px-4">
                                    <div className="relative w-full max-w-[520px] h-[78vh]">
                                        <Image
                                            src={src}
                                            alt={`gallery image ${idx + 1}`}
                                            fill
                                            draggable={false}
                                            onContextMenu={preventDefault}
                                            onDragStart={preventDefault}
                                            className="object-contain select-none"
                                            sizes="100vw"
                                            placeholder="blur"
                                            blurDataURL={BLUR_1x1}
                                        />

                                        {/* 🔥 모달 이미지 보호 */}
                                        <div
                                            className="absolute inset-0 z-10"
                                            onContextMenu={preventDefault}
                                            onDragStart={preventDefault}
                                            style={{ WebkitTouchCallout: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}