import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {
  // TEST THE API

  const queryClient = useQueryClient();
  const tokenString = localStorage.getItem("user-info");
  // const token = JSON.parse(tokenString ?? '');

  let token;
  if (tokenString) {
    try {
      token = JSON.parse(tokenString);
    } catch (error) {
      console.error("Error parsing token string:", error);
      // Handle the error accordingly, e.g., setting token to null or a default value
      token = null;
    }
  } else {
    console.error("Token string is empty");
    // Handle the case where tokenString is empty, e.g., setting token to null or a default value
    token = null;
  }
  // console.log("token", token);

  const mutation = useMutation({
    mutationFn: (id: number) => {
      // return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
      return fetch(`http://localhost:9000/v1/product/${id}`, {
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

  const updateMutation = useMutation({
    mutationFn: (id: number) => {
      // return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
      return fetch(`http://localhost:9000/v1/product/${id}`, {
        method: "PATCH",
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

  // const handleUpdate = (id: number) => {
  //   //update the item
  //   try {
  //     updateMutation.mutate(id);
  //     // alert("Product updated");
  //     console.log("update clicked", id);
  //   } catch (error) {
  //     alert("Error while deleting product");
  //   }
  // };

  const actionColumn: GridColDef = {
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
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
