import React from "react";
import "./Login.css";
import "../../App.css";
import { FaUser, FaEyeSlash   } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";





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

    const [showPwd, setShowPwd] = useState(false)
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
            <input type={ showPwd ? "text" :  "password"} 
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
            required
            />
              <FaEyeSlash className="icon" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ?  IoEye :  FaEyeSlash }
              </FaEyeSlash>
          </div>


          <button type="submit" onClick={LoginUser}>Login</button>
  
            
            
          
        </form>
      </div>
    </div>
  );
}

export default Login;
