import { Canvas } from '@react-three/fiber'
import './App.css'
import { Environment, Image, OrbitControls, PerspectiveCamera, ScrollControls, Sphere, useVideoTexture } from '@react-three/drei'
import * as THREE from 'three';
function App() {
  // const texture = useVideoTexture("vr.mp4")

  return (
    <>
      <Canvas shadows>
        {/* <Environment
                files={"jpegsystems-home.jpg"}
                ground={{ height: 9, radius: 150, scale: 1 }}
              /> */}
              <PerspectiveCamera makeDefault args={[50]} position={[0, 3, 6.8]} />
              {/* <ScrollControls pages={2} damping={0.1}> */}
          <ambientLight args={["#fff", 0.5]} />
          <OrbitControls />
          <Sphere scale={3} >
          <VideoMaterial url="vr.mp4" />
             </Sphere>
      </Canvas>
    </>
  )
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url)
  return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.BackSide} />
}

export default App
