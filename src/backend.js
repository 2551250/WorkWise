export default login;
export {list, employeeExists, getRole, login}
// Function returns all employees in the database (staff, manager and HR)
async function list() {
    try{
      // Endpoint to get employees
      const endpoint = '/data-api/rest/Employee';
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.value;
    }catch(err){
      console.log(err);
      return "Error";
    }
  }

  
function employeeExists(email, password, data) {
        // Checks if employee exists
        for(let i = 0; i < data.length; i++){
          const obj = data[i];
          if(obj.EMAIL === email && obj.PASSWORD === password){
              return true; // Employee does exist
          }
        }
      return false; // Employe doesn't exist
  }
  
function getRole(email, password, data) {
      // Finds the role of an employee -> {Staff, Manager, HR}
      for(let i = 0; i < data.length; i++){
          const obj = data[i];
          if(obj.EMAIL === email && obj.PASSWORD === password){
              return obj.ROLE; // returns the role
          }
        }
      return "";
  }
  
  // Function verifies the identity of an employee
async function login(){
        const data = await(list());
        if(data === "Error"){
          //TODO add error handling
          return;
        }
        console.log(data)
      // // Get email and password from form
      //   const email = document.getElementById('email').value;
      //   const password = document.getElementById('password').value
  
      //   if (!employeeExists(email, password, data)){
      //     // TODO add employee doesn't exist handling
      //     return;
      //   }
  
      // // Find the role of existing employee
      //   const role = getRole(email, password, data);
      //   console.log(role);

      //   switch (role) {
      //     case "Staff":
      //       window.location.href = "staff_page.html";
      //       break;
      //     case "Manager":
      //       window.location.href = "manager_page.html";
      //       break;
      //     case "HR":
      //       window.location.href = "HR_page.html";
      //       break;
      //     default:
      //       alert("Ünknown Role");
      //   }
  }
  