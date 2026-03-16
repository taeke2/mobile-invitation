"use client";

import {useState} from "react";
import FadeInOnView from "@/src/components/FadeInOnView";

type CopyTextFn = (text: string) => void | Promise<void>;

type AccountItem = {
    role: string;
    name: string;
    bank: string;
    account: string;
};

const AccountCard = ({
                         item,
                         copyText,
                     }: {
    item: AccountItem;
    copyText: CopyTextFn;
}) => {
    return (
        <div className="mt-3 overflow-hidden rounded-md bg-white shadow-[2px_2px_2px_rgba(0,0,0,0.09)]">
            <div className="px-6 pt-4 pb-5">
                <div className="flex items-center justify-between px-3">
                    <div className="font-gowun-batang text-[11px] font-black text-black">
                        {item.role}
                    </div>
                    <div className="font-gowun-batang text-[11px] text-black">
                        {item.name}
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex flex-col rounded-md bg-[#AC5344] px-4 py-2.5 text-white">
                        <div className="self-start text-left font-gowun-batang text-[11px]">
                            {item.bank}
                        </div>

                        <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="font-gowun-batang text-[11px] tracking-wide">
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

const Accordion = ({
                       title,
                       isOpen,
                       onToggle,
                       children,
                   }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) => {
    return (
        <div className="mt-5">
            <button
                type="button"
                onClick={onToggle}
                className="h-10 w-full rounded-md bg-white px-6 shadow-[2px_2px_2px_rgba(0,0,0,0.09)] active:scale-[0.99]"
            >
                <div className="flex items-center justify-between">
                    <span className="font-gowun-batang text-[11px] font-bold text-black">
                        {title}
                    </span>

                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="#A9A9A9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </button>

            <div
                className={[
                    "grid overflow-hidden transition-all duration-700 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
            >
                <div className="min-h-0">
                    <div className="transition-opacity duration-500 ease-in-out">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WithLoveSection({
                                            copyText,
                                        }: {
    copyText: CopyTextFn;
}) {
    const [openSide, setOpenSide] = useState<"groom" | "bride" | null>(null);

    const groomAccounts: AccountItem[] = [
        {role: "신랑", name: "허성택", bank: "국민", account: "459002-04-177607"},
        {role: "신랑 어머니", name: "박성연", bank: "농협", account: "352-1351-2482-33"},
    ];

    const brideAccounts: AccountItem[] = [
        {role: "신부", name: "이현정", bank: "국민", account: "801702-04-127656"},
        {role: "신부 아버지", name: "이형석", bank: "신한", account: "110-156-846385"},
        {role: "신부 어머니", name: "유정란", bank: "신한", account: "110-058-608670"},
    ];

    return (
        <section className="bg-[url('/images/paper_bg.jpg')] bg-cover bg-center px-6 py-20 text-center text-black">
            <div className="pt-2">
                <FadeInOnView>
                    <div className="mx-auto w-40 max-w-[70vw]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/svgs/withLove.svg" alt="withLove" className="h-auto w-full"/>
                    </div>
                </FadeInOnView>

                <FadeInOnView>
                    <div className="mt-7 font-gowun-batang text-[14px] font-bold">
                        마음 전하실 곳
                    </div>

                    <div className="mt-7 font-gowun-batang text-[11px] leading-5 text-black">
                        함께 자리하지 못하시더라도
                        <br/>
                        축하의 마음을 전해주실 분들을 위해
                        <br/>
                        계좌번호를 안내드립니다.
                        <br/>
                        보내주시는 마음에 감사드립니다.
                    </div>
                </FadeInOnView>
            </div>

            <div className="mt-10">
                <FadeInOnView>
                    <Accordion
                        title="신랑측에게"
                        isOpen={openSide === "groom"}
                        onToggle={() => setOpenSide(openSide === "groom" ? null : "groom")}
                    >
                        {groomAccounts.map((item) => (
                            <AccountCard
                                key={`${item.role}-${item.account}`}
                                item={item}
                                copyText={copyText}
                            />
                        ))}
                    </Accordion>
                </FadeInOnView>

                <FadeInOnView>
                    <Accordion
                        title="신부측에게"
                        isOpen={openSide === "bride"}
                        onToggle={() => setOpenSide(openSide === "bride" ? null : "bride")}
                    >
                        {brideAccounts.map((item) => (
                            <AccountCard
                                key={`${item.role}-${item.account}`}
                                item={item}
                                copyText={copyText}
                            />
                        ))}
                    </Accordion>
                </FadeInOnView>
            </div>
        </section>
    );
}