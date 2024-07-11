import React from "react";
import "./Login.css";
import "../../App.css";
import { FaUser, FaLock } from "react-icons/fa6";



const Login = () => {
  return (
  <div className="loginpage flex">
    <div className="Login">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Nombre de usuario" required />
                <FaUser className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Contraseña" required />
                <FaLock className="icon" />
            </div>


            <button type="submit">Login</button>

        </form>
        </div>
    </div>
  );
};

export default Login;
