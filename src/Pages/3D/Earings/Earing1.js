import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useLocation, useNavigate } from 'react-router-dom';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom'
const texture = new THREE.TextureLoader();
function EaringModel(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/unum_earrings.glb');
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/earing1/1', { replace: false }, { state: null })
      window.location.reload();
    }
  }, [location]);
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
          {/* <ambientLight intensity={0.2} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Center />
          <group ref={group} {...props} position={[-1.4, 2.3, 0]} rotation={[0, -40, 0]} scale={[0.1, 0.1, 0.1]} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh geometry={nodes.Object_2.geometry} material={materials['Grey_Plastic-6ff0b6b4-6c0f-4afb-9243-252bb30e223f']} />
              <mesh geometry={nodes.Object_3.geometry} material={materials['Silver-f0e1bef8-7480-40bb-a4aa-0a15c0518902']} />
              <mesh geometry={nodes.Object_4.geometry} material={materials['Silver-f0e1bef8-7480-40bb-a4aa-0a15c0518902']} />
              <mesh geometry={nodes.Object_5.geometry} material={materials['Yellow_Gold-8508952d-1574-41b6-8512-d7f9eb00d480']} />
            </group>
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
