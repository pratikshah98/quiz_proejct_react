import React, { useState } from 'react';
import { quizQuestions } from '../utils/quizData';
import { saveQuizAttempt } from '../utils/indexedDB';
import Timer from './Timer';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");

    const handleAnswer = (index) => {
        if (quizQuestions[currentQuestion].type === "mcq") {
            if (index === quizQuestions[currentQuestion].correct) {
                setScore(score + 1);
            }
        } else {
            if (parseInt(userAnswer) === quizQuestions[currentQuestion].correct) {
                setScore(score + 1);
            }
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        const next = currentQuestion + 1;
        if (next < quizQuestions.length) {
            setCurrentQuestion(next);
            setUserAnswer("");
        } else {
            setShowScore(true);
            saveQuizAttempt(score + 1, quizQuestions.length, new Date().toISOString());
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            {showScore ? (
                <h2 className="text-2xl font-bold">Quiz Completed! Score: {score}/{quizQuestions.length}</h2>
            ) : (
                <div className="w-96 p-5 border rounded shadow-lg">
                    <h2 className="text-lg font-bold">{quizQuestions[currentQuestion].question}</h2>
                    <Timer time={30} onTimeUp={nextQuestion} />
                    {quizQuestions[currentQuestion].type === "mcq" ? (
                        quizQuestions[currentQuestion].options.map((option, index) => (
                            <button key={index} className="w-full p-2 my-1 bg-blue-500 text-white rounded"
                                onClick={() => handleAnswer(index)}>
                                {option}
                            </button>
                        ))
                    ) : (
                        <input
                            type="number"
                            className="w-full p-2 my-2 border rounded"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                    )}
                    <button className="w-full p-2 bg-green-500 text-white rounded" onClick={nextQuestion}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
