export interface TypeProduct {
    name: string;
    slug: string;
    description?: string;
    price: number;
    discount_price: number;
    discount: number;
    rating: number;
    estimation: string;
    stock: number;
    sold: number;
    isForSale: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
    imageUrls: string[];
    categoryId?: string;
    category?: TypeCategory;
    tokoId?: string;
    toko?: TypeToko;
}

export interface TypeToko {
    slug: string;
    name: string;
    image_profile?: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
    products?: TypeProduct[];
    userId?: string;
    user?: TypeUser;
}

export interface TypeCategory {
    name: string;
    slug: string;
    description?: string;
    products?: TypeProduct[];
}

export interface TypeUser {
    googleId?: string;
    email: string;
    password?: string;
    displayName: string;
    profilePicture?: string;
    isPremium: boolean;
    createdAt: Date;
    updatedAt: Date;
    toko?: TypeToko[];
}
