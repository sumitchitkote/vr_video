import { Canvas, useThree } from '@react-three/fiber'
import './App.css'
import { Box, CameraControls, Environment, Image, OrbitControls, PerspectiveCamera, ScrollControls, Sphere, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three';
import Navbar from './components/Navbar/Navbar';
import { AppBar, Button } from '@mui/material';
import { useRef, useState } from 'react';
import axios from 'axios';
function App() {
  const { DEG2RAD } = THREE.MathUtils
  // const texture = useVideoTexture("vr.mp4")
  const [cameraPosition, setCameraPosition] = useState([0, 0, 0])
  const [cameraRotation, setCameraRotation] = useState([0, 30, 90]); // Set initial rotation


  const [screenshotData, setScreenshotData] = useState(null);
  // const { gl } = useThree();
  const canvasRef = useRef(null);
  const cubeRef = useRef(null);
  const handleClick = (direction) => {
    // setCameraRotation([THREE.MathUtils.degToRad(direction[0]), THREE.MathUtils.degToRad(direction[1]), THREE.MathUtils.degToRad(direction[2])]);
    cubeRef.current.rotate(direction * DEG2RAD, 0, true)
    console.log(cubeRef.current);
  }

  const captureScreenshot = () => {
    if (canvasRef.current) {
      const screenshot = canvasRef.current.toDataURL('image/png');
      setScreenshotData(screenshot);
    }
  };

  const publishData = async () => {
    try {
      if (screenshotData) {
        const response = await axios.post("https://chat.openai.com/", { screenshotData }, {
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
        });
  
        if (response.status === 200) {
          // Handle a successful response, if needed
          console.log("Data published successfully");
        } else {
          // Handle other response status codes, if needed
          console.error("Failed to publish data");
        }
      } else {
        console.error("No screenshot data to publish");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("An error occurred while publishing data", error);
    }
  };
  

  return (
    <>
       <Canvas gl={{preserveDrawingBuffer:true}} style={{ position: 'absolute' }} ref={canvasRef}>
        {/* <Environment
                files={"jpegsystems-home.jpg"}
                ground={{ height: 9, radius: 150, scale: 1 }}
              /> */}
              <PerspectiveCamera makeDefault args={[120]} rotation={cameraRotation} position={cameraPosition}  />
              {/* <ScrollControls pages={2} damping={0.1}> */}
          <ambientLight args={["#fff", 0.5]} />
          <OrbitControls />
          <Sphere  scale={7} >
          <VideoMaterial url="vr.mp4" />
             </Sphere>
             <CameraControls ref={cubeRef} enabled={true} />
      </Canvas>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"rgba(0,0,0,0.5)", }}>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick(90)}} >Left</Button>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick(-90)}} >Right</Button>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick([0,1,2])}} >Down</Button>
                <Button sx={{ color: '#fff' }} onClick={captureScreenshot}>Capture Screenshot</Button>
                <Button sx={{ color: '#fff' }} onClick={publishData}>Publish Data</Button>
             </AppBar>

             {screenshotData && (
        <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <img src={screenshotData} alt="Screenshot" width="200" />
        </div>
      )}
    </>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.BackSide} />
}


export default App
