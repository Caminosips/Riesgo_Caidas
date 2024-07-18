import React, { useState } from "react";
import axios from "axios";

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
    <div className="resultadosPage">
      <h1>Resultados de la Encuesta</h1>
      <form onSubmit={buscarResultados}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o número de documento"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {resultados && resultados.length > 0 ? (
        <div>
          <h2>Resultados:</h2>
          {resultados.map((resultado, index) => (
            <div key={index} >
              <h3>Resultado {index + 1}</h3>
              {Object.entries(resultado).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {
                  key === 'mensaje' || key === 'accion' 
                    ? <span style={{color: 'blue'}}>{value}</span> 
                    : Array.isArray(value) ? value.join(', ') : value
                }</p>
              ))}
            </div>
          ))}
        </div>
      ) : resultados && resultados.length === 0 ? (
        <p>No se encontraron resultados para la búsqueda.</p>
      ) : null}
    </div>
  );
};
export default ResultadosPage;