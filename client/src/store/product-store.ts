import { useMemo } from "react";
import { create } from "zustand";

export interface ICategoryStore {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
}

export interface ICatalogueStore {
    isNextPageLoading: boolean;
    setNextPageLoading: (isLoading: boolean) => void;
    catalogue: any[];
    clearCatalogue: () => void;
    setCatalogue: (catalogue: any[]) => void;
    addCatalogue: (catalogue: any[]) => void;
}

export interface IPageStore {
    page: number;
    totalPages: number;
    clearPage: () => void;
    setPage: (page: number) => void;
    addPage: () => void;
    setTotalPages: (totalPages: number) => void;
}

export const useCategoryStore = create<ICategoryStore>((set) => ({
    currentCategory: "pc-gaming",
    setCurrentCategory: (category: string) =>
        set({ currentCategory: category }),
}));

export const useCatalogueStore = create<ICatalogueStore>((set) => ({
    isNextPageLoading: false,
    setNextPageLoading: (isLoading: boolean) =>
        set({ isNextPageLoading: isLoading }),
    catalogue: [],
    clearCatalogue: () => set({ catalogue: [] }),
    setCatalogue: (catalogue: any[]) => set({ catalogue }),
    addCatalogue: (catalogue: any[]) =>
        set((state: any) => ({
            catalogue: [...state.catalogue, ...catalogue],
        })),
}));

export const usePageStore = create<IPageStore>((set) => ({
    page: 1,
    totalPages: 1,
    clearPage: () => set({ page: 1 }),
    setPage: (page: number) => set({ page }),
    addPage: () => set((state: any) => ({ page: state.page + 1 })),
    setTotalPages: (totalPages: number) => set({ totalPages }),
}));

export const useManageCategory = () => {
    const setCurrentCategory = useCategoryStore(
        (state) => state.setCurrentCategory
    );
    const clearCatalogue = useCatalogueStore((state) => state.clearCatalogue);
    const clearPage = usePageStore((state) => state.clearPage);

    const changeCategory = useMemo(
        () => (category: string) => {
            setCurrentCategory(category);
            clearCatalogue();
            clearPage();
        },
        [setCurrentCategory, clearCatalogue, clearPage]
    );

    return { changeCategory };
};
