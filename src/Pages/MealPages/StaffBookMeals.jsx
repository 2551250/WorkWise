import "./StaffBookMeals.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from "../../Components/Header/Header";
const BookMeals = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [bookingStates, setBookingStates] = useState(Array(3).fill(false)); // Assuming 3 meals, change as needed
    const [mealIndexToBook, setMealIndexToBook] = useState(null);
    const navigate = useNavigate();

    const handleBookMeal = (mealIndex) => {
        setMealIndexToBook(mealIndex);
        setShowPopup(true);
    };

    const handleConfirmBooking = () => {
        setShowPopup(false);
        if (mealIndexToBook !== null) {
            const newBookingStates = [...bookingStates];
            newBookingStates[mealIndexToBook] = true;
            setBookingStates(newBookingStates);
            setMealIndexToBook(mealIndexToBook);
        }
    };

    const handleCancelBooking = () => {
        setShowPopup(false);
        setMealIndexToBook(null);
    };
    const homePageButton = () => {
        navigate("/Staff");
    }

    return (
        <>
        <Header>
            <h1> Workwise </h1>
            <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
            <button className="logout-button">Log Out</button>
        </Header>

        <main>
            <h2 className="bookmeals-header">Meals for the Day</h2>
            <section className="bookmeals">
                {bookingStates.map((isBooked, index) => (
                    <section key={index} className={`bookmeal-wrapper ${isBooked ? 'booked' : ''}`}>
                        <article className="bookmeal-content">
                            <h3>Meal Name</h3>
                            <p>Description of meal is given over here for the day. 
                                This dish has amazing scents tastes and colours 
                                that would give you a whirlwind of an experience</p>
                        </article>
                        <button
                            className="bookmeal-button"
                            onClick={() => handleBookMeal(index)}
                            disabled={isBooked || mealIndexToBook !== null}>
                            {isBooked ? 'Meal Booked!' : 'Book Meal'}
                        </button>
                    </section>
                ))}
            </section>
            {showPopup && (
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
        </>
    );
};


export default BookMeals;