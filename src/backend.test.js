import { getRole } from "./backend";
import { checkEmployeeExists, isValidEmail, isValidPassword } from "./Pages/LoginPage/LoginPage.jsx";
import { getAllStaffData } from "./Pages/StaffManagementPage/EmployeeManagement.jsx";

const testData = [
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

test('checks employee exists valid', () =>{
    expect(checkEmployeeExists("gcheadle@workwise.co.za", "password1@3", testData)).toBe(true);
});

test('checks employee exists invalid', ()=>{
    expect(checkEmployeeExists("yali@workwise.co.za", "pass", testData)).toBe(false);
});

test("checks get role HR", ()=>{
    expect(getRole("gcheadle@workwise.co.za", "password1@3",testData)).toBe("HR");
});

test("checks get role Staff", ()=>{
    expect(getRole("tbantam@workwise.co.za", "password", testData)).toBe("Staff");
});

test("checks get role invalid", ()=>{
    expect(getRole("tbantam@workwise.co.za", "pass", testData)).toBe("");
});

test("checks is valid email valid", ()=>{
    expect(isValidEmail("gcheadle@workwise.co.za")).toBe(true);
});

test("checks is valid email invalid", ()=>{
    expect(isValidEmail("gdcheadle")).toBe(false);
});

test("checks is valid password valid", ()=>{
    expect(isValidPassword("password")).toBe(true);
});

test("checks is valid password invalid", ()=>{
    expect(isValidPassword("")).toBe(false);
});

test('checks that only staff data is returned', () =>{
    expect(getAllStaffData(testData)).toStrictEqual(testData.filter((employee) => employee.ROLE === "Staff"));
});
