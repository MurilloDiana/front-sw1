import React, { useState } from "react";
import Navbar from "../Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import logo from "../../Assets/logo.png";
import avatar from "../../Assets/avatar.png";


const CreateSong = () => {
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
         <Navbar/>
      
        
        <div className="login-card">
      
      <h2 className="login-title">Registro de Cancion</h2>
      <form>
      <label className="cantante">Nombre de la Cancion </label> 
        <input
        placeholder="Nombre de la Cancion"
          type="text"
          className="song-input"
        />
        <br/>
      <label className="cantante">Nombre de Cantante </label> 
        <input
        placeholder="Nombre de Cantante"
          type="text"
          className="song-input"
        />
        <br/>
        <label className="cantante">Genero </label> 
        <input
        placeholder="Genero"
          type="text"
          className="song-input"
        />
        <br/>
        <label className="cantante">Letra </label> 
        <br/>
        <textarea
        placeholder="Letra"
          type="text"
          className="song-input"
        />

            <div className="login-buttons"style={{ color: 'white' }}>
        <Link to="/project" className="btn btn-login" style={{ color: 'white', border: '1px solid #fff',  }}>
            Registrar
          </Link>
          <Link to="/home" className="btn btn-register" style={{ color: 'white', border: '1px solid #fff' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
    </>
    );
};



export default CreateSong;
