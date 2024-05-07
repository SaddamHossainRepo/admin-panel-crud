"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Home = _interopRequireDefault(require("./pages/home/Home"));
var _reactRouterDom = require("react-router-dom");
var _Users = _interopRequireDefault(require("./pages/users/Users"));
var _Products = _interopRequireDefault(require("./pages/products/Products"));
var _Orders = _interopRequireDefault(require("./pages/orders/Orders"));
var _Navbar = _interopRequireDefault(require("./components/navbar/Navbar"));
var _Footer = _interopRequireDefault(require("./components/footer/Footer"));
var _Menu = _interopRequireDefault(require("./components/menu/Menu"));
var _Login = _interopRequireDefault(require("./pages/login/Login"));
var _register = _interopRequireDefault(require("./pages/register/register"));
require("./styles/global.scss");
var _Product = _interopRequireDefault(require("./pages/product/Product"));
var _reactQuery = require("@tanstack/react-query");
var _ProductForm = _interopRequireDefault(require("./pages/products/ProductForm"));
var _UserForm = _interopRequireDefault(require("./pages/users/UserForm"));
var _AddOrder = _interopRequireDefault(require("./pages/orders/AddOrder"));
var _UpdateProduct = _interopRequireDefault(require("./pages/products/UpdateProduct"));
var _UpdateUser = _interopRequireDefault(require("./pages/users/UpdateUser"));
var _attachments = _interopRequireDefault(require("./pages/attachments/attachments"));
var _AuthProvider = _interopRequireDefault(require("./providers/AuthProvider"));
var _User = _interopRequireDefault(require("./pages/user/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var queryClient = new _reactQuery.QueryClient();
function App() {
  var Layout = function Layout() {
    return /*#__PURE__*/React.createElement("div", {
      className: "main"
    }, /*#__PURE__*/React.createElement(_Navbar.default, null), /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "menuContainer"
    }, /*#__PURE__*/React.createElement(_Menu.default, null)), /*#__PURE__*/React.createElement("div", {
      className: "contentContainer"
    }, /*#__PURE__*/React.createElement(_reactQuery.QueryClientProvider, {
      client: queryClient
    }, /*#__PURE__*/React.createElement(_reactRouterDom.Outlet, null)))), /*#__PURE__*/React.createElement(_Footer.default, null));
  };
  var router = (0, _reactRouterDom.createBrowserRouter)([{
    path: "/",
    element: /*#__PURE__*/React.createElement(Layout, null),
    children: [{
      path: "/",
      element: /*#__PURE__*/React.createElement(_Home.default, null)
    }, {
      path: "/users",
      element: /*#__PURE__*/React.createElement(_Users.default, null)
    }, {
      path: "/products",
      element: /*#__PURE__*/React.createElement(_Products.default, null)
    }, {
      path: "/orders",
      element: /*#__PURE__*/React.createElement(_Orders.default, null)
    },
    // {
    //   path: "/users/:id",
    //   element: <User />,
    // },
    {
      path: "/profileF",
      element: /*#__PURE__*/React.createElement(_User.default, null)
    }, {
      path: "/products/:id",
      element: /*#__PURE__*/React.createElement(_Product.default, null)
    }, {
      path: "/products/add",
      element: /*#__PURE__*/React.createElement(_ProductForm.default, null)
    }, {
      path: "/products/update/:id",
      element: /*#__PURE__*/React.createElement(_UpdateProduct.default, null)
    }, {
      path: "/users/add",
      element: /*#__PURE__*/React.createElement(_UserForm.default, null)
    }, {
      path: "/users/update/:id",
      element: /*#__PURE__*/React.createElement(_UpdateUser.default, null)
    }, {
      path: "/orders/add",
      element: /*#__PURE__*/React.createElement(_AddOrder.default, null)
    }, {
      path: "/attachments",
      element: /*#__PURE__*/React.createElement(_attachments.default, null)
    }]
  }, {
    path: "/login",
    element: /*#__PURE__*/React.createElement(_Login.default, null)
  }, {
    path: "/register",
    element: /*#__PURE__*/React.createElement(_register.default, null)
  }]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_AuthProvider.default, null, /*#__PURE__*/React.createElement(_reactRouterDom.RouterProvider, {
    router: router
  })));
}
var _default = exports.default = App;