import { useRef, Suspense, useEffect,useState } from 'react';
import { Canvas} from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, useGLTF, Center } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';

import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const group = useRef();
  const [ipad, setIpad] = useState(false);
  const { nodes, materials } = useGLTF('/3D/earing2.glb');
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/earing2/2', { replace: false }, { state: null })
      window.location.reload();
    }
    function handleResize() {
      if (window.innerHeight >= 1000) {
        setIpad(true);
        
      } else {
        setIpad(false);
        
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Center />
        <Suspense fallback={null}>
        <group ref={group} {...props} 
           position={ipad ? new THREE.Vector3(0, -2, 0) : new THREE.Vector3(-0.5, -2.5, 0)} 
          rotation={[0,0,0]} 
          scale={ipad ? new THREE.Vector3(1.5, 1.5, 1.5) : new THREE.Vector3(0.9, 0.9,0.9)} 
          dispose={null}>
            <mesh geometry={nodes.pCylinder1_blinn2_0.geometry} material={materials.blinn2} />
            <mesh geometry={nodes.pCylinder2_blinn4_0.geometry} material={materials.blinn4} position={[0, 1.162, 0]} scale={[0.104, 0.081, 0.104]} />
            <mesh geometry={nodes.pTorus1_blinn3_0.geometry} material={materials.blinn3} position={[0, 1.475, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.256} />
            <mesh geometry={nodes.pSphere1_blinn1_0.geometry} material={materials.blinn1} position={[0.043, 1.485, 0]} scale={0.223} />
          </group>
        </Suspense>

        <OrbitControls />
        <Environment preset='sunset' />
      </Canvas>

      <div className="controls">
        <button className='back-btn'><Link to='/'>{arrow} Back</Link></button>
        
      </div>
    </>
  );
}

export default EaringModel;