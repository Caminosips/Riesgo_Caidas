import './App.css'
import Form from './Components/Form/Form'
import Login from './Components/Login/Login'
import ResultadosPage from './Components/ResultadosPage/ResultadosPage'
import { useState } from 'react'


// importar el dominio del enrutador React
import {
  createBrowserRouter,
  RouterProvider  
} from 'react-router-dom'


function App() {
  const [user, setUser] = useState([])

// vamos a crear un enrutador
const router = createBrowserRouter([

  {
    path: '/',
    element: <div><Login setUser={setUser} /></div>
    
  },
  {
    path: '/form',
    element: <div><Form/></div>
  }, 
  {
    path: 'resultados',
    element: <ResultadosPage />
  }

]) 

  return (

    
    <RouterProvider router={router}/>

  )
}
  
export default App 


