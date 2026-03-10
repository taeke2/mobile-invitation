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
import InformationSection from "@/src/components/InformationSection";

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
                <InformationSection />

                {/* section9 - RSVP */}
                <RsvpSection showToast={showToast} />

                <Toast open={toastOpen} message={toastMsg} />
            </div>
        </main>
    );
}