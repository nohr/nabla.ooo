import './App.css'
import CD from './components/Canvas/Canvas_CD'
import UI from './components/UI/UI'
import useWindowDimensions from './components/UI/Portfolio'
import React, { useRef, useState, useEffect , Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, useGLTF, PerspectiveCamera, Stars  } from '@react-three/drei'
import { EffectComposer, Noise, Vignette, ChromaticAberration   } from '@react-three/postprocessing';
import { BlendFunction, UnrealBloomPass } from 'postprocessing'
import { useSpring, a } from '@react-spring/three'


// Canvas
softShadows();
function Sand(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('Canvas_Sand.glb')
  return (
    <group receiveShadow ref={group} {...props} dispose={null}>
      <group position={[-496.54, 0, -0]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh geometry={nodes.Landscape3_1.geometry} material={nodes.Landscape3_1.material}  />
      </group>
      <mesh geometry={nodes.Landscape1.geometry} material={nodes.Landscape1.material} position={[318.05, 0, 6000]} />
    </group>
  )
}

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
      <directionalLight castShadow shadow-mapSize-height={512} shadow-mapSize-width={512} intensity={3} color={0x848484 } position={[9000, 6000, -5000]} />
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
