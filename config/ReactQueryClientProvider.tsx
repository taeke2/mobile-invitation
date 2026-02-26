"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 이 변수, 즉 상수 값 같은 경우에는 쿼리 관련된 요청을 하는 모든 요청들에 대한 캐시 역할을 한다
export const queryClient = new QueryClient({});

export default function ReactQueryClientProvider({
                                                     children,
                                                 }: React.PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}