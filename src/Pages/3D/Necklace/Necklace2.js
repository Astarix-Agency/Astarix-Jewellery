import { useRef, Suspense, useEffect,useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as THREE from 'three';

import { Canvas } from '@react-three/fiber';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const pos = useRef();
  const [ipad, setIpad] = useState(false);
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/gold necklace glb.glb');
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/necklace2/2', { replace: false }, { state: null })
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
           position={ipad ? new THREE.Vector3(-7.5, -9, 0) : new THREE.Vector3(-6, -9, 0)} 
          rotation={[0,0,0]} 
          scale={ipad ? new THREE.Vector3(0.4, 0.5, 0.2) : new THREE.Vector3(0.3, 0.5, 0.2)} 
          dispose={null}>
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