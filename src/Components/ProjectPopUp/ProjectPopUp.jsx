import React from 'react';
import './ProjectPopUp.css'; // Import the CSS file

const ProjectPopUp = ({trigger, setTrigger, children}) => {
    
    return (
        (trigger) ? (
        <section className="popup">
            <article className="popup-content">
                {children}
            </article>
        </section>
    ) : "");
};

export default ProjectPopUp;
