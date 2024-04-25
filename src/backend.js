
const URL = "https://workwise-backend.azurewebsites.net"
//Returns all employees in the database
async function getAllEmployees() {
  try {
    // Endpoint to get employees
    const endpoint = `${URL}/Employee`;
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

// Returns the role of the entered employee
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

//Returns all projects in the database
async function getAllProjects() {
  try {
    // Endpoint to get employees
    const endpoint = `${URL}/Project`;
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

// Returns the projects to which the entered staff is assigned
async function getStaffProjects(employeeID) {
  try {
    const endpoint = `${URL}/EmployeeProject/Employee/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

// Returns all staff assigned to a project
async function getProjectAssignedStaff(projectID) {
  try {
    const endpoint = `${URL}/EmployeeProject/Project/${projectID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

// Returns the projects created by a manager
async function getManagerProjects(managerID) {
  try {
    const endpoint = `${URL}/Project/${managerID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return "Error";
  }
}

// exports
export { getRole, getAllEmployees, getAllProjects, getStaffProjects, getManagerProjects, getProjectAssignedStaff }