import { useState, useEffect } from "react";
import axios from "axios"; // Importamos Axios para hacer peticiones HTTP
import "../../App.css";
import "./Form.css";
import Swal from "sweetalert2";


const App = () => {
  // Definimos estados para cada campo del formulario
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

  


  
  const actualizarPuntaje = (seccion, valor) => {
    setPuntajeTotal((prevPuntaje) => {
      let nuevoPuntaje = prevPuntaje;
      switch (seccion) {
        case "caidas":
          nuevoPuntaje -= caidas === "Si" ? 1 : 0;
          nuevoPuntaje += valor === "Si" ? 1 : 0;
          break;
        case "medicamentos":
          nuevoPuntaje -= medicamentos.filter(
            (med) => med !== "Ningunmedicamento"
          ).length;
          nuevoPuntaje += valor.filter(
            (med) => med !== "Ningunmedicamento"
          ).length;
          break;
        case "deficit":
          nuevoPuntaje -= deficit.filter(
            (def) => def !== "Ningunmedicamento"
          ).length;
          nuevoPuntaje += valor.filter(
            (def) => def !== "Ningunmedicamento"
          ).length;
          break;
        case "estado":
          nuevoPuntaje =
            prevPuntaje -
            (estado === "Confuso" ? 1 : 0) +
            (valor === "Confuso" ? 1 : 0);
          break;

          case 'deambulacion':
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


  const interpretarPuntaje = (puntaje) => {
    if (puntaje >= 3) {
      return "Alto riesgo de caídas";
    } else if (puntaje >= 1) {
      return "Riesgo bajo Accion: Implementar plan de caidas estandar ";
    } else {
      return "Sin riesgo \n Acción: Cuidados básicos de enfermería";
      

    }
    
  };

  /*
  // Actualizar las funciones de manejo de cambios
  const handleCaidasChange = (valor) => {
    setCaidas(valor);
    actualizarPuntaje('caidas', valor);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let nuevosMedicamentos;
    if (checked) {
      if (!medicamentos.includes(value)) {
        nuevosMedicamentos = [...medicamentos, value];
      }
    } else {
      nuevosMedicamentos = medicamentos.filter((item) => item !== value);
    }
    setMedicamentos(nuevosMedicamentos);
    actualizarPuntaje('medicamentos', nuevosMedicamentos);
  };

  const handleDeficitChange = (event) => {
    const { value, checked } = event.target;
    let nuevoDeficit;
    if (checked) {
      if (!deficit.includes(value)) {
        nuevoDeficit = [...deficit, value];
      }
    } else {
      nuevoDeficit = deficit.filter((item) => item !== value);
    }
    setDeficit(nuevoDeficit);
    actualizarPuntaje('deficit', nuevoDeficit);
  };


  const handleEstadoChange = (valor) => {
    setEstado(valor);
    actualizarPuntaje('estado', valor);
  };


  const handleDeambulacionChange = (valor) => {
    setDeambulacion(valor);
    actualizarPuntaje('deambulacion', valor);
  };


  const handleEdadChange = (valor) => {
    setEdad(valor);
    actualizarPuntaje('edad', valor);
  };

 */

  const handleCaidasChange = (valor) => {
    setCaidas(valor);
    actualizarPuntaje("caidas", valor);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let nuevosMedicamentos;
    if (checked) {
      if (!medicamentos.includes(value)) {
        nuevosMedicamentos = [...medicamentos, value];
      } else {
        nuevosMedicamentos = medicamentos;
      }
    } else {
      nuevosMedicamentos = medicamentos.filter((item) => item !== value);
    }
    setMedicamentos(nuevosMedicamentos);
    actualizarPuntaje("medicamentos", nuevosMedicamentos);
  };

  const handleDeficitChange = (event) => {
    const { value, checked } = event.target;
    let nuevoDeficit;
    if (checked) {
      if (!deficit.includes(value)) {
        nuevoDeficit = [...deficit, value];
      } else {
        nuevoDeficit = deficit;
      }
    } else {
      nuevoDeficit = deficit.filter((item) => item !== value);
    }
    setDeficit(nuevoDeficit);
    actualizarPuntaje("deficit", nuevoDeficit);
  };

  const handleEstadoChange = (valor) => {
    setEstado(valor);
    actualizarPuntaje("estado", valor);
  };

  const handleDeambulacionChange = (valor) => {
    setDeambulacion(valor);
    actualizarPuntaje('deambulacion', valor);
  };


  const handleEdadChange = (valor) => {
    setEdad(valor);
    actualizarPuntaje("edad", valor);
  };

  

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

  
  const isFormComplete = () => {
    return (
      nombre.trim() !== "" &&
      num_id.trim() !== "" &&
      sexo !== "" &&
      caidas !== "" &&
      medicamentos.length > 0 &&
      deficit.length > 0 &&
      estado !== "" &&
      deambulacion !== "" &&  // Asegúrate de que se haya seleccionado una opción
      edad !== ""
    );
  };

  const add = async () => {
    if (!isFormComplete()) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, complete todos los campos antes de enviar.",
        showConfirmButton: true,
      });
      return;
    }

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
      puntajeTotal, // Añadimos el puntaje total
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/datos",
        formData
      );

      
      console.log("Datos enviados exitosamente:", response.data);
      Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: '',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });
      /*
      await Swal.fire({
        position: "center",
        icon: "success",
        title: `Formulario guardado. Puntaje total: ${puntajeTotal}`,
        showConfirmButton: false,
        timer: 1500,
      }); */

      resetForm();
    } catch (error) {
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
          type="number"
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
              //onChange={handleCaidasChange}

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
              //onChange={handleCaidasChange}

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
              id="Ningunmedicamento"
              value="Ningunmedicamento"
              checked={medicamentos.includes("Ningunmedicamento")}
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

          {/* Otros checkboxes */}
        </div>
        <br />
        <div className="form-groups">
          <p>6. ¿Tiene algún déficit temporal?</p>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="Ningunmedicamento"
              value="Ningunmedicamento"
              checked={deficit.includes("Ningunmedicamento")}
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
              //onChange={handleEstadoChange}
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
              //onChange={handleEstadoChange}
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
              //onChange={handleDeambulacionChange}
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
              //onChange={handleDeambulacionChange}
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
              //onChange={handleDeambulacionChange}
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
              //onChange={handleDeambulacionChange}
              onChange={(event) => handleDeambulacionChange(event.target.value)}
            />
            <b>Imposible</b>
          </label>
          {/* Otros checkboxes */}
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
              //onChange={handleEdadChange}
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
              //onChange={handleEdadChange}
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
        <div>
          <h3>Puntaje Total: {puntajeTotal}</h3>
          <h4>Interpretación: {interpretarPuntaje(puntajeTotal)}</h4>
        </div>
      </div>
    </div>
  );
};

export default App;
