import { prismaClient } from "../src/application/database";
import { Casing } from "./dummy/casing";
import { dataCategory } from "./dummy/data";
import { DekorasiKamar } from "./dummy/dekorasi-kamar";
import { Handphone } from "./dummy/handphone";
import { Otomotif } from "./dummy/otomotif";
import { PcGaming } from "./dummy/pc_gaming";

async function main() {
    const user = await prismaClient.user.create({
        data: {
            displayName: "MOCHAMMAD YOGA PRASETYA",
            email: "yogaagle321z@gmail.com",
            googleId: null,
            id: "893b5ba4-07b2-429c-b16f-e70fb40167f6",
            isPremium: false,
            password:
                "$2b$10$Q5j7yGTdYvJtxXi2eyY4tOPmaoJ8pcoPR8AwfnVGK4xUqDOU/BPMW",
            profilePicture: null,
            updatedAt: "2024-10-29T13:48:45.145Z",
        },
    });

    const categories = dataCategory.map((category) => {
        return prismaClient.category.create({
            data: category,
        });
    });
    await prismaClient.$transaction(categories);

    const data_casing = Casing.map((product: any) => {
        return prismaClient.product.create({
            data: {
                name: product.product_name,
                slug: product.slug,
                description: product.description,
                price: parseFloat(product.price.replace(/\D/g, "")),
                discount:
                    product.discount !== "null"
                        ? parseFloat(product.discount.replace(/\D/g, ""))
                        : 0,
                discount_price:
                    product.discount_price !== "null"
                        ? parseFloat(
                              product.discount_price
                                  .replace(/\D/g, "")
                                  .replace(/\./g, "")
                          )
                        : 0,
                rating:
                    product.rating !== "null"
                        ? parseFloat(product.rating.replace(/\D/g, ""))
                        : 0,
                estimation: product.estimation,
                stock:
                    product.stock !== "Habis"
                        ? parseInt(
                              product.stock
                                  .replace(/\D/g, "")
                                  .replace(/[^0-9]/g, ""),
                              10
                          )
                        : 100,
                sold:
                    product.sold !== "null"
                        ? parseInt(product.sold.replace(/\D/g, ""), 10)
                        : 0,
                isForSale: product.discount !== "null" ? true : false,
                isApproved: true,
                imageUrls:
                    product.image_url.length > 1
                        ? product.image_url.map((image: string) => image)
                        : [],
                category: {
                    connect: {
                        slug: product.category,
                    },
                },
                toko: {
                    connectOrCreate: {
                        where: { slug: product.toko.username },
                        create: {
                            slug: product.toko.username,
                            name: product.toko.toko_name,
                            image_profile: product.toko.image_toko,
                            country: product.country,
                            userId: user.id,
                        },
                    },
                },
            },
        });
    });

    await prismaClient.$transaction(data_casing);

    const data_otomotif = Otomotif.map((product: any) => {
        return prismaClient.product.create({
            data: {
                name: product.product_name,
                slug: product.slug,
                description: product.description,
                price: parseFloat(product.price.replace(/\D/g, "")),
                discount:
                    product.discount !== "null"
                        ? parseFloat(product.discount.replace(/\D/g, ""))
                        : 0,
                discount_price:
                    product.discount_price !== "null"
                        ? parseFloat(
                              product.discount_price
                                  .replace(/\D/g, "")
                                  .replace(/\./g, "")
                          )
                        : 0,
                rating:
                    product.rating !== "null"
                        ? parseFloat(product.rating.replace(/\D/g, ""))
                        : 0,
                estimation: product.estimation,
                stock:
                    product.stock !== "Habis"
                        ? parseInt(
                              product.stock
                                  .replace(/\D/g, "")
                                  .replace(/[^0-9]/g, ""),
                              10
                          )
                        : 100,
                sold:
                    product.sold !== "null"
                        ? parseInt(product.sold.replace(/\D/g, ""), 10)
                        : 0,
                isForSale: product.discount !== "null" ? true : false,
                isApproved: true,
                imageUrls:
                    product.image_url.length > 1
                        ? product.image_url.map((image: string) => image)
                        : [],
                category: {
                    connect: {
                        slug: product.category,
                    },
                },
                toko: {
                    connectOrCreate: {
                        where: { slug: product.toko.username },
                        create: {
                            slug: product.toko.username,
                            name: product.toko.toko_name,
                            image_profile: product.toko.image_toko,
                            country: product.country,
                            userId: user.id,
                        },
                    },
                },
            },
        });
    });

    await prismaClient.$transaction(data_otomotif);

    const data_handphone = Handphone.map((product: any) => {
        return prismaClient.product.create({
            data: {
                name: product.product_name,
                slug: product.slug,
                description: product.description,
                price: parseFloat(product.price.replace(/\D/g, "")),
                discount:
                    product.discount !== "null"
                        ? parseFloat(product.discount.replace(/\D/g, ""))
                        : 0,
                discount_price:
                    product.discount_price !== "null"
                        ? parseFloat(
                              product.discount_price
                                  .replace(/\D/g, "")
                                  .replace(/\./g, "")
                          )
                        : 0,
                rating:
                    product.rating !== "null"
                        ? parseFloat(product.rating.replace(/\D/g, ""))
                        : 0,
                estimation: product.estimation,
                stock:
                    product.stock !== "Habis"
                        ? parseInt(
                              product.stock
                                  .replace(/\D/g, "")
                                  .replace(/[^0-9]/g, ""),
                              10
                          )
                        : 100,
                sold:
                    product.sold !== "null"
                        ? parseInt(product.sold.replace(/\D/g, ""), 10)
                        : 0,
                isForSale: product.discount !== "null" ? true : false,
                isApproved: true,
                imageUrls:
                    product.image_url.length > 1
                        ? product.image_url.map((image: string) => image)
                        : [],
                category: {
                    connect: {
                        slug: product.category,
                    },
                },
                toko: {
                    connectOrCreate: {
                        where: { slug: product.toko.username },
                        create: {
                            slug: product.toko.username,
                            name: product.toko.toko_name,
                            image_profile: product.toko.image_toko,
                            country: product.country,
                            userId: user.id,
                        },
                    },
                },
            },
        });
    });

    await prismaClient.$transaction(data_handphone);

    const data_pc_gaming = PcGaming.map((product: any) => {
        return prismaClient.product.create({
            data: {
                name: product.product_name,
                slug: product.slug,
                description: product.description,
                price: parseFloat(product.price.replace(/\D/g, "")),
                discount:
                    product.discount !== "null"
                        ? parseFloat(product.discount.replace(/\D/g, ""))
                        : 0,
                discount_price:
                    product.discount_price !== "null"
                        ? parseFloat(
                              product.discount_price
                                  .replace(/\D/g, "")
                                  .replace(/\./g, "")
                          )
                        : 0,
                rating:
                    product.rating !== "null"
                        ? parseFloat(product.rating.replace(/\D/g, ""))
                        : 0,
                estimation: product.estimation,
                stock:
                    product.stock !== "Habis"
                        ? parseInt(
                              product.stock
                                  .replace(/\D/g, "")
                                  .replace(/[^0-9]/g, ""),
                              10
                          )
                        : 100,
                sold:
                    product.sold !== "null"
                        ? parseInt(product.sold.replace(/\D/g, ""), 10)
                        : 0,
                isForSale: product.discount !== "null" ? true : false,
                isApproved: true,
                imageUrls:
                    product.image_url.length > 1
                        ? product.image_url.map((image: string) => image)
                        : [],
                category: {
                    connect: {
                        slug: product.category,
                    },
                },
                toko: {
                    connectOrCreate: {
                        where: { slug: product.toko.username },
                        create: {
                            slug: product.toko.username,
                            name: product.toko.toko_name,
                            image_profile: product.toko.image_toko,
                            country: product.country,
                            userId: user.id,
                        },
                    },
                },
            },
        });
    });

    await prismaClient.$transaction(data_pc_gaming);

    const data_dekorasi_kamar = DekorasiKamar.map((product: any) => {
        return prismaClient.product.create({
            data: {
                name: product.product_name,
                slug: product.slug,
                description: product.description,
                price: parseFloat(product.price.replace(/\D/g, "")),
                discount:
                    product.discount !== "null"
                        ? parseFloat(product.discount.replace(/\D/g, ""))
                        : 0,
                discount_price:
                    product.discount_price !== "null"
                        ? parseFloat(
                              product.discount_price
                                  .replace(/\D/g, "")
                                  .replace(/\./g, "")
                          )
                        : 0,
                rating:
                    product.rating !== "null"
                        ? parseFloat(product.rating.replace(/\D/g, ""))
                        : 0,
                estimation: product.estimation,
                stock:
                    product.stock !== "Habis"
                        ? parseInt(
                              product.stock
                                  .replace(/\D/g, "")
                                  .replace(/[^0-9]/g, ""),
                              10
                          )
                        : 100,
                sold:
                    product.sold !== "null"
                        ? parseInt(product.sold.replace(/\D/g, ""), 10)
                        : 0,
                isForSale: product.discount !== "null" ? true : false,
                isApproved: true,
                imageUrls:
                    product.image_url.length > 1
                        ? product.image_url.map((image: string) => image)
                        : [],
                category: {
                    connect: {
                        slug: product.category,
                    },
                },
                toko: {
                    connectOrCreate: {
                        where: { slug: product.toko.username },
                        create: {
                            slug: product.toko.username,
                            name: product.toko.toko_name,
                            image_profile: product.toko.image_toko,
                            country: product.country,
                            userId: user.id,
                        },
                    },
                },
            },
        });
    });

    await prismaClient.$transaction(data_dekorasi_kamar);

    console.log("Seed data category successfully");
}
main()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaClient.$disconnect();
        process.exit(1);
    });
