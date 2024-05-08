import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import Swal from "sweetalert2";

const Navbar = () => {
  const history = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // const userDataString = localStorage.getItem('user-info');
      const userDataString = localStorage.removeItem("user-info");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // Use userData here
      } else {
        Swal.fire("Please login");
        history("/login");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    // localStorage.removeItem('user-info')
    // const tokensObject = JSON.parse(tokens);
    // const refreshToken = tokensObject.refreshToken;
    // console.log("refreshToken", refreshToken);
    // const response = await fetch("http://localhost:9000/v1/auth/logout", {
    //   method: "POST",
    //   body: JSON.stringify({ refreshToken: refreshToken }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const result = await response.json();
    // console.log("result", result);
    // if (!result.token) {
    //   Swal.fire(result.message);
    // } else {
    //   localStorage.setItem("user-info", JSON.stringify(result));
    //   setIsLoggedin(true);
    //   history("/");
    //   Swal.fire(`Welcome ${result.permissions[0]}`);
    //   // console.log('Successfully logged in', email, password);
    // }

    // router.push('/dashboard');
  };
  return (
    <div className="navbar">
      <div className="logo">
        {/* <img src="logo.svg" alt="" /> */}
        <Link to="/">
          <span>Blackaboij</span>
        </Link>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" /> */}
        {/* <img src="/app.svg" alt="" className="icon" /> */}
        {/* <img src="/expand.svg" alt="" className="icon" /> */}
        {/*         
        <Link
          to="/login"
          style={{
            backgroundColor: "white",
            color: "black",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "2px",
          }}
        >
          Login
        </Link> */}
        <button onClick={handleLogout}>
          <Link
          // style={{
          //   backgroundColor: "white",
          //   color: "black",
          //   paddingLeft: "10px",
          //   paddingRight: "10px",
          //   borderRadius: "2px",
          // }}
          >
            Logout
          </Link>
        </button>
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <Link to='/profile'>
          <div className="user">
            <img
              src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt=""
            />
            <span>Jane</span>
          </div>
        </Link>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
