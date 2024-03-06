import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  // TEST THE API

  const queryClient = useQueryClient();

  const tokenString = localStorage.getItem('user-info');
  const token = JSON.parse(tokenString);
  console.log('token', token);

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`http://localhost:9000/v1/${props.slug}s`, {
        method: "post",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token.token}`
        },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted", formData);
    //add new item
    mutation.mutate();
    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input
                  type={column.type}
                  id={column.field}
                  name={column.field}
                  onChange={handleInputChange}
                  placeholder={column.field}
                />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
