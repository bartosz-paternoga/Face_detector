import React from 'react';
import * as faceapi from 'face-api.js';
import Loader from './loader';

const Home = () => {

    const MODEL_URL = '/model';
  
    const a = async () => {
      const a1 = await faceapi.loadFaceDetectionModel(MODEL_URL);
      const a2 = await faceapi.loadFaceRecognitionModel(MODEL_URL);
      const a3 = await faceapi.loadFaceLandmarkModel(MODEL_URL);
      const a4 = await faceapi.loadMtcnnModel(MODEL_URL);

      console.log("MODEL LOADED");
     }

    const l = async () => {
      await a();
    }

    l();


    return (
        <div >
           <br/> <pre id = "main">Face Detector</pre>
        </div>
    );
}

export default Home;