import { useRef, Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLocation, useNavigate } from 'react-router-dom';

import { Canvas } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const pos = useRef();
  const [ipad, setIpad] = useState(false);

  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/updated_necklace_02.glb');
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/necklace1/1', { replace: false }, { state: null })
      window.location.reload();
    }
    function handleResize() {
      if (window.innerHeight >= 1000) {
        setIpad(true);
        pos.current = new THREE.Vector3(6, 0, 0);
      } else {
        setIpad(false);
        pos.current = new THREE.Vector3(-1.5, 0, 0);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
          style={{
            width: '100%', height: ipad ? '900px' : '600px',
            top: 0,
            left: 0,
          }}
          onCreated={({ gl }) => {
            gl.setSize(`${ipad ? 1000 : 400}`, `${ipad ? 900 : 600}`);
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Center />
          <group ref={group} {...props} 
           position={ipad ? new THREE.Vector3(0, -5, 0) : new THREE.Vector3(-0.5, -4.5, 0)} 
          rotation={[0,0,0]} 
          scale={ipad ? new THREE.Vector3(0.08, 0.08, 0.08) : new THREE.Vector3(0.06, 0.06, 0.06)} 
          dispose={null}>
            <mesh geometry={nodes.Gold_necklace.geometry} material={goldenMaterial} rotation={[Math.PI / 2, 0, 0]} >



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