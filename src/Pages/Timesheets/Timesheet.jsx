import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useEmployee } from '../../Components/EmployeeContext/EmployeeContext';
import { getTimePerProject, getTimePerDay, getEstimatedAndTotalTime, getRoleFromID, getAllEmployees, convertToTimePerDayPerStaff, getProjectAreaChartData, fetchWithRetry } from '../../backend';

import Header from "../../Components/Header/Header";
import ProjectAreaChart from '../../Components/AreaChart/ProjectAreaChart';
import StaffAreaChart from '../../Components/AreaChart/StaffAreaChart';

import './Timesheet.css'; // Import the CSS file


const ProjectTimesSection = ({ projectData }) => {
    /*
        Displays the project times(Project estimated time & Time spent on project) section

        :param1 projectData: object containing required project data to be displayed
        :returns HTML code: code for the actual section
    */
    // Variables
    const [esitmatedAndTotalTime, setEstimatedAndTotalTime] = useState({});

    // Functions & Logic
    useEffect(() => {
        // Get the Esitmated Time and Time Spent for the project
        const fetchEstimatedAndTotalTime = async () => {
            const fetchFunction = () => getEstimatedAndTotalTime(projectData.PROJECT_ID);

            try {
                const data = await fetchWithRetry(fetchFunction);
                if (typeof(data) !== "string") { // request was successful
                    setEstimatedAndTotalTime(data[0]);
                }
            } catch (err) { // Failed to fetch
                console.log('Failed to fetch estimated and total time after multiple attempts.');
            }
        };

        fetchEstimatedAndTotalTime(projectData);
    }, [projectData]);

    // HTML Code
    return (
        <section className='timesheet-wrapper'>
            <h2>Times for {projectData.PROJECT_NAME}</h2>
            
            <section className='timesheet-total'>
                <p>Total time estimated for {projectData.PROJECT_NAME}:</p>
                <p> {esitmatedAndTotalTime.ESTIMATED_TIME} Hours</p>
            </section>

            <section className='timesheet-estimated'>
                <p>Total time completed so far for {projectData.PROJECT_NAME}:</p>
                <p> {esitmatedAndTotalTime.TIME_SPENT} Hours</p>
            </section>
        </section>
    );
}


const ProjectMemberTimeSection = ({ projectID }) => {
    /*
        Displays the section containing the times of each member assigned to the project

        :param1 projectID: The id of the selected project
        :returns HTML code: code for the actual section
    */
    // Variables
    const [timePerEmployee, setTimePerEmployee] = useState([]);

    // Functions & Logic
    useEffect(() => {
        // Get the time spent on the project per employee
        const fetchTimePerProject = async () => {
            const fetchFunction = () => getTimePerProject(projectID);

            try {
                const data = await fetchWithRetry(fetchFunction);
                if (typeof(data) !== "string") { // request was successful
                    setTimePerEmployee(data);
                }
            } catch (err) {
                console.log('Failed to fetch time per project after multiple attempts.');
            }
        };

        fetchTimePerProject(projectID);
    
    }, [projectID]);

    // HTML Code
    return (
        <section className='timesheet-wrapper'>
            <h2>Staff Member times</h2>
            
            <section className='timesheet-headers'>
                <h3>Staff Members</h3>
                <h3>Time spent</h3>
            </section>

            {/* DISPLAY MEMBERS AND TIME_SPENT here */}
            {timePerEmployee.map(employee => ( 
                <section className='timesheet-data' key={employee.EMPLOYEE_ID}>
                    <p>{employee.NAME} {employee.SURNAME}</p>
                    <p>{employee.TIME} Hours</p>
                </section>
            ))}
        </section>
    );
}


const ProjectStatisticsSection = ({ projectData }) => {
    /*
        Displays the section containing project statistics in chart format

        :param1 projectData: object containing required project data to be displayed
        :returns HTML code: code for the actual section
    */

    // Variables
    const [timePerDay, setTimePerDay] = useState([]);

    // Functions & Logic
    useEffect(() => {
        // Get the time spent on the project in a day per Employee
        const fetchTimePerDay = async () => {
            const fetchFunction = () => getTimePerDay(projectData.PROJECT_ID);

            try {
                const data = await fetchWithRetry(fetchFunction);
                if (typeof(data) !== "string") { // request was successful
                    setTimePerDay(data);
                } else {
                    console.log(data);
                }
            } catch (err) {
                console.log('Failed to fetch time per day after multiple attempts.');
            }
        };

        fetchTimePerDay(projectData);
    }, [projectData]);

    const staffAreaChartData = Object.values(convertToTimePerDayPerStaff(timePerDay));
    const projectAreaChartData = getProjectAreaChartData(timePerDay);

    // HTML Code
    return (
        <section className='timesheet-wrapper'>
            <h2>Statistics for {projectData.PROJECT_NAME}</h2>

            <h2> Staff Contribution </h2>
            <ProjectAreaChart data={projectAreaChartData}/>

            <section className='charts-wrapper'>
                {/* Create a Area Chart for each staff in project */}
                {
                    staffAreaChartData.map(data => (
                        <StaffAreaChart data={data}/>
                    ))
                }
            </section>

        </section>
    );
} 


const Timesheet = () => {
    // Variables
    const location = useLocation();
    const projectData = location.state;
    const navigate = useNavigate();

    const { employeeID } = useEmployee();
    const viewerID = parseInt(employeeID); // Employee ID of the user viewing the Timesheets

    const [employees, setEmployees] = useState([]); // Will contain all the employees in the system

    // Functions & Logic
    useEffect(() => {

        // Gets all employees in our database
        const fetchEmployees = async () => {
            const data = await getAllEmployees();
            if (typeof(data) != "string"){ // request was successful
                setEmployees(data);
            }
        }
        fetchEmployees();
    }, []);

    /* 
        Redirect to Manager Homepage if Role is Manager, else
        redirect to HR Homepage
    */
    const homePageButton = () => {
        const role = getRoleFromID(viewerID, employees);
        if (role === "No Employee Found"){
            return
        }
        else{
            navigate(`/${role}`);
        }
    }

    // Log user out
    const logoutClicked = () =>{
        navigate("/");
    }

    // HTML Code
    return(
        <>
            <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button"  onClick={logoutClicked}>Log Out</button>
            </Header>

            <main className="timesheet-main">
                <ProjectTimesSection projectData={projectData}/>

                <ProjectMemberTimeSection projectID={projectData.PROJECT_ID}/>

                <ProjectStatisticsSection projectData={projectData}/>
            </main>
        </>
    );
}

export default Timesheet;