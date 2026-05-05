"use client";

import Image from "next/image";
import FadeInOnView from "@/src/components/FadeInOnView";
import {useState} from "react";

export default function DayAlbumSection() {
    const [popupOpen, setPopupOpen] = useState(false);

    const handleClick = () => {
        const today = new Date();
        const weddingDate = new Date("2026-05-09");

        today.setHours(0, 0, 0, 0);
        weddingDate.setHours(0, 0, 0, 0);

        const isOpen = today >= weddingDate;

        if (!isOpen) {
            setPopupOpen(true);
            return;
        }

        window.open(
            "https://www.dropbox.com/request/apo8mrirshb61h3raq5j",
            "_blank"
        );
    };

    return (
        <>
            <section className="bg-[#EDEDED] px-6 py-20 text-center text-black">
                {/* title */}
                <FadeInOnView>
                    <div className="mx-auto w-40 max-w-[70vw]">
                        <img src="/svgs/dayAlbum.svg" alt="DayAlbum" className="w-full h-auto"/>
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="mt-7 font-noto-sans-kr text-[13px] font-semibold">
                        사진 공유하기
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="mt-10 font-gowun-batang text-[10px] leading-relaxed font-bold">
                        <p>
                            예식 당일,<br/>
                            여러분의 시선으로 담아주신 순간들을 공유해주세요.<br/><br/>
                            신랑신부의 모습도,<br/>
                            함께한 여러분의 모습도 모두 환영합니다.<br/><br/>
                            베스트 포토그래퍼로 선정된 분께는<br/>
                            작은 선물이 준비되어 있습니다.<br/><br/>
                        </p>
                        {/* 🔥 추가 안내 */}
                        <p className="text-[#AC5344]">
                            * 업로드 시 성함을 꼭 입력해주세요.<br/>
                            미기재 시 선정이 어려울 수 있습니다.
                        </p>
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="mt-10 rounded-[16px] bg-[#2D2D2D]">
                        <div className="relative mx-auto h-[280px] w-full overflow-hidden rounded-[10px]">
                            <Image
                                src="/images/gallery/gallery_40.jpg"
                                alt="Our Wedding Day Album"
                                fill
                                className="object-cover"
                            />

                            <div className="absolute inset-0 flex flex-col items-center justify-between py-5 px-5">
                                <p className="font-cormorant-garamond text-[23px] text-white">
                                    Our Wedding Day Album
                                </p>

                                <button
                                    type="button"
                                    onClick={handleClick}
                                    className="h-10 w-full rounded-md bg-white font-gowun-batang text-[12px] font-bold text-black shadow-sm active:scale-[0.98] transition"
                                >
                                    사진 및 동영상 업로드 하기
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeInOnView>
            </section>

            {/* 🔥 팝업 */}
            {popupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-[85%] max-w-[320px] rounded-lg bg-[#AC5344] px-6 py-6 text-center shadow-lg">
                        <p className="font-gowun-batang font-bold text-[13px] leading-relaxed text-white">
                            예식 당일 창이 열립니다 :)
                        </p>

                        <button
                            onClick={() => setPopupOpen(false)}
                            className="mt-5 w-full h-9 rounded-md bg-white text-black text-[12px] font-semibold"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}