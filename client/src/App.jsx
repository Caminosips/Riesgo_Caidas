import './App.css'
import Form from './Components/Form/Form'
import Login from './Components/Login/Login'


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
  }

])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
