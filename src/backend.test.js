import { employeeExists } from "./backend";

const data = [
    {
        "EMAIL": "gcheadle@workwise.co.za",
        "PASSWORD": "password"
    }
];

test('checks login', () =>{
    expect(employeeExists("gcheadle@workwise.co.za", "password",data)).toBe(true);
});