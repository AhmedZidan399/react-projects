import { useQuizContext } from "../context/QuizContext";

export default function FinishScreen() {
  const { points, maxPoints, highScore, dispatch } = useQuizContext();
  const precentage = (points / maxPoints) * 100;
  let emoji;
  if (precentage == 100) emoji = "🥇";
  if (precentage >= 80 && precentage < 100) emoji = "🥈";
  if (precentage >= 50 && precentage < 80) emoji = "🥉";
  if (precentage >= 0 && precentage < 50) emoji = "👎";
  if (precentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>
        <strong>({Math.ceil(precentage)}%)</strong>
      </p>
      <p className="highscore">(High Score: {highScore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
