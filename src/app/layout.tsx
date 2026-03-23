import type {Metadata} from "next";
import {Geist, Geist_Mono, Bodoni_Moda_SC, Gowun_Batang, Noto_Sans_KR} from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const bodoniSC = Bodoni_Moda_SC({
    variable: "--font-bodoni-sc",
    subsets: ["latin"],
});

const gowunBatang = Gowun_Batang({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-gowun-batang",
});

const notoSansKr = Noto_Sans_KR({
    variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mobile-invitation-sigma.vercel.app/"),

    title: "성택🖤현정 결혼합니다",
    description: "5월 9일 (토요일) 오후 6시 30분",

    openGraph: {
        title: "성택🖤현정 결혼합니다",
        description: "5월 9일 (토요일) 오후 6시 30분",
        siteName: "성택🖤현정 모바일 청첩장",
        images: [
            {
                url: "/images/main/main_image_02.jpg",
                width: 1200,
                height: 630,
                alt: "성택 현정 결혼식",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "성택🖤현정 결혼합니다",
        description: "5월 9일 (토요일) 오후 6시 30분",
        images: ["/images/main/main_image_02.jpg"],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
        <body
            className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${bodoniSC.variable}
          ${gowunBatang.variable}
          ${notoSansKr.variable}
          antialiased
        `}
        >
        {children}
        </body>
        </html>
    );
}