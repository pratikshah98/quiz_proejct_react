import React, { useState } from 'react';
import { quizQuestions } from '../utils/quizData';
import { saveQuizAttempt } from '../utils/indexedDB';
import Timer from './Timer';
import Scoreboard from './Scoreboard';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    // const [attempts, setAttempts] = useState([]);

    const handleAnswer = (index) => {
        if (index === quizQuestions[currentQuestion].correct) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            saveQuizAttempt(score + 1, quizQuestions.length, new Date().toISOString());
        }
    };

    return (
        <div>
            {showScore ? (
                <Scoreboard score={score} totalQuestions={quizQuestions.length} />
            ) : (
                <div>
                    <h2>{quizQuestions[currentQuestion].question}</h2>
                    <Timer time={30} onTimeUp={() => setCurrentQuestion(currentQuestion + 1)} />
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswer(index)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;
