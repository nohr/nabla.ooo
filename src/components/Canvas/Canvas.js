import React, { Suspense, useLayoutEffect } from 'react'
import "../../App.css"
import { state } from '../UI/state'
import { useSnapshot } from 'valtio'
import CD from './CD'
import useWindowDimensions from '../UI/window'
import { Canvas } from '@react-three/fiber'
import { RepeatWrapping } from 'three'
import { useTexture, MeshReflectorMaterial, softShadows, PerspectiveCamera, OrbitControls, Html, useProgress } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { ShaderMaterial } from 'three'

// Canvas
softShadows();

function Wall() {
  return (
    <>
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        position={[30, 17, 0]}
      >
        <planeGeometry
          args={[70, 35]}
        />
      </mesh>
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-30, 17, 0]}
      >
        <planeGeometry
          args={[70, 35]}
        />
      </mesh>
      <mesh
        rotation={[0, -Math.PI, 0]}
        position={[0, 17, 30]}
      >
        <planeGeometry
          args={[70, 35]}
        />
      </mesh>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 17, -30]}
      >
        <planeGeometry
          args={[70, 35]}
        />
      </mesh>
    </>
  )
}

function Floor() {
  const snap = useSnapshot(state);
  const textures = useTexture([
    "/images/reflector/Ice_OCC.jpg",
    "/images/reflector/Ice_NORM.jpg",
    "/images/reflector/Ice_DISP.png",
    "/images/reflector/floor_rough.jpeg"
  ]);
  const [ao, normal, height, roughness] = textures;
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        texture.wrapT = texture.wrapS = RepeatWrapping,
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
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
        depthScale={10}
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
  );
}

// Spinner
const Spinner = () => {
  const { progress } = useProgress()
  return (
    <Html fullscreen>
      <div className="canvasSpinner">
        <div className="gugmu9vdpaw">
          <p>{`${progress}`}</p>
          <div></div>
        </div>
      </div>
    </Html>)
}
// Composition
function CanvasComp() {
  const { height, width } = useWindowDimensions();
  const snap = useSnapshot(state);


  return (
    <Canvas dpr={[1, 2]} frameloop={state.paused ? "demand" : "always"} >
      <PerspectiveCamera makeDefault target={[0, 0, 0]} position={snap.cameraPosition} near={.1} fov={20} aspect={width / height} />
      <fog attach="fog" args={[state.theme === 'light' ? snap.light.fog : snap.dark.fog, 10, 40]} />
      <Suspense fallback={<Spinner />}>
        <spotLight
          intensity={state.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
          decay={2}
          angle={Math.PI / 2}
          color={state.theme === 'light' ? snap.light.fog : snap.dark.spotlight}
          position={[90, 60, -50]}

        />
        <rectAreaLight
          intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
          args={[(snap.theme === 'light' ? snap.light.Surface : snap.dark.Surface), 20, 20, 20]}
          position={[0, -0.99, 0]}
          rotation-x={Math.PI / 2}
          castShadow
        />
        <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />
        <group position-y={-1}>
          <CD />
          <Wall />
          <Floor />
        </group>
        {/* this is causeing the white lines on light mode */}
        <EffectComposer>
          <Noise opacity={snap.theme === 'light' ? snap.light.noise : snap.dark.noise} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        target={[0, 0, 0]}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={snap.paused ? 0 : snap.loading ? -5 : 1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        minDistance={20}
        maxDistance={36}
        enabled={snap.paused ? false : true}
      />
    </Canvas>
  );
}

export default CanvasComp;