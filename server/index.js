const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parsea el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Permite la decodificación de URL

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'riesgodb'
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta para recibir los datos del formulario
app.post('/api/datos', (req, res) => {
  const formData = req.body;  // Datos enviados desde el frontend

  // Validación básica
  if (!formData.nombre || !formData.num_id) {
    return res.status(400).json({ error: 'Nombre y número de identificación son requeridos' });
  }

  // Definimos los campos medicamentos y deficit sean strings
  formData.medicamentos = formData.medicamentos || '';
  formData.deficit = formData.deficit || '';

  
  formData.puntajeTotal = formData.puntajeTotal || 0;
  // Insertar los datos en la base de datos
  const sql = 'INSERT INTO datos_formulario SET ?';

  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error al insertar los datos en la base de datos');
    } else {
      console.log('Datos insertados correctamente');
      res.status(201).json({ 
        message: 'Datos insertados correctamente',
        id: result.insertId
      });
    }
  });
});

// Puerto donde el servidor Express escuchará las solicitudes
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT}`);
});

/*
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
}; */

// Ruta para buscar resultados
app.get('/api/resultados', (req, res) => {
  const { busqueda } = req.query;
  let sql = 'SELECT * FROM datos_formulario WHERE nombre LIKE ? OR num_id LIKE ?';
   // Verificar si la búsqueda es un número (asumiendo que es un ID)
  if (!isNaN(busqueda)) {
    sql = 'SELECT * FROM datos_formulario WHERE num_id = ?';
    params = [busqueda];
  } else {
    // Si no es un número, asumimos que es un nombre y usamos LIKE
    sql = 'SELECT * FROM datos_formulario WHERE nombre LIKE ?';
    params = [`%${busqueda}%`];
  }

  db.query(sql, [searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error al buscar resultados:', err);
      res.status(500).json({ error: 'Error al buscar resultados' });
    } else {
    // Añadir interpretación a cada resultado
    const resultadosConInterpretacion = results.map(result => {
      const interpretacion = interpretarPuntaje(result.puntajeTotal);
      return { ...result, ...interpretacion };
    });
    res.json(resultadosConInterpretacion);
    }
  });
});



// Ruta para obtener un resultado específico por ID
app.get('/api/resultados', (req, res) => {
  const { busqueda } = req.query;
  console.log('Búsqueda recibida:', busqueda);

  let sql, params;

  if (!isNaN(busqueda)) {
    sql = 'SELECT * FROM datos_formulario WHERE num_id = ?';
    params = [busqueda];
  } else {
    sql = 'SELECT * FROM datos_formulario WHERE nombre LIKE ?';
    params = [`%${busqueda}%`];
  }

  console.log('SQL query:', sql);
  console.log('Params:', params);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error al buscar resultados:', err);
      res.status(500).json({ error: 'Error al buscar resultados' });
    } else {
      console.log('Resultados de la base de datos:', results);

      const resultadosConInterpretacion = results.map(result => {
        console.log('Puntaje total:', result.puntajeTotal);
        const interpretacion = interpretarPuntaje(result.puntajeTotal);
        console.log('Interpretación:', interpretacion);
        return { ...result, ...interpretacion };
      });

      console.log('Resultados finales:', resultadosConInterpretacion);
      res.json(resultadosConInterpretacion);
    }
  });
});

function interpretarPuntaje(puntaje) {
  console.log('Interpretando puntaje:', puntaje);
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
}
// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto donde el servidor Express escuchará las solicitudes
const PORTI = 5001;
app.listen(PORTI, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORTI}`);
});

// Cerrar la conexión de la base de datos al cerrar el servidor
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error al cerrar la conexión de la base de datos:', err);
    } else {
      console.log('Conexión de la base de datos cerrada correctamente');
    }
    process.exit();
  });
});