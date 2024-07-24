import "./Login.css";
import "../../App.css";
import axios from "axios";
import { FaUser, FaEyeSlash   } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



// Definimos estados para el manejo del login 
const Login = ({setUser}) => {
    const [usuario,setUsuario] = useState("")
    const [contraseña,setContraseña] = useState("")
    const [showPwd, setShowPwd] = useState(false)
    const navigateTo = useNavigate()
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (usuario === '' || contraseña === '') {
      } else {
          try {
              const response = await axios.post('http://localhost:5000/api/login', {
                  usuario,
                  contraseña
              });
              
              if (response.data.success) {
                  setUser([usuario]);
                  setContraseña([contraseña])
                  navigateTo('/form');
              } 
              } catch (error) {
              console.error('Error al iniciar sesión:', error);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Credenciales incorrectas, revise los datos ingresados  ",
              });
          }
      }
    }


  return (
    <div className="loginpage flex">
      <div className="Login">
        <form action=""
        onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" 
            required
            placeholder="Numero de documento" 
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            
            />
            <FaUser className="icon" />
          </div>

        <div className="input-box">
          <input 
            type={showPwd ? "text" : "password"}
            required 
            placeholder="Contraseña"
            value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
          {showPwd ? (
            <IoEye className="icon" onClick={() => setShowPwd(!showPwd)} />
          ) : (
            <FaEyeSlash className="icon" onClick={() => setShowPwd(!showPwd)} />
          )}
        </div>

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  );
}

export default Login;