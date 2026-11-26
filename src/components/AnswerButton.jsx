
import { Check, X } from "lucide-react";
import { use, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";

export default function AnswerButton({ options, correctAnswer }) {
    const {
        click,
        setClick,
        navigateQuestion,
        completedQuestions,
        setCompletedQuestions,
        setMarks
    } = use(QuizContext);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Restore answer whenever the question changes
    useEffect(() => {
        const savedAnswers = JSON.parse(
            localStorage.getItem("selectedAnswers") || "{}"
        );

        const savedAnswer = savedAnswers[navigateQuestion] || null;

        setSelectedAnswer(savedAnswer);
        setClick(savedAnswer !== null);

        // Restore completed question
        if (savedAnswer && savedAnswer === correctAnswer) {
            setCompletedQuestions(prev => {
                const questionNumber = Number(navigateQuestion);

                if (prev.includes(questionNumber)) {
                    return prev;
                }

                return [...prev, questionNumber];
            });
        }

    }, [
        navigateQuestion,
        correctAnswer,
        setClick,
        setCompletedQuestions
    ]);

    function handleSolve(userChoice) {
        if (click) return;

        setSelectedAnswer(userChoice);
        setClick(true);

        // Save selected answer
        const savedAnswers = JSON.parse(
            localStorage.getItem("selectedAnswers") || "{}"
        );

        savedAnswers[navigateQuestion] = userChoice;

        localStorage.setItem(
            "selectedAnswers",
            JSON.stringify(savedAnswers)
        );

        // Mark question completed only if answer is correct
        if (userChoice === correctAnswer) {
            setMarks(prev => prev + 1);
            setCompletedQuestions(prev => {
                const questionNumber = Number(navigateQuestion);

                if (prev.includes(questionNumber)) {
                    return prev;
                }

                return [...prev, questionNumber];
            });
        }
    }
    return (
        <div className="grid grid-cols-2 gap-3">
            {options.map((o, i) => (
                <button
                    key={i}
                    onClick={() => handleSolve(o)}
                    disabled={click}
                    className="min-h-14.5 rounded-xl bg-[#414a7b] text-gray-200 font-semibold text-sm flex items-center justify-center relative"
                >
                    {o}

                    {click && (
                        <>
                            {o === selectedAnswer && o === correctAnswer && (
                                <Check className="absolute right-2 text-green-400" />
                            )}

                            {o === selectedAnswer && o !== correctAnswer && (
                                <X className="absolute right-2 text-red-400" />
                            )}

                            {o === correctAnswer && o !== selectedAnswer && (
                                <Check className="absolute right-2 text-green-400" />
                            )}
                        </>
                    )}
                </button>
            ))}
        </div>
    );
}
