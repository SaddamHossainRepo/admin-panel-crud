export interface QueryParams {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}

export interface CategoryQueryParam extends QueryParams {}
export interface ProductsQueryParam extends QueryParams {}

export interface SubCategoryQueryParam extends QueryParams {
  categoryId?: string;
}

export function generateQueryString(params: { [key: string]: any }): string {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined) // Exclude undefined values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return `?${queryString}`;
}
