export default function QuizSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Quiz Container */}
            <div className="max-w-3xl mx-auto  sm:p-8">

                {/* Question */}
                <div className="flex justify-center mb-6">
                    <div className="rounded-md bg-[#424B7C] h-6 w-[70%]" />
                </div>

                {/* Four Empty Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-[#424B7C] h-18 w-full"
                        />
                    ))}
                </div>

                {/* Reset Button */}
                <div className="mt-12">
                    <div className="rounded-sm bg-[#424B7C] h-10 w-44" />
                </div>

            </div>
        </div>
    );
}
