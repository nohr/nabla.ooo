import React, { useState, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import "../../App.css"
import { cloud, state } from '../UI/state'
import { useSnapshot } from 'valtio'
import { CD } from './CD'
import { Nodes } from './Nodes'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, MeshReflectorMaterial, softShadows, PerspectiveCamera, OrbitControls, Html, useProgress, ContactShadows, Select, useSelect } from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
// import { ShaderMaterial } from 'three'
import { Debug, Physics, usePlane } from '@react-three/cannon';
import { Router } from 'wouter'

// Spinner
const Spinner = () => {
  const { progress } = useProgress();

  useEffect(() => {
    cloud.CanvasLoading = true;

    return () => {
      cloud.CanvasLoading = false;
    }
  })

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
  const snap = useSnapshot(state);
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
          color={snap.theme === 'light' ? snap.light.sky : snap.dark.sky}
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
          color={snap.theme === 'light' ? snap.light.sky : snap.dark.sky}
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
          color={snap.theme === 'light' ? snap.light.sky : snap.dark.sky}
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
          color={snap.theme === 'light' ? snap.light.sky : snap.dark.sky}
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
        (texture.wrapT = texture.wrapS = THREE.RepeatWrapping),
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);

  function Reflector() {
    return (
      <MeshReflectorMaterial
        side={THREE.DoubleSide}
        resolution={1024}
        mirror={state.theme === "light" ? 0.15 : 0.28}
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
      />)
  }

  const [ref, api] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }));
  const collision = useRef(null);
  useEffect(() => {
    console.log(api);
  }, [])

  // useFrame(() => {
  //   console.log(collision.current);
  //   const unsubscribe = api.collisionResponse.subscribe((v) => collision.current = v);
  //   return unsubscribe;
  // });
  return <Suspense fallback={<Spinner />}>
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      ref={ref}
    >
      <planeGeometry
        args={[70, 70]}
      />
      <Reflector />
    </mesh>
  </Suspense>
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

function Lights() {
  const snap = useSnapshot(state);
  return <>
    {/* SPOTLIGHT */}
    <spotLight intensity={snap.theme === 'light' ? snap.light.spotIntensity : snap.dark.spotIntensity}
      decay={2}
      angle={Math.PI / 2}
      color={snap.theme === 'light' ? snap.light.spotlight : snap.dark.spotlight}
      position={[90, 60, -50]} />
    {/* RECT LIGHT */}
    <rectAreaLight intensity={snap.theme === 'light' ? snap.light.rectIntensity : snap.dark.rectIntensity}
      args={[(snap.theme === 'light' ? snap.light.panelColor : snap.dark.panelColor), 20, 20, 20]} position={[0, -1, 0]} rotation-x={-Math.PI / 2} />
    {/* AMBIENT LIGHT */}
    <ambientLight intensity={snap.theme === 'light' ? snap.light.ambIntensity : snap.dark.ambIntensity} />
  </>
}

// Composition
function Composition({ select, confirm, query, hits, clear, nabla }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [selected, setSelected] = useState([]);
  const [target, setTarget] = useState([0, 6, 3]);
  const camera = useRef(null);
  // Handle deselection
  // useEffect(() => {
  //   if (nabla.current) {
  //     nabla.current.addEventListener("click", () => {
  //       setSelected([]);
  //       console.log(selected);
  //     });
  //   }

  //   // return () => {
  //   //   if (nabla.current) {
  //   //     nabla.current.removeEventListener("click", () => setSelected({}));
  //   //   }
  //   // }
  // }, [])

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
    // canvas.addEventListener(
    //   'webglcontextlost',
    //   function (event) {
    //     event.preventDefault();
    //     setTimeout(function () {
    //       renderer.forceContextRestore();
    //     }, 1);
    //   },
    //   false
    // );
  }, [])

  useEffect(() => {
    console.log("render");
  }, [])

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, stencil: false, depth: true, antialias: false, physicallyCorrectLight: true }}
      className='r3fCanvas' frameloop={clip.mobile ? "always" : snap.canvasPaused ? "demand" : "always"}  >
      {/* CAMERA */}
      <PerspectiveCamera makeDefault ref={camera} target={clip.mobile ? clip.target : [0, 2, 0]} zoom={1
        // + (snap.grabberPosition.x / 30)
      } position={clip.mobile ? clip.mobileCameraPosition : snap.cameraPosition} rotation={clip.mobile ? clip.mobileCameraRotation : undefined} far={80} near={.1} fov={clip.mobile ? 25 : 20} />
      {/* FOG */}
      <fog attach="fog" args={[snap.theme === 'light' ? snap.light.fog : snap.dark.fog, 10, clip.mobile ? snap.theme === 'light' ? 60 : 50 : 30]} />
      <Lights />
      <Physics
        gravity={[clip.leftright, -9.8, clip.frontback]}
        isPaused={snap.canvasPaused}>
        {!clip.mobile && <Wall />}
        <Floor />
        {clip.mobile ?
          <Router path="/">
            <Suspense fallback={<Spinner />}>
              <Select onChange={setSelected}>
                <Nodes select={select} confirm={confirm} hits={hits} clear={clear} />
              </Select>
            </Suspense>
            <Bounds />
            {/* <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} /> */}
            {/* <CD position={[0, 10, -20]} rotation={[Math.PI / -2.5, 0, 0]} /> */}
          </Router> : <CD rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]} />}
      </Physics>
      {/* <Suspense fallback={<Spinner />}>
        {!clip.mobile &&
          <EffectComposer>
            <Noise
              opacity={snap.theme === 'light' ? clip.mobile ? 1.5 : snap.light.noise : clip.mobile ? 0.3 : snap.dark.noise}
            // premultiply={(state.theme === "light")}
            />
          </EffectComposer>
        }
      </Suspense> */}
      <OrbitControls
        target={clip.mobile ? clip.target : [0, 2, 0]}
        onEnd={(e) => {
          if (clip.mobile) {
            let camera = e.target.object;
            // if (!selected[0]) { cloud.target = camera.target; }
            // console.log(camera.target);
            cloud.frontback = 0;
            cloud.leftright = 0;
          }
        }}
        touches={{
          ONE:
            selected[0] ? THREE.TOUCH.ROTATE :
              THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE
        }}
        enablePan={clip.mobile}
        enableDamping
        dampingFactor={1.8}
        minPolarAngle={clip.mobile ? -3 : Math.PI / 3}
        maxPolarAngle={clip.mobile ? Math.PI / 2 : Math.PI / 2}
        autoRotate={!clip.mobile}
        autoRotateSpeed={clip.UILoading ? -5 : 1}
        minDistance={20}
        maxDistance={clip.mobile ? 40 : 36}
        enabled={clip.mobile ? !clip.drag : !snap.canvasPaused}
      />
    </Canvas >
  );
}

export default Composition


  // < Debug color = { "light"} scale = { 1.03} >