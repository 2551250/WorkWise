import React, { useState, useEffect } from 'react';
import './Timesheet.css'; // Import the CSS file
import "./ProjectStatPage.css";
import Header from "../../Components/Header/Header";
import { useLocation, useNavigate } from 'react-router';
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { getEmployeeName, getAllEmployees } from '../../backend';

const Timesheet = () =>{
    const navigate = useNavigate
    const homePageButton = () => {
        navigate("/Manager");
    }
const location = useLocation();
const projectData = location.state;

console.log(projectData);

const { employeeID } = useEmployee();
const StaffID = parseInt(employeeID);

    // Sample data for the charts
const data = [
    { name: 'John', hoursSpent: 40, date: '2024-05-01', cumulativeHours: 40 },
    { name: 'Jane', hoursSpent: 35, date: '2024-05-02', cumulativeHours: 75 },
    // More data...
  ];
  
  const members = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // More members...
  ];
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Gets all employees stored in the database
    const fetchEmployees = async () => {
        const data = await getAllEmployees();
        if (typeof(data) != "string"){ //request was successful
            setEmployees(data);
        }
    }

    fetchEmployees();
}, [projectData]);



console.log(" MANAGER_ID ; " + projectData.MANAGER_ID);
console.log("TIME ; " + projectData.ESTIMATED_TIME);
console.log("NAME ; " + getEmployeeName(projectData.MANAGER_ID, employees));
return(
    <>
     <Header>
                <h1> Workwise </h1>
                <button className="homepage-button"  onClick={homePageButton}>Homepage</button>
                <button className="logout-button">Log Out</button>
        </Header>

    <main className="timesheet-main">

        <section className='timesheet-wrapper'>
        <h2>Times for {projectData.PROJECT_NAME}</h2>
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

        { /* DISPLAY MEMBERS AND TIME_SPENT here

        /* {projectData.map(project => ( 
            <section className='timesheet-data' key={project.EMPLOYEE_ID}>
                <p>{ getEmployeeName(project.EMPLOYEE_ID, employees)}</p>
                <p>{project.TIME_SPENT} Hours</p>
            </section>
        ))} */}
        </section>

        <section className='timesheet-wrapper'>
            <h2>Statistics for {projectData.PROJECT_NAME}</h2>

        
        <article className='charts1'>
          <BarChart width={400} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hoursSpent" fill="#8884d8" />
          </BarChart>
        
        </article>
        <section className='charts-container'>
        <article className='charts2'>
        <LineChart width={300} height={200} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cumulativeHours" stroke="#82ca9d" />
          </LineChart>

        </article>
        <article className='charts3'>
        <PieChart width={200} height={200}>
            <Pie data={data} dataKey="hoursSpent" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </article>
        </section>

        </section>

    </main>
    </>

);

}
export default Timesheet;