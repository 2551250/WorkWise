import React from 'react';
import './ProjectPopUp.css'; // Import the CSS file

const ProjectPopUp = ({trigger, setTrigger, children}) => {
    
    return (
        (trigger) ? (
        <section className="projectpopup">
            <article className="projectpopup-content">
                {children}
            </article>
        </section>
    ) : "");
};

export default ProjectPopUp;
