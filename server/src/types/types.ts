export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    discountPrice: number;
    discount: number;
    rating: number;
    country: string;
    estimation: string;
    stock: number;
    sold: number;
    isForSale: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    imageUrls: string[];
    categoryId?: string;
    category?: Category;
    tokoId?: string;
    toko?: Toko;
}

export interface Toko {
    id: string;
    slug: string;
    name: string;
    imageProfile?: string;
    imageCover?: string;
    createdAt: Date;
    updatedAt: Date;
    products?: Product[];
    userId?: string;
    user?: User;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    products?: Product[];
}

export interface User {
    id: string;
    googleId?: string;
    email: string;
    password?: string;
    displayName: string;
    profilePicture?: string;
    isPremium: boolean;
    createdAt: Date;
    updatedAt: Date;
    toko?: Toko;
}
