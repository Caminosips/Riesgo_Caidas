import  { useState } from "react";
import axios from "axios"; // Importamos Axios para hacer peticiones HTTP
import "../../App.css";
import "./Form.css";

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

  // Función para manejar cambios en los checkboxes de medicamentos
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (!medicamentos.includes(value)) {
        setMedicamentos([...medicamentos,value]);
      }
    } else {
      setMedicamentos(medicamentos.filter((item) => item !== value));
    }
  };

  // Función para manejar cambios en los checkboxes de déficit temporal
  const handleDeficitChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (!deficit.includes(value)) {
        setDeficit([...deficit, value]);
      }
    } else {
      setDeficit(deficit.filter((item) => item !== value));
    }
  };

  // Función para enviar los datos al backend
  const add = async () => {
    const formData = {
      nombre,
      num_id,
      sexo,
      caidas,
      medicamentos,
      deficit,
      estado,
      deambulacion,
      edad,
    };

    try {
      // Enviar los datos mediante una solicitud POST usando Axios
      const response = await axios.post(
        "http://localhost:5000/api/datos",
        formData
      );

      console.log("Datos enviados exitosamente:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  return (
    <div className="formpage flex">
      <div className="App">
        <header className="header">
          <div className="container-header">
            <h1>
              Escala de valoracion de ruesgo de caída <br /> (J.H. Downton)
            </h1>
          </div>
        </header>
        <label>
          <h2>1. Nombre y apellidos</h2>
        </label>
        <input
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
          type="number"
          name="id"
          placeholder="Número de identificación"
          onChange={(event) => {
            setNum_id(event.target.value);
        
          }}
        />
        <br />
        <div className="form-groups">
          <p>3. Sexo</p>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Femenino"
              onChange={(event) => setSexo(event.target.value)}
            />
            <b>Femenino</b>
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Masculino"
              onChange={(event) => setSexo(event.target.value)}
            />
            <b>Masculino</b>
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="Indefinido"
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
              onChange={(event) => setCaidas(event.target.value)}
            />
            <b>No</b>
          </label>
          <label>
            <input
              type="radio"
              name="caidas"
              value="Si"
              onChange={(event) => setCaidas(event.target.value)}
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
              id="Ninguno"
              value="Ninguno"
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
              id="Ninguno"
              value="Ninguno"
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
              onChange={handleDeficitChange}
            />

            <b>Extremidades</b>
          </label>
        </div>
        <div className="form-groups">
          <p>7. ¿Cuál es su estado mental?</p>
          <label>
            <input type="radio" 
            name="estado" 
            value="Orientado"
            onChange={(event) => setEstado(event.target.value)} />

            <b>Orientado</b>
          </label>
          <label>
            <input type="radio" 
            name="estado"
            value="Confuso"
            onChange={(event) => setEstado(event.target.value)} />
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
              onChange={(event) => setDeambulacion(event.target.value)}
            />
            <b>Normal</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Segura con ayuda"
              onChange={(event) => setDeambulacion(event.target.value)}
            />
            <b>Segura con ayuda</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Insegura con ayuda / Sin ayuda"
              onChange={(event) => setDeambulacion(event.target.value)}
            />
            <b>Insegura con ayuda / Sin ayuda</b>
          </label>
          <label>
            <input
              type="radio"
              name="deambulacion"
              value="Imposible"
              onChange={(event) => setDeambulacion(event.target.value)}

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
              onChange={(event) => setEdad(event.target.value)}
            />
            <b>Menor de 70</b>
          </label>
          <label>
            <input
              type="radio"
              name="edad"
              value="Mayor de 70"
              onChange={(event) => setEdad(event.target.value)}
            />
            <b>Mayor de 70</b>
          </label>
          {/* Otros radios */}
        </div>
        <br />
        <button className="btn_1" onClick={add}>
          Listo
        </button>{" "}
        {/* Botón para enviar el formulario */}
      </div>
    </div>
  );
};

export default App;

/*
import React, { useState }from 'react'
import './Login.css'
import '../../App.css'
import Axios from 'axios'




const App = () => {
  //useState para guardar las entradas
  const [nombre, setNombre] = useState('')
  const [num_id, setNum_id] = useState('')
  const [sexo, setSexo] = useState("")
  const [caidas, setCaidas] = useState('')
  const [medicamentos, setMedicamentos] = useState('')
  const [deficit, setDeficit] = useState('')
  const [estadomental, setEstadomental] = useState('')
  const [deambulacion, setDeambulacion] = useState('')
  const [edad, setEdad] = useState('')

  //onclick para obtener lo que el usuario ha ingresado
  const add = () => {
    //solicitar que axios cree una API que se conecte al servidor para no instalar
    Axios.post('https://localhost:3002/create', {
      // Crear una variable para enviar al servidor a traves de la ruta

      Nombre: nombre,
      Num_id: num_id,
      Sexo: sexo,
      Caidas: caidas,
      Medicamentos: medicamentos,
      Deficit: deficit,
      Estadomental: estadomental,
      Deambulacion: deambulacion,
      Edad: edad,

    }).then(() => {
      console.log('Usuario registrado')
    })
  }

  return (
    <>
      <div className="App">
        <header className="header">
          <div className="container-header">
            <h1> Escala de valoración de riesgo de Caída - (J.H. Downton)</h1>
          </div>
        </header>

        <div className="form-groups">
          <label>
            <h2>1. Nombre y apellidos</h2>
          </label>
          <input
            onChange={(event) => {
              setNombre(event.target.value)
            }}
            type="text"
            name="name"
            placeholder="Nombre y apellidos"
          />
        </div>
        <br />

        <div className="form-groups">
          <label>
            <h3>2. Número de documento de identificacion</h3>
          </label>
          <input
            type="number"
            name="id"
            placeholder="Numero de identificiacion"
            onChange={(event)=>{
              setNum_id(event.target.value)
            }}
          />
        </div>
        <br />
        
        <div className="form-groups">
          <p>3. Sexo</p>
          <label>
            <input type="radio" id="Femenino" name="sexo" value="1" />
            <b>Femenino</b>
          </label>
          <label>
            <input type="radio" id="Masculino" name="sexo" value="2" />
            <b>Masculino</b>
          </label>
          <label>
            <input type="radio" id="Indefinido" name="sexo" value="3" />
            <b>Indefinido</b>
          </label>
        </div>

        <div className="form-groups">
          <p>4. ¿A presentado Caídas en los ultimos 3 meses?</p>
          <label>
            <input type="radio" id="No" name="opciones" value="1" />
            <b>No</b>
          </label>
          <label>
            <input type="radio" id="Si" name="opciones" value="2" />
            <b>Si</b>
          </label>
        </div>

        <div className="form-groups">
          <p>5. ¿Qué medicamentos toma?</p>
          <label>
            <input type="checkbox" name="medicamentos" id="Ninguno" />
            <b>Ninguno</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Tranquilizantes/Sedantes"
            />
            <b>Tranquilizantes/Sedantes</b>
          </label>
          <label>
            <input type="checkbox" name="medicamentos" id="Diuréticos" />
            <b>Diuréticos</b>
          </label>
          <label>
            <input type="checkbox" name="medicamentos" id="Hipotensores" />
            <b>Hipotensores</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Antiparkinsonianos"
            />
            <b>Antiparkinsonianos</b>
          </label>
          <label>
            <input type="checkbox" name="medicamentos" id="Antidepresivos" />
            <b>Antidepresivos</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="medicamentos"
              id="Otros medicamentos"
            />
            <b>Otros medicamentos</b>
          </label>
        </div>

        <div className="form-groups">
          <p>6. ¿Tiene algún déficit temporal?</p>
          <label>
            <input type="checkbox" name="deficit" id="ninguno" />
            <b>Ninguno</b>
          </label>
          <label>
            <input type="checkbox" name="deficit" id="alteraciones_visuales" />
            <b>Alteraciones Visuales</b>
          </label>
          <label>
            <input
              type="checkbox"
              name="deficit"
              id="alteraciones_audiovisuales"
            />
            <b>Alteraciones Audiovisuales</b>
          </label>
          <label>
            <input type="checkbox" name="deficit" id="Extremidades" />
            <b>Extremidades</b>
          </label>
        </div>

        <div className="form-groups">
          <p>7. ¿Cuál es su estado mental?</p>
          <label>
            <input type="radio" name="estado" />
            <b>Orientado</b>
          </label>
          <label>
            <input type="radio" name="estado" />
            <b>Confuso</b>
          </label>
        </div>

        <div className="form-groups">
          <p>8. Deambulación</p>
          <label>
            <input type="radio" name="deambulacion" />
            <b>Normal</b>
          </label>
          <label>
            <input type="radio" name="deambulacion" />
            <b>Segura con ayuda</b>
          </label>
          <label>
            <input type="radio" name="deambulacion" />
            <b> Insegura con ayuda/ Sin ayuda</b>
          </label>
          <label>
            <input type="radio" name="deambulacion" />
            <b>Imposible</b>
          </label>
        </div>

        <div className="form-groups">
          <p>9. Edad</p>
          <label>
            <input type="radio" name="edad" />
            <b>Menor de 70</b>
          </label>
          <label>
            <input type="radio" name="edad" />
            <b>Mayor de 70</b>
          </label>

          <br />
          <button onClick={add}>Listo</button>
        </div>
      </div>
    </>
  )
}
export default App

*/
