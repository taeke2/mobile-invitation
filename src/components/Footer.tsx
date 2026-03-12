export default function Footer() {
    return (
        <footer className="bg-[#9B9B9B] px-6 py-10 text-center text-white">
            <div className="space-y-2 font-noto-sans-kr text-[10px] leading-relaxed">
                <p>Design by 현정</p>
                <p>Develop by 성택</p>
                <p>
                    청첩장 관련 문의 |{" "}
                    <a
                        href="mailto:leeflow_designstudio@naver.com"
                        className="underline underline-offset-2"
                    >
                        leeflow_designstudio@naver.com
                    </a>
                </p>
            </div>
        </footer>
    );
}