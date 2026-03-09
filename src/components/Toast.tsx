"use client";

type Props = {
    open: boolean;
    message: string;
};

export default function Toast({ open, message }: Props) {
    return (
        <div
            className={[
                "fixed left-1/2 -translate-x-1/2 bottom-6 z-9999",
                "transition-all duration-300",
                open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none",
            ].join(" ")}
        >
            <div
                className={`rounded-full px-4 py-3 text-white text-[13px] font-noto-sans-kr ${
                    message.includes("실패") ? "bg-red-600" : "bg-black"
                }`}
            >
                {message}
            </div>
        </div>
    );
}