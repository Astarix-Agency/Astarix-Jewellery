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
  const { nodes, materials } = useGLTF('/3D/gold_bracelet.glb');
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
          <Center />
          <group ref={group} {...props} rotation={[1, 0, 0]} position={[-1.39, 0, 0]} scale={[0.5, 0.5, 0.5]} dispose={null}>

            <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']} position={[-0.029, 2.247, 0.229]} rotation={[3.003, 0, 0]} scale={[1, 1, 1.517]} />
            <mesh geometry={nodes.Object_6.geometry} material={materials['Material.003']} position={[0.012, 0.103, -0.006]} />
          </group>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <Environment preset='sunset'/>
        </Canvas>

        <div className="controls">
          <button className='back-btn'><Link to='/'>{arrow} Back</Link></button>

        </div>
      </Suspense>
    </>
  );
}

export default EaringModel;