import { useState } from "react";
import axios from "axios"; // Importamos Axios para hacer peticiones HTTP
import "../../App.css";
import "./Form.css";
import Navbar from "./Navbar"
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


const App = () => {
  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [num_id, setNum_id] = useState("");
  const [sexo, setSexo] = useState("");
  const [caidas, setCaidas] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [deficit, setDeficit] = useState([]);
  const [estado, setEstado] = useState("");
  const [deambulacion, setDeambulacion] = useState("");
  const [edad, setEdad] = useState("");
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const navigateTo = useNavigate();


  // Función para actualizar el puntaje total basado en las selecciones del usuario
  const actualizarPuntaje = (seccion, valor) => {
    setPuntajeTotal((prevPuntaje) => {
      let nuevoPuntaje = prevPuntaje;
      switch (seccion) {
        case "caidas":
           // Resta 1 si había caídas antes, suma 1 si hay caídas ahora
          nuevoPuntaje -= caidas === "Si" ? 1 : 0;
          nuevoPuntaje += valor === "Si" ? 1 : 0;
          break;
        case "medicamentos":
           // Resta puntos por medicamentos previos y suma por nuevos, excluyendo "Ningún medicamento"
          nuevoPuntaje -= medicamentos.filter(
            (med) => med !== "Ningun medicamento"
          ).length;
          nuevoPuntaje += valor.filter(
            (med) => med !== "Ningun medicamento"
          ).length;
          break;
        case "deficit":
          //Se hace algo similar a los medicamentos pero para el campo de deficit
          nuevoPuntaje -= deficit.filter(
            (def) => def !== "Ninguno"
          ).length;
          nuevoPuntaje += valor.filter(
            (def) => def !== "Ninguno"
          ).length;
          break;
        case "estado":
          // Suma 1 si el estado es confuso, resta si no lo es
          nuevoPuntaje =
            prevPuntaje -
            (estado === "Confuso" ? 1 : 0) +
            (valor === "Confuso" ? 1 : 0);
          break;

          case 'deambulacion':
            // Lógica compleja para manejar diferentes cambios en deambulación
            if (deambulacion === "") {
              // Si no había selección previa, simplemente añadimos 1 si no es "Normal"
              nuevoPuntaje += valor !== "Normal" ? 1 : 0;
            } else if (valor === "Normal") {
              // Si la nueva selección es "Normal", restamos 1 si la anterior no lo era
              nuevoPuntaje -= deambulacion !== "Normal" ? 1 : 0;
            } else if (deambulacion === "Normal") {
              // Si la selección anterior era "Normal" y la nueva no lo es, sumamos 1
              nuevoPuntaje += 1;
            }
            // Si cambiamos entre opciones no normales, el puntaje no cambia
            break;
        case "edad":
          // Suma 1 si es mayor de 70, resta si no lo es
          nuevoPuntaje =
            prevPuntaje -
            (edad === "Mayor de 70" ? 1 : 0) +
            (valor === "Mayor de 70" ? 1 : 0);
          break;
          default:
          break;
      }
      return Math.max(0, nuevoPuntaje); // Asegura que el puntaje nunca sea negativo
    });
  };

  // Interpreta el puntaje total y devuelve un mensaje y una acción recomendada
  const interpretarPuntaje = (puntaje) => {
    if (puntaje >= 3) {
      return {
        mensaje: "Alto riesgo de caídas",
        accion: "Implementar medidas de prevención de caídas"
      };
    } else if (puntaje >= 1) {
      return {
        mensaje: "Riesgo bajo",
        accion: "Implementar plan de caídas estándar"
      };
    } else {
      return {
        mensaje: "Sin riesgo",
        accion: "Cuidados básicos de enfermería"
      };
    }
  };
  
 // Maneja el cambio en el campo de caídas
  const handleCaidasChange = (valor) => {
    setCaidas(valor);
    actualizarPuntaje("caidas", valor);
  };


  // Maneja los cambios en los checkboxes de medicamentos
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let nuevosMedicamentos;
  
    // Lógica para manejar selecciones mutuamente excluyentes
    if (value === "Ningun medicamento" && checked) {
      nuevosMedicamentos = ["Ningun medicamento"];
    } else if (checked && value !== "Ningun medicamento") {
      if (medicamentos.includes("Ningun medicamento")) {
        nuevosMedicamentos = [value];
      } else {
        nuevosMedicamentos = [...medicamentos, value];
      }
    } else {
      nuevosMedicamentos = medicamentos.filter((item) => item !== value);
    }
  

    // Evita selecciones inválidas
    if (nuevosMedicamentos.length > 1 && nuevosMedicamentos.includes("Ningun medicamento")) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes seleccionar "Ningún medicamento" junto con otros medicamentos.',
      });
      return;
    }
  
    setMedicamentos(nuevosMedicamentos);
    actualizarPuntaje("medicamentos", nuevosMedicamentos);
  };
  
   // Maneja los cambios en los checkboxes de déficit (similar a medicamentos)
  const handleDeficitChange = (event) => {
    const { value, checked } = event.target;
    let nuevoDeficit;
  
    if (value === "Ninguno" && checked) {
      nuevoDeficit = ["Ninguno"];
    } else if (checked && value !== "Ninguno") {
      if (deficit.includes("Ninguno")) {
        nuevoDeficit = [value];
      } else {
        nuevoDeficit = [...deficit, value];
      }
    } else {
      nuevoDeficit = deficit.filter((item) => item !== value);
    }
  
    if (nuevoDeficit.length > 1 && nuevoDeficit.includes("Ninguno")) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No puedes seleccionar "Ninguno" junto con otros déficits.',
      });
      return;
    }
  
    setDeficit(nuevoDeficit);
    actualizarPuntaje("deficit", nuevoDeficit);
  };


 // Maneja cambios en el campo de estado mental
  const handleEstadoChange = (valor) => {
    setEstado(valor);
    actualizarPuntaje("estado", valor);
  };

 // Maneja cambios en el campo de deambulación
  const handleDeambulacionChange = (valor) => {
    setDeambulacion(valor);
    actualizarPuntaje('deambulacion', valor);
  };

 // Maneja cambios en el campo de edad
  const handleEdadChange = (valor) => {
    setEdad(valor);
    actualizarPuntaje("edad", valor);
  };

  
  //Se reinicia el formulario cada que se envie 
  const resetForm = () => {
    setNombre("");
    setNum_id("");
    setSexo("");
    setCaidas("");
    setMedicamentos([]);
    setDeficit([]);
    setEstado("");
    setDeambulacion("");
    setEdad("");
    setPuntajeTotal(0);
  };

  // Verifica si todos los campos del formulario están completos
  const isFormComplete = () => {
    return (
      nombre.trim() !== "" &&
      num_id.trim() !== "" &&
      sexo !== "" &&
      caidas !== "" &&
      medicamentos.length > 0 &&
      deficit.length > 0 &&
      estado !== "" &&
      deambulacion !== "" &&  
      edad !== ""
    );
  };


  
  //Se mandan los datos al back
  const add = async () => {
    if (!isFormComplete()) {
     // Muestra una alerta si el formulario está incompleto
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, complete todos los campos antes de enviar.",
        showConfirmButton: true,
      });
      return;
    }
  
    // Prepara los datos del formulario para enviar
    const formData = {
      nombre,
      num_id,
      sexo,
      caidas,
      medicamentos: medicamentos.join(", "),
      deficit: deficit.join(", "),
      estado,
      deambulacion,
      edad,
      puntajeTotal,
      
    };

  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/datos",
        formData,
        
      );
  
      console.log("Datos enviados exitosamente:", response.data);

      
       // Interpreta el puntaje y muestra una alerta con el resultado
      const { mensaje, accion } = interpretarPuntaje(puntajeTotal);
      
      //Se muestra en la alerta el interpretar puntaje y el puntaje total
      Swal.fire({
        title: `Puntaje total: ${puntajeTotal}`,
        html: `<b>${mensaje}</b><br>Acción: ${accion}`,
        icon: puntajeTotal >= 3 ? "warning" : "info",
        confirmButtonText: 'OK'
      });
  
      resetForm();// Reinicia el formulario después de enviar
    } catch (error) {
       // Maneja errores en el envío de datos
      console.error("Error al enviar los datos:", error.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al enviar los datos",
        text: "Por favor, intente nuevamente",
        showConfirmButton: true,
      });
    }
  };


  return (
    <div className="formpage flex">
    <Navbar />
      <div className="App">
        <header className="header">
          <div className="container-header">
            <h1>
              Escala de valoracion de riesgo de caída <br /> (J.H. Downton)
            </h1>
          </div>
        </header>
        <label>
          <h2>1. Nombre y apellidos</h2>
        </label>
        <input
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value);
          }}
          type="text"
          name="name"
          placeholder="Nombre y apellidos"
        />
        <br />
        <label>
          <h3>2. Número de documento de identificación</h3>
        </label>
        <input
          value={num_id}
          type="text"
          name="id"
          placeholder="Número de identificación"
          onChange={(event) => setNum_id(event.target.value)}
        />
        <br />
        <div className="form-groups">
          <p>3. Sexo</p>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Femenino"
              checked={sexo === "Femenino"}
              onChange={(event) => setSexo(event.target.value)}
            />
            <b>Femenino</b>
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Masculino"
              checked={sexo === "Masculino"}
              onChange={(event) => setSexo(event.target.value)}
            />
            <b>Masculino</b>
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Indefinido"
              checked={sexo === "Indefinido"}
              onChange={(event) => setSexo(event.target.value)}
            />
            <b>Indefinido</b>
          </label>
        </div>
        <br />
        <div className="form-groups">
          <p>4. ¿Ha presentado Caídas en los últimos 3 meses?</p>
          <label>
            <input
              type="radio"
              name="caidas"
              value="No"
              checked={caidas === "No"}
              onChange={(event) => handleCaidasChange(event.target.value)}
            />
            <b>No</b>
          </label>
          <label>
            <input
              type="radio"
              name="caidas"
              value="Si"
              checked={caidas === "Si"}
              onChange={(event) => handleCaidasChange(event.target.value)}
            />
            <b>Sí</b>
          </label>
        </div>
        <br />
        <div className="form-groups">
          <p>5. ¿Qué medicamentos toma?</p>

          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Ningun medicamento"
              value="Ningun medicamento"
              checked={medicamentos.includes("Ningun medicamento")}
              onChange={handleCheckboxChange}
            />
            <b>Ninguno</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Tranquilizantes/Sedantes"
              value="Tranquilizantes/Sedantes"
              checked={medicamentos.includes("Tranquilizantes/Sedantes")}
              onChange={handleCheckboxChange}
            />
            <b>Tranquilizantes/Sedantes</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Diureticos"
              value="Diureticos"
              checked={medicamentos.includes("Diureticos")}
              onChange={handleCheckboxChange}
            />
            <b>Diuréticos</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Hipotensores"
              value="Hipotensores"
              checked={medicamentos.includes("Hipotensores")}
              onChange={handleCheckboxChange}
            />
            <b>Hipotensores</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Antiparkinsonianos"
              value="Antiparkinsoninos"
              checked={medicamentos.includes("Antiparkinsoninos")}
              onChange={handleCheckboxChange}
            />
            <b>Antiparkinsonianos</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Antidepresivos"
              value="Antidepresivos"
              checked={medicamentos.includes("Antidepresivos")}
              onChange={handleCheckboxChange}
            />
            <b>Antidepresivos</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Otros medicamentos"
              value="Otros medicamentos"
              checked={medicamentos.includes("Otros medicamentos")}
              onChange={handleCheckboxChange}
            />
            <b>Otros medicamentos</b>
          </label>
        </div>
        <br />
        <div className="form-groups">
          <p>6. ¿Tiene algún déficit temporal?</p>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="Ninguno"
              value="Ninguno"
              checked={deficit.includes("Ninguno")}
              onChange={handleDeficitChange}
            />
            <b>Ninguno</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="Alteraciones Visuales"
              value="Alteraciones Visuales"
              checked={deficit.includes("Alteraciones Visuales")}
              onChange={handleDeficitChange}
            />
            <b>Alteraciones Visuales</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="Alteraciones Audiovisuales"
              value="Alteraciones Audiovisuales"
              checked={deficit.includes("Alteraciones Audiovisuales")}
              onChange={handleDeficitChange}
            />
            <b>Alteraciones Audiovisuales</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="Extremidades"
              value="Extremidades"
              checked={deficit.includes("Extremidades")}
              onChange={handleDeficitChange}
            />
            <b>Extremidades</b>
          </label>
        </div>
        <div className="form-groups">
          <p>7. ¿Cuál es su estado mental?</p>
          <label>
            <input
              type="radio"
              name="estado"
              value="Orientado"
              checked={estado === "Orientado"}
              onChange={(event) => handleEstadoChange(event.target.value)}
            />

            <b>Orientado</b>
          </label>
          <label>
            <input
              type="radio"
              name="estado"
              value="Confuso"
              checked={estado === "Confuso"}
              onChange={(event) => handleEstadoChange(event.target.value)}
            />
            <b>Confuso</b>
          </label>
        </div>
        <div className="form-groups">
          <p>8. Deambulación</p>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Normal"
              checked={deambulacion === "Normal"}
              onChange={(event) => handleDeambulacionChange(event.target.value)}
            />
            <b>Normal</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Segura con ayuda"
              checked={deambulacion === "Segura con ayuda"}
              onChange={(event) => handleDeambulacionChange(event.target.value)}
            />
            <b>Segura con ayuda</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Insegura con ayuda / Sin ayuda"
              checked={deambulacion === "Insegura con ayuda / Sin ayuda"}
              onChange={(event) => handleDeambulacionChange(event.target.value)}
            />
            <b>Insegura con ayuda / Sin ayuda</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Imposible"
              checked={deambulacion === "Imposible"}
              onChange={(event) => handleDeambulacionChange(event.target.value)}
            />
            <b>Imposible</b>
          </label>
        </div>
        <br />
        <div className="form-groups">
          <p>9. Edad</p>
          <label>
            <input
              type="radio"
              name="edad"
              value="Menor de 70"
              checked={edad === "Menor de 70"}
              onChange={(event) => handleEdadChange(event.target.value)}
            />
            <b>Menor de 70</b>
          </label>
          <label>
            <input
              type="radio"
              name="edad"
              value="Mayor de 70"
              checked={edad === "Mayor de 70"}
              onChange={(event) => handleEdadChange(event.target.value)}
            />
            <b>Mayor de 70</b>
          </label>
        </div>
        <br />


        {/* Botón para enviar el formulario */}
        <button className="btn_1" onClick={add}>
          Listo
        </button>{" "}
        
      </div>
    </div>
    
  );
};

export default App;
