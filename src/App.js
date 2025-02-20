import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Quiz from './components/Quiz';
import History from './pages/Histroy';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Quiz</Link>
                <Link to="/history">History</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Quiz />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
};

export default App;
