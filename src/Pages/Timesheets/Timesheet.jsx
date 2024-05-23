import React from 'react';
import { useQuery } from 'react-query';

import { useLocation, useNavigate } from 'react-router';
import { getTimePerProject, getTimePerDay, getEstimatedAndTotalTime, convertToTimePerDayPerStaff, getProjectAreaChartData} from '../../backend';

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

    // Functions & Logic
    const { data , isLoading } = useQuery({
        queryFn: () => getEstimatedAndTotalTime(projectData.PROJECT_ID),
        queryKey: ["EsitmatedAndTotalTimeData", projectData],
    });

    if (isLoading){
        return (
            <section className='timesheet-wrapper'>
                <h2>Times for {projectData.PROJECT_NAME}</h2>
                <h2>Loading...</h2>
            </section>
        );
    }

    const esitmatedAndTotalTime = data[0]; // Project estimated time & Time spent on project

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

    // Functions & Logic
    const { data: timePerEmployee, isLoading, isError, error } = useQuery({
        queryFn: () => getTimePerProject(projectID),
        queryKey: ["TimePerProjectData", projectID],
    });

    if ( isLoading ){
        return (
            <section className='timesheet-wrapper'>
                <h2>Staff Member times</h2>
                
                <section className='timesheet-headers'>
                    <h3>Staff Members</h3>
                    <h3>Time spent</h3>
                </section>

                <h2>Loading...</h2>
            </section>
        );
    }

    if ( isError ){
        return (
            <section className='timesheet-wrapper'>
                <h2>Staff Member times</h2>
                
                <section className='timesheet-headers'>
                    <h3>Staff Members</h3>
                    <h3>Time spent</h3>
                </section>

                <h2>Error: {error.message}</h2>
            </section>
        );
    }

    // HTML Code
    return (
        <section className='timesheet-wrapper'>
            <h2>Staff Member times</h2>
            
            <section className='timesheet-headers'>
                <h3>Staff Members</h3>
                <h3>Time spent</h3>
            </section>

            {/* DISPLAY MEMBERS AND TIME_SPENT here */}
            {typeof(timePerEmployee) !== "string" ? 
                timePerEmployee.map(employee => ( 
                <section className='timesheet-data' key={employee.EMPLOYEE_ID}>
                    <p>{employee.NAME} {employee.SURNAME}</p>
                    <p>{employee.TIME} Hours</p>
                </section>
            )): timePerEmployee}
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

    // Functions & Logic
    const { data: timePerDay, isLoading } = useQuery({
        queryFn: () => getTimePerDay(projectData.PROJECT_ID),
        queryKey: ["TimePerDayData", projectData],
    });

    if ( isLoading ){
        return (
            <section className='timesheet-wrapper'>
                <h2>Statistics for {projectData.PROJECT_NAME}</h2>

                <h2> Staff Contribution </h2>
                <h2>Loading...</h2>
            </section>
        );
    }

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
                        <StaffAreaChart key={data[0].EMPLOYEE_ID} data={data}/>
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

    // Functions & Logic
     
    /* 
        Redirect to Manager Homepage if Role is Manager, else
        redirect to HR Homepage
    */
    const homePageButton = () => {
        navigate(`/${projectData.USER_ROLE}`);
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