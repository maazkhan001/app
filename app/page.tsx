"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles } from "lucide-react";

const questions = [
  {
    question: "What does GRC stand for in Governance?",
    options: [
      "Governance, Risk, and Compliance",
      "Growth, Risk, and Control",
      "Government, Regulation, and Compliance",
      "Governance, Regulation, and Control",
    ],
    answer: 0,
  },
  {
    question: "Which of the following is NOT part of a governance framework?",
    options: [
      "Policy Management",
      "Risk Assessment",
      "Marketing Strategy",
      "Audit & Compliance",
    ],
    answer: 2,
  },
  {
    question: "Who is typically responsible for governance oversight?",
    options: ["Board of Directors", "Software Developers", "Customers", "Vendors"],
    answer: 0,
  },
];

// Base64 QR code images generated for example URLs
const qrCodes = {
  pre: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAA...", // replace with actual base64
  post: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAA...", // replace with actual base64
};

export default function GovernanceMasteryQuiz() {
  const [step, setStep] = useState(-1);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [highlight, setHighlight] = useState(null);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    if (timer > 0 && step >= 0 && step < questions.length) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && step >= 0 && step < questions.length) {
      handleNext();
    }
  }, [timer, step]);

  const handleOptionClick = (index) => {
    setAnswers([...answers, index]);
    setHighlight(index);
    setTimeout(() => {
      setHighlight(null);
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
      setTimer(30);
    } else {
      setShowResult(true);
      setSelectedQR("post");
    }
  };

  const handleRetake = () => {
    setStep(-1);
    setTimer(30);
    setAnswers([]);
    setShowResult(false);
    setHighlight(null);
    setSelectedQR(null);
  };

  const correctCount = answers.filter((ans, i) => ans === questions[i].answer).length;

  if (step === -1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 animate-fade-in">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl border-2 border-purple-400 bg-white/90 backdrop-blur-md p-8 text-center">
          <h2 className="text-2xl font-extrabold mb-6 text-purple-700">Choose Assessment</h2>
          <div className="flex justify-center gap-6 mb-6">
            <Button
              onClick={() => setSelectedQR("pre")}
              className={`px-6 py-3 ${
                selectedQR === "pre"
                  ? "bg-purple-600 text-white"
                  : "bg-purple-300 text-purple-800 hover:bg-purple-400"
              }`}
            >
              Pre Assessment
            </Button>
            <Button
              onClick={() => setSelectedQR("post")}
              className={`px-6 py-3 ${
                selectedQR === "post"
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-300 text-indigo-800 hover:bg-indigo-400"
              }`}
            >
              Post Assessment
            </Button>
          </div>

          {selectedQR && (
            <div>
              <img
                src={qrCodes[selectedQR]}
                alt={`${selectedQR} assessment QR code`}
                className="mx-auto mb-6 w-64 h-64"
              />
              <p className="mb-6 text-gray-700 font-semibold">
                Scan this QR code to join the {selectedQR} assessment quiz
              </p>
              <Button
                onClick={() => setStep(0)}
                className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:from-indigo-500 hover:to-purple-600 shadow-lg"
              >
                Start Quiz
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 animate-fade-in">
      {!showResult ? (
        <Card className="w-full max-w-xl shadow-2xl rounded-3xl border-2 border-purple-400 bg-white/90 backdrop-blur-md">
          <CardContent className="p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-2 text-purple-700">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <h2 className="text-2xl font-extrabold">Governance Mastery Quiz</h2>
            </div>
            <p className="mb-2 text-sm text-gray-600">
              ⏳ Time left: <span className="font-bold text-purple-800">{timer}s</span>
            </p>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">
              {questions[step].question}
            </h3>
            <div className="grid gap-3">
              {questions[step].options.map((opt, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`justify-start text-left shadow-md transition-all duration-300 ${
                    highlight !== null
                      ? idx === questions[step].answer
                        ? "bg-green-500 text-white"
                        : idx === highlight
                        ? "bg-red-500 text-white"
                        : "bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-600"
                      : "bg-gradient-to-r from-purple-400 to-indigo-500 text-white hover:from-purple-500 hover:to-indigo-600"
                  }`}
                  disabled={highlight !== null}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-2xl rounded-3xl border-2 border-indigo-400 bg-white/90 backdrop-blur-md">
          <CardContent className="p-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-indigo-700">🎉 Assessment Complete!</h2>
            <p className="text-xl font-medium text-purple-800 mb-2">
              You scored <span className="font-extrabold">{correctCount}</span> out of <span className="font-extrabold">{questions.length}</span>.
            </p>
            <div className="mt-4 text-left text-gray-700">
              {questions.map((q, i) => (
                <div key={i} className="mb-4">
                  <h4 className="font-semibold">Q{i + 1}: {q.question}</h4>
                  <p>
                    Your answer: <span className={answers[i] === q.answer ? "text-green-600" : "text-red-600"}>
                      {q.options[answers[i]] || "No answer"}
                    </span>
                  </p>
                  <p>
                    Correct answer: <span className="text-green-600">{q.options[q.answer]}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-indigo-700 font-semibold">
              📌 Scan QR again to join the <strong>Post Assessment</strong> if you haven’t already:
            </p>
            <img
              src={qrCodes.post}
              alt="Post Assessment QR code"
              className="mx-auto mt-2 w-48 h-48"
            />

            <p className="mt-4 text-sm text-gray-600">
              🌟 Thank you for participating in the <strong>Governance Mastery</strong> workshop.
            </p>
            <Button
              onClick={handleRetake}
              className="mt-6 bg-gradient-to-r from-indigo-400 to-purple-500 text-white hover:from-indigo-500 hover:to-purple-600 shadow-lg"
            >
              Retake Quiz
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
