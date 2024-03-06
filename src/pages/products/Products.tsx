import { useEffect, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
// import { products } from "../../data";
import axios from "axios";
import { Link } from "react-router-dom";

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
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
    renderCell: (params) => new Date(params.row?.createdAt).toDateString()
  },
  // {
  //   field: "inStock",
  //   headerName: "In Stock",
  //   width: 150,
  //   type: "boolean",
  // },
];



const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

useEffect(() => {
  // getAllProducts({});
  axios.get(`http://localhost:9000/v1/products/?page=${page}&limit=100`).then((res) => {
  // axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
    setProducts(res.data.data);
    // setProducts(res.data)
    // setPage(res.data.page)
    console.log('products', res.data.data);
    // console.log('current page', res.data.page);
  });
}, []);

  return (
    <div className="products">
      <div className="info">
        <h1 className="">Products</h1>
        <Link style={{ backgroundColor: 'white', color:'black' , paddingLeft: '10px', paddingRight: '10px', borderRadius: '2px'}} to='/products/add' onClick={() => setOpen(true)}>Add New Products</Link>
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
