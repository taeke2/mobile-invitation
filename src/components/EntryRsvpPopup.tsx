"use client";

import { useEffect } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onHideToday: () => void;
    onOpenRsvp: () => void;
};

export default function EntryRsvpPopup({
                                           open,
                                           onClose,
                                           onHideToday,
                                           onOpenRsvp,
                                       }: Props) {
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/35 px-5">
            <div className="relative w-full max-w-[300px] rounded-[26px] bg-[#B45D4B] px-6 pt-8 pb-8 text-white">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center"
                    aria-label="팝업 닫기"
                >
                    <span className="relative block h-3 w-3">
                        <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded bg-white" />
                        <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded bg-white" />
                    </span>
                </button>

                <div className="text-center">
                    <div className="font-gowun-batang text-[14px] font-bold">참석 여부 전달</div>

                    <div className="mt-5 font-gowun-batang text-[10px] leading-[1.9] text-white">
                        <p>
                            소중한 시간을 내어 결혼식에
                            <br />
                            참석해주시는 모든 분들께 감사드립니다.
                        </p>

                        <p className="mt-3">
                            참석 여부를 회신해 주시면
                            <br />
                            더욱 감사하겠습니다.
                        </p>
                    </div>

                    <div className="mt-5 font-gowun-batang text-[10.5px] font-bold leading-relaxed">
                        <p>신랑 허성택 · 신부 이현정</p>
                        <p>2026년 5월 9일 토요일 오후6시30분</p>
                        <p>빌라드지디 논현</p>
                    </div>

                    <div className="mt-7 space-y-4">
                        <button
                            type="button"
                            onClick={onOpenRsvp}
                            className="w-full h-10 rounded-md bg-white/8 backdrop-blur-lg border border-white/40 text-white font-gowun-batang
                                text-[11px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                                hover:bg-white/15 active:bg-white/20 active:scale-[0.98] transition"
                        >
                            참석 여부 전달
                        </button>

                        <button
                            type="button"
                            onClick={onHideToday}
                            className="w-full h-10 rounded-md bg-black/8 backdrop-blur-lg border border-white/40 text-white font-gowun-batang
                                text-[11px] font-bold shadow-[0_8px_24px_rgba(0,0,0,0.18)]
                                hover:bg-white/15 active:bg-white/20 active:scale-[0.98] transition"
                        >
                            오늘 하루 보지 않기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}