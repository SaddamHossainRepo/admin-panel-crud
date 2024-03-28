import { useEffect, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductsQueryParam } from "../types";
import { Product } from "./type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateQueryString } from "../../utils/url";



const useProducts = ({
  page = 0,
  limit = 1000,
  sortBy,
  sortOrder,
}: Partial<ProductsQueryParam>) => {
  const queryString = generateQueryString({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const url = `${import.meta.env.VITE_BASE_URL}/products/${queryString}`;
  const { isLoading, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });
  return {
    products: ((data && data.data) ?? []) as Product[],
    count: (data && data.count) ?? 1,
    isLoading: isLoading,
    error: error,
  };
};

const Products = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const tokenString = localStorage.getItem("user-info");
  const token = JSON.parse(tokenString ?? '');
  
  const mutation = useMutation({
    mutationFn: (id: number) => {
      // return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
      return fetch(`http://localhost:9000/v1/products/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
    onSettled: (data, error, variables, context) => {
      window.location.reload();
    },
  });
  
  const handleDelete = (id: number) => {
    //delete the item
    try {
      mutation.mutate(id);
      alert("Product deleted");
      console.log("delete clicked", id);
    } catch (error) {
      alert("Error while deleting product");
    }
  };
  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "image",
    //   headerName: "Image",
    //   width: 100,
    //   renderCell: (params) => {
    //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
    //   },
    // },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 250,
    },
  
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
    },
    {
      field: "categoryId",
      type: "string",
      headerName: "CategoryId",
      width: 150,
    },
    {
      field: "subCategoryId",
      headerName: "SubCategoryId",
      type: "string",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 200,
    },
    {
      field: "unit",
      headerName: "unit",
      type: "string",
      width: 50,
    },
  
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
      renderCell: (params) => new Date(params.row?.createdAt).toDateString(),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <div className="update">
              <Link to={`/products/update/${params.row.id}`}>
                <img src="/view.svg" alt="" />
              </Link>
            </div>
            <div className="delete" onClick={() => handleDelete(params.row.id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    },
  ];
  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  // const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  const { products, isLoading, count, error } = useProducts({
    limit: 1000,
    page,
    sortBy: "createdAt",
    sortOrder: "asc",
  });

  return (
    <div className="products">
      <div className="info">
        <h1 className="">Products</h1>
        <Link
          style={{
            backgroundColor: "white",
            color: "black",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "2px",
          }}
          to="/products/add"
          onClick={() => setOpen(true)}
        >
          Add New Products
        </Link>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
