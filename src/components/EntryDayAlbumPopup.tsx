"use client";

interface EntryDayAlbumPopupProps {
    open: boolean;
    onClose: () => void;
}

export default function EntryDayAlbumPopup({
                                               open,
                                               onClose,
                                           }: EntryDayAlbumPopupProps) {
    if (!open) return null;

    const handleShareClick = () => {
        onClose();

        setTimeout(() => {
            document.getElementById("section10")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-[85%] max-w-[320px] rounded-lg bg-[#AC5344] px-6 py-6 text-center shadow-lg">
                <p className="font-gowun-batang font-bold text-[13px] leading-relaxed text-white">
                    예식 당일의 사진을 함께 남겨주세요 :)
                </p>

                <div className="mt-5 flex gap-2">
                    <button
                        onClick={handleShareClick}
                        className="h-9 flex-1 rounded-md bg-white text-black text-[12px] font-semibold"
                    >
                        사진 공유하기
                    </button>

                    <button
                        onClick={onClose}
                        className="h-9 flex-1 rounded-md bg-white/20 text-white text-[12px] font-semibold"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}