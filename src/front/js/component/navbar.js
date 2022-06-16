import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Volver al Inicio</span>
        </Link>
        <div className="d-flex justify-content-end">
          <Link to="/signup">
            <button className="btn btn-primary">Registrarse</button>
          </Link>
          <Link to="/signin">
            <button className="btn btn-primary mx-2">Ingresar</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
