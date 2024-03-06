export interface QueryParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

export interface CategoryQueryParam extends QueryParams {}

export interface SubCategoryQueryParam extends QueryParams {
  categoryId?: string
}
