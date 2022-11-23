import React, {
  useState,
  Suspense,
  useEffect,
  useRef,
  memo,
} from "react";
import { cloud, state } from "../../common/state";
import { useSnapshot } from "valtio";
// import { CD } from "./CD";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  softShadows,
  PerspectiveCamera,
  OrbitControls,
  Select,
  // ContactShadows,
} from "@react-three/drei";
// import { ShaderMaterial } from 'three'
import { target } from "../../common/utils";
import { Lights, Spinner } from "./utils";
import { DesktopComp } from "./desktop";
import { CD } from "./CD";
import { Node } from "./nodes";
import { Router, useLocation } from "wouter";
import { PhysicsFloor } from "./reflector";
import { Physics, usePlane } from "@react-three/cannon";

// Canvas
softShadows();

function Bounds() {
  function Bound(props) {
    const [ref] = usePlane(() => ({ ...props }));
    return (
      <mesh ref={ref}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    );
  }

  return (
    <>
      <Bound rotation={[Math.PI, 0, 0]} position={[0, 0, 7]} />
      <Bound rotation={[Math.PI, Math.PI, 0]} position={[0, 0, -7]} />
      <Bound rotation={[Math.PI, -Math.PI / 2, 0]} position={[4, 0, 0]} />
      <Bound rotation={[Math.PI, Math.PI / 2, 0]} position={[-4, 0, 0]} />
    </>
  );
}




// Composition
function Composition({ select, confirm, vWidth, vHeight }) {
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);
  const [selected, setSelected] = useState([]);
  const camera = useRef(null);

  // Randomize mobile Hits
  // useEffect(() => {
  //   for (let i = hits.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [hits[i], hits[j]] = [hits[j], hits[i]];
  //   }
  // }, [hits]);

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
  // let canvas;
  // useEffect(() => {
  //   canvas = document.getElementsByTagName("canvas")[0];
  //   if (canvas) {
  //     if (snap.canvasVisible) {
  //       //Show Canvas
  //       canvas.style.display = "block";
  //       // if (!snap.canvasPaused) {
  //       //   state.canvasPaused = false;
  //       // } else if (snap.canvasPaused) {
  //       //   state.canvasPaused = true;
  //       // }
  //       // console.log(state.canvasPaused);
  //     } else if (!snap.canvasVisible) {
  //       //Hide Canvas
  //       canvas.style.display = "none";
  //       if (!snap.canvasPaused) {
  //         state.canvasPaused = true;
  //         state.CDRotationY = 0;
  //         state.CDRotationZ = 0;
  //         state.autoRotateSpeed = 0;
  //       }
  //     }
  //   }
  //   // canvas.addEventListener(
  //   //   'webglcontextlost',
  //   //   function (event) {
  //   //     event.preventDefault();
  //   //     setTimeout(function () {
  //   //       renderer.forceContextRestore();
  //   //     }, 1);
  //   //   },
  //   //   false
  //   // );
  // }, [])

  useEffect(() => {
    cloud.CanvasLoading = false;

    return () => {
      cloud.CanvasLoading = true;
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        alpha: true,
        stencil: false,
        depth: true,
        antialias: false,
        physicallyCorrectLight: true,
      }}
      className="r3fCanvas"
      frameloop={"demand"}
    >
      {/* CAMERA */}
      <Suspense fallback={<Spinner />}>
        <PerspectiveCamera
          makeDefault
          ref={camera}
          target={clip.mobile ? target : [0, 2, 0]}
          zoom={1}
          position={
            clip.mobile ? clip.mobileCameraPosition : snap.cameraPosition
          }
          far={80}
          near={0.1}
          fov={clip.mobile ? 35 : 20}
          aspect={vWidth / vHeight}
        />
        {/* FOG */}
        <fog
          attach="fog"
          args={[
            snap.theme === "light" ? snap.light.fog : snap.dark.fog,
            10,
            clip.mobile ? (snap.theme === "light" ? 45 : 50) : 50,
          ]}
        />
        <Lights />
      </Suspense>
      {clip.mobile ?
        <Physics
          allowSleep={false}
          size={100}
          gravity={[clip.leftright, -9.8, clip.frontback]}
        >
          {/* <Debug color="white" scale={1.1}> */}
          <PhysicsFloor />
          <Router path="/">
            <Suspense fallback={<Spinner />}>
              <Select onChange={setSelected}>
                <Nodes clip={clip} select={select} confirm={confirm} />
              </Select>
            </Suspense>
            <Bounds />
            {/* <CD position={[0, 10, -20]} rotation={[Math.PI / -2.5, 0, 0]} /> */}
          </Router>
          {/* </Debug> */}
        </Physics>
        : <DesktopComp CD={CD} clip={clip} snap={snap} />
      }
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
          ONE: selected[0] ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
        enablePan={clip.mobile}
        enableDamping
        dampingFactor={1.8}
        minPolarAngle={clip.mobile ? -3 : Math.PI / 3}
        maxPolarAngle={clip.mobile ? Math.PI / 2 : Math.PI / 2}
        autoRotate={!clip.mobile}
        autoRotateSpeed={clip.UILoading ? -50 : 0}
        minDistance={20}
        maxDistance={clip.mobile ? 40 : 36}
        enabled={clip.mobile ? !clip.drag : true}
      />
    </Canvas >
  );
}

export default memo(Composition);

// < Debug color = { "light"} scale = { 1.03} >

const Nodes = memo(function Nodes({ clip, select, confirm }) {
  const [location] = useLocation();
  let hits = [];
  if (clip.query.length > 0) {
    hits = clip.data.filter(
      (work) =>
        work.name.toLowerCase().includes(clip.query) ||
        work.category.toLowerCase().includes(clip.query)
    );;
  } else {
    hits = clip.data;
  }
  return <>
    {location === "/" ?
      hits.map((hit, index) => (
        <Node hit={hit} key={index} index={index}
          select={select} confirm={confirm} />
      )) : null}
  </>
});