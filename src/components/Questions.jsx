
import { use, useEffect, useMemo, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import AnswerButton from "./AnswerButton";
import QuizSkeleton from "./Skeleton";
import ResultCard from "./ResultCard";

export default function Questions() {
    const [questions, setQuestions] = useState([]);

    const {
        navigateQuestion,
        setNavigateQuestion,
        loading,
        setLoading,
        showResult,
        setShowResult,
        setMarks,
        setCompletedQuestions,
        setClick,
    } = use(QuizContext);

    async function fetchQuestions() {
        try {
            setLoading(true);

            const response = await fetch(
                "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple"
            );

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();

            if (data.response_code === 0 && Array.isArray(data.results)) {
                setQuestions(data.results);
                localStorage.setItem(
                    "questions",
                    JSON.stringify(data.results)
                );
                return true;
            }

            return false;

        } catch (error) {
            console.log("Error fetching questions:", error);
            return false;

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const savedQuestions = localStorage.getItem("questions");

        if (savedQuestions && savedQuestions !== "undefined") {
            try {
                const parsedQuestions = JSON.parse(savedQuestions);

                if (Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
                    setQuestions(parsedQuestions);
                    setLoading(false);
                } else {
                    fetchQuestions();
                }

            } catch (error) {
                localStorage.removeItem("questions");
                fetchQuestions();
            }

        } else {
            fetchQuestions();
        }
    }, []);

    function handleReset() {
        setNavigateQuestion(1);
        setMarks(0);
        setCompletedQuestions([]);
        setClick(false);
        setShowResult(false);

        localStorage.removeItem("marks");
        localStorage.removeItem("selectedAnswers");
    }

    function handleSubmit() {
        setShowResult(true);
    }

    const currentQuestion = questions[navigateQuestion - 1];

    const options = useMemo(() => {
        if (!currentQuestion) return [];

        return [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer,
        ].sort(() => Math.random() - 0.5);
    }, [currentQuestion]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#252b50] px-4 py-10">

            <div className="w-full max-w-4xl min-w-0 mx-auto">

                <div className="w-full min-h-125 rounded-2xl border border-white/20 bg-[#30385f] p-5 sm:p-8 shadow-xl">

                    {loading ? (
                        <QuizSkeleton />

                    ) : showResult ? (
                        <div className="w-full min-h-105 flex items-center justify-center">
                            <ResultCard fetchQuestions={fetchQuestions} />
                        </div>

                    ) : (
                        <div className="w-full min-w-0">

                            <div className="flex items-center justify-between gap-3 mb-8">
                                <h1 className="text-xl sm:text-2xl font-bold text-white">
                                    Country Quiz
                                </h1>

                                <p className="text-sm sm:text-base text-white/70">
                                    Question {navigateQuestion} / {questions.length}
                                </p>
                            </div>

                            {/* QUESTION NUMBERS */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {questions.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold ${
                                            navigateQuestion === index + 1
                                                ? "bg-white text-[#252b50]"
                                                : "bg-[#454f7d] text-white"
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>

                            {currentQuestion && (
                                <>
                                    {/* QUESTION */}
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-7 leading-relaxed">
                                        {currentQuestion.question}
                                    </h2>

                                    {/* OPTIONS */}
                                    <div className="w-full flex flex-col gap-3">
                                        <AnswerButton
                                            options={options}
                                            correctAnswer={currentQuestion.correct_answer}
                                        />
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex justify-between items-center gap-3 mt-8">

                                        <button
                                            onClick={handleReset}
                                            className="px-5 py-2.5 rounded-lg bg-[#454f7d] text-white hover:bg-[#515d91] transition"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (navigateQuestion < questions.length) {
                                                    setNavigateQuestion(prev => prev + 1);
                                                } else {
                                                    handleSubmit();
                                                }
                                            }}
                                            className="px-5 py-2.5 rounded-lg bg-white text-[#252b50] font-semibold hover:bg-gray-200 transition"
                                        >
                                            {navigateQuestion === questions.length
                                                ? "Submit"
                                                : "Next"}
                                        </button>

                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
