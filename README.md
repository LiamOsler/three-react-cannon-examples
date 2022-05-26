# React Three GLTF Loader Example

Live Demo:
https://liamosler.ca/demos/threejs/GLTFLoader/

App.js code:
```jsx
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

```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.