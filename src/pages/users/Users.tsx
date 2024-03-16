import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useEffect, useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "role",
    type: "string",
    headerName: "Role",
    width: 150,
  },
  // {
  //   field: "phone",
  //   type: "string",
  //   headerName: "Phone",
  //   width: 200,
  // },
  {
    field: "createdAt",
    headerName: "Joining Date",
    width: 200,
    type: "string",
    renderCell: (params) => new Date(params.row?.createdAt).toDateString()
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="update" >
            <Link to={`/users/update/${params.row.id}`}>
              <img src="/view.svg" alt="" />
            </Link>
          </div>
          <div className="delete" 
          // onClick={() => 
          //   handleDelete(params.row.id)
          //   }
            >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  }

];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  const [orders, setOrders] = useState([]);

  const tokenString = localStorage.getItem('user-info');
  const token = JSON.parse(tokenString);
  // console.log('token', token);
useEffect(() => {
  // getAllProducts({});
  axios.get('http://localhost:9000/v1/users/',{
    headers:{
      'Authorization': `Bearer ${token.token}`
    }
  }).then((res) => {
  // axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
    setOrders(res.data.data);
    // setProducts(res.data)
    // setPage(res.data.page)
    // console.log('orders', res.data.data);
    // console.log('current page', res.data.page);
  });
}, []);

  return (
    <div className="orders">
      <div className="info">
        <h1>Users</h1>
        <Link style={{ backgroundColor: 'white', color:'black' , paddingLeft: '10px', paddingRight: '10px', borderRadius: '2px'}} to='/users/add' onClick={() => setOpen(true)}>Add New User</Link>
        {/* <button onClick={() => setOpen(true)}>Add New Users</button> */}
      </div>
      <DataTable slug="orders" columns={columns} rows={orders} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="order" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
