import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const authInfo = { name: "context testing" };
  return (
    <AuthContext.Provider value={authInfo}>
        { children }
    </AuthContext.Provider>
  );
}
