import { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";

export default function Timer() {
  const { timer, dispatch } = useQuizContext();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      <p>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
}
