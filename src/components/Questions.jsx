
import { use, useEffect, useMemo, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import AnswerButton from "./AnswerButton";
import QuizSkeleton from "./skeleton";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const {
    navigateQuestion,
    setNavigateQuestion,
    setClick,
    setCompletedQuestions,
    setLoading,
    loading
  } = use(QuizContext);

  function handleReset() {
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("questions");

    setCompletedQuestions([]);
    setNavigateQuestion(1);
    setClick(false);

    fetchQuestions();
  }

  async function fetchQuestions() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple"
      );

      const { results } = await response.json();

      setQuestions(results);

      // Save questions in localStorage
      localStorage.setItem("questions", JSON.stringify(results));

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");

    if (savedQuestions && savedQuestions !== "undefined") {
      setQuestions(JSON.parse(savedQuestions));
      setLoading(false);
    } else {
      fetchQuestions();
    }
  }, []);

  function handleReset() {
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("questions");

    fetchQuestions();
  }


  const currentQuestion = questions[navigateQuestion - 1];

  const incorrectAnswers = currentQuestion?.incorrect_answers || [];
  const correctAnswer = currentQuestion?.correct_answer;

  const options = useMemo(() => {
    if (!currentQuestion) return [];

    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer
    ];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  }, [currentQuestion]);

  console.log(currentQuestion);

  return (

    <div>

      {loading ?

        <QuizSkeleton />
        :
        <div className=" flex flex-col gap-10">
          <div className="flex justify-center text-white font-semibold ">
            {currentQuestion && (
              <div>
                <h1>{currentQuestion.question}</h1>
              </div>
            )}

          </div>

          <AnswerButton options={options} incorrectAnswers={incorrectAnswers} correctAnswer={correctAnswer} />
          <div className="flex justify-between">
            <button className="bg-blue-400 w-35 h-8" onClick={handleReset}>Reset</button>
            <button className="bg-blue-400 w-35 h-8">Submit</button>
          </div>
        </div>
      }

    </div >

  );
}
