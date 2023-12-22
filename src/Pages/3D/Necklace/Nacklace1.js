import { useRef,Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls, useTexture } from '@react-three/drei';
import nec1_close from '../../../Textures/Necklace_01_closeup.png'
import nec1_front from '../../../Textures/Necklace_01.png'
import {Link} from 'react-router-dom'
function EaringModel(props) {
    const arrow = '<-';
    const group = useRef();
    const { nodes, materials } = useGLTF('/3D/updated_necklace_01.glb');
    const textureLoader = new THREE.TextureLoader();
  
    // Load diamond texture
    const rubyRedMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E0115F'),
        
      });
      
      const silverMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C0C0C0'),
        
      });
      
      const goldenMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('goldenrod'),
       
      });
  
    return (
      <>
      <Suspense fallback={null}>
        <Canvas
          camera={{ fov: 70, position: [0, 0, 10] }}
          pixelratio={window.devicePixelRatio}
          style={{ width: '100%', height: '600px' }}
          onCreated={({ gl }) => {
            gl.setSize(600, 800);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
  
          <group ref={group} {...props} position={[-1.0,-3.0,0]} scale={[0.02, 0.02, 0.02]} dispose={null}>
    <mesh geometry={nodes.Big_diamond.geometry} material={rubyRedMaterial} rotation={[Math.PI / 2, 0, 0]} />
    <mesh geometry={nodes.Connection_points.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
    <mesh geometry={nodes.Small_diamonds.geometry} material={silverMaterial} rotation={[Math.PI / 2, 0, 0]} />
    <mesh geometry={nodes.Backplate.geometry} material={silverMaterial} rotation={[Math.PI / 2, 0, 0]} />
    <mesh geometry={nodes.Chain.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
  </group>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
  
        <div className="controls">
          <button className='back-btn'><Link to='/'>{arrow} Back</Link></button>
          <button className='view-ar'><Link to='/earing1/ar'>View in AR</Link></button>
        </div>
        </Suspense>
      </>
    );
  }
  
  export default EaringModel;