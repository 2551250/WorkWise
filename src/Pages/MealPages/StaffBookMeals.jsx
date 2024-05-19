import "./StaffBookMeals.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import Header from "../../Components/Header/Header";
import BookMealCard from "../../Components/BookMealCard/BookMealCard";

import { getMeals } from "../../backend";
import { getEmployeeBookings, getCurrentDate } from "../../backend";
import { addBooking } from "../../backend_post_requests";


const BookedMealSection = ({meal}) => {
    return (
        <section>
            <h2 className="bookmeals-header">Meals for the Day</h2>
            <h3> {meal.MEAL_NAME} </h3>
            <p> {meal.MEAL_DESCRIPTION} </p>
        </section>
    );
}


const SelectMealSection = ({employeeID, bookedMeal, setBookedMeal, setActiveSection}) => {
    const [displayPopup, setDisplayPopup]= useState(false);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMealData = async () => {
            const currentDate = getCurrentDate();

            const data = await getMeals(currentDate);
            if (typeof(data) !== "string"){
                setMeals(data);
            }
        }

        fetchMealData();
    }, []);


    const handleBookMeal = (meal) => {
        setBookedMeal(meal);
        setDisplayPopup(true);
    };

    const handleConfirmBooking = async () => {
        const response = await addBooking(employeeID, bookedMeal.MEAL_ID);
        if (response === "Booking successfully created"){
            setDisplayPopup(false);
            setActiveSection("viewBookedMealSection");
        }
    };

    const handleCancelBooking = () => {
        setDisplayPopup(false);
    };

    return (
        <main>
            <h2 className="bookmeals-header">Meals for the Day</h2>
            
            <section className="bookmeals">
                {meals.map((meal) => (
                    <BookMealCard 
                        key={meal.MEAL_ID} 
                        meal={meal}
                        handleBookMeal={handleBookMeal}
                    />
                ))}
            </section>
            
            {displayPopup && (
                <section className="bookmeals-popup">
                    <article className="bookmeals-popup-content">
                        <h2>Confirm Booking</h2>
                        <p>Are you sure you want to book this meal?</p>
                        <article className="bookmeals-buttons">
                            <button onClick={handleConfirmBooking}>Confirm</button>
                            <button onClick={handleCancelBooking}>Cancel</button>
                        </article>
                    </article>
                </section>
            )}
        </main>
    );
};

const BookMeals = () => {
    // Variables
    const navigate = useNavigate();
    const { employeeID } = useEmployee();

    const [bookedMeal, setBookedMeal] = useState({});
    const [activeSection, setActiveSection] = useState("viewBookedMealSection");
    

    // Functions & Logic

    useEffect(() => {
        const fetchBookedMealsData = async (employeeID) => {
            const data = await getEmployeeBookings(employeeID);
            let mealBooked = false;

            if (typeof(data) !== "string"){
                for (const meal of data){
                    // Checks if a meal has been booked
                    if (meal.DATE.substring(0, 10) === getCurrentDate()){
                        mealBooked = true;
                        setBookedMeal(meal);
                    }
                }
            }

            if (!mealBooked) {
                setActiveSection("selectMealSection");
            }
        }

        fetchBookedMealsData(employeeID);
    }, [employeeID]);
    
    const homePageButton = () => {
        navigate("/Staff");
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

        {activeSection === "viewBookedMealSection" && <BookedMealSection meal={bookedMeal}/> }
        {activeSection === "selectMealSection" && <SelectMealSection employeeID={employeeID} bookedMeal={bookedMeal} setBookedMeal={setBookedMeal} setActiveSection={setActiveSection}/>}
        </>
    );
};


export default BookMeals;