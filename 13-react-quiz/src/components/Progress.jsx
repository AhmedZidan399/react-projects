import { useQuizContext } from "../context/QuizContext";

export default function Progress() {
  const { index, numQuestions, maxPoints, points, answer } = useQuizContext();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints} Points
      </p>
    </div>
  );
}
