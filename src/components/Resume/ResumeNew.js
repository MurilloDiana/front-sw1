import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TeachablePoseNet } from "@teachablemachine/pose";
import { util } from '@tensorflow/tfjs';
import { TensorContainer } from '@tensorflow/tfjs-core/dist/tensor_types';
import { CustomCallbackArgs } from '@tensorflow/tfjs';
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/Soumyajit_Behera-BIT_MESRA.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Navbar from "../Navbar";
import homeLogo from "../../Assets/home-main.png";

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const [poseNet, setPoseNet] = useState(null);
  const [poseData, setPoseData] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);

    const initializePoseNet = async () => {
      try {
        console.log("Creating TeachablePoseNet instance...");
        const newPoseNet = new TeachablePoseNet();
        console.log("TeachablePoseNet instance created:", newPoseNet);
        await newPoseNet.load();
        setPoseNet(newPoseNet);
      } catch (error) {
        console.error("Error initializing TeachablePoseNet:", error);
      }
    };
    initializePoseNet();
  }, []);

  const handlePoseDetection = async () => {
    console.log("Detecting Pose...");
    const webcamElement = document.getElementById("yourImageElementId");
    console.log("webcamElement:", webcamElement);
    if (poseNet) {
      try {
        const prediction = await poseNet.estimatePose(webcamElement);
        console.log("Pose Prediction:", prediction);
        setPoseData(prediction);
      } catch (error) {
        console.error("Error in pose detection:", error);
      }
    }
  };
  const handleClick = () => {
    setShowCamera(true);
  };

  useEffect(() => {
    if (showCamera) {
      const webcamElement = document.getElementById("yourImageElementId");
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        webcamElement.srcObject = stream;
      });

      const interval = setInterval(handlePoseDetection, 100);

      return () => clearInterval(interval);
    }
  }, [showCamera, poseNet]);

  return (
    <>
      <Navbar />
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                ¡Saludos!
                <span className="wave" role="img" aria-labelledby="wave">
                  
                </span>
              </h1>
              <h1 className="heading-name">
                Esto es
                <strong className="main-name"> HARMONYTUTOR PRO</strong>
              </h1>
              <div style={{ padding: 50, textAlign: "left" }}>
                <Button onClick={handleClick}>Detect Pose</Button>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              {showCamera && (
                <iframe title="Camera" id="yourImageElementId" style={{ border: "none", width: "100%", height: "100%" }} />
              )}
              <p> sss</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default ResumeNew;