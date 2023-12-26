import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls, useTexture } from '@react-three/drei';
import brace1_close from '../../../Textures/3_bracelet_render.png'
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/Updated_bracelet_03.glb');
  const textureLoader = new THREE.TextureLoader();
  const diamondTexture = textureLoader.load(brace1_close);





  const goldenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFD700'),

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
          <Center/>
          <group ref={group} {...props} rotation={[1, 0, 0]} position={[-1, 0, 0]} scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh geometry={nodes.BRACELET_GOLD.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} >

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