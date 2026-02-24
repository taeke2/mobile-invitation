"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    /** 최종 값 */
    to: number;
    /** 시작 값 (기본 0) */
    from?: number;
    /** 애니메이션 시간(ms) */
    durationMs?: number;
    /** 2자리/3자리 등 자릿수 패딩 */
    padStart?: number;
    /** className */
    className?: string;

    /** ✅ 화면에 보일 때 시작 */
    startOnView?: boolean;
    /** IntersectionObserver threshold */
    threshold?: number;
    /** 한 번만 실행(기본 true). false면 다시 화면에 들어올 때마다 재시작 */
    once?: boolean;
};

function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export default function CountUpNumber({
                                          to,
                                          from = 0,
                                          durationMs = 1200,
                                          padStart = 2,
                                          className,

                                          startOnView = false,
                                          threshold = 0.25,
                                          once = true,
                                      }: Props) {
    const safeTo = useMemo(() => Math.max(0, Math.floor(to)), [to]);
    const safeFrom = useMemo(() => Math.max(0, Math.floor(from)), [from]);

    const wrapRef = useRef<HTMLSpanElement | null>(null);
    const [value, setValue] = useState(safeFrom);
    const [canStart, setCanStart] = useState(!startOnView);

    // ✅ 뷰포트 진입 감지
    useEffect(() => {
        if (!startOnView) return;

        const el = wrapRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setCanStart(true);
                    if (once) io.disconnect();
                } else {
                    // once=false면 화면 밖으로 나가면 다시 시작 대기 상태로
                    if (!once) {
                        setCanStart(false);
                        setValue(safeFrom);
                    }
                }
            },
            { threshold }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [startOnView, threshold, once, safeFrom]);

    // ✅ 카운트업 실행
    useEffect(() => {
        if (!canStart) return;

        let raf = 0;
        let startTs: number | null = null;

        // 값이 같으면 바로 세팅
        if (safeTo === safeFrom) {
            setValue(safeTo);
            return;
        }

        const step = (ts: number) => {
            if (startTs === null) startTs = ts;

            const elapsed = ts - startTs;
            const t = Math.min(elapsed / durationMs, 1);
            const eased = easeOutCubic(t);

            const current = Math.round(safeFrom + (safeTo - safeFrom) * eased);
            setValue(current);

            if (t < 1) raf = requestAnimationFrame(step);
        };

        // 시작 직전에 초기값 세팅
        setValue(safeFrom);
        raf = requestAnimationFrame(step);

        return () => cancelAnimationFrame(raf);
    }, [canStart, safeFrom, safeTo, durationMs]);

    const text = String(value).padStart(padStart, "0");

    return (
        <span ref={wrapRef} className={className}>
      {text}
    </span>
    );
}