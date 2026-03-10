"use client";

import {useState} from "react";
import GallerySection from "@/src/components/GallerySection";
import RsvpSection from "@/src/components/RsvpSection";
import MainSection from "@/src/components/MainSection";
import TextSection from "@/src/components/TextSection";
import WeddingDaySection from "@/src/components/WeddingDaySection";
import Toast from "@/src/components/Toast";
import LocationSection from "@/src/components/LocationSection";
import WithLoveSection from "@/src/components/WithLoveSection";
import MessageSection from "@/src/components/MessageSection";

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
                <WithLoveSection copyText={copyText} />

                {/* section7 - Message */}
                <MessageSection showToast={showToast} />

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