"use client";

import { useCurrentProduct } from "@/hooks/use-products";
import { DetailProduct } from "../components/detail-product";
import { DetailProductSkeleton } from "../components/sekeleton-detail-product";

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
                {/* <DetailProductSkeleton /> */}
                {isLoading ? (
                    <DetailProductSkeleton />
                ) : (
                    product && <DetailProduct product={product} />
                )}
            </div>
        </div>
    );
}
