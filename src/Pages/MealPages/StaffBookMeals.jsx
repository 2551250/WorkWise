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
    //If a meal has been booked in the database display to staff member
    return (
        <section>
            <h2 className="bookedmeal-header">Meals for the Day</h2>
            <article className="bookedmeal-wrapper">
            <article className="bookedmeal-content">
            <h3> {meal.MEAL_NAME} </h3>
            <p> {meal.MEAL_DESCRIPTION} </p>
            </article>
            </article>
        </section>
    );
}

//If a meal has not been booked then display meal options so that the staff can book their meal
const SelectMealSection = ({employeeID, bookedMeal, setBookedMeal, setActiveSection}) => {
    const [displayPopup, setDisplayPopup]= useState(false);
    const [meals, setMeals] = useState([]);

    //Fetching meal data 
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

    //If a meal has been clicked display confirmation popup
    const handleBookMeal = (meal) => {
        setBookedMeal(meal);
        setDisplayPopup(true);
    };
    //If confirm in confirmation popup has been clicked then change view 
    const handleConfirmBooking = async () => {
        const response = await addBooking(employeeID, bookedMeal.MEAL_ID);
        if (response === "Booking successfully created"){
            setDisplayPopup(false);
            setActiveSection("viewBookedMealSection");
        }
    };
    //If cancel in confirmation popup has been pressed then remove confirmation popup 
    const handleCancelBooking = () => {
        setDisplayPopup(false);
    };

    return (
        <main className="meals-container">
            <h2 className="bookmeals-header">Meals for the Day</h2>
            
            <section className="bookmeals">
                {meals.length > 0 ? meals.map((meal) => (
                    <BookMealCard 
                        key={meal.MEAL_ID} 
                        meal={meal}
                        handleBookMeal={handleBookMeal}
                    />
                )):
                (
                    <section className="nomeal-wrapper">
                        <p>No meals created for the day. Please contact HR.</p>
                    </section>
                )}
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
}

const BookMeals = () => {
    // Variables
    const navigate = useNavigate();
    const { employeeID } = useEmployee();

    const [bookedMeal, setBookedMeal] = useState({});
    const [activeSection, setActiveSection] = useState("viewBookedMealSection");
    

    // Functions & Logic
    //Checking if employee has already booked a meal
    useEffect(() => {
        const fetchBookedMealsData = async (employeeID) => {
            const data = await getEmployeeBookings(employeeID);
            let mealBooked = false;

            if (typeof(data) !== "string"){
                for (const meal of data){
                    // Checks if a meal has been booked and change to appropriate display
                    if (meal.DATE.substring(0, 10) === getCurrentDate()){
                        mealBooked = true;
                        setBookedMeal(meal);
                    }
                }
            }
            //Change to view so that employee can book their meal
            if (!mealBooked) {
                setActiveSection("selectMealSection");
            }
        }

        fetchBookedMealsData(employeeID);
    }, [employeeID]);

    //navigation to homepage
    const homePageButton = () => {
        navigate("/Staff");
    }
    //Log out user
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