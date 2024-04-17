import React, { useState } from "react";

import "./LoginForm.css"
import { FaFax, FaLock } from "react-icons/fa";


const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const onButtonClick = () => {
        setEmail("");
        setPassword("");

        if (email === ""){
            setEmailError("Please enter your email");
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }
    
        if ('' === password) {
        setPasswordError('Please enter a password')
        return
        }
    
        if (password.length < 7) {
        setPasswordError('The password must be 8 characters or longer')
        return
        }
    }

    return (
        <section className="wrapper">
            <section className="welcome-wrapper">
                <h1>WorkWise</h1>
            </section>

            <section className="form-wrapper">
                <form action="">
                    <h1>Login</h1>
                    <article className="input-box">
                        <input value={email} type="text" placeholder="Email" required onChange={(event) => setEmail(event.target.value)}/>
                        <FaFax className="icon"/>
                        <label className="errorLabel">{emailError}</label>
                    </article>
                    
                    <article className="input-box">
                        <input value={password} type="password" placeholder="Password" required onChange={(event) => setPassword(event.target.value)}/>
                        <FaLock className="icon"/>
                        <label className="errorLabel">{passwordError}</label>
                    </article>
                    
                    <button type="button" onClick={onButtonClick} value={'Log in'}>Login</button>

                </form>
            </section>
        </section>
    );
};

export default LoginForm;