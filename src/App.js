import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Login from "./components/User/Login";
import Home from "./components/Home/Home";
import HomeI from "./components/Home_Into/HomeI";
import AboutA from "./components/About/About";
import Afinador from "./components/About/Afinador";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentButton from "./components/About2/PaymentButton";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
      
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<HomeI />} />
        <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<Afinador />} />
          <Route path="/nosotros" element={<AboutA />} />
          <Route path="/about2" element={<PaymentButton/>} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
