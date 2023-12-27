import { useRef, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, Center } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';

import { OrbitControls, useTexture } from '@react-three/drei';
import Earing2_front from '../../../Textures/2nd_earing_front.jpg'
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/earing2.glb');
  const textureLoader = new THREE.TextureLoader();
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/earing2/2', { replace: false }, { state: null })
      window.location.reload();
    }
  }, [location]);

  // Load diamond texture
  const diamondTexture = textureLoader.load(Earing2_front);

  // Create golden material
  const goldenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('goldenrod'),

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
          <group ref={group} {...props} position={[-1.5, 1, 0]} rotation={[0, 20, 0]} scale={[0.9, 0.9, 0.9]} dispose={null}>
            <mesh geometry={nodes.pCylinder1_blinn2_0.geometry} material={materials.blinn2} />
            <mesh geometry={nodes.pCylinder2_blinn4_0.geometry} material={materials.blinn4} position={[0, 1.162, 0]} scale={[0.104, 0.081, 0.104]} />
            <mesh geometry={nodes.pTorus1_blinn3_0.geometry} material={materials.blinn3} position={[0, 1.475, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.256} />
            <mesh geometry={nodes.pSphere1_blinn1_0.geometry} material={materials.blinn1} position={[0.043, 1.485, 0]} scale={0.223} />
          </group>


          <OrbitControls />
          <Environment preset='sunset' />
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