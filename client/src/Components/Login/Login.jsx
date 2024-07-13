import React from "react";
import "./Login.css";
import "../../App.css";
import { FaUser, FaLock } from "react-icons/fa6";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";





const Login = ({setUser}) => {
    const [usuario,setUsuario] = useState("")
    const [contraseña,setContraseña] = useState("")
    const navigateTo = useNavigate()

    
    const handleSubmit = (e) => {
      e.preventDefault()

      setUser([usuario])
  
    }

    const LoginUser = () =>{
      navigateTo('/form')

    }

  return (
    <div className="loginpage flex">
      <div className="Login">
        <form action=""
        onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" 
            placeholder="Nombre de usuario" 
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input type="password" 
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
            />
            <FaLock className="icon" />
          </div>


          <button type="submit" onClick={LoginUser}>Login</button>
  
            
            
          
        </form>
      </div>
    </div>
  );
}

export default Login;
