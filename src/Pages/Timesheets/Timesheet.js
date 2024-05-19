import React, { useState, useEffect } from 'react';
import './Timesheet.css'; // Import the CSS file

const Timesheet = () =>{
    const homePageButton = () => {
        navigate("/Manager");
    }

    const logoutClicked = () =>{
        navigate("/");
    }


return(
    <>
     <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button" onClick={logoutClicked}>Log Out</button>
        </Header>
    <main className="timesheet-main">

        <section className='timesheet-wrapper'>
        <h2>Times for Project Name</h2>
        <section className='timesheet-total'>
        <p>Total time estimated for project name:</p>
        <p>80 Hours</p>
        </section>
        <section className='timesheet-estimated'>
        <p>Total time completed so far for project name:</p>
        <p>80 Hours</p>
        </section>
        </section>
        <section className='timesheet-wrapper'>
            <h2>Staff Member times</h2>
        <section className='timesheet-headers'>
            <h3>Staff Members</h3>
            <h3>Time spent</h3>
        </section>
        <section className='timesheet-data'>
            <p>John Doe</p>
            <p>30 Hours</p>
        </section>
        <section className='timesheet-data'>
            <p>Anna Smith</p>
            <p>10 Hours</p>
        </section>
        </section>
        <section className='timesheet-wrapper'>
            <h2>Statistics for Project Name</h2>
        </section>




    </main>
    </>

);

}
export default Timesheet;