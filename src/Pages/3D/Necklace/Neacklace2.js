import { useRef,Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { OrbitControls, useTexture } from '@react-three/drei';
import nec2_close from '../../../Textures/Necklace_02_bottom.png'
import {Link} from 'react-router-dom'
function EaringModel(props) {
    const arrow = '<-';
    const group = useRef();
    const { nodes, materials } = useGLTF('/3D/updated_necklace_02.glb');
    const textureLoader = new THREE.TextureLoader();
    const diamondTexture = textureLoader.load(nec2_close);
  
    // Load diamond texture
    const rubyRedMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E0115F'),
        
      });
      
      const silverMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C0C0C0'),
        
      });
      
      const goldenMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d4af37'),
       
      });
  
    return (
      <>
      <Suspense fallback={null}>
        <Canvas
          camera={{ fov: 70, position: [0, 0, 10] }}
          pixelRatio={window.devicePixelRatio}
          style={{ width: '100%', height: '600px' }}
          onCreated={({ gl }) => {
            gl.setSize(600, 800);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
  
          <group ref={group} {...props} position={[-1.3,0,0]} scale={[0.03, 0.03, 0.03]} dispose={null}>
          <mesh geometry={nodes.Gold_necklace.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} >
          

          </mesh>
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