const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());  // Permite solicitudes desde cualquier origen
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
      res.status(200).send('Datos insertados correctamente');
    }
  });
});

// Puerto donde el servidor Express escuchará las solicitudes
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT}`);
});


/*
// Nueva ruta para el login sin hashear
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(500).json({ success: false, message: 'Error del servidor' });
      return;
    }
    
    if (results.length > 0) {
      const token = jwt.sign(
        { userId: results[0].id, username: results[0].username },
        'tu_secreto_jwt',  // Reemplaza esto con un secreto seguro
        { expiresIn: '1h' }
      );
      res.json({ success: true, token, username: results[0].username });
    } else {
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// Función de middleware para verificar el token JWT (sin cambios)
const verifyToken = (req, res, next) => {
  // ... (código existente sin cambios)
};

// Ruta protegida de ejemplo (sin cambios)
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).send('Esta es una ruta protegida');
});

// Puerto donde el servidor Express escuchará las solicitudes
const PORT2 = 5000;
app.listen(PORT2, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT2}`);
}); */