import React, { useEffect } from 'react';
import { setupModel } from './model-runner.js';
import { setupBarGraph, updateBarGraph } from './bar-graph.js';

const AudioModelDemo = () => {
  useEffect(() => {
    const setupAudioModel = async () => {
      try {
        // Request access to the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Permission granted, continue setting up the model
        const URL = 'https://teachablemachine.withgoogle.com/models/vGbIyKYjc/';

        // setupBarGraph is defined in the js/bar-graph.js file
        setupBarGraph(URL);

        // setupModel is defined in the js/model-runner.js file
        // we pass in two functions:
        // updateBarGraph (defined in the js/bar-graph.js file)
        // and updateAudioVisualizer (defined in the js/audio-visualizer.js file)
        // setupModel will store these functions,
        // and call them every time it has new data from the model
        setupModel(URL, (data) => {
          updateBarGraph(data);
        });
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    // Call the function to set up the audio model
    setupAudioModel();
  }, []);

  return (
    <div>
      <section id="model">
        <div id="mic-wrapper">
          <div className="mic-icon-wrapper">
            <img
              className="mic-icon"
              src="https://www.gstatic.com/images/icons/material/system_gm/2x/mic_white_48dp.png"
              alt="Microphone Icon"
            />
          </div>
        </div>
        <div id="graph-wrapper"></div>
      </section>
    </div>
  );
};

export default AudioModelDemo;
