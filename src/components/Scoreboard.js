import React from 'react';

const Scoreboard = ({ score, totalQuestions }) => {
    return (
        <div>
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score}/{totalQuestions}</p>
        </div>
    );
};

export default Scoreboard;
