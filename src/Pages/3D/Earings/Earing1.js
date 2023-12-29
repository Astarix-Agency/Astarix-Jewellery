import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation, useNavigate } from 'react-router-dom';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { Link } from 'react-router-dom'
function EaringModel(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const [ipad, setIpad] = useState(false);
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/unum_earrings.glb');
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/earing1/1', { replace: false }, { state: null })
      window.location.reload();
    }
    function handleResize() {
      if (window.innerWidth >= 1000) {
        setIpad(true);
        console.log(window.innerWidth)

      } else {
        setIpad(false);
        console.log(window.innerWidth)
       

      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };

    
  }, [location]);
  return (
    <>
      <Suspense fallback={null}>

        <Canvas
          camera={{ fov: 70, position: [0, 0, 10] }}
          pixelratio={window.devicePixelRatio}
          style={{ width: '100%', height: ipad ? '900px' : '600px' ,
            top: 0,
            left: 0,}}
        onCreated={({ gl }) => {
          gl.setSize(`${ipad?1000:400}`, `${ipad?900:500}`);
        }}
        >
          <ambientLight intensity={0.2} />
          {/* <pointLight position={[10, 10, 10]} /> */}
          <Center />
          <group ref={group} {...props} 
           position={ipad ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(-0.5, -1, 0)} 
          rotation={[0,0,0]} 
          scale={ipad ? new THREE.Vector3(0.3, 0.3, 0.3) : new THREE.Vector3(0.15, 0.15, 0.15)} 
          dispose={null}>
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
