const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'riesgodb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos MySQL');
});

const interpretarPuntaje = (puntaje) => {
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
};

app.post('/api/datos', (req, res) => {
  const formData = req.body;
  console.log('Datos recibidos:', formData);
  console.log('Puntaje total recibido:', formData.puntajeTotal);

  if (!formData.nombre || !formData.num_id) {
    return res.status(400).json({ error: 'Nombre y número de identificación son requeridos' });
  }

  formData.medicamentos = formData.medicamentos || '';
  formData.deficit = formData.deficit || '';
  formData.puntajeTotal = Number(formData.puntajeTotal) || 0;

  const sql = 'INSERT INTO datos_formulario SET ?';
  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error al insertar los datos en la base de datos');
    } else {
      console.log('Datos insertados correctamente');
      res.status(201).json({ 
        message: 'Datos insertados correctamente',
        id: result.insertId,
        puntajeTotal: formData.puntajeTotal
      });
    }
  });
});

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT}`);
});

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

//Creamos una ruta para el login

app.post('/api/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [usuario, contraseña], (err, results) => {
    if (err) {
      console.error('Error al autenticar:', err);
      res.status(500).json({ error: 'Error en la autenticación' });
    } else if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  });
});