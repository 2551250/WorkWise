async function getAllEmployees() {
  try {
    // Endpoint to get employees
    const endpoint = '/data-api/rest/Employee';
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.value;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

async function getAllProjects() {
    try{
        // Endpoint to get projects
        const endpoint = '/data-api/rest/Project';
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.value;
    } catch (err) {
        console.log(err);
        return "Error";
    }
}

async function getEmployeeProjects(){
    try{
        // endpoint to get all entries in EMPLOYEE_PROJECT
        const endpoint = '/data-api/rest/EmployeeProject';
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.value;
    } catch (err) {
        console.log(err);
        return "Error";
    }
}

// email is the manager email
// projects is the array of all projects 
// returns the projects that the manager created 
function getManagerProjects(email, projects){
    const ret = []
    for(let i = 0; i < projects.length; i++){
        if (projects[i].EMAIL === email){
            ret.push(projects[i]);
        }
    }
    return ret;
}

// email is the staff email
// projects is the array of all projects
// employee_projects is all entries in the EMPLOYEE_PROJECTS table
function getStaffProjects(email, projects, employee_projects){
    const myProjects = [];
    // Gets id of the projects for the entered employee
    for (let i = 0; i < employee_projects.length; i++){
        if (employee_projects[i].EMPLOYEE_EMAIL === email){
            myProjects.push(employee_projects[i].PROJECT_ID);
        }
    }
    const ret = [];
    // Loops through projects and gets details of assigned projects
    for (let i = 0; i < projects.length; i++){
        for(let j = 0; j < myProjects.length; j++){
            if (projects[i].PROJECT_ID === myProjects[j]){
                ret.push(projects[i]);
            }
        }
    }
    return ret;
}

function getRole(email, password, data) {
  // Finds the role of an employee -> {Staff, Manager, HR}
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj.EMAIL === email && obj.PASSWORD === password) {
      return obj.ROLE; // returns the role
    }
  }
  return "";
}

// exports
export {getRole, getEmployeeProjects, getAllProjects, getAllEmployees, getStaffProjects, getManagerProjects}