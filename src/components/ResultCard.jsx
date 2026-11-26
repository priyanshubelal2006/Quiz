export default function ResultCard() {
    return (
        <div className="w-60 p-6 text-center
        bg-[#353c69] border-4 border-[#303968]
        rounded-[25px] shadow-xl
        absolute right-[7%] top-[47%]
        max-[900px]:relative max-[900px]:top-auto
        max-[900px]:right-auto max-[900px]:mx-auto
        max-[900px]:mt-8">

            <div className="text-4xl mb-5">
                🎉
            </div>

            <h2 className="text-base font-semibold leading-6 mb-3">
                Congrats! You completed
                <br />
                the quiz.
            </h2>

            <p className="text-xs text-gray-300 mb-7">
                You answer 4/10 correctly
            </p>

            <button className="w-full py-3 rounded-lg
            bg-linear-to-r from-pink-500 to-purple-500
            text-xs font-semibold hover:scale-105 transition">
                Play again
            </button>

        </div>
    );
}
