import './App.css';


import React, { useRef, useState, Suspense } from 'react'
import { extend, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
      <primitive object={props.model} position={props.position}  />
      <meshNormalMaterial />
    </mesh>
  )
}


function App() {
  const gltf = useLoader(GLTFLoader, suzanne)
  const suzanneMesh = gltf.scene.children[0]

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
              <Suzanne position = {[0, 2, 0]} rotation = {[0, 0, 0]} model = {suzanneMesh}/>
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
