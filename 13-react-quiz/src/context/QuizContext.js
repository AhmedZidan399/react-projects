import { useContext, createContext } from "react";
const QuizCreateContext = createContext();

function useQuizContext() {
  const context = useContext(QuizCreateContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizContextProvider");
  }
  return context;
}

export { useQuizContext, QuizCreateContext };
