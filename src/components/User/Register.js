import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import logo from "../../Assets/logo.png";
import avatar from "../../Assets/avatar.png";


const Register = () => {
    const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);
    return (
        <>
         <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        
      </Container>
    </Navbar>
        
        <div className="login-card">
      <div className="login-logo">
      <img src={avatar} className="login-logo" alt="brand" />
      </div>
      <h2 className="login-title">Registro</h2>
      <form>
        <input
          type="text"
          placeholder="Nombre Completo"
          className="login-input"
        />
        <br/>
        <input
          type="text"
          placeholder="Carnet de Identidad"
          className="login-input"
        />
        <br/>
        <input
          type="email"
          placeholder="Correo Electronico"
          className="login-input"
        />
        <br/>
        <input
          type="password"
          placeholder="Contraseña"
          className="login-input"
        />
        <br/>
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          className="login-input"
        />
        <div className="login-buttons"style={{ color: 'white' }}>
        <Link to="/login" className="btn btn-login" style={{ color: 'white', border: '1px solid #fff',  }}>
            Registro
          </Link>
          <Link to="/" className="btn btn-register" style={{ color: 'white', border: '1px solid #fff' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
    </>
    );
};



export default Register;
