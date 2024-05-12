import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import "./styles/global.scss";
import Product from "./pages/product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProduct from "./pages/products/ProductForm";
import AddUser from "./pages/users/UserForm";
import AddOrder from "./pages/orders/AddOrder";
import UpdateProduct from "./pages/products/UpdateProduct";
import UpdateUser from "./pages/users/UpdateUser";
import Attachments from "./pages/attachments/attachments";
import AuthProvider from "./providers/AuthProvider";
import User from "./pages/user/User";
import UpdateOrder from "./pages/orders/UpdateOrder";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        // {
        //   path: "/users/:id",
        //   element: <User />,
        // },
        {
          path: `/profile`,
          element: <User/>
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/products/add",
          element: <AddProduct />,
        },
        {
          path: "/products/update/:id",
          element: <UpdateProduct />,
        },
        {
          path: "/users/add",
          element: <AddUser />,
        },
        {
          path: "/users/update/:id",
          element: <UpdateUser />,
        },
        {
          path: "/orders/add",
          element: <AddOrder />,
        },
        {
          path: "/orders/update/:id",
          element: <UpdateOrder/>,
        },
        {
          path: "/attachments",
          element: <Attachments />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
