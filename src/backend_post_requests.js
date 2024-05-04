import axios from 'axios'
import { makeSQLFriendly } from './backend';
const URL = "https://workwise-backend.azurewebsites.net"

// This file contains all functions that send requests with a body to the API

// Function calls the API to create a new project in the database
async function insertProject(project_name, description, manager_id, estimated_time) {
    try {
        // Body of the request
        const project = {
            project_name: makeSQLFriendly(project_name), // Makes project name SQL Friendly 
            description: makeSQLFriendly(description), // Makes description SQL Friendly 
            manager_id: manager_id,
            estimated_time: estimated_time
        };

        const res = await axios.post(`${URL}/Project`, project);

        // Return the response data
        return res.data;
    } catch (error) {
        return error;
    }
}

// Function calls the API to assign a staff member to a project
// Inserts a record into the EmployeeProject table 
async function assignStaffToProject(staff_id, project_id) {
    try {
        // Body of the request
        const staff = {
            staff_id: staff_id,
            project_id: project_id
        };

        const res = await axios.post(`${URL}/EmployeeProject`, staff);

        // Return the response data
        return res.data
    } catch (error) {
        // Handle errors
        return error;
    }
}

async function insertReview(review_of, review_by, description, project_id) {
    try {
        const review = {
            review_of: review_of,
            review_by: review_by,
            description: makeSQLFriendly(description), // Makes description SQL Friendly 
            project_id: project_id
        };

        const res = await axios.post(`${URL}/Review`, review);

        // Return the response data
        return res.data;
    } catch (error) {
        // Handle errors
        return error;
    }
}

// Checks if the time entered by an employee conflicts with any previously entered times
// Date should be format yyyy/mm/dd and times hh:mm
// Do not call outside of this file
// Call updateTimeSpent
async function isTimeValid(employee_id, project_id, date, start_time, end_time) {
    const time = {
        employee_id: employee_id,
        project_id: project_id,
        start_time: start_time,
        end_time: end_time,
        date: date
    }
    const res = await axios.post(`${URL}/GetTime`, time);
    if (res.data.length > 0) {
        return false;
    }

    return true;
}

// Adds a time entry into the database
// Date should be format yyyy/mm/dd and times hh:mm (24 hour clock)
// Do not call outside of this file
// Call updateTimeSpent
async function insertTime(employee_id, project_id, date, start_time, end_time) {
    try {
        const time = {
            employee_id: employee_id,
            project_id: project_id,
            date: date,
            start_time: start_time,
            end_time: end_time
        }
        const res = await axios.post(`${URL}/Time`, time);
        return res.data;
    } catch (error) {
        // Handle errors
        return error;
    }
}

// Updates the time a user has spent on a project
// Date should be format yyyy/mm/dd and times hh:mm (24 hour clock)
async function updateTimeSpent(staff_id, project_id, start_time, end_time, date) {
    // Checks if entered times are valid
    const valid = await isTimeValid(staff_id, project_id, date, start_time, end_time);
    if (!valid) {
        // Error message
        return "Entered times conflict with previous entered times";
    }

    // Inserts new time into the database
    await insertTime(staff_id, project_id, date, start_time, end_time);

    // Converts times into number to update time spent
    const start = start_time.split(":");
    const end = end_time.split(":");
    const hours = Number(end[0]) - Number(start[0]);
    const minutes = Number(end[1]) / 60 - Number(start[1]) / 60;
    const time_spent = hours + minutes;

    // Put request to update time spent
    const update = {
        project_id: project_id,
        staff_id: staff_id,
        time_spent: time_spent
    }
    
    try {
        const res = await axios.put(`${URL}/EmployeeProject`, update);
        return res.data;
    } catch (error) {
        // Handle errors
        return error;
    }
}

async function insertMessage(message_sent_by, message_sent_to, message_text, project_id) {
    try {
        const message = {
            message_sent_by: message_sent_by,
            message_sent_to: message_sent_to,
            message_text: makeSQLFriendly(message_text), // Makes message text SQL Friendly 
            project_id: project_id
        };

        const res = await axios.post(`${URL}/Message`, message);

        // Return the response data
        return res.data;
    } catch (error) {
        // Handle errors
        return error;
    }
}

async function deleteManager(manager_id) {
    try {
        const res = axios.delete(`${URL}/RemoveManager/${manager_id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}

async function deleteStaff(staff_id) {
    try {
        const res = axios.delete(`${URL}/RemoveStaff/${staff_id}`);
        return res.data;
    } catch (error) {
        return error;
    }
}

// Exports
export { insertProject, assignStaffToProject, insertReview, updateTimeSpent, insertMessage, deleteManager, deleteStaff }