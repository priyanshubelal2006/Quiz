import { use } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Progress() {
    const {
        navigateQuestion,
        setNavigateQuestion,
        setClick,
        completedQuestions,
        loading
    } = use(QuizContext);

    function handleNavigation(e) {
        const questionNumber = Number(e.currentTarget.textContent);
        setNavigateQuestion(questionNumber);
        setClick(false);
    }

    return (
        <div className="flex gap-3 flex-wrap justify-center mt-10">
            {
                loading ? 
                <div className="flex justify-center gap-3 mb-5 flex-wrap">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-full bg-[#424B7C] w-13.25 h-13.25"
                        />
                    ))}
                </div>
                    :
                    [...Array(10)].map((p, i) => {
                        const stepNumber = i + 1;

                        return (
                            <button
                                className={`step ${completedQuestions.includes(stepNumber) ? "active" : ""
                                    }`}
                                key={i}
                                onClick={handleNavigation}
                            >
                                {stepNumber}
                            </button>
                        );
                    })
            }

        </div>
    );
}