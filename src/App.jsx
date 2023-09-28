import { Canvas } from '@react-three/fiber'
import './App.css'
import { Box, Environment, Image, OrbitControls, PerspectiveCamera, ScrollControls, Sphere, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three';
import Navbar from './components/Navbar/Navbar';
import { AppBar, Button } from '@mui/material';
import { useState } from 'react';
function App() {
  // const texture = useVideoTexture("vr.mp4")
  const [cameraPosition, setCameraPosition] = useState([0, 3, 6.8])
  const handleClick = (direction) => {
    setCameraPosition(direction)
  }

  return (
    <>
      <Canvas shadows>
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
                
             </AppBar>
    </>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.BackSide} />
}


export default App
