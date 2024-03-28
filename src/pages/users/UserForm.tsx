// import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "./type";
// import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { UserInput } from "./userFormSchema";
import { useNavigate } from "react-router-dom";

type UserFormProps = {
  initialValue?: User;
};

export default function UserForm({ initialValue }: UserFormProps) {
  const navigate = useNavigate();
  //   const { category, isLoading, error } = useCategory();
  //   const {
  //     subCategory,
  //     isLoading: subIsLoading,
  //     error: subError,
  //   } = useSubCategory({
  //     limit: 1000,
  //     page: 0,
  //     categoryId: cat?.id,
  //   });
  const {
    register,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, defaultValues },
    reset,
  } = useForm<UserInput>({
    defaultValues: {
      name: initialValue?.name ?? "",
      email: initialValue?.email ?? "",
      password: "",
    },
    // resolver: zodResolver(UserFormSchema),
  });

  console.log("defaultValues", defaultValues);
  console.log("initialValue", initialValue);
  const tokenString = localStorage.getItem("user-info");
  const token = JSON.parse(tokenString);
  const accessToken = token.token;

  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    console.log("form is submitted data", data);
    const { name, email, password } = data;
    const formData = {
      name,
      email,
      password,
    };
    // e.preventDefault();
    if (initialValue?.id) {
      console.log("update user");
      const id = initialValue.id;
      const updatedData = { ...formData };
      console.log("in update");
      const response = await fetch(`http://localhost:9000/v1/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response", response);
      if (response.ok) {
        Swal.fire("updated the item");
      }
      const result = await response.json();
    } else {
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
        navigate("/");
        reset();
        console.log("user name", result.user.name);
      }
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        {initialValue?.id ? <h2>Update User</h2> : <h2>Add New User</h2>}
      </h2>

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
          <span style={{ color: "white" }}>{errors.name?.message}</span>
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
            type="text"
            step="0.01"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          <span style={{ color: "white" }}>
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
          <span style={{ color: "white" }}>{errors.password?.message}</span>
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
          <span style={{ color: "white" }}>{errors.categoryId?.message}</span>
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
          <span style={{ color: "white" }}>{errors.subCategoryId?.message}</span>
        </label> */}

        <br />

        <button type="submit">
          {initialValue?.id ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
