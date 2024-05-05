import React from "react";

import "./ViewMealCard.css";

const ViewMealCard = ({name, description}) => {
    return (
        <article className='meal-entry'>
            <p>Name: {name}</p>
            <p>Description: {description}</p>    
        </article>
    );
}

export default ViewMealCard;