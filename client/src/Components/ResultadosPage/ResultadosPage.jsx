import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';



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
  return (
    <div className="resultadosPage flex">
      <div className="resultados">
        <div className="navigation-buttons">
          <Link to="/Form" className="btn">Formulario</Link>
          <Link to="/resultados" className="btn">Historial</Link>
        </div>
        <h1>Resultados de la Encuesta</h1>
        <form onSubmit={buscarResultados}>
          <input
            required
            type="text"
            placeholder="Ingrese número de documento o nombre del paciente"
            className="max-w-xs"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {resultados && resultados.length > 0 && (
          <div className="mensajeResultados">
            <h2>Resultados del paciente:</h2>
            {resultados.map((resultado, index) => (
              <div key={index}>
                <h3>Resultado {index + 1}</h3>
                {Object.entries(resultado).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong>{' '}
                    {key === 'mensaje' || key === 'accion' 
                      ? <span>{value}</span> 
                      : Array.isArray(value) ? value.join(', ') : value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ResultadosPage;