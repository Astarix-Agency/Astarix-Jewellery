import { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { useLocation, useNavigate } from 'react-router-dom';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Shadow, useGLTF } from '@react-three/drei';
import { OrbitControls, useTexture } from '@react-three/drei';
import nec2_close from '../../../Textures/Necklace_02_bottom.png'
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/gold necklace glb.glb');
  const textureLoader = new THREE.TextureLoader();
  const diamondTexture = textureLoader.load(nec2_close);
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/necklace2/2', { replace: false }, { state: null })
      window.location.reload();
    }
  }, [location]);


  const goldenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFD700'),
    metalness: 1,
    roughness: 1.8,

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
          <group ref={group} {...props} position={[-5.5, -5, 0]} scale={[0.2, 0.4, 0.1]} dispose={null}>
            <mesh geometry={nodes.black_jewels_.geometry} material={materials.BLACK} position={[32.538, 40.87, 0.375]} rotation={[1.571, 0, 0]} scale={0.966} />
            <mesh geometry={nodes.diamonds.geometry} material={materials.phong1} position={[32.538, 40.87, 0.375]} rotation={[1.571, 0, 0]} scale={0.966} />
            <mesh geometry={nodes.main_body_gold_.geometry} material={materials.gold} position={[39.248, 40.87, 0.375]} rotation={[1.571, 0, 0]} scale={0.966} />
            <mesh geometry={nodes.red_jewels.geometry} material={materials['red jewel']} position={[39.248, 40.87, 0.375]} rotation={[1.571, 0, 0]} scale={0.966} />
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