import './App.css';
import SvgNabla from './svg';
import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { softShadows, OrbitControls, useGLTF, PerspectiveCamera, CameraShake  } from '@react-three/drei'
import { EffectComposer, DepthOfField, SMAA  , Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction, UnrealBloomPass } from 'postprocessing';
import { useSpring, a } from '@react-spring/three';
import reactDom from 'react-dom';

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
              <a href="https://nablaooo.gumroad.com/" target="_blank" >Store</a>
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
function CD(props) {
  const group = useRef()

  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF('Canvas_CD.glb')

  useFrame(() => {
    group.current.rotation.y += 0.02;
   });

  return (
    <group  {...props} dispose={null}>
      <group ref={group} position={[0, 800, 2000]}>
        <group position={[0.47, -57.27, -3.71]} scale={1.5}>
          <mesh geometry={nodes.Sphere2.geometry} material={nodes.Sphere2.material} position={[5.28, 57.74, -265.23]} />
          <mesh geometry={nodes.Sphere1.geometry} material={nodes.Sphere1.material} position={[306.5, 57.74, 134.46]} />
          <mesh geometry={nodes.Sphere.geometry} material={nodes.Sphere.material} position={[-296.7, 57.74, 134.46]} />
        </group>
      </group>
    </group>
  )
}



function App() {
  
  const myCamera = useState();
  return (
    <>
    <Header />
    <Canvas colorManagement>
      <PerspectiveCamera makeDefault ref={myCamera} position={[900,750,-1000]} far={800000} fov={50} rotation={[-Math.PI, 0, 0]} />
      <gridHelper />
      <fog attach="fog" args={[0x848484, 1000, 40]} />
      <directionalLight  intensity={3} color={0x848484 } position={[9000, 6000, -5000]} />
      <Suspense fallback={null}>
        <Sand />
        <CD />
      
      <EffectComposer>
      <SMAA />
        {/* <DepthOfField focusDistance={50} focalLength={2} bokehScale={5} height={480} /> */}
        <Noise opacity={.059} />
        <Vignette eskil={false} offset={0.1} darkness={1} />
      </EffectComposer>
      </Suspense>
      <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} camera={myCamera.current}/>
    </Canvas>
    </>
  );
}

export default App;
