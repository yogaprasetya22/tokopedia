"use client";

import { useCurrentCookieStore } from "@/store/cookie-store";
import { UserButton } from "./shared/user-button";

export function Navbar() {
    const cookies = useCurrentCookieStore((state) => state.defaultOpen);
    return (
        <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center">
                <UserButton cookies={cookies} />
            </div>
        </header>
    );
}
