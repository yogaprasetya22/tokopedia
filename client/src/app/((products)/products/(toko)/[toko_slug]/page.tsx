"use client";

import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useCurrentToko } from "@/hooks/use-products";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page({ params }: { params: { toko_slug: string } }) {
    const { isLoading, toko } = useCurrentToko(params.toko_slug);
    const origin = useOrigin();
    return (
        <div className="w-full bg-white flex justify-center">
            {isLoading ? (
                <div className=" h-[64px] w-[216px] p-2 bg-gray-300 animate-pulse"></div>
            ) : (
                toko && (
                    <div className="w-full flex flex-col max-w-[80rem] pt-5 ">
                        <div className="w-full border border-gray-300 rounded-md px-5 py-2">
                            <div className="flex flex-row gap-4 w-full justify-between py-2">
                                <div className="flex flex-row gap-4">
                                    {toko?.image_profile && (
                                        <Image
                                            src={toko.image_profile}
                                            alt="store-image"
                                            width={100}
                                            height={100}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    )}
                                    <div className="flex flex-col gap-2 py-2">
                                        <Link
                                            href={`${origin}/products/${toko?.slug}`}
                                            className="text-sm text-black font-semibold flex items-center gap-2"
                                        >
                                            <Image
                                                src="https://images.tokopedia.net/img/official_store/badge_os.png"
                                                alt="verified"
                                                width={20}
                                                height={20}
                                                className="w-4 h-4"
                                            />
                                            {toko?.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 font-medium">
                                            Online{" "}
                                            <span className="text-gray-600">
                                                1 jam lalu
                                            </span>
                                            {" • "}
                                            {toko?.country.replace(
                                                /^Dikirim dari\s+/i,
                                                ""
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                                            <StarIcon size={16} /> 4.8
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="border-green-600 text-green-600 font-semibold rounded-lg px-10"
                                >
                                    Follow
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <div className="grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-4 content-stretch w-full ">
                                {toko &&
                                    toko.products?.map((product, index) => (
                                        <Link
                                            key={index}
                                            href={`${origin}/products/${product?.toko?.slug}/${product?.slug}`}
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
                                        </Link>
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
