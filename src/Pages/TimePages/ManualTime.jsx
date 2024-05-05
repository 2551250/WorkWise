import React, { useState } from 'react';
import { useLocation } from 'react-router';

import './ManualTime.css'

import Header from '../../Components/Header/Header';

const ManualTime = () => {
    // Variables
    const location = useLocation();
    const projectData = location.state;

    // Define available time slots from 6:00 to 23:00 in 30-minute intervals
    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlots.push(time);
        }
    }

    // State variables for selected starting and ending slots
    const [startingSlot, setStartingSlot] = useState('');
    const [endingSlot, setEndingSlot] = useState('');

    // State variable for error message
    const [errorMessage, setErrorMessage] = useState('');

    // Handle starting slot change
    const handleStartingSlotChange = (e) => {
        setStartingSlot(e.target.value);
        setErrorMessage(''); // Reset error message on change
    };

    // Handle ending slot change
    const handleEndingSlotChange = (e) => {
        setEndingSlot(e.target.value);
        setErrorMessage(''); // Reset error message on change
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form inputs
        const startingSlotIndex = timeSlots.indexOf(startingSlot);
        const endingSlotIndex = timeSlots.indexOf(endingSlot);

        // Check if the ending slot is later than or equal to the starting slot
        if (endingSlotIndex < startingSlotIndex) {
            setErrorMessage('Ending time must be later than or equal to starting time.');
        } else if (startingSlot && endingSlot) {
            console.log(`Project: ${projectData.PROJECT_NAME}`);
            console.log(`Starting Slot: ${startingSlot}`);
            console.log(`Ending Slot: ${endingSlot}`);
            // You can perform additional actions here, such as updating state or sending data to a server

            // Clear the error message if the submission is successful
            setErrorMessage('');
        } else {
            setErrorMessage('Please select both starting and ending time slots.');
        }
    };

    // HTML Code
    return (
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="logoutButton">Log Out</button>
            </Header>

            <main className="manual-time-page">
                <section className="manual-time-container">
                <h1>Input Time Slots for {projectData.PROJECT_NAME}</h1>
                <form onSubmit={handleSubmit}>
                        <article className='manual-time-entry'>
                            <label htmlFor="starting-slot">Starting Slot:</label>
                            <select 
                                className='manual-time-box'
                                id="starting-slot"
                                value={startingSlot}
                                onChange={handleStartingSlotChange}
                            >
                                <option value="" disabled>
                                    Select starting slot
                                </option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </article>
                        <article className='manual-time-entry'>
                            <label htmlFor="ending-slot">Ending Slot:</label>
                            <select 
                                className='manual-time-box'
                                id="ending-slot"
                                value={endingSlot}
                                onChange={handleEndingSlotChange}
                            >
                                <option value="" disabled>
                                    Select ending slot
                                </option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                        </article>
                
                    <button className='manual-time-button' type="submit">Submit</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
                </section>
            </main>
        </>
    );
};

export default ManualTime;
