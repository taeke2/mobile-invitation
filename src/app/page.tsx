"use client";

import Image from "next/image";
import WeAreGettingMarriedIntro from "@/src/components/WeAreGettingMarriedIntro";
import FadeInOnView from "@/src/components/FadeInOnView";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                {/* section01 */}
                <section className="relative min-h-screen overflow-hidden">
                    {/* 메인 이미지 */}
                    <Image
                        src="/images/main_image.jpg"
                        alt="main image"
                        fill
                        priority
                        className="object-cover scale-140 object-[35%_center]"
                    />
                    {/* 상단 오버레이(그 위에 글씨/로고) */}
                    <div className="relative pt-10 text-center z-10">
                        <WeAreGettingMarriedIntro/>
                    </div>
                    {/* 이름 */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center z-10">
                        <p className="font-bodoni-sc text-[12px] text-[#414141]">
                            TAEK<span className={"font-bodoni-sc text-[8px]"}> & </span>JUNG
                        </p>
                    </div>
                </section>

                {/* section2 */}
                <section className="px-6 py-24 text-center text-black">
                    <div className="mx-auto font-gowun-batang">
                        {/* 타이틀 */}
                        <FadeInOnView>
                            <h2 className="font-black text-[16px]">
                                저희 결혼합니다
                            </h2>
                        </FadeInOnView>

                        {/* 본문(시/문구) */}
                        <FadeInOnView>
                            <div className="mt-10 text-[12px]">
                                <p>
                                    사랑은 소유가 아니라<br />
                                    동행임을 아는 두 사람은<br /><br />

                                    잡은 손을 놓지 않되<br />
                                    함부로 잡아끌지 않을 것이며<br /><br />

                                    서로의 두 눈을 고요히 바라보아<br />
                                    말하지 않아도 같은 쪽으로 걸어가리라<br /><br />

                                    -박미라, ‘아름다운 날에 부치다’ 중에서<br /><br />

                                    저희 두 사람 이제 믿음과 사랑으로<br />
                                    한 길을 가려 합니다.<br /><br />

                                    그 시작의 한 걸음, 함께 축복해 주시면 감사하겠습니다.
                                </p>
                            </div>
                        </FadeInOnView>

                        {/* 하단 이름 */}
                        <FadeInOnView>
                            <div className="font-black mt-10 text-[12px]">
                                신랑 허성택 · 신부 이현정
                            </div>
                        </FadeInOnView>
                    </div>
                </section>
            </div>
        </main>
    );
}