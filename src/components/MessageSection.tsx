"use client";

import {useEffect, useState} from "react";
import {supabase} from "@/src/lib/supabaseClient";
import FadeInOnView from "@/src/components/FadeInOnView";

type GuestbookMessage = {
    id: number;
    name: string;
    message: string;
    is_public: boolean;
    is_deleted: boolean;
    created_at: string;
};

type Props = {
    showToast: (msg: string) => void;
};

const MessageCard = ({item}: { item: GuestbookMessage }) => {
    return (
        <div
            className="rounded-md px-6 py-3 text-left shadow-[2px_2px_2px_rgba(0,0,0,0.09)]"
            style={{
                backgroundImage: "url('/images/paper2_bg.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "250%",
                backgroundPosition: "center",
            }}
        >
            <div className="font-gowun-batang text-[11px] leading-relaxed whitespace-pre-wrap">{item.message}</div>
            <div className="mt-2 font-gowun-batang text-[11px] text-[#AC5344]">From. {item.name}</div>
        </div>
    );
};

const Modal = ({
                   open,
                   children,
               }: {
    open: boolean;
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
        <div
            className="fixed inset-0 z-9998 pointer-events-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* backdrop: 터치/스크롤 차단만 하고 닫히지는 않음 */}
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
                className="absolute left-1/2 top-1/2 w-[92%] max-w-[380px] -translate-x-1/2 -translate-y-1/2"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function MessageSection({showToast}: Props) {
    const [gbLoading, setGbLoading] = useState(false);
    const [gbList, setGbList] = useState<GuestbookMessage[]>([]);
    const [gbOpenAll, setGbOpenAll] = useState(false);
    const [gbOpenWrite, setGbOpenWrite] = useState(false);

    const [gbName, setGbName] = useState("");
    const [gbMessage, setGbMessage] = useState("");
    const [gbSubmitting, setGbSubmitting] = useState(false);

    const MAX_MSG_LEN = 300;

    const fetchGuestbook = async () => {
        setGbLoading(true);

        try {
            const {data, error} = await supabase
                .from("guestbook_messages")
                .select("id,name,message,is_public,is_deleted,created_at")
                .eq("is_deleted", false)
                .eq("is_public", true)
                .order("created_at", {ascending: false});

            if (error) throw error;

            setGbList((data ?? []) as GuestbookMessage[]);
        } catch {
            showToast("메시지를 불러오지 못했습니다");
        } finally {
            setGbLoading(false);
        }
    };

    useEffect(() => {
        fetchGuestbook();
    }, []);

    const submitGuestbook = async () => {
        const name = gbName.trim();
        const message = gbMessage.trim();

        if (!name) {
            showToast("이름을 입력해 주세요");
            return;
        }

        if (!message) {
            showToast("메시지를 입력해 주세요");
            return;
        }

        if (message.length > MAX_MSG_LEN) {
            showToast("메시지는 300자 이내로 작성해 주세요");
            return;
        }

        setGbSubmitting(true);

        try {
            const {error} = await supabase.from("guestbook_messages").insert({
                name,
                message,
                is_public: true,
                is_deleted: false,
            });

            if (error) throw error;

            showToast("메시지가 등록되었습니다");
            setGbOpenWrite(false);
            setGbName("");
            setGbMessage("");
            await fetchGuestbook();
        } catch {
            showToast("등록에 실패했습니다");
        } finally {
            setGbSubmitting(false);
        }
    };

    return (
        <section className="bg-white px-6 pt-20 pb-20 text-center text-black">
            {/* 타이틀 SVG */}
            <FadeInOnView>
                <div className="mx-auto w-40 max-w-[70vw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/svgs/message.svg" alt="Message" className="h-auto w-full"/>
                </div>
            </FadeInOnView>

            <FadeInOnView>
                <div className="mt-7 text-[13px] font-noto-sans-kr font-semibold">
                    저희에게 따뜻한 축복의 말을 남겨주세요
                </div>
            </FadeInOnView>

            {/* 카드 3개 */}
            <FadeInOnView>
                <div className="mt-10 space-y-4">
                    {gbLoading ? (
                        <div className="py-12 font-gowun-batang text-[11px] text-black">
                            불러오는 중...
                        </div>
                    ) : (
                        gbList.slice(0, 3).map((it) => <MessageCard key={it.id} item={it}/>)
                    )}
                </div>
            </FadeInOnView>

            {/* 버튼 */}
            <div className="mt-8 space-y-4">
                <FadeInOnView>
                    <button
                        type="button"
                        onClick={() => setGbOpenAll(true)}
                        className="h-10 w-full rounded-[10px] bg-white text-[11px] font-gowun-batang font-bold shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.97]"
                    >
                        전체보기
                    </button>
                </FadeInOnView>

                <FadeInOnView>
                    <button
                        type="button"
                        onClick={() => setGbOpenWrite(true)}
                        className="h-10 w-full rounded-[10px] bg-[#AC5344] text-[11px] font-gowun-batang font-bold text-white shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.97]"
                    >
                        메세지 남기기
                    </button>
                </FadeInOnView>
            </div>

            {/* 전체보기 모달 */}
            <Modal open={gbOpenAll}>
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div className="font-gowun-batang text-[13px] font-bold">전체 메시지</div>
                    <button
                        type="button"
                        onClick={() => setGbOpenAll(false)}
                        className="h-9 w-9 rounded-full text-[#AC5344] text-[20px] active:scale-[0.95]"
                        aria-label="close"
                    >
                        ✕
                    </button>
                </div>

                <div className="max-h-[70vh] space-y-4 overflow-auto px-5 py-5">
                    {gbList.map((it) => (
                        <MessageCard key={`all-${it.id}`} item={it}/>
                    ))}
                </div>
            </Modal>

            {/* 작성 모달 */}
            <Modal open={gbOpenWrite}>
                <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
                    <div className="font-gowun-batang text-[13px] font-bold">메시지 남기기</div>
                    <button
                        type="button"
                        onClick={() => setGbOpenWrite(false)}
                        className="h-9 w-9 rounded-full text-[#AC5344] text-[20px] active:scale-[0.95]"
                        aria-label="close"
                    >
                        ✕
                    </button>
                </div>

                <div className="px-5 py-5">
                    <div className="space-y-3">
                        <input
                            value={gbName}
                            onChange={(e) => setGbName(e.target.value)}
                            placeholder="이름"
                            className="h-10 w-full rounded-[10px] bg-[#F7F7F7] px-4 font-gowun-batang text-[16px] outline-none"
                            maxLength={50}
                        />

                        <textarea
                            value={gbMessage}
                            onChange={(e) => setGbMessage(e.target.value)}
                            placeholder="축하 메시지를 남겨주세요 :)"
                            className="min-h-35 w-full rounded-md bg-[#F7F7F7] px-4 py-2 font-gowun-batang text-[16px] leading-relaxed whitespace-pre-wrap outline-none"
                            maxLength={MAX_MSG_LEN}
                        />

                        <div className="text-right font-noto-sans-kr text-[10px] text-[#ADA9A9]">
                            {gbMessage.length}/{MAX_MSG_LEN}
                        </div>

                        <button
                            type="button"
                            onClick={submitGuestbook}
                            disabled={gbSubmitting}
                            className={[
                                "h-10 w-full rounded-[10px] font-gowun-batang text-[11px] font-bold",
                                "shadow-[0_10px_24px_rgba(0,0,0,0.18)] active:scale-[0.99]",
                                gbSubmitting
                                    ? "cursor-not-allowed bg-black/20 text-white"
                                    : "bg-[#AC5344] text-white",
                            ].join(" ")}
                        >
                            {gbSubmitting ? "등록 중..." : "등록하기"}
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}