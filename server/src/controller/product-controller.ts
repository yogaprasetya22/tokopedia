import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import {
    getServiceCatalogue,
    getServiceCatalogueBySlug,
    getServiceCategory,
    getServiceTokoProduct,
    getServiceUserToko,
} from "../service/product-service";

const getCategory = catchAsync(async (req: Request, res: Response) => {
    const category = await getServiceCategory(req);
    res.status(200).json(category);
});

const getCatalogue = catchAsync(async (req: Request, res: Response) => {
    const catelogue = await getServiceCatalogue(req);
    res.status(200).json(catelogue);
});

const getTokoProduct = catchAsync(
    async (req: Request, res: Response) => {
        const tokoProduct = await getServiceTokoProduct(req);
        res.status(200).json(tokoProduct);
    }
);

const getCatalogueBySlug = catchAsync(
    async (req: Request, res: Response) => {
        const catalogueBySlug = await getServiceCatalogueBySlug(req);
        res.status(200).json(catalogueBySlug);
    }
);

const getUserToko = catchAsync(
    async (req: Request, res: Response) => {
        const userToko = await getServiceUserToko(req);
        res.status(200).json(userToko);
    }
);

export default {
    getCategory,
    getCatalogue,
    getTokoProduct,
    getCatalogueBySlug,
    getUserToko,
};
