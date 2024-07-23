import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Form/Navbar"
import Swal from "sweetalert2";
import DataTable from "react-data-table-component"
import { Tooltip } from 'react-tooltip'


const ResultadosPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const columns = [
    { 
      name: 'Nombre', 
      selector: row => row.nombre, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.nombre}>{row.nombre}</span>
    },
    { 
      name: 'Numero ID', 
      selector: row => row.num_id, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.num_id}>{row.num_id}</span>
    },
    { 
      name: 'Sexo', 
      selector: row => row.sexo, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.sexo}>{row.sexo}</span>
    },
    { 
      name: 'Caidas', 
      selector: row => row.caidas, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.caidas}>{row.caidas}</span>
    },
    { 
      name: 'Medicamentos', 
      selector: row => row.medicamentos, 
      width: '280px',
      wrap: true,
      cell: row => <div style={{whiteSpace: 'normal'}}>{row.medicamentos}</div>   
    },
    { 
      name: 'Deficit', 
      selector: row => row.deficit, 
      width: '280px',
      wrap: true,
      cell: row => <div style={{whiteSpace: 'normal'}}>{row.deficit}</div>     
    },
    { 
      name: 'Estado mental', 
      selector: row => row.estado, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.estado}>{row.estado}</span>
    },
    { 
      name: 'Deambulacion', 
      selector: row => row.deambulacion, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.deambulacion}>{row.deambulacion}</span>
    },
    { 
      name: 'Edad', 
      selector: row => row.edad, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.edad}>{row.edad}</span>
    },
    { 
      name: 'Puntaje Total', 
      selector: row => row.puntajeTotal, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.puntajeTotal}>{row.puntajeTotal}</span>
    },
    { 
      name: 'Mensaje', 
      selector: row => row.mensaje, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.mensaje}>{row.mensaje}</span>
    },
    { 
      name: 'Accion', 
      selector: row => row.accion, 
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.accion}>{row.accion}</span>
    },

  ];

  const buscarResultados = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/resultados?busqueda=${busqueda}`);
      console.log('Respuesta completa:', response);
      console.log('Datos recibidos:', response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setResultados(response.data);
        setError(null);
      } else {
        setResultados([]);
        setError('No se encontraron resultados.');
      }
    } catch (error) {
      console.error('Error al buscar resultados:', error);
      setResultados([]);
      setError('Error al buscar resultados. Por favor, intenta de nuevo.');
    }
  };

  useEffect(() => {
    if (resultados.length === 0 && error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No se encontraron resultados",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [resultados, error]);

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
        {resultados.length > 0 && (
          <div className="mensajeResultados">
            <h2>Resultados del paciente:</h2>
            <DataTable
              columns={columns}
              data={resultados}
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              dense
            />
          <Tooltip id="my-tooltip" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadosPage;