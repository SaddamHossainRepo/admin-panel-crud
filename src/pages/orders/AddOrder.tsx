import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema, ProductInput } from "./productFormSchema";
import { useQuery } from "@tanstack/react-query";
import { CategoryQueryParam, SubCategoryQueryParam } from "../types";
import Select from "react-select";
import SubcategorySelect from "./SubcategorySelect";
import Swal from "sweetalert2";

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

export default function AddOrder({ initialValue }: ProductFormProps) {

  const {
    register,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: initialValue?.name ?? "",
      email: initialValue?.email ?? "",
      password: initialValue?.password ?? "",
    },
    // resolver: zodResolver(ProductFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("form is submitted data", data);
    const { name, email, password } = data;
    // e.preventDefault();
    const response = await fetch("http://localhost:9000/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("result", result);
    if (!result.tokens) {
      Swal.fire(result.message);
    } else {
      Swal.fire(`Welcome ${result.user.name}`);
      //   history("/products");
      reset();
      console.log("user name", result.user.name);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Add New User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            type="text"
            {...register("name", {
              required: "name is required",
              maxLength: {
                value: 20,
                message: "name can be maximum 20 characters",
              },
            })}
            placeholder="Your Name"
          />
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
          Email:
          <input
            type="email"
            step="0.01"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <span style={{ color: "red" }}>
            {errors.email && <p>Please check email</p>}
          </span>
        </label>
        <br />

        <label>
          Password:
          <input
            type="text"
            step="0.01"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must be at least 8 characters",
              },
            })}
            placeholder="Password"
          />
          <span style={{ color: "red" }}>{errors.password?.message}</span>
        </label>
        <br />

        {/* <label>
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
        </label> */}

        <br />

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
