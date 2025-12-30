import { createContext, useContext } from "react";

const DarkModeContext = createContext();

function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );

  return context;
}

export { useDarkModeContext, DarkModeContext };
