import axios from 'axios'
const URL = "https://workwise-backend.azurewebsites.net"

// This file contains all functions that send requests with a body to the API

// Function calls the API to create a new project in the database
async function insertProject(project_name, description, manager_id, estimated_time) {
    // Body of the request
    const project = {
        project_name: project_name,
        description: description,
        manager_id: manager_id,
        estimated_time: estimated_time
    }
    // Calls the API
    axios.post(`${URL}/Project`, project)
        .then((res) => {
            return res.data
        }).catch((err) => {
            return err;
        });
}

// Function calls the API to assign a staff member to a project
// Inserts a record into the EmployeeProject table 
async function assignStaffToProject(staff_id, project_id) {
    // Body of the request
    const staff = {
        staff_id: staff_id,
        project_id: project_id
    };
    // Calls the API
    axios.post(`${URL}/EmployeeProject`, staff)
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        });
}

async function insertReview(review_of, review_by, description, project_id) {
    const review = {
        review_of: review_of,
        review_by: review_by,
        description: description,
        project_id: project_id
    }

    axios.post(`${URL}/Review`, review)
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        });
}

// Checks if the time entered by an employee conflicts with any previously entered times
// Date should be format yyyy/mm/dd and times hh:mm
async function isTimeValid(employee_id, project_id, date, start_time, end_time) {
    let valid = true;
    const time = {
        employee_id: employee_id,
        project_id: project_id,
        start_time: start_time,
        end_time: end_time,
        date: date
    }
    await axios.post(`${URL}/GetTime`, time)
        .then((res) => {
            if (res.data.length > 0){
                valid = false;
            }
        }).catch((err) => {
            return err;
        });
    return valid
}

// Adds a time entry into the database
// Date should be format yyyy/mm/dd and times hh:mm (24 hour clock)
async function insertTime(employee_id, project_id, date, start_time, end_time) {
    const time = {
        employee_id: employee_id,
        project_id: project_id,
        date: date,
        start_time: start_time,
        end_time: end_time
    }

    axios.post(`${URL}/Time`, time)
        .then((res) => {
            return res.data;
        }).catch((err) => {
            return err;
        });
}

// Updates the time a user has spent on a project
// Date should be format yyyy/mm/dd and times hh:mm (24 hour clock)
async function updateTimeSpent(project_id, staff_id, start_time, end_time, date){
    // Checks if entered times are valid
    const valid = await isTimeValid(staff_id, project_id, date, start_time, end_time);
    if(!valid){
        return "You have already entered these times.";
    }
    
    // Inserts new time into the database
    await insertTime(staff_id, project_id, date, start_time, end_time);

    // Converts times into number to be entered into database
    const start = start_time.split(":");
    const end = end_time.split(":");
    const hours = Number(end[0]) - Number(start[0]);
    const minutes = Number(end[1]) / 60 - Number(start[1]) / 60;
    const time_spent = hours + minutes; 

    // Put request
    const update = {
        project_id: project_id,
        staff_id: staff_id,
        time_spent: time_spent
    }
    axios.put(`${URL}/EmployeeProject`, update)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.error(err);
    });
    return "Time successfully updated";
}

// Exports
export { insertProject, assignStaffToProject, insertReview, updateTimeSpent }