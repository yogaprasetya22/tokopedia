import { api } from "@/lib/api";
import { useCategoryStore } from "@/store/product-store";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    TypeProduct as TypeCurrentProduct,
    TypeToko as TypeCurrentToko,
    TypeCategory as TypeCurrentCategory,
} from "@/type/utils-type";
import { useCurrentUser } from "./user-current-user";

const getPosts = async ({
    pageParam = 1,
    currentCategory,
    LIMIT_PAGE,
}: {
    pageParam: number;
    currentCategory: string;
    LIMIT_PAGE: number;
}) => {
    const response = await api.get(
        `/api/v1/catalogue?search=&category=${currentCategory}&limit=${LIMIT_PAGE}&page=${pageParam}&platform=marketplace?is_approved=true`
    );
    return response.data;
};

export const useCurrentCategory = () => {
    const {
        isLoading,
        isError,
        data: categories,
    } = useQuery<TypeCurrentCategory[]>({
        queryKey: ["currentCategory"],
        queryFn: async () => {
            try {
                const response = await api.get("/api/v1/category");
                return response.data.categories;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, categories };
};

export const useCurrentCatalogue = () => {
    const LIMIT_PAGE = 12;
    const currentCategory = useCategoryStore((state) => state.currentCategory);

    const {
        isLoading,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["currentCatalogue", currentCategory],
        queryFn: ({ pageParam }) =>
            getPosts({ pageParam, currentCategory, LIMIT_PAGE }),
        staleTime: 10000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.products.length < LIMIT_PAGE
                ? null
                : allPages.length + 1;
        },
        initialPageParam: 1,
        select: (data) => ({
            pages: data.pages.flatMap((page) => page.products),
        }),
    });
    return {
        isLoading,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};

export const useCurrentToko = (slug_toko: string) => {
    const {
        isLoading,
        isError,
        data: toko,
    } = useQuery<TypeCurrentToko>({
        queryKey: ["currentToko", slug_toko],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/v1/${slug_toko}`);
                return response.data.toko;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
        staleTime: 1000 * 60 * 5, // Cache selama 5 menit
    });

    return { isLoading, isError, toko };
};

export const useCurrentProduct = (slug_toko: string, slug_products: string) => {
    const {
        isLoading,
        isError,
        data: product,
    } = useQuery<TypeCurrentProduct>({
        queryKey: ["currentProduct", slug_products, slug_toko],
        queryFn: async () => {
            try {
                const response = await api.get(
                    `/api/v1/${slug_toko}/${slug_products}`
                );
                return response.data.product;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, product };
};

export const useCurrentUserToko = (id: string) => {
    const {
        isLoading,
        isError,
        data: toko,
    } = useQuery<TypeCurrentToko[]>({
        queryKey: ["currentUserToko", id],
        queryFn: async () => {
            try {
                const response = await api.get(`/api/users/current/${id}`);
                return response.data.user;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { isLoading, isError, toko };
};
