import React from "react";

import "./PopUp.css";

const PopUp = ({ trigger, setTrigger, children }) => {
    return (trigger) ? (
        <section className="popup">
            <article className="popup-inner">
                <button className="close-button" onClick={() => {setTrigger(false)}}>
                    Close 
                </button>
                {children}
            </article>
        </section>
    ) : "";
}

export default PopUp;