import { useContext, useState, useEffect } from "react";
import "./user.scss";
import { AuthContext } from "../../providers/AuthProvider";

interface User {
  id: number;
  name: string;
  email: string;
  Address: Array<Object>;
  Profile: Object;
}

const User = () => {
  const userInfoAgain = useContext(AuthContext);
  console.log("from user", userInfoAgain);
  //Fetch data and send to Single Component

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const tokenString = localStorage.getItem("user-info");
  const token = JSON.parse(tokenString ?? "");

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
              <img src="" alt="profile pic" />
            </div>
            <div>
              <p>ID: {currentUser.id}</p>
              <p>Username : {currentUser.name}</p>
              <p>Email : {currentUser.email}</p>
              <p>Gender: {currentUser?.Profile?.gender}</p>
              <p>Date Of Birth : {currentUser?.Profile?.dateOfBirth}</p>
            </div>
          </div>
          <div>
            <div>
              <h2 className="text-red-500">Address</h2>
              <p>Country: {currentUser?.Address[0]?.country}</p>
              <p>city: {currentUser?.Address[0]?.city}</p>
              <p>Line One: {currentUser?.Address[0]?.lineOne}</p>
              <p>Line Two: {currentUser?.Address[0]?.lineTwo}</p>
            </div>

            <div>
              <h2>Address</h2>
              <p>Country: {currentUser?.Address[0]?.country}</p>
              <p>city: {currentUser?.Address[0]?.city}</p>
              <p>Line One: {currentUser?.Address[0]?.lineOne}</p>
              <p>Line Two: {currentUser?.Address[0]?.lineTwo}</p>
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
