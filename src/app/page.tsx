"use client";

import {useEffect, useState} from "react";
import { supabase } from "@/src/lib/supabaseClient";
import Image from "next/image";
import GallerySection from "@/src/components/GallerySection";
import RsvpSection from "@/src/components/RsvpSection";
import MainSection from "@/src/components/MainSection";
import TextSection from "@/src/components/TextSection";
import WeddingDaySection from "@/src/components/WeddingDaySection";
import Toast from "@/src/components/Toast";
import LocationSection from "@/src/components/LocationSection";

type AccountItem = {
    role: string;
    name: string;
    bank: string;
    account: string;
};

type GuestbookMessage = {
    id: number;
    name: string;
    message: string;
    is_public: boolean;
    is_deleted: boolean;
    created_at: string;
};

type CopyTextFn = (text: string) => void | Promise<void>;

const AccountCard = ({ item, copyText }: { item: AccountItem; copyText: CopyTextFn }) => {
    return (
        <div className="mt-4 rounded-md bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="px-6 pt-6 pb-5">
                <div className="px-3 flex items-center justify-between">
                    <div className="font-gowun-batang text-[13px] font-black text-black">{item.role}</div>
                    <div className="font-gowun-batang text-[13px] text-black">{item.name}</div>
                </div>

                <div className="mt-4">
                    <div className="flex flex-col rounded-md bg-[#AC5344] px-4 py-3 text-white">
                        <div className="font-gowun-batang text-[13px] text-left self-start">{item.bank}</div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="font-gowun-batang text-[13px] tracking-wide">{item.account}</div>

                            <button
                                type="button"
                                onClick={() => copyText(item.account)}
                                className="flex items-center justify-center active:scale-[0.9]"
                                aria-label="계좌번호 복사"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/svgs/copy_white.svg" alt="copy" className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Accordion = ({title, isOpen, onToggle, children,}: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) => {
    return (
        <div className="mt-6">
            <button
                type="button"
                onClick={onToggle}
                className="w-full rounded-md bg-white px-6 h-12 flex items-center justify-between
                        bg-[#EDEDED]/20 shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.99]"
            >
                    <span className="font-gowun-batang text-[13px] font-bold text-black">
                        {title}
                    </span>
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                    <path
                        d="M6 9L12 15L18 9"
                        stroke="#A9A9A9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="mt-4 origin-top animate-accordion-down overflow-hidden">
                    <div className="animate-accordion-fade">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

const MessageCard = ({ item }: { item: GuestbookMessage }) => {
    return (
        <div className="rounded-md  px-6 py-3 text-left shadow-[2px_2px_2px_rgba(0,0,0,0.09)]">
            <div className="font-gowun-batang text-[13px] leading-relaxed whitespace-pre-wrap">
                {item.message}
            </div>
            <div className="mt-4 font-gowun-batang text-[13px] text-[#AC5344]">
                From. {item.name}
            </div>
        </div>
    );
};

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
        <div
            className="fixed inset-0 z-9998 pointer-events-auto"
            role="dialog"
            aria-modal="true"
        >
            {/* backdrop: 터치/스크롤 차단만 하고 '닫기'는 안함 */}
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

            {/* modal content */}
            <div
                className="absolute left-1/2 top-1/2 w-[92%] max-w-[380px]
                   -translate-x-1/2 -translate-y-1/2"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                <div className="rounded-2xl bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    // ==========================================================
    // Toast 시작
    // ==========================================================
    const [toastOpen, setToastOpen] = useState(false);

    const [toastMsg, setToastMsg] = useState("");

    const showToast = (msg: string) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2500);
    };
    // 공통 복사 함수 (Location/마음전하실곳 둘 다 사용)

    const copyText = async (text: string) => {
        let success = false;

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                success = true;
            }
        } catch {
            success = false;
        }

        // fallback (모바일 / http 대응)
        if (!success) {
            try {
                const scrollX = window.scrollX;
                const scrollY = window.scrollY;

                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.top = "0";
                textarea.style.left = "-9999px";
                textarea.style.opacity = "0";
                textarea.style.fontSize = "16px"; // iOS 확대/스크롤 방지에 도움

                document.body.appendChild(textarea);

                try {
                    textarea.focus({ preventScroll: true });
                } catch {
                    textarea.focus();
                }

                textarea.select();
                textarea.setSelectionRange(0, textarea.value.length);

                success = document.execCommand("copy");

                document.body.removeChild(textarea);
                window.scrollTo(scrollX, scrollY);
            } catch {
                success = false;
            }
        }

        showToast(success ? "복사되었습니다" : "복사에 실패했습니다");
    };
    // ==========================================================
    // Toast 끝
    // ==========================================================

    // section6 - 마음 전하실 곳 (데이터)
    const groomAccounts: AccountItem[] = [
        {role: "신랑", name: "허성택", bank: "국민", account: "459002-04-177607"},
        {role: "신랑 어머니", name: "박성연", bank: "농협", account: "352-1351-2482-33"},
    ];

    const brideAccounts: AccountItem[] = [
        {role: "신부", name: "이현정", bank: "국민", account: "801702-04-127656"},
        {role: "신부 아버지", name: "이형석", bank: "신한", account: "110-156-846385"},
        {role: "신부 어머니", name: "유정란", bank: "신한", account: "110-058-608670"},
    ];
    // section6 - 드롭다운 상태

    const [openSide, setOpenSide] = useState<"groom" | "bride" | null>(null);

    // section7 - Message(축하메시지)
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
            const { data, error } = await supabase
                .from("guestbook_messages")
                .select("id,name,message,is_public,is_deleted,created_at")
                .eq("is_deleted", false)
                .eq("is_public", true)
                .order("created_at", { ascending: false });

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitGuestbook = async () => {
        const name = gbName.trim();
        const message = gbMessage.trim();

        if (!name) return showToast("이름을 입력해 주세요");
        if (!message) return showToast("메시지를 입력해 주세요");
        if (message.length > MAX_MSG_LEN) return showToast("메시지는 300자 이내로 작성해 주세요");

        setGbSubmitting(true);
        try {
            const { error } = await supabase.from("guestbook_messages").insert({
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

    // section8 - Information(안내) 슬라이드
    const [infoPage, setInfoPage] = useState(0); // 0 or 1
    const INFO_TOTAL = 2;

    const goPrevInfo = () => setInfoPage((p) => Math.max(0, p - 1));
    const goNextInfo = () => setInfoPage((p) => Math.min(INFO_TOTAL - 1, p + 1));

    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                {/* section01 - Main */}
                <MainSection />

                {/* section2 - 저희 결혼합니다 */}
                <TextSection />

                {/* section3 - Calendar */}
                <WeddingDaySection />

                {/* section4 - Gallery */}
                <GallerySection />

                {/* section5 - Location */}
                <LocationSection copyText={copyText} />

                {/* section6 - 마음 전하실 곳 */}
                <section className="px-6 py-16 text-center text-black bg-[url('/images/paper_bg.jpg')] bg-cover bg-center">
                    <div className="pt-2">
                        {/* 타이틀 SVG */}
                        <div className="mx-auto w-40 max-w-[70vw]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/svgs/withLove.svg" alt="withLove" className="w-full h-auto"/>
                        </div>

                        <div className="mt-10 font-gowun-batang text-[16px] font-bold">
                            마음 전하실 곳
                        </div>

                        <div className="mt-6 font-gowun-batang text-[13px] leading-relaxed text-black">
                            함께 자리하지 못하시더라도<br/>
                            축하의 마음을 전해주실 분들을 위해<br/>
                            계좌번호를 안내드립니다.<br/>
                            보내주시는 마음에 감사드립니다.
                        </div>
                    </div>

                    <div className="mt-10">
                        <Accordion
                            title="신랑측에게"
                            isOpen={openSide === "groom"}
                            onToggle={() => setOpenSide(openSide === "groom" ? null : "groom")}
                        >
                            {groomAccounts.map((it) => (
                                <AccountCard key={`${it.role}-${it.account}`} item={it} copyText={copyText} />
                            ))}
                        </Accordion>

                        <Accordion
                            title="신부측에게"
                            isOpen={openSide === "bride"}
                            onToggle={() => setOpenSide(openSide === "bride" ? null : "bride")}
                        >
                            {brideAccounts.map((it) => (
                                <AccountCard key={`${it.role}-${it.account}`} item={it} copyText={copyText} />
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* section7 - Message */}
                <section className="px-6 pt-16 pb-18 text-center text-black bg-white">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/message.svg" alt="Message" className="w-full h-auto" />
                    </div>

                    <div className="mt-10 text-[15px] font-noto-sans-kr font-semibold">
                        저희에게 따뜻한 축복의 말을 남겨주세요
                    </div>

                    {/* 카드 3개 */}
                    <div className="mt-10 space-y-6">
                        {gbLoading ? (
                            <div className="py-12 font-gowun-batang text-[13px] text-[#6B6B6B]">
                                불러오는 중...
                            </div>
                        ) : (
                            gbList.slice(0, 3).map((it) => <MessageCard key={it.id} item={it} />)
                        )}
                    </div>

                    {/* 버튼 */}
                    <div className="mt-8 space-y-4">
                        <button
                            type="button"
                            onClick={() => setGbOpenAll(true)}
                            className="w-full h-14 rounded-[10px] bg-white text-[13px] font-gowun-batang font-bold
                                 shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.99]"
                        >
                            전체보기
                        </button>

                        <button
                            type="button"
                            onClick={() => setGbOpenWrite(true)}
                            className="w-full h-16 rounded-[10px] bg-[#AC5344] text-white text-[13px] font-gowun-batang
                                font-bold shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.99]"
                        >
                            메세지 남기기
                        </button>
                    </div>

                    {/* 전체보기 모달 */}
                    <Modal open={gbOpenAll} onClose={() => setGbOpenAll(false)}>
                        <div className="px-5 py-4 flex items-center justify-between border-b border-black/5">
                            <div className="font-gowun-batang font-bold text-[15px]">전체 메시지</div>
                            <button
                                type="button"
                                onClick={() => setGbOpenAll(false)}
                                className="h-9 w-9 rounded-full bg-black/5 active:scale-[0.95]"
                                aria-label="close"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="max-h-[70vh] overflow-auto px-5 py-5 space-y-4">
                            {gbList.map((it) => (
                                <MessageCard key={`all-${it.id}`} item={it} />
                            ))}
                        </div>
                    </Modal>

                    {/* 작성 모달 */}
                    <Modal open={gbOpenWrite} onClose={() => setGbOpenWrite(false)}>
                        <div className="px-5 py-4 flex items-center justify-between border-b border-black/5">
                            <div className="font-gowun-batang font-bold text-[15px]">메시지 남기기</div>
                            <button
                                type="button"
                                onClick={() => setGbOpenWrite(false)}
                                className="h-9 w-9 rounded-full bg-black/5 active:scale-[0.95]"
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
                                    className="w-full h-12 rounded-[10px] bg-[#F7F7F7] px-4 font-gowun-batang
                                        text-[16px] outline-none"
                                    maxLength={50}
                                />

                                <textarea
                                    value={gbMessage}
                                    onChange={(e) => setGbMessage(e.target.value)}
                                    placeholder="축하 메시지를 남겨주세요 :)"
                                    className="w-full min-h-35 rounded-md bg-[#F7F7F7] px-4 py-3 font-gowun-batang
                                        text-[16px] leading-relaxed outline-none whitespace-pre-wrap"
                                    maxLength={MAX_MSG_LEN}
                                />

                                <div className="text-right font-noto-sans-kr text-[12px] text-[#ADA9A9]">
                                    {gbMessage.length}/{MAX_MSG_LEN}
                                </div>

                                <button
                                    type="button"
                                    onClick={submitGuestbook}
                                    disabled={gbSubmitting}
                                    className={[
                                        "w-full h-14 rounded-[10px] font-gowun-batang font-bold text-[13px]",
                                        "shadow-[0_10px_24px_rgba(0,0,0,0.18)] active:scale-[0.99]",
                                        gbSubmitting ? "bg-black/20 text-white cursor-not-allowed" : "bg-[#AC5344] text-white",
                                    ].join(" ")}
                                >
                                    {gbSubmitting ? "등록 중..." : "등록하기"}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </section>

                {/* section8 - Information */}
                <section className="px-6 py-16 text-center text-black bg-[#EDEDED]">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/information.svg" alt="Information" className="w-full h-auto" />
                    </div>

                    {/* 서브 타이틀 (페이지별) */}
                    <div className="mt-8 font-noto-sans-kr text-[15px] font-semibold">
                        {infoPage === 0 ? "단독건물 좌석 안내" : "2부 예식 안내"}
                    </div>

                    {/* 카드 + 슬라이드 */}
                    <div className="mt-10">
                        <div className="mx-auto w-full max-w-md rounded-2xl bg-white shadow-[0_10px_28px_rgba(0,0,0,0.10)] overflow-hidden">
                            <div className="relative">
                                {/* 슬라이드 트랙 */}
                                <div className="overflow-hidden">
                                    <div
                                        className="flex w-[200%] transition-transform duration-300 ease-out"
                                        style={{ transform: `translateX(-${infoPage * 50}%)` }}
                                    >
                                        {/* page 1 */}
                                        <div className="w-1/2 shrink-0 px-6 pt-10">
                                            <p className="font-gowun-batang text-[13px] text-black">
                                                저희 결혼식은 단독 건물에서<br />
                                                1부와 2부로 나뉘어 진행됩니다.<br /><br />

                                                1층은 1부 예식 종료 후<br />
                                                2부 시작과 함께 식사가 가능하며,<br />
                                                2층은 1부 예식 중에도 식사 이용이 가능합니다.<br /><br />

                                                층별 안내에 따라 편하게 이용해주시기 바라며,<br />
                                                즐거운 시간 보내실 수 있도록 준비하겠습니다.
                                            </p>

                                            <div className="mx-auto mt-5 h-px w-full bg-[#ADA9A9]" />

                                            <p className="mt-5 font-gowun-batang text-[13px] font-bold">
                                                1부 예식 후 식사는 1층,<br />
                                                예식과 동시에 식사는 2층<span className="font-normal">에 착석해주시기 바랍니다.</span><br />
                                            </p>
                                        </div>

                                        {/* page 2 */}
                                        <div className="w-1/2 shrink-0 px-6 py-10">
                                            <p className="font-gowun-batang text-[13px] font-bold">
                                                {`1부 예식 후 2부 예식이 이어집니다.`}
                                            </p>

                                            <div className="mx-auto mt-10 h-px w-full bg-[#BDBDBD]" />

                                            <div className="mt-10 font-gowun-batang text-[13px] text-black">
                                                2부에는 작은 이벤트가 준비되어 있으니<br />
                                                늦은 시간이지만 끝까지 함께해주시면 감사하겠습니다.<br /><br />

                                                2부 예식이 마무리된 후에는<br />
                                                감사의 마음을 담아 예식에 사용된<br />
                                                꽃을 나누어 드릴 예정입니다.<br />
                                                함께한 순간을 오래도록 기억해주시길 바랍니다.<br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 하단 네비게이션 */}
                            <div className="flex items-center justify-center gap-4 py-5">
                                <button
                                    type="button"
                                    onClick={goPrevInfo}
                                    disabled={infoPage === 0}
                                    className={[
                                        "px-2 py-1 text-[16px] text-[#6B6B6B] active:scale-[0.96]",
                                        infoPage === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100",
                                    ].join(" ")}
                                    aria-label="이전 안내"
                                >
                                    {"<"}
                                </button>

                                <div className="font-noto-sans-kr text-[14px] text-[#6B6B6B]">
                                    {infoPage + 1}/{INFO_TOTAL}
                                </div>

                                <button
                                    type="button"
                                    onClick={goNextInfo}
                                    disabled={infoPage === INFO_TOTAL - 1}
                                    className={[
                                        "px-2 py-1 text-[16px] text-[#6B6B6B] active:scale-[0.96]",
                                        infoPage === INFO_TOTAL - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100",
                                    ].join(" ")}
                                    aria-label="다음 안내"
                                >
                                    {">"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section9 - RSVP */}
                <RsvpSection showToast={showToast} />

                <Toast open={toastOpen} message={toastMsg} />
            </div>
        </main>
    );
}