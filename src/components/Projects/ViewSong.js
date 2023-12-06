import React, { useState } from "react";
import Navbar from "../Navbar";



const ViewSong = () => {
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
      
      <h2 className="login-title">Galeria de Cancion</h2>
      <form>
      <label className="cantante">Nombre de la Cancion </label> 
        <input
          type="text"
          className="song-output"
        />
        <br/>
      <label className="cantante">Nombre de Cantante </label> 
        <input
          type="text"
          className="song-output"
        />
        <br/>
        <label className="cantante">Genero </label> 
        <input
          type="text"
          className="song-output"
        />
        <br/>
        <label className="cantante">Letra </label> 
        <br/>
        <textarea
          type="text"
          className="song-output"
        />
      </form>
    </div>
    </>
    );
};



export default ViewSong;
