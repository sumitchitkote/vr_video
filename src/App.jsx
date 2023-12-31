import { Canvas, useThree } from "@react-three/fiber";
import "./App.css";
import {
  CameraControls,
  Environment,
  Image,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  Sphere,
  useVideoTexture,
} from "@react-three/drei";
import * as THREE from "three";
import Navbar from "./components/Navbar/Navbar";
import { AppBar, Box, Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function App() {
  const { DEG2RAD } = THREE.MathUtils;
  // const texture = useVideoTexture("vr.mp4")
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0.1]);
  // const [cameraRotation, setCameraRotation] = useState([0, 30, 90]); // Set initial rotation
  // const [videoState, setVideoState] = useState(true); // Set initial rotation

  const [screenshotData, setScreenshotData] = useState(null);
  const [inputValue, setInputValue] = useState();
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const cubeRef = useRef(null);
  const cubeRef2 = useRef(null);

  const captureAllScreenshot = (count,frameNumber) => {
    const directions = ["front","front-left", "left", "back", "right", "front-right", "up", "down"];
      const direction = directions[count] + "_" + frameNumber;
        const screenshot = canvasRef.current.toDataURL("image/png");
        const screenshot1 = canvasRef2.current.toDataURL("image/png");
          downloadScreenshot(screenshot,direction)
          downloadScreenshot(screenshot1,direction)
    // if (count < 6) {
    //   cubeRef.current.rotate(60 * DEG2RAD, 0);
    //   // Call downloadScreenshot function here with 'screenshot' and 'direction'
    //   console.log("frameNumber" , frameNumber);
    //   setTimeout(() => {
    //     captureAllScreenshot(count + 1,frameNumber);
    //   }, 500); // 500 milliseconds delay
    // }
    // if(count >=6 && count < 8){
    //   const direction = directions[count] + "_" + frameNumber;
    //   cubeRef.current.rotate(0,180 * DEG2RAD)
    //   const screenshot = canvasRef.current.toDataURL("image/png");
    //   // Call downloadScreenshot function here with 'screenshot' and 'direction'
    //   downloadScreenshot(screenshot,direction)
    //   console.log("frameNumber" , frameNumber);
    //   setTimeout(() => {
    //     cubeRef.current.rotate(0, 0)
    //     captureAllScreenshot(count + 1,frameNumber);
    //   }, 500); // 500 milliseconds delay
    // }
  };

        const captureScreenshot = () => {
          if (canvasRef.current && inputValue) {
            for(let i=0;i<inputValue;i++){

              captureAllScreenshot(0,i); // Start with count 0
              setTimeout(() => {
                captureAllScreenshot(0 ,Number(i) + 1);
              }, 5000); 
            }
            }
        };

        // const nextFrame = (sec) => {
        //   setVideoState(sec)
        // }

        // const publishData = async () => {
        //   try {
        //     if (screenshotData) {
        //       const response = await axios.post("https://chat.openai.com/", { screenshotData }, {
        //         headers: {
        //           'Content-Type': 'application/json', // Specify the content type
        //         },
        //       });

        //       if (response.status === 200) {
        //         // Handle a successful response, if needed
        //         console.log("Data published successfully");
        //       } else {
        //         // Handle other response status codes, if needed
        //         console.error("Failed to publish data");
        //       }
        //     } else {
        //       console.error("No screenshot data to publish");
        //     }
        //   } catch (error) {
        //     // Handle network or other errors
        //     console.error("An error occurred while publishing data", error);
        //   }
        // };
        const downloadScreenshot = (screenshot, name) => {
          if (screenshot) {
            // Create a data URL for the screenshot
            const dataUrl = screenshot;

            // Create an anchor element to trigger the download
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = name; // You can change the filename as needed
            a.style.display = "none";

            // Append the anchor element to the DOM and trigger the click event
            document.body.appendChild(a);
            a.click();

            // Remove the anchor element from the DOM
            document.body.removeChild(a);
          } else {
            console.error("No screenshot data to download");
          }
        };

        useEffect(()=>{
           setTimeout(() => {
                // captureAllScreenshot(0 ,Number(i) + 1);
                cubeRef2.current.rotate(60 * DEG2RAD, 0);
              }, 500); 
        },[])

        return (
          <>
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
              style={{ position: "relative", height: "800px", width: "800px" }}
              ref={canvasRef}
            >
              <PerspectiveCamera
                makeDefault
                args={[60]}
                position={cameraPosition}
              />
              <ambientLight args={["#fff", 0.5]} />
              <OrbitControls />
              <Sphere scale={7}>
                <VideoMaterial url="vr2.mp4" />
              </Sphere>
              <CameraControls ref={cubeRef} enabled={true} />
            </Canvas>
            <Canvas
              gl={{ preserveDrawingBuffer: true }}
              style={{ position: "relative", height: "800px", width: "800px" }}
              ref={canvasRef2}
            >
              <PerspectiveCamera
                makeDefault
                args={[60]}
                position={cameraPosition}
              />
              <ambientLight args={["#fff", 0.5]} />
              <OrbitControls />
              <Sphere scale={7}>
                <VideoMaterial url="vr2.mp4" />
              </Sphere>
              <CameraControls ref={cubeRef2} enabled={true} />
            </Canvas>
            <AppBar
              position="fixed"
              sx={{
                top: "auto",
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Box sx={{textAlign:"center"}}>
              <Input
          placeholder="Enter something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ color: "#fff", marginRight: "16px" }}
          />
          </Box>
              <Button sx={{ color: "#fff" }} onClick={captureScreenshot}>
                Capture & Download Screenshot
              </Button>
            </AppBar>

            {screenshotData && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  padding: "10px",
                  background: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <img src={screenshotData} alt="Screenshot" width="200" />
              </div>
            )}
          </>
        );
      }
function VideoMaterial({ url }) {
  const texture = useVideoTexture(url, { unsuspend: "loadedmetadata" });
   // Apply a scale transformation to correct the mirroring
   texture.wrapS = THREE.RepeatWrapping;
   texture.repeat.x = -1; // Flip horizontally
  useEffect(() => {
    console.log(texture);
  }, []);
  return (
    <meshBasicMaterial map={texture} toneMapped={false} side={THREE.BackSide} />
  );
}

export default App;
