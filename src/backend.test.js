import { getRole, getEmployeeID, getProjectAssignedStaff, getStaffProjects, getManagerProjects, getCreatedReviews, getReceivedReviews, getAllEmployees, getAllProjects, isValidProjectDescription, isValidProjectEstimateTime, isValidProjectMembers, isValidProjectName } from "./backend";
import { checkEmployeeExists, isValidEmail, isValidPassword } from "./Pages/LoginPage/LoginPage.jsx";
import { getAllStaffData } from "./Pages/EmployeeManagementPage/EmployeeManagement.jsx";

// Test stubs
const userTestData = [
    {
        "EMAIL": "gcheadle@workwise.co.za",
        "PASSWORD": "password1@3",
        "ROLE": "HR",
        "EMPLOYEE_ID": "1"
    },
    {
        "EMAIL": "nraji@workwise.co.za",
        "PASSWORD": "nraji",
        "ROLE": "Manager",
        "EMPLOYEE_ID": "4"
    },
    {
        "EMAIL": "yali@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff",
        "EMPLOYEE_ID": "2"
    },
    {
        "EMAIL": "tbantam@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff",
        "EMPLOYEE_ID": "3"
    }
];

const projectsTestData = [
    {
        "PROJECT_ID": "1",
        "PROJECT_NAME": "WorkWise",
        "MANAGER_EMAIL": "nraji@workwise.co.za"
    },
    {
        "PROJECT_ID": "2",
        "PROJECT_NAME": "Employee-Relations Management",
        "MANAGER_EMAIL": "gcheadle@workwise.co.za"
    },
    {
        "PROJECT_ID": "3",
        "PROJECT_NAME": "ERM",
        "MANAGER_EMAIL": "gcheadle@workwise.co.za"
    }
];

const employeeProjectTestData = [
    {
        "EMP_PROJ_ID": "1",
        "EMPLOYEE_EMAIL": "tbantam@workwise.co.za",
        "PROJECT_ID": "1"
    },
    {
        "EMP_PROJ_ID": "2",
        "EMPLOYEE_EMAIL": "tbantam@workwise.co.za",
        "PROJECT_ID": "2"
    },
    {
        "EMP_PROJ_ID": "3",
        "EMPLOYEE_EMAIL": "yali@workwise.co.za",
        "PROJECT_ID": "3"
    }
];

// Tests
test('checks employee exists valid', function checkEmployeeExists_anyEmailAndPassword_valid() {
    expect(checkEmployeeExists("gcheadle@workwise.co.za", "password1@3", userTestData)).toBe(true);
});

test('checks employee exists invalid', function checkEmployeeExists_anyEmailAndPassword_invalid() {
    expect(checkEmployeeExists("yali@workwise.co.za", "pass", userTestData)).toBe(false);
});

test("checks get role HR", function checkGetRole_anyValidHR_valid() {
    expect(getRole("gcheadle@workwise.co.za", "password1@3", userTestData)).toBe("HR");
});

test("checks get role Staff", function checkGetRole_anyValidStaff_valid() {
    expect(getRole("tbantam@workwise.co.za", "password", userTestData)).toBe("Staff");
});

test("checks get role invalid", function checkGetRole_anyValidUser_invalid() {
    expect(getRole("tbantam@workwise.co.za", "pass", userTestData)).toBe("");
});

test("checks is valid email valid", function checkIsValidEmail_anyEmailEntered_valid() {
    expect(isValidEmail("gcheadle@workwise.co.za")).toBe(true);
});

test("checks is valid email invalid", function checkIsValidEmail_anyEmailEntered_invalid() {
    expect(isValidEmail("gdcheadle")).toBe(false);
});

test("checks is valid password valid", function checkIsValidPassword_anyPasswordEntered_valid() {
    expect(isValidPassword("password")).toBe(true);
});

test("checks is valid password invalid", function checkIsValidPassword_anyPasswordEntered_invalid() {
    expect(isValidPassword("")).toBe(false);
});

test('checks that only staff data is returned', function checkGetAllStaffData_anyUserLoggedIn_valid() {
    expect(getAllStaffData(userTestData)).toStrictEqual(userTestData.filter((employee) => employee.ROLE === "Staff"));
});

test("checks get employee id valid", function checksGetEmployeeID_anyUserLoggedIn_Valid() {
    expect(getEmployeeID("tbantam@workwise.co.za", "password", userTestData)).toBe("3");
});

test("checks get employee id invalid", function checksGetEmployeeID_anyState_Invalid() {
    expect(getEmployeeID("jsmith", "password", userTestData)).toBe("");
});

test("checks returning staff working on a project returns an error", async function checkGetProjectAssignedStaff_invalidProjectID_Invalid() {
    expect(await getProjectAssignedStaff(-1)).toBe("Error");
});

test("checks returning projects assigned to staff returns an error", async function checkGetStaffProjects_invalidEmployeeID_Invalid() {
    expect(await getStaffProjects(-1)).toBe("Error");
});

test("checks returning projects created by manager returns an error", async function checkGetManagerProjects_invalidManagerID_Invalid() {
    expect(await getManagerProjects(-1)).toBe("Error");
});

test("checks returning reviews created by employee returns an error", async function checkGetCreatedReviews_invalidEmployeeID_Invalid() {
    expect(await getCreatedReviews(-1)).toBe("Error");
});

test("checks returning reviews created by employee returns an error", async function checkGetReceivedReviews_invalidEmployeeID_Invalid() {
    expect(await getReceivedReviews(-1)).toBe("Error");
});

test("checks returning all employees reached database", async function checkGetAllEmployees_anyState_Valid() {
    expect(await getAllEmployees() === "Error").toBe(false);
});

test("checks returning all projects reached database", async function checkGetAllProjects_anyState_Valid() {
    expect(await getAllProjects() === "Error").toBe(false);
});

test("checks is valid project members valid", async function checksIsValidProjectMembers_anyState_Valid(){
    expect(isValidProjectMembers(userTestData)).toBe(true);
});

test("checks is valid project members invalid", async function checksIsValidProjectMembers_anyState_Invalid(){
    expect(isValidProjectMembers([])).toBe(false);
});

test("checks is valid project estimate time valid", async function checksIsValidProjectEstimateTime_anyState_Valid(){
    expect(isValidProjectEstimateTime(1)).toBe(true);
});

test("checks is valid project estimate time invalid", async function checksIsValidProjectEstimateTime_anyState_Invalid(){
    expect(isValidProjectEstimateTime(-2)).toBe(false);
});

test("checks is valid project description valid", async function checksIsValidProjectDescription_anyState_Valid(){
    expect(isValidProjectDescription("Description")).toBe(true);
});

test("checks is valid project description invalid", async function checksIsValidProjectDescription_anyState_Invalid(){
    expect(isValidProjectDescription("")).toBe(false);
});

test("checks is valid project name valid", async function checksIsValidProjectName_anyState_Valid(){
    expect(isValidProjectName("Name", projectsTestData)).toBe(true);
});

test("checks is valid project name invalid blank", async function checksIsValidProjectName_blank_Invalid(){
    expect(isValidProjectName("", projectsTestData)).toBe(false);
});

test("checks is valid project name invalid repeat",  function checksIsValidProjectName_repeat_Invalid(){
    expect(isValidProjectName("WorkWise", projectsTestData)).toBe(false);
});