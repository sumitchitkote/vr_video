import { Canvas, useThree } from '@react-three/fiber'
import './App.css'
import { Box, Environment, Image, OrbitControls, PerspectiveCamera, ScrollControls, Sphere, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three';
import Navbar from './components/Navbar/Navbar';
import { AppBar, Button } from '@mui/material';
import { useRef, useState } from 'react';
function App() {
  // const texture = useVideoTexture("vr.mp4")
  const [cameraPosition, setCameraPosition] = useState([0, 3, 6.8])

  const [screenshotData, setScreenshotData] = useState(null);
  // const { gl } = useThree();
  const canvasRef = useRef(null);
  const handleClick = (direction) => {
    setCameraPosition(direction)
  }

  const captureScreenshot = () => {
    if (canvasRef.current) {
      const screenshot = canvasRef.current.toDataURL('image/png');
      setScreenshotData(screenshot);
    }
  };

  return (
    <>
       <Canvas gl={{preserveDrawingBuffer:true}} style={{ position: 'absolute' }} ref={canvasRef}>
        {/* <Environment
                files={"jpegsystems-home.jpg"}
                ground={{ height: 9, radius: 150, scale: 1 }}
              /> */}
              <PerspectiveCamera makeDefault args={[50]} position={cameraPosition} />
              {/* <ScrollControls pages={2} damping={0.1}> */}
          <ambientLight args={["#fff", 0.5]} />
          <OrbitControls />
          <Sphere scale={7} >
          <VideoMaterial url="vr.mp4" />
             </Sphere>
      </Canvas>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"rgba(0,0,0,0.5)", }}>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick([2,2,2])}} >Left</Button>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick([2,2,20])}} >Right</Button>
                <Button sx={{color:"#fff"}} onClick={()=>{handleClick([2,1,2])}} >Down</Button>
                <Button sx={{ color: '#fff' }} onClick={captureScreenshot}>Capture Screenshot</Button>
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
