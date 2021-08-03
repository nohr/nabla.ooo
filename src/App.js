import './App.css'
import * as THREE from "three";
import CD from './components/Canvas/Canvas_CD'
import Sand from './components/Canvas/Landscape'
import UI from './components/UI/UI'
import useWindowDimensions from './components/UI/window'
import React, { useRef, Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { softShadows, PerspectiveCamera, OrbitControls, Reflector, useTexture } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing';

// Canvas
softShadows();


function Floor() {
  const textures = useTexture([
    "../Ice_OCC.jpg",
    "../Ice_NORM.jpg",
    "../Ice_DISP.png",
    "../floor_rough.jpg"
  ]);
  const [ao, normal, height, roughness] = textures;
  return (
    <Reflector
      resolution={1024}
      receiveShadow
      mirror={0.25}
      blur={[250, 250]}
      mixBlur={14}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={20}
      depthToBlurRatioBias={0.2}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[70, 70]}
    >
      {(Material, props) => (
        <Material
          color="#AEDEFF"
          metalness={0}
          roughness={1}
          roughnessMap={roughness}
          aoMap={ao}
          normalMap={normal}
          normalScale={[1, 1]}
          envMapIntensity={10}
          bumpMap={height}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Sky(){
  const material = new THREE.MeshPhysicalMaterial({
    color: "#C3C3C3",
    opacity: 1
  })

  return(
  <mesh
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            material={material}
          >
            <sphereGeometry args={[1000, 1000, 1000]} />
          </mesh>
  )
}

//App
function App() {
  const myCamera = useRef();
  const { height, width } = useWindowDimensions();
  return (
    <>
    <UI />
    <Canvas shadowMap colorManagement pixelRatio={[1, 1.5]}>
      <PerspectiveCamera makeDefault position={[-14,4,0]} rotation={[ 0, Math.PI, Math.PI]} near={1} fov={20} aspect={width / height} far={80000} />
      <fog attach="fog" args={[0x848484, 10, 40]} />
      <Suspense fallback={null}>
        <spotLight castShadow intensity={6} 
          decay ={1} 
          color={0x848484} 
          position={[9000, 6000, -5000]} 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-focus={0.4} />
        <rectAreaLight
            intensity={5}
            args={["#AEDEFF", 8, 8, 8]}
            position={[0, -0.99, 0]}
            rotation-x={Math.PI / 2}
          />
        <ambientLight intensity={0.1} />
        <group position-y={-1}>
        <CD /><Sky />
        {/* <Sand /> */}
        <Floor />
        </group>
        
      <EffectComposer>
        <Noise opacity={.059} />
      </EffectComposer>
      
      </Suspense>
      <OrbitControls 
      enablePan={false}
      autoRotate={ true }
      autoRotateSpeed={ 0.09 }
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 2}
      />
      </Canvas>
    </>
  );
}

export default App;
