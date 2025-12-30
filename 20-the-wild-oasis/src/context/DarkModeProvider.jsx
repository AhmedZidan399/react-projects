import { useEffect } from "react";
import { DarkModeContext } from "./useDarkModeContext";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(
    function () {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add("dark-mode");
        root.classList.remove("light-mode");
      } else {
        root.classList.add("light-mode");
        root.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
