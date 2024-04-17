import React from "react";

import "./LoginForm.css"
import { FaFax, FaLock } from "react-icons/fa";

const LoginForm = () => {
    return (
        <section className="wrapper">
            <section className="welcome-wrapper">
                <h1>WorkWise</h1>
            </section>

            <section className="form-wrapper">
                <form action="">
                    <h1>Login</h1>
                    <article className="input-box">
                        <input type="text" placeholder="Email" required/>
                        <FaFax className="icon"/>
                    </article>
                    
                    <article className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className="icon"/>
                    </article>
                    
                    <button type="button">Login</button>

                </form>
            </section>
        </section>
    );
};


export default LoginForm;