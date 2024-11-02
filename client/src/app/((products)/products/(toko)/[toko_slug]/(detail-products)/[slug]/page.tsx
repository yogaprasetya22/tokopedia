"use client";

import SimpleImageMagnifier from "@/components/ui/image-zoom";
import { useCurrentProduct } from "@/hooks/use-products";
import { useState, useEffect } from "react";
import { TypeProduct as TypeCurrentProduct } from "@/type/utils-type";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MapPinCheck, ShoppingCart, StarIcon } from "lucide-react";
import { CarouselSize } from "../components/carosul-size";
import Link from "next/link";

export default function Product({
    params,
}: {
    params: { slug: string; toko_slug: string };
}) {
    const { isLoading, product } = useCurrentProduct(
        params.toko_slug,
        params.slug
    );
    return (
        <div className="w-full flex flex-col">
            <div className="w-full bg-white flex justify-center">
                {isLoading ? (
                    <div className=" h-[64px] w-[216px] p-2 bg-gray-300 animate-pulse"></div>
                ) : (
                    product && <DetailProduct product={product} />
                )}
            </div>
        </div>
    );
}

const DetailProduct = ({ product }: { product: TypeCurrentProduct }) => {
    const [mainImage, setMainImage] = useState<string | undefined>(
        product.imageUrls[0]
    );
    const [loadMore, setLoadMore] = useState<boolean>(false);

    useEffect(() => {
        if (product && product.imageUrls.length > 0) {
            setMainImage(product.imageUrls[0]);
        }
    }, [product]);

    const handleImageClick = (src: string) => {
        setMainImage(src);
    };

    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    };

    return (
        <div className="w-full max-w-[80rem] flex pt-5 md:flex-row flex-col ">
            <aside className="w-full mx-0 md:-mx-8">
                <div className="flex flex-col items-center gap-2 sticky top-[100px] select-none">
                    {mainImage && (
                        <SimpleImageMagnifier
                            srcPreview={mainImage}
                            srcOriginal={mainImage}
                            width={380}
                            height={380}
                            className="w-full object-cover"
                        />
                    )}
                    {product.imageUrls && (
                        <div className="mx-4 md:mx-0">
                            <CarouselSize
                                images={product.imageUrls}
                                onImageClick={handleImageClick}
                            />
                        </div>
                    )}
                </div>
            </aside>
            <main className="flex flex-col gap-2 w-full px-4 md:px-0">
                <h1 className="text-lg font-bold">{product.name}</h1>
                <div className=" inline-flex space-x-2 w-full">
                    <p className="text-sm  text-black font-medium">
                        Terjual{" "}
                        <span className="text-gray-600 font-light">
                            {product.sold}+
                        </span>
                    </p>
                    <span className="font-semibold">.</span>
                    <div className="inline-flex ">
                        <span className="-mt-1">
                            <svg
                                className=" inline-block mr-2 align-middle"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="var(--YN300, #FFC400)"
                            >
                                <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                            </svg>
                        </span>
                        <p className="text-sm  text-black font-semibold">
                            {product.rating < 5
                                ? (product.rating ?? 0) / 10
                                : 5}
                        </p>
                    </div>
                </div>
                <p className="text-3xl text-black font-semibold">
                    {product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                    })}
                </p>
                {product.isForSale && (
                    <div className="space-x-1 flex items-center">
                        <span className="text-red-500 text-xs font-extrabold bg-red-200 px-[4px] py-[1px]">
                            {product.discount}%
                        </span>
                        <p className="text-gray-400 line-through md:text-md text-sm font-semibold">
                            {product.discount_price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                            })}
                        </p>
                    </div>
                )}
                <Separator className="my-2" />
                <div className="flex flex-col">
                    <Button
                        variant="ghost"
                        className="w-20 border-b-2 border-green-500 text-green-500 font-semibold rounded-none"
                    >
                        Detail
                    </Button>
                    <Separator />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500 font-medium">
                        Kondisi: <span className="text-black">Baru</span>
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                        Min. Pemesanan: <span className="text-black">Baru</span>
                    </p>
                    <p
                        className={cn(
                            "text-sm text-black transition-all ease-in-out max-w-md break-words",
                            loadMore ? "" : "truncate-10-lines"
                        )}
                        dangerouslySetInnerHTML={{
                            __html: product.description || "",
                        }}
                    />
                </div>
                <Button
                    variant="link"
                    className=" text-start text-green-500 font-semibold"
                    onClick={handleLoadMore}
                >
                    {loadMore ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                </Button>
                <Separator />
                <div className="flex flex-row gap-4 w-full justify-between py-2">
                    <div className="flex flex-row gap-4">
                        {product?.toko?.image_profile && (
                            <Image
                                src={product.toko.image_profile}
                                alt="store-image"
                                width={100}
                                height={100}
                                className="w-12 h-12 rounded-full"
                            />
                        )}
                        <div className="flex flex-col gap-2 py-2">
                            <Button
                                variant={"link"}
                                className="text-black font-bold"
                            >
                                <Link
                                    href={`${origin}/products/${product?.toko?.slug}`}
                                    className="text-sm text-black font-semibold flex items-center gap-2"
                                >
                                    <Image
                                        src="https://images.tokopedia.net/img/official_store/badge_os.png"
                                        alt="verified"
                                        width={20}
                                        height={20}
                                        className="w-4 h-4"
                                    />
                                    {product?.toko?.name}
                                </Link>
                            </Button>
                            <p className="text-sm text-gray-500 font-medium">
                                Online{" "}
                                <span className="text-gray-600">
                                    1 jam lalu
                                </span>
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
                <Separator />
                <div className="flex flex-col gap-2 py-2">
                    <h1 className="text-lg font-semibold">Pengiriman</h1>
                    <p className="text-sm text-black font-medium flex items-center gap-2">
                        <MapPinCheck size={16} /> Dikirim dari{" "}
                        {product.toko?.country.replace(/^Dikirim dari\s+/i, "")}
                    </p>
                    <p className="text-sm text-black font-medium flex items-center gap-2">
                        <ShoppingCart size={16} /> {product.estimation}
                    </p>
                </div>
                <Separator />
                <br />
            </main>

            <aside className="w-[65%] hidden md:flex flex-col gap-4 pl-[2.5rem] pr-10 pt-0 pb-2">
                <div className="flex flex-col items-center gap-2 sticky top-[100px] select-none">
                    <h1 className="w-full  from-green-800/80 to-green-500 px-4 py-2 bg-gradient-to-r rounded-lg text-extrabold text-white text-lg">
                        Beli Sekarang
                    </h1>
                    <div className="flex flex-col gap-4 w-full justify-between py-2 border border-green-600/60 rounded-lg p-4">
                        <h1 className="text-lg font-semibold">
                            Atur jumlah dan catatan
                        </h1>
                        <div className="flex gap-2 items-center">
                            <Image
                                src={product.imageUrls[0] || ""}
                                alt="product"
                                width={100}
                                height={100}
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                        </div>
                        <Separator />
                        <div className="flex gap-2 items-center">
                            <div className="flex flex-row items-center gap-2 border border-green-600/60 rounded-md">
                                <Button
                                    variant="ghost"
                                    className="border-green-600 text-green-600 font-semibold rounded-lg px-4"
                                >
                                    -
                                </Button>
                                <p className="text-sm text-black font-semibold">
                                    1
                                </p>
                                <Button
                                    variant="ghost"
                                    className="border-green-600 text-green-600 font-semibold rounded-lg px-4"
                                >
                                    +
                                </Button>
                            </div>
                            <h1 className="text-sm text-black font-semibold">
                                Stock: {product.stock}
                            </h1>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-md text-black font-medium">
                                Subtotal
                            </p>
                            <div className="flex flex-col gap-2 items-end">
                                {product.isForSale && (
                                    <p className="text-sm text-gray-400 line-through font-semibold">
                                        {product.discount_price.toLocaleString(
                                            "id-ID",
                                            {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }
                                        )}
                                    </p>
                                )}
                                <p className="text-lg text-black font-semibold">
                                    {product.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button variant="signUp">+ Keranjang</Button>
                            <Button variant="signIn">Beli Sekarang</Button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};
