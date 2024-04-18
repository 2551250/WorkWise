// Function returns all employees in the database (staff, manager and HR)
export async function list() {
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

export function getRole(email, password, data) {
  // Finds the role of an employee -> {Staff, Manager, HR}
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj.EMAIL === email && obj.PASSWORD === password) {
      return obj.ROLE; // returns the role
    }
  }
  return "";
}