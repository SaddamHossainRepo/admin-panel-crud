import "./topBox.scss";
import { topDealUsers } from "../../data.ts";
import { useEffect, useState } from "react";

interface Order {
  customerId: number;
  amount: number;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  // billingAddress: BillingAddress;
}
interface User {
  id: number;
  name: string;
  email: string;
  Order: Array<Order>;
}

const TopBox = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/v1/orders?limit=${20}`,
          {
            method: "GET",
            // body: JSON.stringify({ email, password }),
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        const users = userData.data;
        console.log("userList", users);
        console.log("List of users", users);
        const userLoggedIn = localStorage.setItem(
          "user-data",
          JSON.stringify(userData)
        );
        // console.log('userLoggedIn', userLoggedIn);
        console.log("userData", userData);
        setUserList(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserList();
  }, []);
  return (
    <div className="topBox">
      <h1>Top Deals</h1>

      {loading ? (
        <p>loading...</p>
      ) : userList ? (
        <div className="list">
          {userList.map((user) => (
            <div className="listItem" key={user.id}>
              <div className="user">
                {/* <img src={user.img} alt="" /> */}
                <div className="userTexts">
                  <span className="username">
                    {" "}
                    <p>totalAmount:</p>
                  </span>
                  <span className="email">
                    {" "}
                    <p>Order Status: </p> {user.orderStatus}
                  </span>
                </div>
              </div>
              <span className="amount">${user.totalAmount}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No user to show</p>
      )}
    </div>
  );
};

export default TopBox;
