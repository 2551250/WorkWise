import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router';

import './HRPlanMeals.css'; // Import the CSS file

import Header from "../../Components/Header/Header";
import ViewMealCard from '../../Components/ViewMealCard/ViewMealCard';

import { addMeal } from '../../backend_post_requests';
import { getMeals, isValidMealName, isValidMealDescription } from '../../backend';


const ViewMealsSection = () => {
    // State variable for the formatted date
    const [formattedDate, setFormattedDate] = useState('');
    const [createdMeals, setCreatedMeals] = useState([]);

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

        const fetchData = async (date) => {
            const data = await getMeals(date);
            if (data !== "Error") {
                setCreatedMeals(data);
            }
        }
        fetchData(formattedDate);
    }, []);

    return(
        <>
        <section className='display-meals-wrapper'>
            <h2>Meals for {formattedDate}</h2>
            
            {createdMeals !== "No meal options" && createdMeals.length > 0 ? createdMeals.map((meal) =>(
                <ViewMealCard key={meal.MEAL_ID} name={meal.MEAL_NAME} description={meal.MEAL_DESCRIPTION}/>
            )) : <p>No Meal Options Created</p>}
        </section>
        </>
    );
}


const CreateMealSection = ({setActiveSection}) => {
    // Variables
    const [formattedDate, setFormattedDate] = useState('');
    const [mealName, setMealName] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [createdMeals, setCreatedMeals] = useState([]);
    const [error, setError] = useState("");

    // Functions & Logic
    
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

        const fetchData = async (date) => {
            const data = await getMeals(date);
            if (typeof(data) !== "string") {
                setCreatedMeals(data);
            }
        }
        fetchData(formattedDate);
    }, []); // Empty dependency array ensures this runs once on mount

    const handleSubmitButtonClick = async () => {

        //Checks for a meal name not being valid
        if (!isValidMealName(mealName, createdMeals)) {
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

            setActiveSection("viewMealSection");
        }
    }

    // HTML Code
    return (
        <section className='book-meals-wrapper'>
            <h2>Meal Creation for {formattedDate}</h2>
            <article className='book-entry'>
                <p className='book-entry-name'> Meal:</p>
                <input
                value={mealName}
                type="text"
                maxLength={30}
                placeholder='Enter meal name'
                onChange={(event) => setMealName(event.target.value)}
                />
                <p className='book-entry-desc'> Description:</p>
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
        </section>
    );
};


const HRPlanMeals = () => {
    // Variable
    const [activeSection, setActiveSection] = useState("createMealSection");
    const navigate = useNavigate();

    //Functions & Logic
    // redirect to HomePage
    const homePageButton = () => {
        navigate("/HR");
    }

    const createMealButtonClicked = () => {
         /*
            Sets activeSection to createMealSection when the Create Meal button is clicked
        */
       setActiveSection("createMealSection");
    }

    const viewMealButtonClicked = () => {
        /*
            Sets activeSection to viewMealSection when the View Meals button is clicked
        */
        setActiveSection("viewMealSection");
    }
    
    const logoutClicked = () =>{
        navigate("/");
    }

    // HTML Code
    return (
        <>
        <Header>
            <h1> Workwise </h1>
            <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
            <button className="logout-button" onClick={logoutClicked}>Log Out</button>
        </Header>

        <section className="display">
            <section className="panel">
                <button className="panelButtons" onClick={createMealButtonClicked}>Add a Meal</button>
                <button className="panelButtons" onClick={viewMealButtonClicked}> View Meals</button>
            </section>

            {activeSection === "createMealSection" && <CreateMealSection setActiveSection={setActiveSection}/> }
            {activeSection === "viewMealSection" && <ViewMealsSection/> }
        </section>
        </>
    );
}

export default HRPlanMeals;