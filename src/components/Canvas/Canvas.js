import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import CD from './CD'
import { CubeTextureLoader } from 'three';
import useWindowDimensions from '../UI/window'
import React, { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { softShadows, PerspectiveCamera, OrbitControls, useTexture } from '@react-three/drei'
import { MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Noise } from '@react-three/postprocessing'

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
  const snap = useSnapshot(state);
  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <planeGeometry
          args={[70, 70]}
          transparent
        />
        <MeshReflectorMaterial
          resolution={1024}
          mirror={0.25}
          blur={[1000, 250]}
          mixBlur={14}
          mixStrength={1}
          minDepthThreshold={0.9}
          maxDepthThreshold={1.1}
          depthScale={20}
          depthToBlurRatioBias={0.2}
          color={state.theme === 'light' ? snap.light.Surface : snap.dark.Surface}
          metalness={0}
          roughness={state.theme === 'light' ? snap.light.SurfaceRough : snap.dark.SurfaceRough}
          roughnessMap={roughness}
          aoMap={ao}
          normalMap={normal}
          normalScale={[1, 1]}
          envMapIntensity={10}
          bumpMap={height}
        />
      </mesh>
      {/* <mesh rotation-x={-Math.PI / 2} position={[0, 1, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial transparent color="black" opacity={0.4} />
      </mesh> */}
    </>
  );
}

// function Lightbox() {
//   const scene = useThree();
//   const loader = new CubeTextureLoader();
//   const light = loader.load([
//     '/light.jpg',
//     '/light.jpg',
//     '/light.jpg',
//     '/light.jpg',
//     '/light.jpg',
//     '/light.jpg'
//   ]);
//   scene.background = light;
//   return (
//     <mesh
//     >
//       <boxGeometry args={[1000, 1000, 100]} />
//     </mesh>
//   );
// }

// function Darkbox() {
//   const scene = useThree();
//   const loader = new CubeTextureLoader();
//   const dark = loader.load([
//     '../dark.jpg',
//     '../dark.jpg',
//     '../dark.jpg',
//     '../dark.jpg',
//     '../dark.jpg',
//     '../dark.jpg'
//   ]);
//   scene.background = dark;
//   return (
//     <mesh
//     >
//       <boxGeometry args={[1000, 1000, 100]} />
//     </mesh>
//   );
// }

//App
function CanvasComp() {
  const { height, width } = useWindowDimensions();
  const snap = useSnapshot(state);
  return (
    <Canvas shadowMap colorManagement pixelRatio={[1, 1.5]} frameloop="demand" performance={{ min: 1 }} onCreated={!snap.loading} >
      <PerspectiveCamera makeDefault target={[0, 2, 0]} position={snap.cameraPosition} rotation={[0, Math.PI, Math.PI]} near={.1} fov={20} aspect={width / height} far={70} />
      <fog attach="fog" args={[state.theme === 'light' ? snap.light.fog : snap.dark.fog, 10, 40]} />
      <Suspense fallback={null}>
        <spotLight intensity={state.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
          decay={1}
          color={state.theme === 'light' ? snap.light.fog : snap.dark.spotlight}
          position={[90, 60, -50]}
        />
        <rectAreaLight
          intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
          args={[(snap.theme === 'light' ? snap.light.Surface : snap.dark.Surface), 8, 8, 8]}
          position={[0, -0.99, 0]}
          rotation-x={Math.PI / 2}
        />
        <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />
        <group position-y={-1}>
          <CD />
          <Floor />
          {/* {snap.theme === 'light' ? <Lightbox /> : <Darkbox />} */}
        </group>
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