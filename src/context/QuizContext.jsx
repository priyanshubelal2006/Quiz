import { createContext, useEffect, useState } from "react";

export const QuizContext = createContext();

export default function QuizProvider({ children }) {
    const [navigateQuestion, setNavigateQuestion] = useState(1);
    const [click, setClick] = useState(false);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marks, setMarks] = useState(() => {
        return Number(localStorage.getItem("marks")) || 0;
    });
    useEffect(() => {
        localStorage.setItem("marks", marks);
    }, [marks]);
    const [showResult, setShowResult] = useState(false);

    return (
        <QuizContext.Provider
            value={{
                navigateQuestion,
                setNavigateQuestion,
                click,
                setClick,
                completedQuestions,
                setCompletedQuestions,
                setLoading,
                loading,
                marks,
                setMarks,
                showResult,
                setShowResult
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}