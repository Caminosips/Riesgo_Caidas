import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import "./Form.css";
import Navbar from "./Navbar"
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const Form = () => {
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
          nuevoPuntaje -= medicamentos.filter(med => med !== "Ningunmedicamento").length;
          nuevoPuntaje += valor.filter(med => med !== "Ningunmedicamento").length;
          break;
        case "deficit":
          nuevoPuntaje -= deficit.filter(def => def !== "Ningunmedicamento").length;
          nuevoPuntaje += valor.filter(def => def !== "Ningunmedicamento").length;
          break;
        case "estado":
          nuevoPuntaje = prevPuntaje - (estado === "Confuso" ? 1 : 0) + (valor === "Confuso" ? 1 : 0);
          break;
        case 'deambulacion':
          if (deambulacion === "") {
            nuevoPuntaje += valor !== "Normal" ? 1 : 0;
          } else if (valor === "Normal") {
            nuevoPuntaje -= deambulacion !== "Normal" ? 1 : 0;
          } else if (deambulacion === "Normal") {
            nuevoPuntaje += 1;
          }
          break;
        case "edad":
          nuevoPuntaje = prevPuntaje - (edad === "Mayor de 70" ? 1 : 0) + (valor === "Mayor de 70" ? 1 : 0);
          break;
        default:
          break;
      }
      return Math.max(0, nuevoPuntaje);
    });
  };

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

  const handleCaidasChange = (valor) => {
    setCaidas(valor);
    actualizarPuntaje("caidas", valor);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let nuevosMedicamentos = checked
      ? [...medicamentos, value]
      : medicamentos.filter(item => item !== value);
    setMedicamentos(nuevosMedicamentos);
    actualizarPuntaje("medicamentos", nuevosMedicamentos);
  };

  const handleDeficitChange = (event) => {
    const { value, checked } = event.target;
    let nuevoDeficit = checked
      ? [...deficit, value]
      : deficit.filter(item => item !== value);
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
      deambulacion !== "" &&  
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
      puntajeTotal,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/datos",
        formData
      );
  
      console.log("Datos enviados exitosamente:", response.data);
      
      const { mensaje, accion } = interpretarPuntaje(puntajeTotal);
      
      Swal.fire({
        title: `Puntaje total: ${puntajeTotal}`,
        html: `<b>${mensaje}</b><br>Acción: ${accion}`,
        icon: puntajeTotal >= 3 ? "warning" : "info",
        confirmButtonText: 'OK'
      });
  
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
    <Navbar />
      <div className="App">
        <div className="navigation-buttons">
          <Link to="/Form" className="btn">Formulario</Link>
          <Link to="/resultados" className="btn">Historial</Link>
        </div>
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
          onChange={(event) => setNombre(event.target.value)}
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
          {["Ningunmedicamento", "Tranquilizantes/Sedantes", "Diureticos", "Hipotensores", "Antiparkinsoninos", "Antidepresivos", "Otros medicamentos"].map((med) => (
            <label key={med}>
              <input
                type="checkbox"
                name="medicamentos"
                value={med}
                checked={medicamentos.includes(med)}
                onChange={handleCheckboxChange}
              />
              <b>{med === "Ningunmedicamento" ? "Ninguno" : med}</b>
            </label>
          ))}
        </div>
        <br />
        <div className="form-groups">
          <p>6. ¿Tiene algún déficit temporal?</p>
          {["Ningunmedicamento", "Alteraciones Visuales", "Alteraciones Audiovisuales", "Extremidades"].map((def) => (
            <label key={def}>
              <input
                type="checkbox"
                name="deficit"
                value={def}
                checked={deficit.includes(def)}
                onChange={handleDeficitChange}
              />
              <b>{def === "Ningunmedicamento" ? "Ninguno" : def}</b>
            </label>
          ))}
        </div>
        <div className="form-groups">
          <p>7. ¿Cuál es su estado mental?</p>
          {["Orientado", "Confuso"].map((est) => (
            <label key={est}>
              <input
                type="radio"
                name="estado"
                value={est}
                checked={estado === est}
                onChange={(event) => handleEstadoChange(event.target.value)}
              />
              <b>{est}</b>
            </label>
          ))}
        </div>
        <div className="form-groups">
          <p>8. Deambulación</p>
          {["Normal", "Segura con ayuda", "Insegura con ayuda / Sin ayuda", "Imposible"].map((deam) => (
            <label key={deam}>
              <input
                type="radio"
                name="deambulacion"
                value={deam}
                checked={deambulacion === deam}
                onChange={(event) => handleDeambulacionChange(event.target.value)}
              />
              <b>{deam}</b>
            </label>
          ))}
        </div>
        <br />
        <div className="form-groups">
          <p>9. Edad</p>
          {["Menor de 70", "Mayor de 70"].map((ed) => (
            <label key={ed}>
              <input
                type="radio"
                name="edad"
                value={ed}
                checked={edad === ed}
                onChange={(event) => handleEdadChange(event.target.value)}
              />
              <b>{ed}</b>
            </label>
          ))}
        </div>
        <br />
        <button className="btn_1" onClick={add}>
          Listo
        </button>
      </div>
    </div>
    
  );
};

export default Form;