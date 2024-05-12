import { useContext, useState, useEffect } from "react";
import "./user.scss";
import { AuthContext } from "../../providers/AuthProvider";

interface Address {
  id: number;
  lineOne: string;
  lineTwo?: string;
  city: string;
  country: string;
  postCode: string;
  isDefaultDelivery: boolean;
  isDefaultBilling: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface BillingAddress {
  street: string;
  zip: string;
  city: string;
  country: string;
}

interface Order {
  customerId: number;
  amount: number;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  billingAddress: BillingAddress;
}
interface Profile {
  id: number;
  userId: number;
  image: string;
  gender: string;
  dateOfBirth: string;
  mobile: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  Address: Array<Address>;
  Profile: Profile;
  Order: Array<Order>;
  BillingAddress: Object;
}

const User = () => {
  const userInfoAgain = useContext(AuthContext);
  console.log("from user", userInfoAgain);
  //Fetch data and send to Single Component

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const tokenString = localStorage.getItem("user-info");
  // const token = JSON.parse(tokenString ?? "");

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
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:9000/v1/users/me", {
          method: "GET",
          // body: JSON.stringify({ email, password }),
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        // console.log(userData);
        const userLoggedIn = localStorage.setItem(
          "user-data",
          JSON.stringify(userData)
        );
        // console.log('userLoggedIn', userLoggedIn);
        console.log("userData", userData);
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="user mx-auto max-w-md h-full p-4 bg-gray-100 rounded-lg shadow-md">
      {/* <Single {...singleUser}/> */}
      <h2 className="text-2xl font-semibold profile">Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : currentUser ? (
        <div className="user">
          <div className="image-name">
            <div>
              <img src="../" alt="profile pic" />
            </div>
            <div>
              <p>ID: {currentUser.id}</p>
              <p>Username : {currentUser.name}</p>
              <p>Email : {currentUser.email}</p>
              <p>Gender: {currentUser?.Profile?.gender}</p>
              <p>Date Of Birth : {currentUser?.Profile?.dateOfBirth}</p>
            </div>
          </div>
          <div className="address-orders-billingAddress-div">
            <div>
              <h2 className="title">Address</h2>
              <p>Country: {currentUser?.Address[0]?.country}</p>
              <p>city: {currentUser?.Address[0]?.city}</p>
              <p>Line One: {currentUser?.Address[0]?.lineOne}</p>
              <p>Line Two: {currentUser?.Address[0]?.lineTwo}</p>
            </div>

            <div>
              <h2 className="title">Orders</h2>
              <p>totalAmount: {currentUser?.Order[0]?.totalAmount}</p>
              <p>orderStatus: {currentUser?.Order[0]?.orderStatus}</p>
            </div>

            <div>
              <h2 className="title">billingAddress</h2>
              <p>street: {currentUser?.Order[0]?.billingAddress?.street}</p>
              <p>zip: {currentUser?.Order[0]?.billingAddress?.zip}</p>
              <p>city: {currentUser?.Order[0]?.billingAddress?.city}</p>
              <p>country: {currentUser?.Order[0]?.billingAddress?.country}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>




  );
};

export default User;
