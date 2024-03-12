import React, { useEffect, useState, useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema, ProductInput } from "./productFormSchema";
import { useQuery } from "@tanstack/react-query";
import { CategoryQueryParam, SubCategoryQueryParam } from "../types";
import Select from "react-select";
import SubcategorySelect from "./SubcategorySelect";
import { generateQueryString } from "../../utils/url";

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
  const queryString = generateQueryString({ ...param });
  const url = `${import.meta.env.VITE_BASE_URL}/categories/${queryString}`;
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

// console.log("use category", useCategory);

export const useSubCategory = ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  categoryId,
}: Partial<SubCategoryQueryParam>) => {
  const queryString = generateQueryString({
    page,
    limit,
    sortBy,
    sortOrder,
    categoryId,
  });
  const url = `${import.meta.env.VITE_BASE_URL}/sub-categories/${queryString}`;

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
  const [isPending, setIsPending] = useState(false);

  console.log("initialValue", initialValue);
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
    formState: { errors, defaultValues },
  } = useForm<ProductInput>({
    defaultValues: {
      name: initialValue?.name ?? "",
      price: initialValue?.price ?? "",
      unit: initialValue?.unit ?? "pcs",
      description: initialValue?.description ?? "",
      categoryId: category.find((cat) => initialValue?.id === cat.id) ?? {},
      subCategoryId:
        subCategory.find(
          (subCat) => initialValue?.subCategoryId === subCat.id
        ) ?? {},
    },
    // resolver: zodResolver(ProductFormSchema),
  });

  console.log("defaultValues", defaultValues);
  console.log("category find", category);
  const tokenString = localStorage.getItem("user-info");
  const token = JSON.parse(tokenString);
  const accessToken = token.token;

  const onSubmit: SubmitHandler<ProductInput> = async (data) => {
    // console.log("data", data);
    setIsPending(true)
    const { name, price, unit, description, categoryId, subCategoryId } = data;
    const categoryid = categoryId.id;
    const subcategoryid = subCategoryId.id;
    const formData = {
      name,
      price,
      unit,
      description,
      categoryId: categoryid,
      subCategoryId: subcategoryid,
    };

    const response = await fetch("http://localhost:9000/v1/products", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    // console.log("categoryId", categoryId.id);
    // console.log("subCategoryId", subCategoryId.id);

    // console.log("result", result);
    // if (!result.tokens) {
    //   Swal.fire(result.message);
    // } else {
    //   Swal.fire(`Welcome ${result.user.name}`);
    //   //   history("/products");
    //   reset();
    //   console.log("user name", result.user.name);
    // }
    setIsPending(false)
  };

  // console.log(errors);
  // console.log("subCategory", subCategory);
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
          Unit:
          <input type="text" step="0.01" {...register("unit")} />
          <span style={{ color: "red" }}>{errors.unit?.message}</span>
        </label>
        <br />

        <label>
          Description:
          <input type="text" step="0.01" {...register("description")} />
          <span style={{ color: "red" }}>{errors.description?.message}</span>
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
                  value={value}
                  isClearable
                  isSearchable
                  defaultValue={value}
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

        <button type="submit" disabled={isPending} >
          {initialValue?.id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
