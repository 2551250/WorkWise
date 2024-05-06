import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { updateTime } from '../../backend_post_requests';
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";

import './Timer.css';

import PopUp from "../../Components/PopUp/PopUp";
import Header from "../../Components/Header/Header";


const Timer = () => {
    //Variables
    const location = useLocation();
    const projectData = location.state;
    const navigate = useNavigate();

    const {employeeID} = useEmployee();
    
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [displayPopup, setDisplayPopup] = useState(false);

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

    const handleStopAndSave = async () => {
        setIsRunning(false);
        const minutes = Math.round(time / (1000 * 60));
        console.log(minutes);
        
        const response = await updateTime(employeeID, projectData.PROJECT_ID, minutes);
        if (response === "Time spent on project successfully updated"){
            setDisplayPopup(true);
        }

        setTime(0);
    };

    const homePageButton = () => {
        navigate("/Staff");
    }

    // HTML Code
    return (
        <>
        <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
        </Header>
        
        <main className='timer-container'>
            <section className='timer-wrapper'>
            <h2>Timer for {projectData.PROJECT_NAME}</h2>
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

        <PopUp trigger={displayPopup} setTrigger={setDisplayPopup}>
            <h3>Time Updated Successfully</h3>
            <p>Time spent on project successfully updated</p>
        </PopUp>
        </>
    );
};

export default Timer;

