import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

import "./PopUp.css";
// Pop up display for errors during login
const PopUp = ({ trigger, setTrigger, children }) => {
    return (trigger) ? (
        <section className="popup">
            <article className="popup-inner">
                <section className="popup-text">
                    {children}
                </section>
                <FaRegWindowClose className="close-button" onClick={() => {setTrigger(false)}}/>
            </article>
        </section>
    ) : "";
}

export default PopUp;