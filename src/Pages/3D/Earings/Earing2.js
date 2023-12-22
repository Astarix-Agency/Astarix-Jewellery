import { useRef, Suspense,useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import {useLocation,useNavigate} from 'react-router-dom';

import { OrbitControls, useTexture } from '@react-three/drei';
import Earing2_front from '../../../Textures/2nd_earing_front.jpg'
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/Earing_02_updated.glb');
  const textureLoader = new THREE.TextureLoader();
  const navigate=useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
    navigate('/earing2/2',{replace:false},{state:null})
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

          <group ref={group} {...props} position={[-1,0,0]} rotation={[0, 20, 0]} scale={[0.03, 0.03, 0.03]} dispose={null}>
            <mesh geometry={nodes.Diamonds001.geometry} material={materials.wire_000000000} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial map={diamondTexture} />
            </mesh>

            {/* Golden Parts */}
            <mesh geometry={nodes.GOLD_PARTS.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.GOLD_PARTS000.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.GOLD_PARTS001.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.GOLD_PARTS002.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />

            {/* Backplate and connectors */}
            <mesh geometry={nodes.Backplate001.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.connectror_rod.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />
            <mesh geometry={nodes.end_holder.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} />

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