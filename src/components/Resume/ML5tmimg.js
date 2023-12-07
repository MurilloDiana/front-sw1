import React from 'react';
import ml5 from "ml5";

class Ml5tmimg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoRef: null,
      classifier: null,
      predictionLabel: "Empieza a tocar tu nota...",
    };
  }

  componentDidMount() {
    this.videoRef = React.createRef();
    this.setState({ videoRef: this.videoRef });

    this.classifier = ml5.imageClassifier(
      this.props.modelUrl,
      () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            this.videoRef.current.srcObject = stream;
            this.videoRef.current.play();
          });
        this.setState({ classifier: this.classifier });
      }
    );

    var classifier = this.classifier;
    var videoRef = this.videoRef;
    var callback = this.props.callback;
    this.intervalID = setInterval(() => {
      if (classifier) {
        classifier.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          this.updatePredictionLabel(results);
          callback(results);
        });
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  updatePredictionLabel = (results) => {
    // Encontrar la predicción con la probabilidad más alta
    const bestPrediction = results.reduce((best, current) =>
      current.probability > best.probability ? current : best
    );

    this.setState({ predictionLabel: bestPrediction.label });
  };

  render() {
    return (
      <div>
        <video
          ref={this.videoRef}
          style={{ transform: "scale(-1, 1)" }}
          width="500"
          height="500"
        />
        <div>Nota Aproximada: {this.state.predictionLabel}</div>
      </div>
    );
  }
}

export default Ml5tmimg;
