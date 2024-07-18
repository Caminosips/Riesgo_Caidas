import React, { useState } from 'react';
import axios from 'axios';
import Form  from 'react-router-dom';

const ResultadosPage = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState(null);

const buscarResultados = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.get(`http://localhost:5000/api/resultados?busqueda=${busqueda}`);
    setResultados(response.data);
    } catch (error) {
    console.error('Error al buscar resultados:', error);
    }
};

  return (
    <div>
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
      {resultados && (
        <div>
          <h2>Resultados:</h2>
          {/* Mostrar los resultados aquí */}
          <pre>{JSON.stringify(resultados,  null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResultadosPage;