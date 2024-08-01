import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Form/Navbar"
import Swal from "sweetalert2";
import DataTable from "react-data-table-component"
import { Tooltip } from 'react-tooltip'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const ResultadosPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const exportToExcel = (resultado) => {
    const nombreArchivo = `resultados_${resultado.nombre.replace(/\s+/g, '_')}.xlsx`;
  
    // Crear una nueva hoja de cálculo con solo este resultado
    const ws = XLSX.utils.json_to_sheet([resultado]);
  
    // Ajustar el ancho de las columnas (mantén el mismo ajuste que tenías antes)
    const wscols = [
      {wch: 20}, {wch: 15}, {wch: 10}, {wch: 10}, {wch: 30}, {wch: 30},
      {wch: 25}, {wch: 25}, {wch: 10}, {wch: 15}, {wch: 30}, {wch: 20},
    ];
    ws['!cols'] = wscols;
  
    // Crear un nuevo libro y agregar la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resultado");
  
    // Guardar el archivo
    const wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
  
    // Convertir a un Blob
    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  
    const blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
  
    // Descargar el archivo
    saveAs(blob, nombreArchivo);
  };
  
  const columns = [
    { 
      name: 'Nombre', 
      selector: row => row.nombre, 
      width: '140px',
      wrap: true,
    },
    { 
      name: 'Numero ID', 
      selector: row => row.num_id, 
      width: '140px',
      wrap: true,
  
    },
    { 
      name: 'Sexo', 
      selector: row => row.sexo, 
    
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
      width: '230px',
      wrap: true,
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.estado}>{row.estado}</span>
    },
    { 
      name: 'Deambulacion', 
      selector: row => row.deambulacion, 
      width: '220px',
      wrap: true,
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
      width: '120px',
      wrap: true,
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
      width: '200px',
      wrap: true,
      cell: row => <span data-tooltip-id="my-tooltip" data-tooltip-content={row.accion}>{row.accion}</span>
    },
    { 
      name: 'Descargar', 
      width : '200px',
      cell: row => (
        <button 
          onClick={() => exportToExcel(row)} 
          className="btn btn-sm btn-primary"
        >
          Descargar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
        
        {resultados.length > 0 && (
          <div className="mensajeResultados">
            <h2>Resultados del paciente</h2>
            <DataTable
              columns={columns}
              data={resultados}
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              dense
            />
            {/*<button onClick={exportToExcel} className="btn btn-primary">
              Descargar Resultados
            </button> */}
            <Tooltip id="my-tooltip" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadosPage;