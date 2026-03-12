"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type Props = {
    showToast: (msg: string) => void;
};

type GuestSide = "GROOM" | "BRIDE" | null;
type Attend = "YES" | "NO" | null;
type Meal = "YES" | "NO" | "UNKNOWN";

const Modal = ({
                   open,
                   onClose,
                   children,
               }: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
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
        <div className="fixed inset-0 z-9998 pointer-events-auto" role="dialog" aria-modal="true">
            <div
                className="absolute inset-0 bg-black/45"
                onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onTouchMove={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />

            <div
                className="absolute inset-0 flex items-center justify-center p-5"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                <div
                    className="w-[100%] max-w-[390px]
                        max-h-[calc(100dvh-80px)]
                        rounded-2xl
                        shadow-[0_18px_40px_rgba(0,0,0,0.18)]
                        bg-[url('/images/paper_bg.jpg')] bg-cover bg-center
                        flex flex-col overflow-hidden"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const SelectButton = ({
                          active,
                          onClick,
                          children,
                      }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "h-12 rounded-[10px] font-gowun-batang text-[16px] font-bold",
                "bg-[#EDEDED]/30 shadow-[2px_2px_2px_rgba(0,0,0,0.09)]",
                "active:scale-[0.99] transition-colors",
                active ? "bg-white text-black" : "text-[#6B6B6B]",
            ].join(" ")}
        >
            {children}
        </button>
    );
};

export default function RsvpSection({ showToast }: Props) {
    const [open, setOpen] = useState(false);

    const [side, setSide] = useState<GuestSide>(null);
    const [attend, setAttend] = useState<Attend>(null);
    const [meal, setMeal] = useState<Meal>("UNKNOWN");

    const [name, setName] = useState("");
    const [companionName, setCompanionName] = useState("");
    const [note, setNote] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const reset = () => {
        setSide(null);
        setAttend(null);
        setMeal("UNKNOWN");
        setName("");
        setCompanionName("");
        setNote("");
    };

    const submit = async () => {
        const trimmedName = name.trim();
        const trimmedCompanion = companionName.trim();
        const trimmedNote = note.trim();

        if (!side) return showToast("어느 측 하객이신지 선택해 주세요");
        if (!attend) return showToast("참석 여부를 선택해 주세요");
        if (!trimmedName) return showToast("성함을 입력해 주세요");

        setSubmitting(true);
        try {
            const payload = {
                side: side, // 'groom' | 'bride'
                attendance: attend, // 'attend' | 'absent'
                meal: meal ?? "unknown", // 'yes' | 'no' | 'unknown'
                name: trimmedName,
                companions: trimmedCompanion || null,
                note: trimmedNote || null,
            };

            const { data, error } = await supabase.from("rsvps").insert(payload);

            if (error) {
                console.error("[RSVP insert error]", {
                    message: error.message,
                    details: (error as any).details,
                    hint: (error as any).hint,
                    code: (error as any).code,
                    payload,
                });
                throw error;
            }

            console.log("[RSVP insert ok]", data);
            showToast("전달되었습니다");
            setOpen(false);
            reset();
        } catch (e: any) {
            console.error("[RSVP submit catch]", e);
            showToast(`전달 실패: ${e?.message ?? "unknown"}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="px-6 py-20 text-center text-black bg-white">
            {/* 타이틀 SVG */}
            <div className="mx-auto w-40 max-w-[70vw]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/svgs/rsvp.svg" alt="RSVP" className="w-full h-auto" />
            </div>

            <div className="mt-7 font-noto-sans-kr text-[13px] font-semibold">참석 의사</div>

            <div className="mt-5 font-gowun-batang text-[10px] text-[#ADA9A9] font-bold">
                모든 분들을 소중히 모실 수 있도록<br />
                참석여부를 전해주세요
            </div>

            {/* 메인 카드 */}
            <div className="mt-5">
                <div className="mx-auto w-full max-w-md rounded-2xl bg-[#AC5344] text-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] overflow-hidden">
                    <div className="px-6 pt-10 pb-8">
                        {/* 신랑/신부 + 하트 */}
                        <div className="flex items-center justify-center gap-4 font-gowun-batang text-[11px]">
                            <p><span className="font-bold">신랑</span> 허성택</p>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/svgs/heart.svg" alt="heart" className="h-3 w-3" />
                            <p><span className="font-bold">신부</span> 이현정</p>
                        </div>

                        <div className="mt-7 font-gowun-batang text-[11px] font-bold">
                            <div>2026년 5월 9일</div>
                            <div>토요일 오후6시30분</div>
                        </div>

                        <div className="mt-3 font-gowun-batang text-[11px] font-bold">빌라드지디 논현</div>

                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="mt-7 w-full h-10 rounded-md bg-white text-black font-gowun-batang font-bold text-[12px]
                         shadow-[0_10px_24px_rgba(0,0,0,0.18)] active:scale-[0.99]"
                        >
                            참석 의사 체크하기
                        </button>
                    </div>
                </div>
            </div>

            {/* 하단 문구 */}
            <div className="mt-10 font-gowun-batang text-[10px] leading-relaxed text-black font-bold">
                흐뭇하실 수 있도록 잘 살겠습니다.<br />
                꼭 오셔서 축복해 주세요.<br /><br />
                신랑 허성택 · 신부 이현정 드림
            </div>

            {/* RSVP 모달 */}
            <Modal open={open} onClose={() => setOpen(false)}>
                {/* 헤더 (고정) */}
                <div className="relative px-5 pt-8 pb-6 shrink-0">
                    <div className="text-center font-gowun-batang font-bold text-[18px] text-black">
                        참석 여부 전달
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="absolute right-5 top-5 text-[#8B2E2E] text-[26px] leading-none active:scale-[0.95]"
                        aria-label="close"
                    >
                        ×
                    </button>
                </div>

                <div className="px-5 pb-6 overflow-y-auto">
                    {/* 질문 */}
                    <div className="mt-2 text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                        어느 측 하객이신가요?
                    </div>

                    {/* 신랑/신부 */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <SelectButton active={side === "GROOM"} onClick={() => setSide("GROOM")}>
                            신랑
                        </SelectButton>
                        <SelectButton active={side === "BRIDE"} onClick={() => setSide("BRIDE")}>
                            신부
                        </SelectButton>
                    </div>

                    {/* 참석 여부 */}
                    <div className="mt-8 text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                        참석 여부
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <SelectButton active={attend === "YES"} onClick={() => setAttend("YES")}>
                            참석
                        </SelectButton>
                        <SelectButton active={attend === "NO"} onClick={() => setAttend("NO")}>
                            불참석
                        </SelectButton>
                    </div>

                    {/* 식사 여부 */}
                    <div className="mt-8 text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                        식사 여부
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <SelectButton active={meal === "YES"} onClick={() => setMeal("YES")}>
                            O
                        </SelectButton>
                        <SelectButton active={meal === "NO"} onClick={() => setMeal("NO")}>
                            X
                        </SelectButton>
                        <SelectButton active={meal === "UNKNOWN"} onClick={() => setMeal("UNKNOWN")}>
                            미정
                        </SelectButton>
                    </div>

                    {/* 입력 */}
                    <div className="mt-8 space-y-3">
                        <div className="text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                            성함
                        </div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="성함을 작성해주세요"
                            className="w-full h-12 rounded-[10px] bg-[#EDEDED]/30 px-4 font-gowun-batang text-[16px] outline-none
                         shadow-[2px_2px_2px_rgba(0,0,0,0.09)]"
                            maxLength={50}
                        />

                        <div className="mt-4 text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                            동행인 성함
                        </div>
                        <input
                            value={companionName}
                            onChange={(e) => setCompanionName(e.target.value)}
                            placeholder="동행인 성함을 작성해주세요"
                            className="w-full h-12 rounded-[10px] bg-[#EDEDED]/30 px-4 font-gowun-batang text-[16px] outline-none
                         shadow-[2px_2px_2px_rgba(0,0,0,0.09)]"
                            maxLength={80}
                        />

                        <div className="mt-4 text-center font-gowun-batang text-[16px] font-bold text-[#6B6B6B]">
                            전달사항
                        </div>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="전달하실 말씀을 작성해주세요"
                            className="w-full min-h-24 rounded-[10px] bg-[#EDEDED]/30 px-4 py-3 font-gowun-batang text-[16px]
                         outline-none shadow-[2px_2px_2px_rgba(0,0,0,0.09)]"
                            maxLength={300}
                        />
                    </div>

                    {/* 제출 */}
                    <button
                        type="button"
                        onClick={submit}
                        disabled={submitting}
                        className={[
                            "mt-6 w-full h-14 rounded-[10px] font-gowun-batang font-bold text-[16px]",
                            "shadow-[0_10px_24px_rgba(0,0,0,0.18)] active:scale-[0.99]",
                            submitting ? "bg-black/20 text-white cursor-not-allowed" : "bg-[#AC5344] text-white",
                        ].join(" ")}
                    >
                        {submitting ? "전달 중..." : "전달"}
                    </button>
                </div>
            </Modal>
        </section>
    );
}