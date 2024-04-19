import React from "react";

import "./Popup.css";

const Popup = ({ trigger, setTrigger, children }) => {
    return (trigger) ? (
        <section className="popup">
            <article className="popup-inner">
                <button className="close-button" onClick={() => {setTrigger(false)}}>
                    close 
                </button>
                {children}
            </article>
        </section>
    ) : "";
}

export default Popup;