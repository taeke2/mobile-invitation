"use client";

import FadeInOnView from "@/src/components/FadeInOnView";

export default function TextSection() {
    return (
        <section className="flex px-6 py-24 text-center text-black">
            <div className="mx-auto">
                {/* 타이틀 */}
                <FadeInOnView>
                    <h2 className="font-nanum-myeongjo font-bold text-[16px]">
                        저희 결혼합니다
                    </h2>
                </FadeInOnView>

                {/* 본문(시/문구) */}
                <div className="mt-10 text-[12px] font-nanum-myeongjo leading-relaxed">
                    <FadeInOnView>
                        <p>
                            사랑은 소유가 아니라<br/>
                            동행임을 아는 두 사람은<br/><br/>

                            잡은 손을 놓지 않되<br/>
                            함부로 잡아끌지 않을 것이며<br/><br/>
                        </p>
                    </FadeInOnView>
                    <FadeInOnView>
                        <p>
                            서로의 두 눈을 고요히 바라보아<br/>
                            말하지 않아도 같은 쪽으로 걸어가리라<br/><br/>

                            - 박미라, ‘아름다운 날에 부치다’ 중에서 -<br/><br/>
                        </p>
                    </FadeInOnView>
                    <FadeInOnView>
                        <p className="mt-3 font-bold">
                            서로의 곁을 선택한 두 사람이 이제 함께합니다.<br/>
                            그 시작을 함께해 주시면 감사하겠습니다.
                        </p>
                    </FadeInOnView>
                </div>


                {/* 하단 이름 */}
                <FadeInOnView>
                    <div className="mt-10 text-center font-nanum-myeongjo text-[12px] font-bold">
                        <div className="inline-grid grid-cols-[auto_auto_auto] gap-x-3 gap-y-0.5">
                            <span className="text-right">허정행 · 박성연의</span>
                            <span>아들</span>
                            <span>허성택</span>

                            <span className="text-right">이형석 · 류정란의</span>
                            <span>딸</span>
                            <span>이현정</span>
                        </div>
                    </div>
                </FadeInOnView>
            </div>
        </section>
    );
}