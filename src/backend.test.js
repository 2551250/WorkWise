import { employeeExists, getRole} from "./backend";

const data = [
    {
        "EMAIL": "gcheadle@workwise.co.za",
        "PASSWORD": "password",
        "ROLE": "HR"
    }
];

test('checks employee exists', () =>{
    expect(employeeExists("gcheadle@workwise.co.za", "password",data)).toBe(true);
});

test("checks get role", ()=>{
    expect(getRole("gcheadle@workwise.co.za", "password",data)).toBe("HR");
})