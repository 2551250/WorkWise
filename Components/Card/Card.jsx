import React from "react";

import "./Card.css";

const Card = ({title, imgSrc, onClick}) => {
    return (
        <article className="featuresCard"  onClick={onClick}>
            <h2>{title}</h2>
            <img src={imgSrc} alt="Card"/>
        </article>
    );
}

export default Card;
