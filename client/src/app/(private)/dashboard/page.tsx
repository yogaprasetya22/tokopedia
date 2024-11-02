"use client";

import { useCurrentToko } from "@/hooks/use-products";
import { useCurrentUser } from "@/hooks/user-current-user";
import { redirect } from "next/navigation";

const SetupPage = () => {
    const { user } = useCurrentUser();
    // const { toko } = useCurrentToko(params.toko_slug);
};

export default SetupPage;
