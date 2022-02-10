import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import CD from './CD'
import useWindowDimensions from '../UI/window'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useTexture, MeshReflectorMaterial, softShadows, PerspectiveCamera, OrbitControls } from '@react-three/drei'
// import { MeshReflectorMaterial } from '@react-three/drei';
// import { MeshReflectorMaterial } from '@react-three/drei/materials/MeshReflectorMaterial';
import { EffectComposer, Noise } from '@react-three/postprocessing'

// Canvas
softShadows();

function Floor() {
  const [ao, normal, height, roughness] = useTexture([
    "../Ice_OCC (1).jpeg",
    "../Ice_NORM (1).jpeg",
    "../Ice_DISP.jpeg",
    "../floor_rough (1).jpeg"
  ]);
  const snap = useSnapshot(state);
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry
        args={[70, 70]}
      />
      <MeshReflectorMaterial
        resolution={1024}
        mirror={0.15}
        blur={[250, 250]}
        mixBlur={14}
        distortion={0}
        mixStrength={1}
        minDepthThreshold={0.9}
        maxDepthThreshold={1.1}
        depthScale={0}
        depthToBlurRatioBias={20}
        color={state.theme === 'light' ? snap.light.Surface : snap.dark.Surface}
        metalness={0}
        roughness={state.theme === 'light' ? snap.light.SurfaceRough : snap.dark.SurfaceRough}
        roughnessMap={roughness}
        aoMap={ao}
        normalMap={normal}
        normalScale={[1, 1]}
        envMapIntensity={1}
        bumpMap={height}
      />
    </mesh>
    // <Reflector
    //   resolution={1024}
    //   receiveShadow
    //   mirror={0.25}
    //   blur={[250, 250]}
    //   mixBlur={14}
    //   mixStrength={1}
    //   minDepthThreshold={0.9}
    //   maxDepthThreshold={1.1}
    //   depthScale={20}
    //   depthToBlurRatioBias={0.2}
    //   rotation={[-Math.PI / 2, 0, 0]}
    //   args={[70, 70]}
    // >
    //   {(Material, props) => (
    //     <Material
    //       color={state.theme === 'light' ? snap.light.Surface : snap.dark.Surface}
    //       metalness={0}
    //       roughness={state.theme === 'light' ? snap.light.SurfaceRough : snap.dark.SurfaceRough}
    //       roughnessMap={roughness}
    //       aoMap={ao}
    //       normalMap={normal}
    //       normalScale={[1, 1]}
    //       envMapIntensity={10}
    //       bumpMap={height}
    //       {...props}
    //     />
    //   )
    //   }
    // </Reflector >
  );
}

//App
function CanvasComp() {
  const { height, width } = useWindowDimensions();
  const snap = useSnapshot(state);
  return (
    <Canvas shadows colorManagement pixelRatio={[1, 1.5]} frameloop="demand" performance={{ min: 1 }} onCreated={!snap.loading} >
      <PerspectiveCamera makeDefault target={[0, 2, 0]} position={snap.cameraPosition} near={.1} fov={20} aspect={width / height} />
      <fog attach="fog" args={[state.theme === 'light' ? snap.light.fog : snap.dark.fog, 10, 40]} />
      <Suspense fallback={null}>
        <spotLight intensity={state.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
          decay={1}
          color={state.theme === 'light' ? snap.light.fog : snap.dark.spotlight}
          position={[90, 60, -50]}
          castShadow
        />
        <rectAreaLight
          intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
          args={[(snap.theme === 'light' ? snap.light.Surface : snap.dark.Surface), 8, 70, 70]}
          position={[0, -0.99, 0]}
          rotation-x={Math.PI / 2}
        />
        <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />
        <group position-y={0}>
          <CD />
          <Floor />
        </group>
        {/* this is causeing the white lines on light mode */}
        <EffectComposer>
          <Noise opacity={snap.theme === 'light' ? snap.light.noise : snap.dark.noise} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        target={[0, 2, 0]}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={snap.paused ? 0 : 0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={20}
        maxDistance={36}
        enabled={snap.paused ? false : true}
      />
    </Canvas>
  );
}

export default CanvasComp;