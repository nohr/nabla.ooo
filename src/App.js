import './App.css'
import CD from './components/Canvas/Canvas_CD'
import Sand from './components/Canvas/Landscape'
import UI from './components/UI/UI'
import useWindowDimensions from './components/UI/Portfolio'
import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { softShadows, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

// Canvas
softShadows();


function Plane({ color, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}


//App
function App() {
  const myCamera = useRef();
  const { height, width } = useWindowDimensions();
  return (
    <><UI />
    <Canvas shadowMap colorManagement>
      <PerspectiveCamera makeDefault ref={myCamera} position={[-520,750,-1000]} rotation={[ 0,Math.PI,  0]} near={100} fov={80} aspect={width / height} far={80000} />
      <fog attach="fog" args={[0x848484, 1000, 40]} />
      <spotLight castShadow shadow-mapSize-height={512} shadow-mapSize-width={512} intensity={3} decay ={1} color={0x848484 } position={[9000, 6000, -5000]} />
      <Suspense fallback={null}>
        <Sand />
        <CD />
        <Plane color="#736fbd" position-y={-250} scale={[16000.2, 200, 10000]} />
      <EffectComposer>
        {/* <ChromaticAberration blendFunction={BlendFunction.NORMAL} // blend mode offset={[0.00008, 0.0008]} // color offset /> */}
        <Noise opacity={.059} />
        <Vignette eskil={false} offset={0.1} darkness={.9} />
      </EffectComposer>
      </Suspense>
      </Canvas>
      
    </>
  );
}

export default App;
