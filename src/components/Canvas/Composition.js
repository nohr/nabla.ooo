import React, { memo, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import "../../App.css"
import { cloud, state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { CD } from './CD'
import { Node } from './Nodes'
import useWindowDimensions from '../UI/window'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { RepeatWrapping } from 'three'
import { useTexture, MeshReflectorMaterial, softShadows, PerspectiveCamera, OrbitControls, Html, useProgress, ContactShadows, Select, useSelect } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
// import { ShaderMaterial } from 'three'
import { Debug, Physics, usePlane, useSphere } from '@react-three/cannon';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'
import { useState } from 'react'

// Spinner
const Spinner = () => {
  const { progress } = useProgress();

  useEffect(() => {
    cloud.CanvasLoading = true;

    return () => {
      cloud.CanvasLoading = false;
    }
  }, [])

  return (
    <Html fullscreen>
      <div className="gugmu9vdpaw">
        <p>{`${Math.floor(progress)}`}</p>
      </div>
    </Html>
  )
}
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
        <meshPhongMaterial
          transparent opacity={0}
        />
      </mesh>
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-30, 17, 0]}
      >
        <planeGeometry
          args={[70, 35]}
        />
        <meshPhongMaterial
          transparent opacity={0}
        />
      </mesh>
      <mesh
        rotation={[0, -Math.PI, 0]}
        position={[0, 17, 30]}
      >
        <planeGeometry
          args={[70, 35]}
        />
        <meshPhongMaterial
          transparent opacity={0}
        />
      </mesh>
      <mesh
        rotation={[0, 0, 0]}
        position={[0, 17, -30]}
      >
        <planeGeometry
          args={[70, 35]}
        />
        <meshPhongMaterial
          transparent opacity={0}
        />
      </mesh>
    </>
  )
}

function Floor(props) {
  const [ref, api] = usePlane(() => ({ rotation: [Math.PI / 2, 0, 0], position: [0, 0, 0], ...props }));
  // console.log(api.collisionResponse);
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
        (texture.wrapT = texture.wrapS = THREE.RepeatWrapping),
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);
  return (
    <mesh
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      ref={ref}
    >
      <planeGeometry
        args={[70, 70]}
      />
      <MeshReflectorMaterial
        side={THREE.DoubleSide}
        resolution={1024}
        mirror={0.15}
        blur={[250, 250]}
        mixBlur={14}
        distortion={0}
        mixStrength={1}
        minDepthThreshold={0.9}
        maxDepthThreshold={1.1}
        depthScale={2}
        depthToBlurRatioBias={0.2}
        color={snap.theme === 'light' ? snap.light.Surface : snap.dark.Surface}
        metalness={0}
        roughness={snap.theme === 'light' ? snap.light.SurfaceRough : snap.dark.SurfaceRough}
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

function Bounds() {
  function Bound(props) {
    const [ref] = usePlane(() => ({ ...props }));
    return (
      <mesh
        ref={ref}>
        <planeGeometry
          args={[10, 10]}
        />
        <meshBasicMaterial
          transparent
          opacity={0}
        />
      </mesh>
    );
  }

  return <>
    <Bound
      rotation={[Math.PI, 0, 0]}
      position={[0, 0, 7]}
    />
    <Bound
      rotation={[Math.PI, Math.PI, 0]}
      position={[0, 0, -7]}
    />
    <Bound
      rotation={[Math.PI, -Math.PI / 2, 0]}
      position={[4, 0, 0]}
    />
    <Bound
      rotation={[Math.PI, Math.PI / 2, 0]}
      position={[-4, 0, 0]}
    /></>
}

function Nodes({ ...props }) {

  let hits = [];
  useEffect(() => {
    hits = props.hits;
  }, [props.hits])

  props.hits.map((hit, index) => (
    <Node hit={hit} hits={hits} key={index} {...props} />
  ));
}

export const target = [0, 6, 3];

// Composition
function Composition({ select, confirm, nabla, setSelectRate }) {
  const { height, width } = useWindowDimensions();
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [selected, setSelected] = useState([]);
  const camera = useRef(null);
  const { query, clear } = useSearchBox();
  const { hits } = useHits();

  // Handle deselection
  useEffect(() => {
    if (nabla.current) {
      nabla.current.addEventListener("click", () => {
        setSelected([]);
        console.log(selected);
      });
    }

    // return () => {
    //   if (nabla.current) {
    //     nabla.current.removeEventListener("click", () => setSelected({}));
    //   }
    // }
  }, [])

  // Toggle Canvas Visibility
  let canvas;
  useEffect(() => {
    canvas = document.getElementsByTagName("canvas")[0];
    if (canvas) {
      if (snap.canvasVisible) {
        //Show Canvas
        canvas.style.display = "block";
        // if (!snap.canvasPaused) {
        //   state.canvasPaused = false;
        // } else if (snap.canvasPaused) {
        //   state.canvasPaused = true;
        // }
        // console.log(state.canvasPaused);
      } else if (!snap.canvasVisible) {
        //Hide Canvas
        canvas.style.display = "none";
        if (!snap.canvasPaused) {
          state.canvasPaused = true;
          state.CDRotationY = 0;
          state.CDRotationZ = 0;
          state.autoRotateSpeed = 0;
        }
      }
    }
  }, [])


  return (
    <Canvas
      shadows
      dpr={1.5} onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      gl={{ alpha: true, stencil: false, depth: true, antialias: false, physicallyCorrectLight: true }}
      className='r3fCanvas' frameloop={clip.mobile ? "always" : snap.canvasPaused ? "demand" : "always"} onLoad={() => cloud.CanvasLoading = false} >
      <PerspectiveCamera makeDefault ref={camera} target={clip.mobile ? clip.target : [0, 2, 0]} position={clip.mobile ? clip.mobileCameraPosition : snap.cameraPosition} rotation={clip.mobile ? clip.mobileCameraRotation : undefined} far={80} near={.1} fov={clip.mobile ? 25 : 20} aspect={width / height} />
      <fog attach="fog" args={[snap.theme === 'light' ? clip.mobile ? "#E2E2E2" : snap.light.fog : clip.mobile ? "#404040" : snap.dark.fog, 10, clip.mobile ? snap.theme === 'light' ? 60 : 60 : 40]} />
      <Suspense fallback={<Spinner />}>
        <spotLight
          intensity={snap.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
          decay={2}
          angle={Math.PI / 2}
          color={snap.theme === 'light' ? snap.light.spotlight : snap.dark.spotlight}
          position={[90, 60, -50]}
        />
        <rectAreaLight
          intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
          args={[(snap.theme === 'light' ? snap.light.panelColor : snap.dark.panelColor), 20, 20, 20]}
          position={[0, -1, 0]}
          rotation-x={Math.PI / 2}
        />
        <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />

        <Physics
          gravity={[clip.leftright, -9.8, clip.frontback]}
          isPaused={state.canvasPaused}
        >
          <Debug color={cloud.opt ? "white" : "black"} scale={1.04} >
            <group position-y={0}>
              <Wall />
              <Floor />
              {clip.mobile ?
                <>
                  {/* TODO: Switch to null when something else is tapped */}
                  <Select onChange={setSelected}>
                    <Nodes setSelectRate={setSelectRate} select={select} confirm={confirm} hits={hits} clear={clear} />
                  </Select>
                  <Bounds />
                  <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} />
                  <CD rotation={[Math.PI / -1.5, 0, 0]} />
                </> : <CD rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]} />}
            </group>
          </Debug>
        </Physics>
        {(clip.mobile ? false : snap.canvasPaused) &&
          <EffectComposer>
            <Noise opacity={snap.theme === 'light' ? snap.light.noise : snap.dark.noise} />
          </EffectComposer>
        }
        <OrbitControls
          target={clip.mobile ? clip.target : [0, 2, 0]}
          onEnd={(e) => {
            if (clip.mobile) {
              let camera = e.target.object;
              cloud.mobileCameraPosition = camera.position;
              cloud.frontback = 0;
              cloud.leftright = 0;
            }
          }}
          touches={{
            ONE: selected[0] ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN,
            TWO: THREE.TOUCH.DOLLY_ROTATE
          }}
          enablePan={clip.mobile}
          enableDamping
          dampingFactor={1.8}
          minPolarAngle={clip.mobile ? -3 : Math.PI / 3}
          maxPolarAngle={clip.mobile ? Math.PI / 2 : Math.PI / 2}
          autoRotate={!clip.mobile}
          autoRotateSpeed={clip.mobile ? 0 :
            clip.UILoading ? -5 : 1
          }
          minDistance={20}
          maxDistance={clip.mobile ? 50 : 36}
          enabled={clip.mobile ? true : !snap.canvasPaused}
        />
      </Suspense>
    </Canvas>
  );
}

export default memo(Composition);