import { QuizCreateContext } from "./QuizContext";
import { useEffect, useReducer } from "react";

//  'loading', 'error', 'ready', 'active', 'finished'
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highScore: 0,
  again: false,
  timer: null,
};

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "answer": {
      const q = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          q.correctOption === action.payload
            ? state.points + q.points
            : state.points,
        // answer: action.payload.index,
        // points: state.points + action.payload.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finished": {
      return {
        ...state,
        status: "finished",
        highScore:
          state.highScore > state.points ? state.highScore : state.points,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
        again: true,
      };
    }
    case "tick":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : "active",
      };
    default:
      throw new Error("Unknown action type");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, points, answer, highScore, again, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <QuizCreateContext.Provider
      value={{
        status,
        questions,
        index,
        points,
        answer,
        highScore,
        again,
        timer,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizCreateContext.Provider>
  );
}

export default QuizProvider;
