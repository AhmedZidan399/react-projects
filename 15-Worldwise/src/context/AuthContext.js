import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
}

export { useAuthContext, AuthContext };
