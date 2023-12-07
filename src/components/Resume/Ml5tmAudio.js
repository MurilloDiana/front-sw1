import React, { useEffect } from 'react';
import ml5 from 'ml5';

class Ml5tmAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      micStream: null,
      classifier: null,
      predictionLabel: 'Empieza a tocar tu nota...',
    };
  }

  componentDidMount() {
    this.setupClassifier();
  }

  componentWillUnmount() {
    if (this.state.micStream) {
      this.state.micStream.getTracks().forEach((track) => track.stop());
    }
    if (this.state.classifier) {
      this.state.classifier.close();
    }
    clearInterval(this.intervalID);
  }

  updatePredictionLabel = (results) => {
    // Encontrar la predicción con la probabilidad más alta
    const bestPrediction = results.reduce(
      (best, current) =>
        current.probability > best.probability ? current : best
    );

    this.setState({ predictionLabel: bestPrediction.label });
  };

  setupClassifier = async () => {
    try {
      // Solicitar acceso al micrófono
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      this.setState({ micStream });

      // Configurar el clasificador de audio
      const classifier = ml5.soundClassifier(this.props.modelUrl, { probabilityThreshold: 0.7 }, () => {
        classifier.classify((error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          this.updatePredictionLabel(results);
        });
      });

      this.setState({ classifier });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  render() {
    return (
      <div>
        <div>Nota Aproximada: {this.state.predictionLabel}</div>
      </div>
    );
  }
}

export default Ml5tmAudio;
