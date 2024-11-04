import { Request } from "express";
import { prismaClient } from "../application/database";
import { cache } from "../utils/catch";
import { Product } from "@prisma/client";

const getRandomCategories = (categories: any[], n: number) => {
    const shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

const getServiceCategory = async (req: Request) => {
    const cacheKey = `categories`;

    const cachedData: any[] | null = await cache.get(cacheKey);
    if (cachedData !== null) {
        const randomCategories = getRandomCategories(cachedData, 4);
        return {
            response_time: "from_cache",
            categories: randomCategories,
        };
    }

    const categories = await prismaClient.category.findMany({
        select: { id: true, name: true, slug: true }, // Select only necessary fields
    });

    await cache.set(cacheKey, categories);

    const randomCategories = getRandomCategories(categories, 4);
    return {
        response_time: "from_database",
        categories: randomCategories,
    };
};

const getServiceCatalogue = async (req: Request) => {
    const {
        search = "",
        limit,
        category = "",
        page,
        platform = "",
        is_approved = "",
    } = req.query;

    const parsedLimit = parseInt(limit as string) || 10;
    const parsedPage = parseInt(page as string) || 1;

    const whereClause: any = { stock: { gt: 0 } };

    if (is_approved) whereClause.isApproved = is_approved === "true";
    if (category) whereClause.category = { slug: category.toString() };
    if (search)
        whereClause.name = {
            contains: search.toString(),
            mode: "insensitive",
        };

    const cacheKey = `product_${parsedLimit}_${category}_${platform}_${is_approved}_${parsedPage}`;

    const cachedData: {
        products?: Product[];
        totalPage?: number;
    } | null = await cache.get(cacheKey);

    if (
        cachedData &&
        cachedData.products &&
        cachedData.totalPage !== undefined
    ) {
        return {
            response_time: "from_cache",
            products: cachedData.products,
            totalPage: cachedData.totalPage,
        };
    }

    const catalogues = await prismaClient.product.findMany({
        where: whereClause,
        select: {
            toko: {
                select: {
                    name: true,
                    slug: true,
                    country: true,
                },
            },
            name: true,
            slug: true,
            price: true,
            discount_price: true,
            rating: true,
            stock: true,
            imageUrls: true,
        },
        take: parsedLimit,
        skip: parsedLimit * (parsedPage - 1),
    });

    await cache.set(cacheKey, { products: catalogues });

    return {
        response_time: "from_database",
        products: catalogues,
    };
};

const getServiceTokoProduct = async (req: Request) => {
    const { slug } = req.params;
    const { limit, page } = req.query;

    const parsedLimit = parseInt(limit as string) || 10;
    const parsedPage = parseInt(page as string) || 1;

    const cacheKey = `tokoproduct_${slug}_${parsedLimit}_${parsedPage}`;

    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
        return {
            response_time: "from_cache",
            toko: cachedData,
        };
    }

    const toko = await prismaClient.toko.findFirst({
        where: {
            slug,
        },
        select: {
            name: true,
            slug: true,
            image_profile: true,
            country: true,
            products: {
                select: {
                    name: true,
                    slug: true,
                    description: true,
                    price: true,
                    discount_price: true,
                    discount: true,
                    rating: true,
                    estimation: true,
                    stock: true,
                    sold: true,
                    isForSale: true,
                    isApproved: true,
                    createdAt: true,
                    updatedAt: true,
                    imageUrls: true,
                    toko: {
                        select: {
                            name: true,
                            slug: true,
                            country: true,
                        },
                    },
                    category: {
                        select: {
                            name: true,
                            slug: true,
                        },
                    },
                },
                take: parsedLimit,
                skip: parsedLimit * (parsedPage - 1),
            },
        },
    });

    await cache.set(cacheKey, toko);

    return {
        response_time: "from_database",
        toko,
    };
};

const getServiceCatalogueBySlug = async (req: Request) => {
    const { toko, slug } = req.params;

    const cacheKey = `product_${toko}_${slug}`;

    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
        return {
            response_time: "from_cache",
            product: cachedData,
        };
    }

    const product = await prismaClient.product.findFirst({
        where: {
            toko: {
                slug: toko,
            },
            slug,
        },
        select: {
            name: true,
            slug: true,
            description: true,
            price: true,
            discount_price: true,
            discount: true,
            rating: true,
            estimation: true,
            stock: true,
            sold: true,
            isForSale: true,
            isApproved: true,
            createdAt: true,
            updatedAt: true,
            imageUrls: true,
            toko: {
                select: {
                    name: true,
                    slug: true,
                    country: true,
                },
            },
        },
    });

    await cache.set(cacheKey, product);

    return {
        response_time: "from_database",
        product,
    };
};

const getServiceUserToko = async (req: Request) => {
    const { id } = req.params;

    const cacheKey = `user_toko_${id}`;

    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
        return {
            response_time: "from_cache",
            user: cachedData,
        };
    }

    const toko = await prismaClient.user.findFirst({
        where: {
            id: id,
        },
        select: {
            toko: {
                select: {
                    name: true,
                    slug: true,
                    image_profile: true,
                    country: true,
                    products: {
                        select: {
                            name: true,
                            slug: true,
                            description: true,
                            price: true,
                            discount_price: true,
                            discount: true,
                            rating: true,
                            estimation: true,
                            stock: true,
                            sold: true,
                            isForSale: true,
                            isApproved: true,
                            createdAt: true,
                            updatedAt: true,
                            imageUrls: true,
                            toko: {
                                select: {
                                    name: true,
                                    slug: true,
                                    country: true,
                                },
                            },
                            category: {
                                select: {
                                    name: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    await cache.set(cacheKey, toko);

    return {
        response_time: "from_database",
        user: toko,
    };
};

export {
    getServiceCategory,
    getServiceCatalogue,
    getServiceTokoProduct,
    getServiceCatalogueBySlug,
    getServiceUserToko,
};
