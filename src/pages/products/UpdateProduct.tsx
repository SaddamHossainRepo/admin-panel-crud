import React from "react";
import ProductForm from "./ProductForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./type";

const useProduct = (id?: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/orders/${id}`;
  const { isLoading, data, error } = useQuery({
    queryKey: [`orders-${id}`],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
  return {
    product: ((data && data) ?? {}) as Order,
    count: (data && data.count) ?? 1,
    isLoading: isLoading,
    error: error,
  };
};

export default function UpdateProduct() {
  const { id } = useParams();

  const { product, isLoading } = useProduct(id);
  console.log("product", product);

  if (isLoading || !id) return <div>Loading</div>;
  return <ProductForm initialValue={product} />;
}
