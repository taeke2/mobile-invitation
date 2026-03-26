"use client";

import FadeInOnView from "@/src/components/FadeInOnView";

export default function TextSection() {
    return (
        <section className="px-6 py-24 text-center text-black">
            <div className="mx-auto">
                {/* 타이틀 */}
                <FadeInOnView>
                    <h2 className="font-nanum-myeongjo font-bold text-[16px]">
                        저희 결혼합니다
                    </h2>
                </FadeInOnView>

                {/* 본문(시/문구) */}
                <div className="mt-10 text-[12px] font-gowun-batang leading-relaxed">
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

                            -박미라, ‘아름다운 날에 부치다’ 중에서<br/><br/>
                        </p>
                    </FadeInOnView>
                    <FadeInOnView>
                        <p>
                            저희 두 사람 이제 믿음과 사랑으로<br/>
                            한 길을 가려 합니다.<br/><br/>

                            그 시작의 한 걸음, 함께 축복해 주시면 감사하겠습니다.
                        </p>
                    </FadeInOnView>
                </div>


                {/* 하단 이름 */}
                <FadeInOnView>
                    <div className="font-nanum-myeongjo font-bold mt-10 text-[12px]">
                        신랑 허성택 · 신부 이현정
                    </div>
                </FadeInOnView>
            </div>
        </section>
    );
}