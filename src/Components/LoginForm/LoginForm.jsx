import React from "react";
import { FaFax, FaLock } from "react-icons/fa";
import { useState } from "react";

import "./LoginForm.css";
import { list, getRole} from "../../backend";


const checkEmployeeExists = (email, password, data) => {
    /* 
        Checks whether an employee {Manager, HR, Staff} exists in 
        our database or not.

        :param email: employee's email address
        :param password: employee's login password
        :param data: json of all the data in Employee datatable
        :return: Boolean Value
    */

    // Checks if employee exists
    for(let i = 0; i < data.length; i++){
        const obj = data[i];
        if(obj.EMAIL === email && obj.PASSWORD === password){
            return true; // Employee does exist
        }
      }
    return false; // Employee doesn't exist
}


const LoginForm = () => {
    // Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Logic & Functions
    const handleButtonClick = async () => {    
        const data = await list();

        const employeeExists = checkEmployeeExists(email, password, data);
        console.log(`Employee Exists: ${employeeExists}`);

        if (!employeeExists){
            // TODO Handle when an employee does not exist
            return;
        }

        const role = getRole(email, password, data);
        console.log(role);
        // TODO redirect employee type to their relevant Home page 
    }
    
    // HTML Code
    return (
        <section className="wrapper">
            <section className="welcome-wrapper">
                <h1>WorkWise</h1>
            </section>

            <section className="form-wrapper">
                <form action="">
                    <h1>Login</h1>
                    <article className="input-box">
                        <input
                            value={email}
                            type="text" 
                            placeholder="Email" 
                            required
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <FaFax className="icon"/>
                    </article>
                    
                    <article className="input-box">
                        <input
                            value={password}
                            type="password"
                            placeholder="Password" 
                            required
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FaLock className="icon"/> 
                    </article>
                </form>
                <button type="submit" onClick={() => handleButtonClick()}>Login</button>
            </section>
        </section>
    );
};


export default LoginForm;