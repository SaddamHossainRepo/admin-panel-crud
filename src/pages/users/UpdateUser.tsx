import React from "react";
import ProductForm from "./ProductForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { User } from "./type";
import UserForm from "./UserForm";

const useUser = (id?: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
  const tokenString = localStorage.getItem("user-info");
  const token = JSON.parse(tokenString);
  const accessToken = token.token;
  const { isLoading, data, error } = useQuery({
    queryKey: [`users-${id}`],
    queryFn: () =>
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json()),
  });
  return {
    user: ((data && data) ?? {}) as User,
    count: (data && data.count) ?? 1,
    isLoading: isLoading,
    error: error,
  };
};

export default function UpdateUser() {
  const { id } = useParams();

  const { user, isLoading } = useUser(id);
  console.log("user", user);

  if (isLoading || !id) return <div>Loading</div>;
  return <UserForm initialValue={user} />;
}
