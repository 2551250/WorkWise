import React from "react";

import "./ViewMealCard.css";

const ViewMealCard = ({name, description}) => {
    return (
        <article className='meal-entry'>
            <p className="meal-entry-name">{name}</p>
            <p className="meal-entry-desc">{description}</p>    
        </article>
    );
}

export default ViewMealCard;