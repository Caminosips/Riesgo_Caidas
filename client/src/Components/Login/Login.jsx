import React from "react";
import "./Login.css";
import "../../App.css";

const Login = () => {
  return (
    <div className="Loginpage flex">
        <div classname="wrapper">
            <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Nombre de usuario" required />
            </div>

            <div className="input-box">
                <input type="text" placeholder="Password" required />
            </div>

            <button type="submit"> Login </button>
            </form>
        </div>
    </div>
  );
};

export default Login;
