import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema, ProductInput } from "./productFormSchema";
import { useQuery } from "@tanstack/react-query";
import { CategoryQueryParam, SubCategoryQueryParam } from "../types";
import Select from "react-select";
import SubcategorySelect from "./SubcategorySelect";

type ProductFormProps = {
  initialValue?: Product;
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  Product?: Product[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export type SubcategoryResponse = {
  data: SubCategory[];
  count: number;
};

const useCategory = (param?: CategoryQueryParam) => {
  const url = `${import.meta.env.VITE_BASE_URL}/categories/`;
  const { isLoading, data, error } = useQuery({
    queryKey: ["allCategory"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
  return {
    category: ((data && data.data) ?? []) as Category[],
    count: (data && data.count) ?? 1,
    isLoading: isLoading,
    error: error,
  };
};

console.log('use category',useCategory);

export const useSubCategory = ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  categoryId,
}: Partial<SubCategoryQueryParam>) => {
  let url = `${
    import.meta.env.VITE_BASE_URL
  }/sub-categories?page=${page}&limit=${limit}`;

  if (categoryId) {
    url += `&categoryId=${categoryId}`;
  }
  console.log("changed");

  const { isLoading, data, error } = useQuery({
    queryKey: ["allSubCategory"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
  return {
    subCategory: ((data && data.data) ?? []) as SubCategory[],
    count: (data && data.count) ?? 1,
    isLoading: isLoading,
    error: error,
  };
};

export default function ProductForm({ initialValue }: ProductFormProps) {
  const [cat, setCat] = useState<Category>();
  const { category, isLoading, error } = useCategory();
  const {
    subCategory,
    isLoading: subIsLoading,
    error: subError,
  } = useSubCategory({
    limit: 1000,
    page: 0,
    categoryId: cat?.id,
  });
  const {
    register,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: initialValue?.name ?? "",
      price: initialValue?.price ?? "",
      categoryId: category.find((cat) => initialValue?.id === cat.id) ?? {},
      subCategoryId:
        subCategory.find(
          (subCat) => initialValue?.subCategoryId === subCat.id
        ) ?? {},
    },
    // resolver: zodResolver(ProductFormSchema),
  });

  const onSubmit: SubmitHandler<ProductInput> = (data) => {
    console.log('data',data)
    
  };

  // console.log(errors);
  console.log("subCategory", subCategory);
  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>AddProduct</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" {...register("name")} />
          <span style={{ color: "red" }}>{errors.name?.message}</span>
        </label>
        <br />
        {/* <Controller 
         name="price"
         control={control}
         render={({field: {value, onChange}})=>{
            value = value as number;
            return <input type="number" value={value} onChange={onChange}/>
         }}
        /> */}
        <label>
          Price:
          <input type="number" step="0.01" {...register("price")} />
          <span style={{ color: "red" }}>{errors.price?.message}</span>
        </label>
        <br />

        <label>
          Category:
          <Controller
            name="categoryId"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  options={category}
                  isLoading={isLoading}
                  value={category.find((cat) => cat.id == value.id)}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(val) => {
                    setCat(cat);
                    onChange(val);
                  }}
                />
              );
            }}
          />
          <span style={{ color: "red" }}>{errors.categoryId?.message}</span>
        </label>
        <br />
        <label>
          Sub-Category:
          <Controller
            name="subCategoryId"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  options={subCategory}
                  isLoading={subIsLoading}
                  value={subCategory.find((cat) => cat.id == value.id)}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(val) => {
                    onChange(val);
                  }}
                />
              );
            }}
          />
          <span style={{ color: "red" }}>{errors.subCategoryId?.message}</span>
        </label>

        <br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
