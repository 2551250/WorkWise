import { getRole, getEmployeeID, getProjectAssignedStaff, getStaffProjects, getManagerProjects, getCreatedReviews, getReceivedReviews, getAllEmployees, getAllProjects, isValidProjectDescription, isValidProjectEstimateTime, isValidProjectMembers, isValidProjectName, getAllStaffManagerData, getProjectID, makeSQLFriendly, convertTime, isValidMealName, isValidMealDescription, findManagerName, getSentMessages, getMeals, checkEmployeeExists, isValidEmail, isValidPassword, getEmployeeName, getReceivedReviewsProject, isValidMessage, formatTime, getRoleFromID} from "./backend";

// Test stubs
const userTestData = [
    {
        "EMAIL": "gcheadle@workwise.co.za",
        "PASSWORD": "password1@3",
        "ROLE": "HR",
        "EMPLOYEE_ID": 1, 
        "NAME": "Gregory",
        "SURNAME": "Cheadle"
    },
    {
        "EMAIL": "nraji@workwise.co.za",
        "PASSWORD": "nraji",
        "ROLE": "Manager",
        "EMPLOYEE_ID": 4,
        "NAME": "Ntando",
        "SURNAME": "Raji"
    },
    {
        "EMAIL": "yali@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff",
        "EMPLOYEE_ID": 2, 
        "NAME": "Yassir",
        "SURNAME": "Ali"
    },
    {
        "EMAIL": "tbantam@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "Staff",
        "EMPLOYEE_ID": 3,
        "NAME": "Tania",
        "SURNAME": "Bantam"
    }
];

const projectsTestData = [
    {
        "PROJECT_ID": 1,
        "PROJECT_NAME": "WorkWise",
        "MANAGER_EMAIL": "nraji@workwise.co.za"
    },
    {
        "PROJECT_ID": 2,
        "PROJECT_NAME": "Employee-Relations Management",
        "MANAGER_EMAIL": "gcheadle@workwise.co.za"
    },
    {
        "PROJECT_ID": 3,
        "PROJECT_NAME": "ERM",
        "MANAGER_EMAIL": "gcheadle@workwise.co.za"
    }
];

const employeeProjectTestData = [
    {
        "EMP_PROJ_ID": 1,
        "EMPLOYEE_EMAIL": "tbantam@workwise.co.za",
        "PROJECT_ID": 1
    },
    {
        "EMP_PROJ_ID": 2,
        "EMPLOYEE_EMAIL": "tbantam@workwise.co.za",
        "PROJECT_ID": 2
    },
    {
        "EMP_PROJ_ID": 3,
        "EMPLOYEE_EMAIL": "yali@workwise.co.za",
        "PROJECT_ID": 3
    }
];

const mealTestData = [
    {
        "MEAL_ID": 1,
        "MEAL_NAME": "Grilled Salmon",
        "MEAL_DESCRIPTION": "Healthy",
        "DATE": "2024-05-06"
    },
    {
        "MEAL_ID": 2,
        "MEAL_NAME": "Beef Tacos",
        "MEAL_DESCRIPTION": "Tasty Mexican dish",
        "DATE": "2024-05-06"
    },
    {
        "MEAL_ID": 3,
        "MEAL_NAME": "Margherita Pizza",
        "MEAL_DESCRIPTION": "Classic Italian pizza",
        "DATE": "2024-05-06"
    }
]

const receivedReviews = [
    {
        "PROJECT_ID": 1,
        "DESCRIPTION": "Review" 
    }
]

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

test('checks that only staff and managerdata is returned', function checkGetAllStaffManagerData_anyUserLoggedIn_valid() {
    expect(getAllStaffManagerData(userTestData)).toStrictEqual(userTestData.filter((employee) => employee.ROLE !== "HR"));
});

test("checks get employee id valid", function checksGetEmployeeID_anyUserLoggedIn_Valid() {
    expect(getEmployeeID("tbantam@workwise.co.za", "password", userTestData)).toBe(3);
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

test("checks is valid project members valid", async function checksIsValidProjectMembers_anyState_Valid() {
    expect(isValidProjectMembers(userTestData)).toBe(true);
});

test("checks is valid project members invalid", async function checksIsValidProjectMembers_anyState_Invalid() {
    expect(isValidProjectMembers([])).toBe(false);
});

test("checks is valid project estimate time valid", async function checksIsValidProjectEstimateTime_anyState_Valid() {
    expect(isValidProjectEstimateTime(1)).toBe(true);
});

test("checks is valid project estimate time invalid", async function checksIsValidProjectEstimateTime_anyState_Invalid() {
    expect(isValidProjectEstimateTime(-2)).toBe(false);
});

test("checks is valid project description valid", async function checksIsValidProjectDescription_anyState_Valid() {
    expect(isValidProjectDescription("Description")).toBe(true);
});

test("checks is valid project description invalid", async function checksIsValidProjectDescription_anyState_Invalid() {
    expect(isValidProjectDescription("")).toBe(false);
});

test("checks is valid project name valid", async function checksIsValidProjectName_anyState_Valid() {
    expect(isValidProjectName("Name", projectsTestData)).toBe(true);
});

test("checks is valid project name invalid blank", async function checksIsValidProjectName_blank_Invalid() {
    expect(isValidProjectName("", projectsTestData)).toBe(false);
});

test("checks is valid project name invalid repeat", function checksIsValidProjectName_repeat_Invalid() {
    expect(isValidProjectName("WorkWise", projectsTestData)).toBe(false);
});

test("checks is valid meal name invalid length", function checksIsValidProjectName_LoggedIn_InvalidLength() {
    expect(isValidProjectName("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", mealTestData)).toBe(false);
});


test("checks get project id valid", function checksGetProjectID_anyState_Valid() {
    expect(getProjectID("WorkWise", projectsTestData)).toBe(1);
});

test("checks makes SQL friendly apostrophe", function checksMakeSQLFriendly_Apostrophe_Valid() {
    expect(makeSQLFriendly("Gregory's project")).toBe("Gregory''s project");
});

test("checks makes SQL friendly no apostrophe", function checksMakeSQLFriendly_NoApostrophe_Valid() {
    expect(makeSQLFriendly("Gregory")).toBe("Gregory");
});

test("checks convert time", function checksConvertTime_anyState_Valid() {
    expect(convertTime("12:00", "13:30")).toBe(1.5);
});

test("checks is valid meal name invalid repeat", function checksValidMealName_LoggedIn_InvalidRepeat() {
    expect(isValidMealName("Grilled Salmon", mealTestData)).toBe(false);
});

test("checks is valid meal name invalid blank", function checksValidMealName_LoggedIn_InvalidBlank() {
    expect(isValidMealName("", mealTestData)).toBe(false);
});

test("checks is valid meal name invalid length", function checksValidMealName_LoggedIn_InvalidLength() {
    expect(isValidMealName("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", mealTestData)).toBe(false);
});

test("checks is valid meal name valid", function checksValidMealName_LoggedIn_Valid() {
    expect(isValidMealName("Meal", mealTestData)).toBe(true);
});

test("checks is valid meal description valid", function checksValidMealDescription_AnyState_Valid() {
    expect(isValidMealDescription("Classic Italian pizza")).toBe(true);
})

test("checks is valid meal description invalid", function checksValidMealDescription_AnyState_Invalid() {
    expect(isValidMealDescription("")).toBe(false);
});

test("checks find manager name valid", function checksFindManagerName_AnyState_Valid() {
    expect(findManagerName(1, userTestData)).toBe("Gregory Cheadle");
});

test("checks find manager name invalid", function checksFindManagerName_AnyState_Invalid() {
    expect(findManagerName(10, userTestData)).toBe("Manager not assigned");
});

test("checks returning messages sent by employee returns an error", async function checkGetSentReviews_invalidEmployeeID_Invalid() {
    expect(await getSentMessages(-1)).toBe("Error");
});

test("checks get meals returns an error", async function checksGetMeals_unusedDate_Invalid(){
    expect(await getMeals("0000/00/00")).toBe("Error");
});

test("checks get project id", function checksGetProjectName_anyState_Valid(){
    expect(getProjectID("WorkWise", projectsTestData)).toBe(1);
});

test("checks is valid email invalid blank", function checksIsValidEmail_anyState_InvalidBlank(){
    expect(isValidEmail("")).toBe(false);
});


test("get employee name valid", function checksGetEmployeeName_anyState_Valid(){
    expect(getEmployeeName(1, userTestData)).toBe("Gregory Cheadle");
});

test("get employee name invalid", function checksGetEmployeeName_anyState_Invalid(){
    expect(getEmployeeName(-1, userTestData)).toBe("No Employee Found");
});

test("checks get received reviews", function checksGetReceivedReviews_anyState_Valid(){
    expect(getReceivedReviewsProject(1, receivedReviews)).toContainEqual({"DESCRIPTION": "Review", "PROJECT_ID": 1});
});

test("checks is valid message valid", function checksValidMessage_AnyState_Valid() {
    expect(isValidMessage("Message is valid.")).toBe(true);
});

test("checks is valid message invalid", function checksValidMessage_AnyState_Invalid() {
    expect(isValidMessage("")).toBe(false);
});

test("checks get role Manager from employee id", function checkGetRoleFromID_anyValidManager_valid() {
    expect(getRoleFromID(4, userTestData)).toBe("Manager");
});

test("checks get role Staff from employee id", function checkGetRoleFromID_anyValidStaff_valid() {
    expect(getRoleFromID(3, userTestData)).toBe("Staff");
});

test("checks get role invalid", function checkGetRoleFromID_anyValidUser_invalid() {
    expect(getRoleFromID(10, userTestData)).toBe("No Employee Found");
});

test("checks format time valid", function checksFormatTime_valid(){
    expect(formatTime("2024/02/04", "11:30")).toBe("00:00");
});