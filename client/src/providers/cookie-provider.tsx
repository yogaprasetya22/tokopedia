"use client";

import { useCurrentCookieStore } from "@/store/cookie-store";
import { ReactNode, useEffect } from "react";

interface CookieProviderProps {
    defaultOpen: boolean;
    children: ReactNode;
}

export function CookieProvider({ defaultOpen, children }: CookieProviderProps) {
    const setDefaultOpen = useCurrentCookieStore(
        (state) => state.setDefaultOpen
    );

    useEffect(() => {
        // Set initial state dari cookie yang diterima dari server
        setDefaultOpen(defaultOpen);
    }, [defaultOpen, setDefaultOpen]);

    return <>{children}</>;
}
