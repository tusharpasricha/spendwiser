"use client"
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex flex-col justify-between">
      <div className="flex flex-col items-center text-center py-24 px-8 space-y-10">
        <h1 className="text-6xl font-bold tracking-wide text-gray-200 drop-shadow-lg">
          Take Charge with SpendWiser💰
        </h1>
        <p className="text-2xl max-w-3xl leading-relaxed text-gray-400">
          Get a clear view of your finances, simplify your expenses, and stay
          ahead. You deserve financial peace of mind.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-700 text-white px-12 py-4 rounded-full text-2xl font-semibold shadow-lg hover:bg-gray-600 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 mt-10"
        >
          Lets Get Started
        </button>
      </div>

      <div className="relative py-24 px-8">
        <div className="relative z-10 text-center text-gray-200 space-y-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="text-center px-6">
              <div className="text-2xl font-semibold text-gray-300 mb-4">
                📊 Real-Time Data Insights
              </div>
              <p className="text-lg text-gray-500">
                See your spending trends evolve in real-time and take proactive
                steps toward financial freedom.
              </p>
            </div>
            <div className="text-center px-6">
              <div className="text-2xl font-semibold text-gray-300 mb-4">
                💡 Smarter Decisions
              </div>
              <p className="text-lg text-gray-500">
                Make confident choices with tailored insights that guide you
                towards your financial goals.
              </p>
            </div>
            <div className="text-center px-6">
              <div className="text-2xl font-semibold text-gray-300 mb-4">
                🚀 Financial Growth
              </div>
              <p className="text-lg text-gray-500">
                Accelerate your savings and grow your wealth with SpendWiser as
                your guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
