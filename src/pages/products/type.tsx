export interface Product {
    id: string;
    categoryId: string;
    subCategoryId: string;
    name: string;
    slug: string;
    price: string;
    unit: string;
    image: string | null;
    video: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}