import React, {useState,useEffect} from 'react';
import './HRBookMeals.css'; // Import the CSS file

const HRBookMeals = () => {
    // State variable for the formatted date
    const [formattedDate, setFormattedDate] = useState('');

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

    
    return (
        <>
        <Header>
        <h1> Workwise </h1>
        <button className="homepage-button">Homepage</button>
        <button className="logout-button">Log Out</button>
    </Header>
        <main className='book-meals-page'>
        <section className='book-meals-wrapper'>
            <h2>Meal Creation for {formattedDate}</h2>
            <article className='book-entry'>
                <p> Meal:</p>
                <input
                type="text"
                maxLength={30}
                placeholder='Enter meal name'
                />
                <p> Description:</p>
                <textarea
                    placeholder="Enter your text here"
                    maxLength={200} // Limit the text length to 30 characters
                    rows={4} // Specify the number of visible rows
                    cols={40} // Specify the number of visible columns
                />
            </article>
            <button className='book-meals-button'> Submit meal</button>
            <button className='book-meals-button'>View today's meals</button>
            
        </section>
        </main>
        </>
    );
};

export default HRBookMeals;