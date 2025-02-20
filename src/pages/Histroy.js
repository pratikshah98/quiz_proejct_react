import React, { useEffect, useState } from 'react';
import { getQuizHistory } from '../utils/indexedDB';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getQuizHistory().then(setHistory);
    }, []);

    return (
        <div>
            <h2>Quiz History</h2>
            <ul>
                {history.map((attempt, index) => (
                    <li key={index}>
                        Score: {attempt.score}/{attempt.totalQuestions} - {new Date(attempt.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;
