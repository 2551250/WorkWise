import React from "react";

import "./BookMealCard.css";

const BookMealCard = ({meal, handleBookMeal}) => {
    return (
        <section className={`bookmeal-wrapper`}>
            <article className="bookmeal-content">
                <h3> {meal.MEAL_NAME} </h3>
                <p> {meal.MEAL_DESCRIPTION} </p>
            </article>
            <button className="bookmeal-button" onClick={() => handleBookMeal(meal)}>
                Book Meal
            </button>
        </section>
    );
}

export default BookMealCard;