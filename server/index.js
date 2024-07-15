const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

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


  // Asegúrate de que los campos medicamentos y deficit sean strings
  formData.medicamentos = formData.medicamentos || '';
  formData.deficit = formData.deficit || '';
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
//crea otra ruta
app.post('/login' , (req, res)=> {
  // obtener variables enviadas desde el formulario

  const sentLoginEmail = req.body.LoginEmail
  const sentLoginPassword = req.body.LoginPassword

  //crear una declaración Sql para insertar el usuario en la tabla de la base de datos Usuarios
  const SQL = 'SELECT * FROM users WHERE email = ? && password = ?'
  // VAMOS A INGRESAR ESTOS VALORES MEDIANTE UNA VARIABLE
  const Values = [sentLoginEmail, sentLoginPassword]

  db.query( SQL, Values, (err, results)=>{
      if(err){
          res.send({error: err})
      }
      if(results.length > 0){
          res.send(results)
      }
      else{
          res.send({message: 'Credentials Dont match!'})
          
      }
  })
})
/*
//nuestras dependencias
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')


app.use(express.json())
app.use(cors())

//Ejecutar el servidor
app.listen (3002, () => {
    console.log('server is running on port 3002')
})

// Crear los datos basados(mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: ' ',
    database: 'riesgodb',
})

// crear una ruta al servidor

app.post ('/create' ,(req, res) => {
    //Obtener variables enviadas desde el formulario
    const sentNombre =req.body.Nombre
    const sentNum_id =req.body.Num_id
    const sentSexo =req.body.Sexo
    const sentCaidas =req.body.Caidas
    const sentMedicamento =req.body.Medicamento
    const sentDeficit =req.body.Deficit
    const sentEstado =req.body.Estado
    const sentDeambulacion =req.body.Deambulacion
    const sentEdad =req.body.Edad

    //crear una declaracion sql para insertar los daros en la tabla
    const SQL = 'INSERT INTO form(nombre, num_id, sexo, caidas, medicamentos, deficit, estado, deambulacion, edad) VALUES(?,?,?,?,?,?,?,?,?) '
    //Ingresar los datos mediante una variable
    const Values = [sentNombre, sentNum_id, sentSexo, sentCaidas, sentMedicamento, sentDeficit, sentEstado, sentDeambulacion, sentEdad]

    //Consulta para ejecutar la intruccion sql
    db.query( SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log('User inserted successfully!')
            res.send({message: 'User added!'})
        }
    })
})
*/