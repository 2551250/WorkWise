import React, { useState, useEffect } from 'react';
import './Timesheet.css';
import "./ProjectStatPage.css";
import Header from "../../Components/Header/Header";
import { useLocation, useNavigate } from 'react-router';
import { useEmployee } from '../../Components/EmployeeContext/EmployeeContext';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { getTimePerProject, getTimePerDay, getEstimatedAndTotalTime, getRoleFromID, getAllEmployees } from '../../backend';

// Generating colours for staff graphs
const getRandomColour = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

//Chart created to display each staff members individual chart on a project
const StaffAreaChart = ({ data }) => {
    const randomColour = getRandomColour();

    return (
        <>
        <article className='charts-container'>
            <h4> {data[0].NAME} {data[0].SURNAME} </h4>
            <article className='charts2'>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        // syncId="anyId"
                        margin={{
                            top: 10,
                            right: 50,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="DATE" />
                        <YAxis unit="hr"/>
                        <Tooltip />
                        <Area type="monotone" dataKey="TIME" stroke={randomColour} fill={randomColour} />
                    </AreaChart>
                </ResponsiveContainer>
                </article>
            </article>
        </>
    );
}

//Chart created to display total time spend by all staff on the project
const ProjectAreaChart = ({ data }) => {
    const randomColour = getRandomColour();

    return (
        <article className='charts1' style={{ width: '97%', height: 300 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DATE">
                        <label value="Date" position="insideBottomRight" offset={-5} />
                    </XAxis>
                    <YAxis unit="hr">
                        <label value="Time (hours)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip />
                    <Area type="monotone" dataKey="TIME" stroke={randomColour} fill={randomColour} />
                </AreaChart>
            </ResponsiveContainer>
        </article>
    );
}

//Formatting Time to be for each staff member for each day
const convertToTimePerDayPerStaff = (timePerDay) =>
{
    const formattedData = {};

    for (const employee of timePerDay){
        const key = `${employee.EMPLOYEE_ID}`
        if (!(key in formattedData)){
            formattedData[key] = [];
        }

        formattedData[key].push(employee);
    }

    return formattedData;
}

//Formatting data for project chart
const getProjectAreaChartData = (timePerDay) => {
    const data = {};

    for (const employee of timePerDay){
        if (employee.DATE === null) continue;

        if (!(employee.DATE in data)){
            data[employee.DATE] = 0;
        }

        data[employee.DATE] += employee.TIME;
    }

    return Object.keys(data).map(key => ({
        DATE: key,
        TIME: data[key]
    }));
}


const Timesheet = () =>{
    // Creating variables
    const location = useLocation();
    const projectData = location.state;
    const navigate = useNavigate();

    const { employeeID } = useEmployee();
    const viewerID = parseInt(employeeID); // Employee ID of the message sender

    const [employees, setEmployees] = useState([]);
    const [timePerEmployee, setTimePerEmployee] = useState([]);
    const [timePerDay, setTimePerDay] = useState([]);
    const [esitmatedAndTotalTime, setEsitmatedAndTotalTime] = useState({});

    useEffect(() => {
        //Fetching time per project 
        const fetchTimePerProject = async (projectData) => {
            const data = await getTimePerProject(projectData.PROJECT_ID);
            if (typeof(data) != "string"){ //request was successful
                setTimePerEmployee(data);
            }
        }
        //Fetching time spent each day on a project
        const fetchTimePerDay = async (projectData) => {
            const data = await getTimePerDay(projectData.PROJECT_ID);
            if (typeof(data) != "string"){ //request was successful
                setTimePerDay(data);
            }
        }
        //Fetching the estimated time to be spent on the project and total time actually spent on the project 
        const fetchEstimatedAndTotalTime = async (projectData) => {
            const data = await getEstimatedAndTotalTime(projectData.PROJECT_ID);
            if (typeof(data) != "string"){ //request was successful
                setEsitmatedAndTotalTime(data[0]);
            }
        }
        //Calling above methods
        fetchEstimatedAndTotalTime(projectData);
        fetchTimePerProject(projectData);
        fetchTimePerDay(projectData);
    }, [projectData]);

    //Fetching all employees
    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getAllEmployees();
            if (typeof(data) != "string"){ //request was successful
                setEmployees(data);
            }
        }

        fetchEmployees();
    }, []);

    const staffAreaChartData = Object.values(convertToTimePerDayPerStaff(timePerDay));
    const projectAreaChartData = getProjectAreaChartData(timePerDay);

    //Navigation to correct homepage
    const homePageButton = () => {
        const role = getRoleFromID(viewerID, employees);
        if (role === "No Employee Found"){
            return
        }
        else{
            navigate(`/${role}`);
        }
    }

    const logoutClicked = () =>{
        navigate("/");
    }

    return(
        <>
        <Header>
            <h1> Workwise </h1>
            <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
            <button className="logout-button"  onClick={logoutClicked}>Log Out</button>
        </Header>

        <main className="timesheet-main">
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

            <section className='timesheet-wrapper'>
                <h2>Statistics for {projectData.PROJECT_NAME}</h2>

                <h2> Staff Contribution </h2>
                <ProjectAreaChart data={projectAreaChartData}/>

                <section className='charts-wrapper'>
                
                {
                    staffAreaChartData.map(data => (
                        <StaffAreaChart data={data}/>
                    ))
                }
                </section>

            </section>
        </main>
    </>
    );
}

export default Timesheet;