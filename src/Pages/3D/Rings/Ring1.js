import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/ring.glb');

  // Load diamond texture


  const silverMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5A5A5A'),

  });
  const diamondMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#86c5da'),

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
          <Center/>
          <group ref={group} {...props} rotation={[1.2, 0, 0]} position={[-1.3, 0, 0]} scale={[1.4, 1.4, 1.4]} dispose={null}>

            <mesh geometry={nodes.Ring.geometry} material={silverMaterial} position={[-0.012, 0.643, 0.003]}>
              <mesh geometry={nodes.Diamond_Holder.geometry} material={silverMaterial} />
              <mesh geometry={nodes.Diamonds.geometry} material={diamondMaterial} />
            </mesh>
          </group>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset='sunset' />
        </Canvas>

        <div className="controls">
          <button className='back-btn'><Link to='/'>{arrow} Back</Link></button>

        </div>
      </Suspense>
    </>
  );
}

export default EaringModel;