import React, { useState, useEffect } from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

const User: React.FC = () => {
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
    <div>
      <h2>Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : currentUser ? (
        <div>
          <p>ID: {currentUser.id}</p>
          <p>Username: {currentUser.name}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default User;
