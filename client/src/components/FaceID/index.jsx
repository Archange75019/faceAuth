import * as faceapi from 'face-api.js';
import React, {useState, useRef, useEffect} from 'react';


function FaceID({page, updateFaceId}) {
    
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);
    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();

    useEffect(() => {
        const loadModels = async () => {
          const MODEL_URL = process.env.PUBLIC_URL + '/models';
    
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          ]).then(
            setModelsLoaded(true)
            );
        }
        loadModels();
      }, []);

      const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
          .getUserMedia({ video: { width: 300 } })
          .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
          })
          .catch(err => {
            console.error("error:", err);
          });
      }

      const handleVideoOnPlay = () => {
        setInterval(async () => {
          if (canvasRef && canvasRef.current) {
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize = {
              width: videoWidth,
              height: videoHeight
            }
    
            faceapi.matchDimensions(canvasRef.current, displaySize);
    
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
           
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            if(resizedDetections[0]) {
                updateFaceId(JSON.stringify(resizedDetections[0].landmarks._positions))
            }
    
            
          }
        }, 100)
      }

      const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
      }

    return (
        <div>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          {
            captureVideo && modelsLoaded ?
              <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                Close Webcam
              </button>
              :
              <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                Open Webcam
              </button>
          }
        </div>
        {
          captureVideo ?
            modelsLoaded ?
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                  <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '50%'}} />
                  <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                </div>
              </div>
              :
              <div>loading...</div>
            :
            <>
            </>
        }
      </div>
    )

}
export default FaceID