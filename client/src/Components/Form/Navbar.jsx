import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
      <li>
          <Link to="/">Cerrar sesión</Link>
        </li>
        <li>
          <Link to="/form">Formulario</Link>
        </li>
        <li>
          <Link to="/resultados">Ver Resultados</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;