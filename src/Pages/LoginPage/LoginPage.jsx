import { React } from "react";
import { FaFax, FaLock } from "react-icons/fa";
import { useState } from "react";

import "./LoginPage.css";
import PopUp from "../../Components/PopUp/PopUp";
import { useEmployee } from "../../Components/EmployeeContext/EmployeeContext";
import { isValidEmail, isValidPassword} from "../../backend";
import { useNavigate } from "react-router-dom";
import { isValidLogin } from "../../backend_post_requests";

const LoginPage = () => {
    // Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [displayPopup, setDisplayPopup] = useState(false);
    const { setEmployeeID } = useEmployee();

    // Logic & Functions
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        // Validates employee login details
        if (!isValidEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        } else if (!isValidPassword(password)) {
            setPasswordError("Please enter a password");
            return;
        }
        const validLogin = await isValidLogin(email, password);
        if (validLogin.length === 0) {
            // Displays a popup when an employee does not exist
            setDisplayPopup(true);
            return;
        }

        const role = validLogin[0].ROLE;
        const ID = validLogin[0].EMPLOYEE_ID;
        // Sets the employeeID to the current employee's Employee_ID
        setEmployeeID(ID);

        // Redirects to the relevent employee types' home page
        navigate(`/${role}`);
    }

    // HTML Code
    return (
        <main className="container">
            <section className="login-wrapper">
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