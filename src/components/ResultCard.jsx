
import { use } from "react";
import { QuizContext } from "../context/QuizContext";

export default function ResultCard({ fetchQuestions }) {
    const {
        marks,
        setMarks,
        setNavigateQuestion,
        setCompletedQuestions,
        setClick,
        setShowResult,
    } = use(QuizContext);

    async function handlePlayAgain() {
        setMarks(0);
        setNavigateQuestion(1);
        setCompletedQuestions([]);
        setClick(false);
        setShowResult(false);

        localStorage.removeItem("marks");
        localStorage.removeItem("selectedAnswers");
        localStorage.removeItem("questions");

        await fetchQuestions();
    }

    return (
        <div className="w-60 p-6 text-center
            bg-[#353c69] border-4 border-[#303968]
            rounded-[25px] shadow-xl mx-auto">

            <div className="text-4xl mb-5">
                🎉
            </div>

            <h2 className="text-base font-semibold leading-6 mb-3">
                Congrats! You completed
                <br />
                the quiz.
            </h2>

            <p className="text-xs text-gray-300 mb-7">
                You answered {marks}/10 correctly
            </p>

            <button
                onClick={handlePlayAgain}
                className="w-full py-3 rounded-lg
                bg-linear-to-r from-pink-500 to-purple-500
                text-xs font-semibold hover:scale-105 transition"
            >
                Play again
            </button>

        </div>
    );
}
