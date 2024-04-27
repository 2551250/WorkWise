import axios from 'axios'
const URL = "https://workwise-backend.azurewebsites.net"

// This file contains all functions that send post or put requests to the API

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
            return console.log(res.data);
        }).catch((err) => {
            return console.error(err);
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
            return console.log(res.data);
        }).catch((err) => {
            return console.error(err);
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
            return console.log(res.data);
        }).catch((err) => {
            return console.error(err);
        });
}

export { insertProject, assignStaffToProject, insertReview }