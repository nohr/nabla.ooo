import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import CD from './CD'
import useWindowDimensions from '../UI/window'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { softShadows, PerspectiveCamera, OrbitControls, Reflector, useTexture } from '@react-three/drei'
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
          color={state.theme === 'light' ? snap.light.Surface : snap.dark.Surface}
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

//App
function CanvasComp() {
  const { height, width } = useWindowDimensions();
  const snap = useSnapshot(state);
  return (
    <Canvas shadowMap colorManagement pixelRatio={[1, 1.5]}>
      <PerspectiveCamera makeDefault position={snap.cameraPosition} rotation={[0, Math.PI, Math.PI]} near={.1} fov={20} aspect={width / height} far={1000} />
      <fog attach="fog" args={[state.theme === 'light' ? snap.light.fog : snap.dark.fog, 10, 40]} />
      <Suspense fallback={null}>
        <spotLight castShadow intensity={state.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
          decay={1}
          color={state.theme === 'light' ? snap.light.fog : snap.dark.spotlight}
          position={[90, 60, -50]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-focus={0.4} />
        <rectAreaLight
          intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
          args={[snap.theme === 'light' ? snap.light.Surface : snap.dark.Surface, 8, 8, 8]}
          position={[0, -0.99, 0]}
          rotation-x={Math.PI / 2}
        />
        <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />
        <group position-y={-1}>
          <CD />
          <Floor />
        </group>
        <EffectComposer>
          <Noise opacity={.059} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        enabled={snap.userControlled}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={state.autoRotateSpeed}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
        minDistance={20}
        maxDistance={36}
      />
    </Canvas>
  );
}

export default CanvasComp;
