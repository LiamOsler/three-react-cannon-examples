import './App.css';


import { createRoot } from 'react-dom/client'
import React, { useRef, useState, Suspense } from 'react'
import { extend, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Physics, usePlane, useTrimesh } from '@react-three/cannon'
import { threeToCannon, ShapeType } from 'three-to-cannon';

import suzanne from './suzanne.gltf'


extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};


function Suzanne(props) {
  return( 
    <mesh >
      <primitive object={props.model} position={props.position} rotation={props.rotation}  />
      <meshNormalMaterial />
    </mesh>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}


function App() {
  const gltf = useLoader(GLTFLoader, suzanne)
  const suzanneMesh = gltf.scene.children[2]
  const suzanneObjects = []
  for(let i = -2; i < 2; i ++){
    for(let j = -2; j < 2; j ++){
      const suzanneClone = suzanneMesh.clone()
      suzanneObjects.push(
        <Suzanne position = {[i*10, 3, j*10]} rotation = {[i/4, j/4, i*j/4]} model = {suzanneClone}/>
      )
    }
  } 
  return (
    
    <div className="App">

      <header className="App-header">

      </header>

      <div className="App-background">
        <div className = "App-body">
          
          <Canvas >
            <ambientLight intensity={0.5} />
            <pointLight color="white" intensity={1} position={[10, 10, 10]} />
            <CameraControls />
            <Physics>
              <Plane />
              {suzanneObjects}
            </Physics>
          </Canvas>
        
        </div>

        <div className= "App-overlay">
        </div>
      </div>
      

    </div>
  );
}

export default App;
useGLTF.preload("/suzanne.gltf");
