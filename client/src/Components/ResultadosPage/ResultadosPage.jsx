import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Form/Navbar"
import Swal from "sweetalert2";



const ResultadosPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState(null);
  
  

  const buscarResultados = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/resultados?busqueda=${busqueda}`);
      console.log('Respuesta completa:', response);
      console.log('Datos recibidos:', response.data);
      setResultados(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al buscar resultados:', error);
      setResultados(null);
      setError('Error al buscar resultados. Por favor, intenta de nuevo.');
    }
  };

  useEffect(() => {
    if (resultados && resultados.length === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No se encontraron resultados",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [resultados]);





  return (
    <div className="resultadosPage">
    <Navbar />
    <div className="resultados">
    <div className="input-container">
        <h1>Resultados de la Encuesta</h1> 
        <form onSubmit={buscarResultados}>
          <input
            required
            type="text"
            placeholder="Ingrese número de documento o nombre del paciente"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        
        <button type="submit">Buscar</button>
      </form>
    </div>
      {error && <p className="error-message">{error}</p>}
      {resultados && resultados.length > 0 ? (
        <div className="mensajeResultados">
          <h2>Resultados del paciente:</h2>
          {resultados.map((resultado, index) => (
            <div key={index} className="resultado-item">
              <h3>Resultado {index + 1}</h3>
              {Object.entries(resultado).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong>{' '}
                  {key === 'mensaje' || key === 'accion' ? (
                    <span>{value}</span>
                  ) : Array.isArray(value) ? (
                    value.join(', ')
                  ) : (
                    value
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
      )  : null}
    </div>
  </div>
);
};
export default ResultadosPage;