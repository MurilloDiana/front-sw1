import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Navbar from "../Navbar";
import homeLogo from "../../Assets/home-main.png";
import Ml5tmimg from "./ML5tmimg";
import Ml5tmAudio from "./Ml5tmAudio";
import AudioModelDemo from "./AudioModelDemo";

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraPermission(true);
      setAudioPermission(true);
      stream.getTracks().forEach((track) => track.stop()); // Stop the video and audio streams
    } catch (error) {
      console.error("Error accessing camera or microphone:", error);
    }
  };

  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/8BJo4lNWK/model.json';
  let audioModelURL = 'https://teachablemachine.withgoogle.com/models/vGbIyKYjc/model.json';

  const onPredictionsTM_img = (predictions) => {
    // Handle predictions for the image model here
    console.log("Image Predictions:", predictions);
  };

  const onPredictionsTM_audio = (note) => {
    // Handle predictions for the audio model here
    console.log("Audio Prediction:", note);
  };

  return (
    <>
      <Navbar />

      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={12} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Bienvenido a nuestra sección de Guía!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                Esto es
                <strong className="main-name"> HARMONYTUTOR PRO GUIA</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}></div>
            </Col>
            
          </Row>
          <Row>
            <Col md={7} style={{ paddingBottom: 20 }}>
          
              {audioPermission && (
                <AudioModelDemo/>
              )}
               { !audioPermission && (
                <p>Solicitando permisos de micrófono...</p>
              )}
            </Col>
          <Col md={5} style={{ paddingBottom: 20 }}>
              {cameraPermission && (
                <Ml5tmimg
                  callback={onPredictionsTM_img}
                  modelUrl={imageModelURL}
                />
              )}
            
              {audioPermission && (
                <Ml5tmAudio
                callback={onPredictionsTM_audio}
                modelUrl={audioModelURL}
                />
              )}
              {!cameraPermission && (
                <p>Solicitando permisos de cámara y micrófono...</p>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default ResumeNew;
