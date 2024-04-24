import { getRole } from "./backend";
import { checkEmployeeExists, isValidEmail, isValidPassword } from "./Pages/LoginPage/LoginPage.jsx";
import { getAllStaffData } from "./Pages/EmployeeManagementPage/EmployeeManagement.jsx";


// Test stubs
const userTestData = [
    {
        "EMAIL": "gcheadle@workwise.co.za",
        "PASSWORD": "password1@3",
        "ROLE": "HR"
    },
    {
        "EMAIL": "nraji@workwise.co.za",
        "PASSWORD": "nraji",
        "ROLE": "Manager"
    },
    {
        "EMAIL": "yali@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff"
    },
    {
        "EMAIL": "tbantam@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff"
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
        "PROEJCT_ID": "3"
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

test("checks is valid email invalid",function checkIsValidEmail_anyEmailEntered_invalid() {
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