"use client";

import { useEffect, useState } from "react";
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
import Footer from "@/src/components/Footer";
import MusicPlayer from "@/src/components/MusicPlayer";
import EntryRsvpPopup from "@/src/components/EntryRsvpPopup";

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
                textarea.style.fontSize = "16px";

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

    // ==========================================================
    // 첫 진입 RSVP 팝업 / RSVP 모달 상태
    // ==========================================================
    const [entryPopupOpen, setEntryPopupOpen] = useState(false);
    const [rsvpOpen, setRsvpOpen] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        const hiddenDate = localStorage.getItem("hide-entry-rsvp-popup-date");

        if (hiddenDate !== today) {
            setEntryPopupOpen(true);
        }
    }, []);

    const closeEntryPopup = () => {
        setEntryPopupOpen(false);
    };

    const hideEntryPopupToday = () => {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem("hide-entry-rsvp-popup-date", today);
        setEntryPopupOpen(false);
    };

    const openRsvpFromEntryPopup = () => {
        setEntryPopupOpen(false);
        setRsvpOpen(true);
    };

    const isAnyModalOpen = entryPopupOpen || rsvpOpen;
    // ==========================================================

    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-[430px] bg-white relative mx-auto">
                {/* bgm */}
                <MusicPlayer />

                {/* 첫 진입 팝업 */}
                <EntryRsvpPopup
                    open={entryPopupOpen}
                    onClose={closeEntryPopup}
                    onHideToday={hideEntryPopupToday}
                    onOpenRsvp={openRsvpFromEntryPopup}
                />

                {/* section01 - Main */}
                <MainSection paused={isAnyModalOpen} />

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
                <RsvpSection
                    showToast={showToast}
                    open={rsvpOpen}
                    onOpen={() => setRsvpOpen(true)}
                    onClose={() => setRsvpOpen(false)}
                />

                {/* footer */}
                <Footer />

                <Toast open={toastOpen} message={toastMsg} />
            </div>
        </main>
    );
}