const URL = "https://workwise-backend.azurewebsites.net"
//Returns all employees in the database
async function getAllEmployees() {
  try {
    // Endpoint to get employees
    const endpoint = `${URL}/Employee`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
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


// Returns the id of the entered employee
function getEmployeeID(email, password, data) {
  // Finds the role of an employee -> {Staff, Manager, HR}
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj.EMAIL === email && obj.PASSWORD === password) {
      return obj.EMPLOYEE_ID; // returns the role
    }
  }
  return "";
}

// Returns the id of a project
function getProjectID(projectName, data) {
  const filteredData = data.filter((project) => (project.PROJECT_NAME === projectName));
  const targetProject = filteredData[0];
  return targetProject.PROJECT_ID; // return the project id
}

//Returns all projects in the database
async function getAllProjects() {
  try {
    // Endpoint to get employees
    const endpoint = `${URL}/Project`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns the projects to which the entered staff is assigned
async function getStaffProjects(employeeID) {
  try {
    const endpoint = `${URL}/EmployeeProject/Employee/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns all staff assigned to a project
async function getProjectAssignedStaff(projectID) {
  try {
    const endpoint = `${URL}/EmployeeProject/Project/${projectID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns the projects created by a manager
async function getManagerProjects(managerID) {
  try {
    const endpoint = `${URL}/Project/${managerID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns all the reviews created by the employee
async function getCreatedReviews(employeeID) {
  try {
    const endpoint = `${URL}/CreatedReviews/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns all the reviews of the employee
async function getReceivedReviews(employeeID) {
  try {
    const endpoint = `${URL}/ReceivedReviews/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "Error"
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns all messages sent by an employee
async function getSentMessages(employeeID) {
  try {
    const endpoint = `${URL}/SentMessages/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "No sent messages";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns all messages sent to an employee
async function getReceivedMessages(employeeID) {
  try {
    const endpoint = `${URL}/ReceivedMessages/${employeeID}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "No received messages";
    }
    return data;
  } catch (err) {
    return "Error";
  }
}

// Returns the meals created for a certain day
// date must be format yyyy-mm-dd
async function getMeals(date){
  try{
    const endpoint = `${URL}/Meal/${date}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.length === 0) {
      return "No meal options";
    }
    return data
  }catch (err){
    return "Error";
  }
}

const isValidProjectMembers = (projectMembers) => {
  /* 
      Checks if at least one staff member is assigned to a project

      :param projectMembers: list of selected staff members
      :return: Boolean Value
  */

  // Checks if no staff members were assigned to the project
  if (projectMembers.length <= 0) {
    return false;
  }

  return true; // At least one staff member was assigned
}

const isValidProjectName = (projectName, projects) => {
  let valid = true;
  /* 
      Checks if the project name entered is a vaild

      :param1 projectName: project name entered
      :param2 projects: list of all project stored in the database
      :return: Boolean Value
  */

  // Checks if no project name was entered.
  if (projectName === "") {
    valid = false;
  }

  // Checks if project name is longer than 50 charaters
  if (projectName.length >= 50) {
    valid = false;
  }

  // Checks if the project name already exists.
  projects.forEach((project) => {
    if (project.PROJECT_NAME === projectName) {
      valid = false;
      return;
    }
  });
  return valid; // Project name is valid.
}

const isValidProjectDescription = (projectDescription) => {
  /* 
      Checks if the project description entered is a vaild

      :param projectDescription: project description entered
      :return: Boolean Value
  */

  // Checks if no project description was entered.
  if (projectDescription === "") {
    return false;
  }
  return true; // Project description is valid.
}

const isValidProjectEstimateTime = (projectEstimatedTime) => {
  /* 
      Checks if the project estimate time entered is a vaild

      :param projectDescription: project estimate time entered
      :return: Boolean Value
  */

  // Checks if negative time or no time was entered
  if (projectEstimatedTime <= 0) {
    return false;
  }
  return true; // Project estimate time is valid.
}

const findManagerName = (Employee_ID, data) => {
  
  if (typeof data !== "object"){
    return 'Manager not found'; //Error Handling
  }

  const manager = data.find(employee => employee.EMPLOYEE_ID === parseInt(Employee_ID));

  return manager ? `${manager.NAME} ${manager.SURNAME}` : 'Manager not found'; // Return manager name or a default message
}

const makeSQLFriendly = (text) => {
  /* 
    :param1 text: a string
    :returns: a string that is SQL friendly
  */
  return text.replace("'", "''");
}

const convertTime = (startTime, endTime) => {
    /* 
      Converts time from data-time format into integer

      :param1 startTime: start time of session
      :param2 endTime: end time of session
      :return: integer
  */
  const start = startTime.split(":");
  const end = endTime.split(":");
  const hours = Number(end[0]) - Number(start[0]);
  const minutes = Number(end[1]) / 60 - Number(start[1]) / 60;
  const time_spent = hours + minutes;
  return time_spent
}


const isValidMealName = (mealName, createdMeals) => {
  let valid = true;
/* 
    Checks if the meal name entered is a vaild

    :param1 mealName: meal name entered
    :return: Boolean Value
*/

  // Checks if no meal name was entered.
  if (mealName === "") {
    valid = false;
  }

  // Checks if meal name is longer than 50 charaters
  if (mealName.length >= 50) {
    valid = false;
  }

  // Checks if the meal name already exists.
  createdMeals.forEach((meal) => {
    if (meal.MEAL_NAME === mealName) {
      valid = false;
      return;
    }
  });

  return valid; // Meal name is valid.
}


const isValidMealDescription = (mealDescription) => {
  /* 
    Checks if the meal description entered is a vaild

    :param mealDescription: meal description entered
    :return: Boolean Value
*/

// Checks if no meal description was entered.
if (mealDescription === "") {
  return false;
}
return true; // meal description is valid.
}

// exports
export { getRole, getEmployeeID, getProjectID, getAllEmployees, getAllProjects, getStaffProjects, getManagerProjects, 
         getProjectAssignedStaff, getCreatedReviews, getReceivedReviews, isValidProjectMembers, isValidProjectName, 
         isValidProjectDescription, isValidProjectEstimateTime, findManagerName, getReceivedMessages, getSentMessages, 
         makeSQLFriendly, convertTime, getMeals, isValidMealName, isValidMealDescription}