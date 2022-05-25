import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


import { createRoot } from 'react-dom/client'
import React, { useRef, useState, Suspense } from 'react'
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { extend, Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useCamera, useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Physics, usePlane, useBox, useConvexPolyhedron, useTrimesh } from '@react-three/cannon'
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
  const result = threeToCannon(props.model, {type: ShapeType.MESH});
  const [ref] = useTrimesh(() => ({ args: [result.shape.vertices, result.shape.vertices], mass: 10, position: props.position, rotation: props.rotation}))
  return( 
    <mesh >
      <primitive ref={ref} object={props.model}  />
      <meshNormalMaterial />
    </mesh>
  )
}

function SuzanneArmy(){

}

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 10, position: props.position, ...props }))
  return (
    <mesh ref={ref} >
      <boxGeometry />
      <meshNormalMaterial />
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
              <Cube position={[-2,3,0]}/>
              <Cube position={[-2,5,0]}/>
              {suzanneObjects}



            </Physics>
          </Canvas>
        
        </div>

        <div className= "App-overlay">

          <Navbar color="faded" light>
              <NavbarBrand className="me-auto" href="/">
                Three-React-Fiber-Bootstrap
              </NavbarBrand>
              <NavbarToggler className="me-2" onClick={function noRefCheck(){}}/>
              <Collapse navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink href="/components/">
                      Components
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                      GitHub
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          <Button color="danger">Danger!</Button>
        </div>
      </div>
      

    </div>
  );
}

export default App;
useGLTF.preload("/suzanne.gltf");
