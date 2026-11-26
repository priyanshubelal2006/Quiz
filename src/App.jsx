import Navbar from "./components/Navbar";
import Questions from "./components/Questions";
import QuizProvider from "./context/QuizContext";

function App() {

  return (
    <QuizProvider>
      <div>
        <Navbar />
        <div className="border max-w-3xl mx-auto flex-col justify-center items-center ">

          <div className="p-5 flex flex-col gap-5 ">
            <Questions />

          </div>
        </div>
      </div>
    </QuizProvider>
  );
}

export default App