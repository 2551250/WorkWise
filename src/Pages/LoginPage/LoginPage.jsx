import { React } from "react";
import { FaFax, FaLock } from "react-icons/fa";
import { useState } from "react";

import "./LoginPage.css";
import { list, getRole } from "../../backend";
import PopUp from "../../Components/PopUp/PopUp";

import { useNavigate } from "react-router-dom";

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
    for (let i = 0; i < data.length; i++) {
        const obj = data[i];
        if (obj.EMAIL === email && obj.PASSWORD === password) {
            return true; // Employee does exist
        }
    }
    return false; // Employee doesn't exist
}


const isValidEmail = (email) => {
    /* 
        Checks if the email entered is a vaild email

        :param email: employee's email address
        :return: Boolean Value
    */
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex for email pattern

    // No email was entered
    if (email === "") {
        return false;
    }

    // Email entered isn't a valid email
    else if (!emailPattern.test(email)) {
        return false;
    }

    // Email entered is a valid email
    return true;
}


const isValidPassword = (password) => {
    /* 
        Checks if the password entered is a vaild password

        :param password: employee's password
        :return: Boolean Value
    */

    // No password was entered
    if (password === "") {
        return false;
    }
    // Password is a valid password
    return true;
}


const LoginPage = () => {
    // Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [displayPopup, setDisplayPopup] = useState(false);

    // Logic & Functions
    const navigate = useNavigate();

    const handleButtonClick = async () => {

        setEmailError(""); setPasswordError("");
        // Validates employee login details
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        } else if (!isValidPassword(password)) {
            setPasswordError("Please enter a password");
            return;
        }
        const data = await list();
        const employeeExists = checkEmployeeExists(email, password, data);
        if (!employeeExists) {
            // Displays a popup when an employee does not exist
            setDisplayPopup(true);
            return;
        }

        const role = getRole(email, password, data);
        // TODO redirect employee type to their relevant Home page 
        navigate(`/${role}`);
    }

    // HTML Code
    return (
        <main className="container">
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
                            <FaFax className="icon" />
                            <label className="errorLabel">{emailError}</label>
                        </article>

                        <article className="input-box">
                            <input
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <FaLock className="icon" />
                            <label className="errorLabel">{passwordError}</label>
                        </article>
                    </form>
                    <button type="submit" onClick={() => handleButtonClick()}>Login</button>
                </section>
            </section>

            <PopUp trigger={displayPopup} setTrigger={setDisplayPopup}>
                <h3>Login Error</h3>
                <p>Incorrect Username/Password</p>
            </PopUp>
        </main>
    );
};


export default LoginPage;
export { checkEmployeeExists, isValidEmail, isValidPassword };