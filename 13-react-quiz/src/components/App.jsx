import { useQuizContext } from "../context/QuizContext";

import Header from "./Header";
import Hero from "./Hero";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

export default function App() {
  const { status } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Hero>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton />
            <Timer />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Hero>
    </div>
  );
}
