import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ projectName }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleCancel = () => {
        setIsRunning(false);
        setTime(0);
    };

    const handleStopAndSave = () => {
        setIsRunning(false);
        const hours = Math.round(time / (1000 * 60 * 60));
        console.log(`Saved time: ${hours} hours`);
        setTime(0);
    };

    return (
        <>
        <Header>
                <h1> Workwise </h1>
                <button className="logoutButton">Log Out</button>
            </Header>
        <main className='timer-container'>
            <section className='timer-wrapper'>
            <h2>Timer for {projectName}</h2>
            <section className='time-display'>
                <p className='display-time'>Time: {new Date(time).toISOString().substr(11, 8)}</p>
                <article className='timer-buttons'>
                <button onClick={handleStartStop}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleStopAndSave}>Stop & Save</button>
                </article>
            </section>
            </section>
        </main>
        </>
    );
};

export default Timer;

