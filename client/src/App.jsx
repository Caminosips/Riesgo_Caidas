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

// vamos a crear un enrutador
const router = createBrowserRouter([



  {
    path: '/',
    element: <div><Login/></div>
    
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
function App() {
  const [user,setUser] = useState([])
  return (
    <RouterProvider router={router}>
        <Login setUser={setUser}/>,
    </RouterProvider>
    
  )
}
  
export default App 


