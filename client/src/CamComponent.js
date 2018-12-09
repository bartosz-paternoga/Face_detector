import React, { Component } from 'react';
import Comp from './component1';
import Webcam from './webcam';
import Loader from './loader';
import './App.css';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import StopCam from './StopWebcam';


class faceDetector extends Component {

    componentDidMount() {
      
    console.log("componentDidMount");

    const MODEL_URL = '/model';

    const a = async () => {
    const a1 = await faceapi.loadFaceDetectionModel(MODEL_URL)
    const a2 = await faceapi.loadFaceRecognitionModel(MODEL_URL)
    const a3 = await faceapi.loadFaceLandmarkModel(MODEL_URL)
    const a4 = await faceapi.loadMtcnnModel(MODEL_URL)
    }
     a();
    console.log("MODEL LOADED");
    const modelLoad = "LOADED";
    Loader(modelLoad);


    }


    main = async () => {    

          const MODEL_URL = '/model';
          await faceapi.loadFaceDetectionModel(MODEL_URL)
          await faceapi.loadFaceRecognitionModel(MODEL_URL)
          await faceapi.loadFaceLandmarkModel(MODEL_URL)
          await faceapi.loadMtcnnModel(MODEL_URL)
          console.log("MODEL LOADED");
          Webcam();
          // const modelLoad = "LOADED";
          // Loader(modelLoad);
                 

        const imgEl = document.getElementById('video');
      
        let descriptors = [];
        let dataURL;
        let firstFace;

        async function onPlay(imgEl) {

            const { width, height } = faceapi.getMediaDimensions(imgEl);

            const canvas =  document.getElementById('overlay');

            if (canvas === null) { window.location.reload()}

            canvas.width = width;
            canvas.height = height;


            const canvas2 =  document.getElementById('canvas');
            canvas2.width = width;
            canvas2.height = height;

            const video = document.getElementById('video');   
            let img = document.getElementById('1');
            img.style.visibility = "hidden";
            

            function draw( video, canvas2, image ){
              const context = canvas2.getContext('2d');
              context.drawImage( video, 0, 0, canvas2.width, canvas2.height);

              dataURL = canvas2.toDataURL('image/jpeg', 1.0);         
              
              image.src= dataURL;
              // img1.src= "";
              canvas2.style.display='none'
              }
                     
            const ts = Date.now();

            const mtcnnForwardParams = {
              // limiting the search space to larger faces for webcam detection
              minFaceSize: 100
            };

            const fullFaceDescriptions = (await faceapi.allFacesMtcnn(imgEl, mtcnnForwardParams))
            .map(fd => fd.forSize(width, height));
            console.log("fullFaceDescriptions",fullFaceDescriptions);

            fullFaceDescriptions.forEach((fd) => {
            faceapi.drawDetection(canvas, fd.detection, { withScore: true, color: 'blue' })
            });

            fullFaceDescriptions.forEach((fd) => {
            faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: false, color: 'red',lineWidth: 4 })
            });

            console.log("Detection done in: ", (Date.now() - ts));

            draw( video, canvas2, img);         
            
            let descriptor1;
            let fullFaceDescription1;    
            let euc;
                    
            if (img !== undefined){
              fullFaceDescription1 = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              if (fullFaceDescription1 !== undefined){
                  descriptor1 = fullFaceDescription1.descriptor
                  descriptors.push(descriptor1)

                  if (descriptors.length>2) {
                    descriptors.shift();
                }
 
                  if (descriptors.length>1) {         
                      euc = faceapi.euclideanDistance(descriptors[0],descriptors[1])
                      console.log("EUC DIST:", euc) }
                  

                }
            } else { console.log("no face")}

            console.log("array of desriptors: ", descriptors)

    
            let img2 = document.getElementById('2');
            img2.style.visibility = "hidden";

            let pred = document.getElementById("predictions");
            pred.innerHTML = `Face detected with euclidean distance to the last one seen @${Math.round(euc * 100) / 100}`;

            if(descriptors.length===1) {
              firstFace = 1
            }

            if (euc>0.4 || firstFace ===1) {
               draw( video, canvas2, img2);
              //  console.log("dataURL:",dataURL)
            } else {img2.src=""}

            img.style.visibility = "hidden";
            img2.style.visibility = "hidden"

            if (euc>0.4 || firstFace ===1) {
              firstFace = 0;
              if (dataURL !== undefined){               
                               
                axios.post('/', dataURL
                )
                  .then((result) => {
        
                        let z = result.data;
        
                        console.log("RE-post: ", z);
                        console.log("POSTED!!!");
                
                    });
            }

         }
        
     }  //end onplay


        setInterval(
          () =>   onPlay(imgEl),
          4000
        );
            
      }

      reset = () => {
        StopCam();
      }


    render() {
        
        return (
                 <Comp
                 main = {this.main}
                 reset = {this.reset}              
                 />
      
       );
    }
};


export default faceDetector;