import { useQuizContext } from "../context/QuizContext";

export default function Question() {
  const { questions, index, dispatch, answer } = useQuizContext();
  const question = questions[index];
  return (
    <div>
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={option}
            disabled={answer !== null}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() =>
              dispatch({
                type: "answer",
                payload: index,
                // payload: {
                //   index,
                //   points:
                //     index === question.correctOption ? question.points : 0,
                // },
              })
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
