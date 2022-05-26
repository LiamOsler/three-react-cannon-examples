import './App.css';


import React, { useRef, useState, Suspense } from 'react'
import { extend, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Physics, usePlane, useTrimesh, useBox } from '@react-three/cannon'
import { threeToCannon, ShapeType } from 'three-to-cannon';

import suzanne from './suzanne.gltf'


extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  controls.minDistance = 20;
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function Box(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))

  return (
    <mesh position={props.position} ref={ref}>
      <boxBufferGeometry args={[.1, .1, .1]} attach="geometry" />
      <meshPhongMaterial color={props.color} attach="material" />
    </mesh>
  )
}


function Suzanne(props) {
  const result = threeToCannon(props.model, {type: ShapeType.MESH});
  const [ref] = useTrimesh(() => ({ args: [result.shape.vertices, result.shape.vertices], mass: 10, position: props.position, rotation: props.rotation}))
  return( 
    <mesh >
      <primitive ref={ref} object={props.model}  />
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
        <Suzanne position = {[i*2, 3, j*10]} rotation = {[i/4, j/4, i*j/4]} model = {suzanneClone}/>
      )
    }
  }

  const cubes = [];
  for(let i = -6; i < 6; i ++){
    for(let j = -6; j < 6; j ++){
      cubes.push(
        <Box color="#18a36e" position = {[i/2, j+3, i*j]} rotation = {[i/4, j/4, i*j/4]} />

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
              {cubes}
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
