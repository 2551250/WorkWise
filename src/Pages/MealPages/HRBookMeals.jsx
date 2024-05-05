import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router';

import './HRBookMeals.css'; // Import the CSS file

import Header from "../../Components/Header/Header";
import { addMeal } from '../../backend_post_requests';
import { isValidMealName, isValidMealDescription } from '../../backend';


const HRBookMeals = () => {
    // Variables
    const [formattedDate, setFormattedDate] = useState('');
    const [mealName, setMealName] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Functions & Logic
    // redirect to HomePage
    const homePageButton = () => {
        navigate("/HR");
    }
    
    // Effect hook to set the formatted date when the component mounts
    useEffect(() => {
        // Create a new Date object
        const today = new Date();
        
        // Get the day, month, and year from the Date object
        const day = today.getDate();
        const year = today.getFullYear();

        // Define an array of month names
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Get the month name using the month index
        const monthName = monthNames[today.getMonth()];

        // Format the date as "29 May 2024"
        const formattedDate = `${day} ${monthName} ${year}`;

        // Set the formatted date to the state variable
        setFormattedDate(formattedDate);
    }, []); // Empty dependency array ensures this runs once on mount

    const handleSubmitButtonClick = async () => {

        //Checks for a meal name not being valid
        if (!isValidMealName(mealName)) {
            setError("Invalid Meal Name.");
            return;
        }
        //Checks for a meal description not being valid
        else if (!isValidMealDescription(mealDescription)) {
            setError("Invalid Meal Description.");
            return;
        }

        const response = await addMeal(mealName, mealDescription, formattedDate);
        if (response.trim() === "Meal option successfully created"){
            //TODO: handle a meal option being successfully created
            setMealName("");
            setMealDescription("");

        }
    }

    // HTML Code
    return (
        <>
        <Header>
            <h1> Workwise </h1>
            <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
            <button className="logout-button">Log Out</button>
        </Header>

        <main>
            <section className='book-meals-wrapper'>
                <h2>Meal Creation for {formattedDate}</h2>
                <article className='book-entry'>
                    <p> Meal:</p>
                    <input
                    value={mealName}
                    type="text"
                    maxLength={30}
                    placeholder='Enter meal name'
                    onChange={(event) => setMealName(event.target.value)}
                    />
                    <p> Description:</p>
                    <textarea
                        value={mealDescription}
                        placeholder="Enter your text here"
                        maxLength={200} // Limit the text length to 30 characters
                        rows={4} // Specify the number of visible rows
                        cols={40} // Specify the number of visible columns
                        onChange={(event) => setMealDescription(event.target.value)}
                    />
                </article>
                {error ? <label className='errorLabel'>{error}</label> : ""}
                <button className='book-meals-button' onClick={handleSubmitButtonClick}> Submit meal</button>
                <button className='book-meals-button'>View today's meals</button>
                
            </section>
        </main>
        </>
    );
};

export default HRBookMeals;