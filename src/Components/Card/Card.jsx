import React from "react";

import "./Card.css";

const Card = ({title, imgSrc}) => {
    return (
        <article className="featuresCard">
            <h2>{title}</h2>
            <img src={imgSrc} alt="Card"/>
        </article>
    );
}

export default Card;
