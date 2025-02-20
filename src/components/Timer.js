import React, { useEffect, useState } from 'react';

const Timer = ({ time, onTimeUp }) => {
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        if (seconds === 0) {
            onTimeUp();
            return;
        }
        const timer = setInterval(() => setSeconds(seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [seconds, onTimeUp]);

    return <h3 className="text-red-500">Time Left: {seconds}s</h3>;
};

export default Timer;
