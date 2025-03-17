import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container" onClick={() => navigate('/ordertype')}>
            <h1>Tap the screen to begin</h1>
        </div>
    );
};

export default Home;