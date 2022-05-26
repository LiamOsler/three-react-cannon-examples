# React Three Cannon Box example

Live Demo:
https://liamosler.ca/demos/threejs/boxes-cannon/

App.js code:
```jsx
import './App.css';


import React, { useRef } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Physics, usePlane, useBox } from '@react-three/cannon'



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
  const [ref] = useBox(() => ({ mass: 1, position: props.position, ...props }))

  return (
    <mesh position={props.position} ref={ref}>
      <boxBufferGeometry args={[1,1,1]} attach="geometry" />
      <meshPhongMaterial color={props.color} attach="material" />
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

  const cubes = [];
  for(let i = -6; i < 6; i ++){
    for(let j = -6; j < 6; j ++){
      cubes.push(
        <Box color="#18a36e" position = {[i*2, 30, j*2]} rotation = {[i/4, j/4, i*j/4]} />
      )
    }
  }
  
  return (
    
    <div className="App">

      <header className="App-header">

      </header>

      <div className="App-background">
        <div className = "App-body">
          <Canvas camera={{ fov: 45, position: [0, 40, 0]}}>
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