import { useQuizContext } from "../context/QuizContext";

export default function StartScreen() {
  const { numQuestions, dispatch, again } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} Questions to test your React knowledge.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        {again ? "Try Again" : "Let's Start"}
      </button>
    </div>
  );
}
