"use client";

import {useMemo, useState} from "react";
import Image from "next/image";
import WeAreGettingMarriedIntro from "@/src/components/WeAreGettingMarriedIntro";
import FadeInOnView from "@/src/components/FadeInOnView";
import CountUpNumber from "@/src/components/CountUpNumber";
import GallerySection from "@/src/components/GallerySection";

type AccountItem = {
    role: string;
    name: string;
    bank: string;
    account: string;
};

export default function Home() {
    // section3 캘린더 날짜 계산
    const diffDays = useMemo(() => {
        if (typeof window === "undefined") return 0;

        const wedding = new Date("2026-05-09T18:30:00+09:00");
        const now = new Date();

        const start = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ).getTime();

        const target = new Date(
            wedding.getFullYear(),
            wedding.getMonth(),
            wedding.getDate()
        ).getTime();

        return Math.max(0, Math.ceil((target - start) / (1000 * 60 * 60 * 24)));
    }, []);

    // section4 갤러리 배열 관리
    const galleryImages = useMemo(
        () => Array.from({length: 30}, (_, i) => `/images/gallery/gallery${i + 1}.jpg`),
        []
    );

    // 공통 Toast (주소/계좌 복사 공용)
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
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                success = document.execCommand("copy");
                document.body.removeChild(textarea);
            } catch {
                success = false;
            }
        }

        showToast(success ? "복사되었습니다" : "복사에 실패했습니다");
    };

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

    const AccountCard = ({item}: { item: AccountItem }) => {
        return (
            <div className="mt-4 rounded-md bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="px-6 pt-6 pb-5">
                    <div className="px-3 flex items-center justify-between">
                        <div className="font-gowun-batang text-[13px] font-black text-black">
                            {item.role}
                        </div>
                        <div className="font-gowun-batang text-[13px] text-black">
                            {item.name}
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex flex-col rounded-md bg-[#AC5344] px-4 py-3 text-white">
                            {/* 1번째 줄: bank */}
                            <div className="font-gowun-batang text-[13px] text-left self-start">
                                {item.bank}
                            </div>

                            {/* 2번째 줄: account + button */}
                            <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="font-gowun-batang text-[13px] tracking-wide">
                                    {item.account}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => copyText(item.account)}
                                    className="flex items-center justify-center active:scale-[0.9]"
                                    aria-label="계좌번호 복사"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="/svgs/copy_white.svg" alt="copy" className="h-3 w-3"/>
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
                        shadow-[0_6px_18px_rgba(0,0,0,0.10)] active:scale-[0.99]"
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

    return (
        <main className="min-h-screen bg-[#722020] flex justify-center">
            <div className="w-full max-w-97.5 bg-white relative">
                {/* section01 - Getting married */}
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

                {/* section2 - 저희 결혼합니다 */}
                <section className="px-6 py-24 text-center text-black">
                    <div className="mx-auto font-gowun-batang">
                        {/* 타이틀 */}
                        <FadeInOnView>
                            <h2 className="font-black text-[16px]">
                                저희 결혼합니다
                            </h2>
                        </FadeInOnView>

                        {/* 본문(시/문구) */}
                        <div className="mt-10 text-[12px]">
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
                            <div className="font-black mt-10 text-[12px]">
                                신랑 허성택 · 신부 이현정
                            </div>
                        </FadeInOnView>
                    </div>
                </section>

                {/* section3 - Calendar */}
                <section
                    className="relative px-10 py-15 text-center text-black bg-[url('/images/paper_bg.jpg')] bg-cover bg-center">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-55 max-w-[70vw]">
                        {/* svg는 img로 쓰는게 가장 간단/안전 */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/weddingDay.svg" alt="Wedding day" className="w-full h-auto"/>
                    </div>

                    {/* 날짜 텍스트 */}
                    <div className="mt-7">
                        <div className="text-[15px] font-noto-sans-kr font-semibold">
                            2026년 5월 9일 토요일 | 오후 6시 30분
                        </div>
                        <div className="mt-2 text-[12px] text-[#ADA9A9] font-gowun-batang font-bold">
                            Saturday, May 9, 2026 | PM 6:30
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="mx-auto mt-7 h-px w-full max-w-md bg-[#ADA9A9]/60"/>

                    {/* 달력 */}
                    {(() => {
                        const year = 2026;
                        const monthIndex = 4; // 0-based: 4 = May
                        const highlightDay = 9;

                        const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun
                        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                        // 캘린더 셀(빈칸 포함) 만들기
                        const cells: Array<number | null> = [];
                        for (let i = 0; i < firstDay; i++) cells.push(null);
                        for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                        while (cells.length % 7 !== 0) cells.push(null);

                        const weekLabels = ["일", "월", "화", "수", "목", "금", "토"];

                        return (
                            <div className="my-4 mx-auto w-full max-w-md">
                                {/* 요일 */}
                                <div className="grid grid-cols-7 text-[13px] font-noto-sans-kr font-semibold">
                                    {weekLabels.map((w, idx) => (
                                        <div
                                            key={w}
                                            className={`py-4 ${idx === 0 ? "text-[#c44]" : "text-black"}`}
                                        >
                                            {w}
                                        </div>
                                    ))}
                                </div>

                                {/* 날짜 */}
                                <div className="grid grid-cols-7 gap-y-1 text-[13px] font-noto-sans-kr font-light">
                                    {cells.map((d, i) => {
                                        const col = i % 7; // 0=Sun
                                        const isSunday = col === 0;
                                        const isHighlight = d === highlightDay;

                                        if (!d) return <div key={`e-${i}`} className="h-10"/>;

                                        return (
                                            <div key={`d-${i}`} className="flex justify-center">
                                                <div
                                                    className={[
                                                        "h-8 w-8 flex items-center justify-center rounded-full",
                                                        isHighlight
                                                            ? "bg-[#A80000] text-white font-noto-sans-kr font-bold"
                                                            : isSunday ? "text-[#D67171]" : "text-black",
                                                    ].join(" ")}
                                                >
                                                    {d}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })()}

                    {/* 하단 구분선 */}
                    <div className="mx-auto h-px w-full max-w-md bg-[#ADA9A9]/60"/>

                    {/* D-day */}
                    <div className="mt-10 text-[16px] font-gowun-batang font-bold">
                        성택 · 현정 결혼식이{" "}
                        <CountUpNumber
                            to={diffDays ?? 0}      // 처음엔 0, 마운트 후 실제 값
                            from={0}
                            durationMs={1200}
                            padStart={2}
                            startOnView
                            threshold={0.3}
                            once
                            className="text-[#A80000] font-black"
                        />
                        일 남았습니다
                    </div>
                </section>

                {/* section4 - Gallery */}
                <section className="px-6 py-12 text-center text-black bg-white">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/gallery.svg" alt="Gallery" className="w-full h-auto"/>
                    </div>

                    {/* 안내 문구 */}
                    <div className="mt-6">
                        <p className="text-[15px] font-noto-sans-kr font-semibold">
                            사진을 클릭하시면 전체화면 보기가 가능합니다
                        </p>
                        <p className="mt-2 text-[12px] text-[#ADA9A9] font-gowun-batang font-bold">
                            Tap to view full screen
                        </p>
                    </div>

                    <GallerySection images={galleryImages}/>
                </section>

                {/* section5 - Location */}
                <section className="py-12 text-center text-black bg-white">
                    {/* 타이틀 SVG */}
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/location.svg" alt="Location" className="w-full h-auto"/>
                    </div>

                    {/* 장소명 */}
                    <div className="mt-10 font-noto-sans-kr">
                        <div className="text-[15px] font-semibold">빌라드지디 논현</div>

                        {/* 주소 + 복사 */}
                        <div
                            className="flex items-center justify-center text-[12px] text-[#ADA9A9] font-noto-sans-kr font-bold">
                            <span>서울특별시 강남구 언주로126길 23</span>

                            <button
                                type="button"
                                onClick={() => copyText("서울특별시 강남구 언주로126길 23")}
                                className="inline-flex items-center justify-center active:scale-[0.77] py-3 px-2"
                                aria-label="주소 복사"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/svgs/copy.svg" alt="copy" className="h-3 w-3"/>
                            </button>
                        </div>
                    </div>

                    {/* 지도 이미지 */}
                    <div className="mt-6 overflow-hidden rounded-[14px] border border-[#EFEFEF]">
                        <Image
                            src="/images/map2.jpg"
                            alt="map"
                            width={900}
                            height={560}
                            className="h-auto w-full"
                            sizes="(max-width: 390px) 100vw, 390px"
                        />
                    </div>

                    {/* 지도 앱 버튼 */}
                    <div className="px-6 mt-10 grid grid-cols-3 gap-3">
                        <a
                            href="https://map.naver.com/v5/search/%EB%B9%8C%EB%9D%BC%EB%93%9C%EC%A7%80%EB%94%94%20%EB%85%BC%ED%98%84"
                            target="_blank"
                            rel="noreferrer"
                            className="h-10 flex items-center justify-center rounded-sm bg-[#EDEDED]/20 text-[13px] font-noto-sans-kr font-semibold text-[#ADA9A9] shadow-[2px_2px_2px_rgba(0,0,0,0.09)]
                                active:scale-[0.99] active:bg-[#AC5344] active:text-white"
                        >
                            네이버 지도
                        </a>
                        <a
                            href="https://apis.openapi.sk.com/tmap/app/search?query=%EB%B9%8C%EB%9D%BC%EB%93%9C%EC%A7%80%EB%94%94%20%EB%85%BC%ED%98%84"
                            target="_blank"
                            rel="noreferrer"
                            className="h-10 flex items-center justify-center rounded-sm bg-[#EDEDED]/20 text-[13px] font-noto-sans-kr font-semibold text-[#ADA9A9] shadow-[2px_2px_2px_rgba(0,0,0,0.09)]
                                active:scale-[0.99] active:bg-[#AC5344] active:text-white"
                        >
                            {/* TODO : TMAP - 연결하기 */}
                            T MAP
                        </a>
                        <a
                            href="https://map.kakao.com/?q=%EB%B9%8C%EB%9D%BC%EB%93%9C%EC%A7%80%EB%94%94%20%EB%85%BC%ED%98%84"
                            target="_blank"
                            rel="noreferrer"
                            className="h-10 flex items-center justify-center rounded-sm bg-[#EDEDED]/20 text-[13px] font-noto-sans-kr font-semibold text-[#ADA9A9] shadow-[2px_2px_2px_rgba(0,0,0,0.09)]
                                active:scale-[0.99] active:bg-[#AC5344] active:text-white"
                        >
                            카카오 맵
                        </a>
                    </div>

                    {/* 안내 블록 */}
                    <div className="px-6 mt-8 text-left">
                        {/* P - 주차 */}
                        <div className="flex gap-2">
                            <div
                                className="h-5 w-5 shrink-0 rounded-md border border-black flex items-center justify-center font-noto-sans-kr text-[11px] font-semibold">
                                P
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">주차</div>
                                <div className="mt-3 space-y-2 text-[12px] font-noto-sans-kr">
                                    <p>
                                        <span className="font-semibold">제1주차장 :</span> 서울 강남구 언주로126길 23 (논현동)
                                    </p>
                                    <p>
                                        <span className="font-semibold">제2주차장 :</span> 서울 강남구 학동로 342 에스케이 허브블루
                                    </p>
                                </div>
                                <div
                                    className="mt-3 space-y-1 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*제1주차장은 발렛주차로 만차시 제2주차장으로 안내해드립니다.</p>
                                    <p>*제2주차장은 도보 10분 / 셔틀이용 가능합니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* B - 셔틀버스 */}
                        <div className="flex gap-2 mt-10">
                            <div
                                className="h-5 w-5 shrink-0 rounded-md border border-black flex items-center justify-center font-noto-sans-kr text-[11px] font-semibold">
                                B
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">셔틀버스</div>
                                <div
                                    className="mt-3 space-y-1 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*예식 1시간 전부터 10분간격으로 셔틀 운행</p>
                                    <p>*강남구청역 2번출구 20m 직진, 버스 승강장 옆 노란색 셔틀버스</p>
                                </div>
                            </div>
                        </div>

                        {/* S - 지하철 */}
                        <div className="flex gap-2 mt-10">
                            <div
                                className="h-5 w-5 shrink-0 rounded-md border border-black flex items-center justify-center font-noto-sans-kr text-[11px] font-semibold">
                                S
                            </div>
                            <div className="flex-1">
                                <div className="font-noto-sans-kr text-[13px] font-semibold">지하철</div>
                                <div className="mt-3 text-[12px] font-noto-sans-kr font-semibold">
                                    7호선 강남구청역 2번 출구
                                </div>
                                <div
                                    className="mt-3 space-y-2 text-[11px] text-[#6B6B6B] font-noto-sans-kr leading-relaxed">
                                    <p>*2번출구 20m 직진, 버스승강장 옆 셔틀버스 이용</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section6 - 마음 전하실 곳 */}
                <section
                    className="px-6 py-16 text-center text-black bg-[url('/images/paper_bg.jpg')] bg-cover bg-center">
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
                        {/* eslint-disable-next-line react-hooks/static-components */}
                        <Accordion
                            title="신랑측에게"
                            isOpen={openSide === "groom"}
                            onToggle={() => setOpenSide(openSide === "groom" ? null : "groom")}
                        >
                            {groomAccounts.map((it) => (
                                <AccountCard key={`${it.role}-${it.account}`} item={it}/>
                            ))}
                        </Accordion>

                        {/* eslint-disable-next-line react-hooks/static-components */}
                        <Accordion
                            title="신부측에게"
                            isOpen={openSide === "bride"}
                            onToggle={() => setOpenSide(openSide === "bride" ? null : "bride")}
                        >
                            {brideAccounts.map((it) => (
                                <AccountCard key={`${it.role}-${it.account}`} item={it}/>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* Copy Toast (공통) */}
                <div
                    className={[
                        "fixed left-1/2 -translate-x-1/2 bottom-6 z-9999",
                        "transition-all duration-300",
                        toastOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 pointer-events-none",
                    ].join(" ")}
                >
                    <div
                        className={`rounded-full px-4 py-3 text-white text-[13px] font-noto-sans-kr ${
                            toastMsg.includes("실패") ? "bg-red-600" : "bg-black"
                        }`}
                    >
                        {toastMsg}
                    </div>
                </div>
            </div>
        </main>
    );
}