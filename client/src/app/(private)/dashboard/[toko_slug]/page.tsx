"use client";

import { Button } from "@/components/ui/button";
import { useCurrentToko } from "@/hooks/use-products";
import Image from "next/image";

export default function Dashboard({
    params,
}: {
    params: { toko_slug: string };
}) {
    const { toko, isLoading } = useCurrentToko(params.toko_slug);
    return (
        <div className="w-full bg-white flex justify-center">
            <div className="max-w-[75rem]">
            </div>
            {isLoading ? (
                <div className=" h-[64px] w-[216px] p-2 bg-gray-300 animate-pulse"></div>
            ) : (
                toko && (
                    <div className="w-full flex flex-col max-w-[80rem] pt-5 ">
                        <div className="flex flex-1 flex-col">
                            <div className="grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-4 content-stretch w-full ">
                                {toko &&
                                    toko.products?.map((product, index) => (
                                        <Button
                                            key={index}
                                            className="rounded shadow-lg m-1 md:m-2 w-full bg-neutral-50 border"
                                        >
                                            <div className="w-full ">
                                                <Image
                                                    src={product?.imageUrls[0]}
                                                    alt={product?.name}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-auto object-cover rounded-t-lg"
                                                />
                                            </div>
                                            <div className="px-2 py-4 space-y-1">
                                                <div className="truncate-2-lines text-sm text-gray-700">
                                                    {product?.name}
                                                </div>
                                                <p className="text-gray-900 font-bold md:text-md text-sm">
                                                    {product?.price.toLocaleString(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        }
                                                    )}
                                                </p>
                                                {product?.isForSale && (
                                                    <div className="space-x-1 flex items-center">
                                                        <p className="text-gray-500 line-through md:text-md text-xs">
                                                            {product?.discount_price.toLocaleString(
                                                                "id-ID",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "IDR",
                                                                    minimumFractionDigits: 0,
                                                                }
                                                            )}
                                                        </p>
                                                        <span className="text-red-400 text-xs font-extrabold">
                                                            {product?.discount}%
                                                        </span>
                                                    </div>
                                                )}
                                                <p className="text-gray-600 md:text-md text-xs ">
                                                    {product?.toko?.country.replace(
                                                        /^Dikirim dari\s+/i,
                                                        ""
                                                    )}
                                                </p>
                                            </div>
                                        </Button>
                                    ))}
                                {isLoading &&
                                    Array.from({ length: 12 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-5 rounded-lg shadow-lg m-1 md:m-2 w-full bg-neutral-100"
                                            >
                                                <div className="animate-pulse h-[20vh] w-full bg-gray-200/80 rounded-t-lg"></div>
                                                <div className="flex flex-col p-4 gap-5">
                                                    <div className="animate-pulse h-3 w-36 bg-green-200 rounded-xl"></div>
                                                    <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                                                    <div className="animate-pulse h-3 w-24 bg-pink-200 rounded-xl"></div>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
