import './App.css';
import SvgNabla from './svg';
import CD from './Canvas_CD';
import React, { useRef, useState, useEffect , Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, OrbitControls, useGLTF, PerspectiveCamera, CameraShake  } from '@react-three/drei'
import { EffectComposer, DepthOfField, Noise, Vignette, ChromaticAberration   } from '@react-three/postprocessing';
import { BlendFunction, UnrealBloomPass } from 'postprocessing';
import { useSpring, a } from '@react-spring/three';
import reactDom from 'react-dom';


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
 function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


// HTML 
const Filler = (props) => {
     return <div className="filler" style={{ width: `${props.percentage}%` }} />
   } 
 const ProgressBar = (props) => {
   
    return (
      <div className="progress-bar">
          <Filler percentage={props.percentage} />
      </div>
    )
  }
class ProgressBarHandler extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        percentage: 60
      }
  }
  render() {
    return (
      <div>
        <ProgressBar percentage={this.state.percentage} />
      </div>
    )
  }
}
const Header = () =>{
  return (
      <header>
          <div className='logo' >
          <SvgNabla title="nabla" fill='#a1a1a1'  />
          </div>
          <ProgressBar  />
          <ul>
            <li>
              <a href="https://nablaooo.gumroad.com/" target="_blank">Store</a>
            </li>
            <li>
              <a href="/" >Contact</a>
            </li>
            <li>
              <a href="/" >About</a>
            </li>
          </ul>
      </header>
  );
};

// Canvas
softShadows();
function Sand(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('Canvas_Sand.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-496.54, 0, -0]} rotation={[-Math.PI, 0, -Math.PI]}>
        <mesh geometry={nodes.Landscape3_1.geometry} material={nodes.Landscape3_1.material} />
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
  console.log(width, height);
  return (
    <>
    <Header />
    <Canvas shadows colorManagement>
      <PerspectiveCamera makeDefault ref={myCamera} position={[900,750,-1000]}  fov={50} aspect={width / height} far={80000} />
      <gridHelper />
      <fog attach="fog" args={[0x848484, 1000, 40]} />
      <directionalLight  intensity={3} color={0x848484 } position={[9000, 6000, -5000]} />
      <Suspense fallback={null}>
        <Sand />
        <CD />
        <Plane color="#736fbd" position-y={-250} scale={[16000.2, 200, 10000]} />
      <EffectComposer>
      <ChromaticAberration
    blendFunction={BlendFunction.NORMAL} // blend mode
    offset={[0.00008, 0.0008]} // color offset
  />
        {/* <DepthOfField focusDistance={5} focalLength={5} bokehScale={10} height={480} /> */}
        <Noise opacity={.059} />
        <Vignette eskil={false} offset={0.1} darkness={1} />
      </EffectComposer>
      </Suspense>
      <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} camera={myCamera.current}/>
    </Canvas>
    </>
  );
}

export default App;
