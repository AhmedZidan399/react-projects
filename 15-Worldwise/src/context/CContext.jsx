import { useContext } from "react";
import { createContext } from "react";

const GlobalContext = createContext();

function CContext() {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("useCContext must be used within a CProvider");
  return context;
}

export { CContext, GlobalContext };
