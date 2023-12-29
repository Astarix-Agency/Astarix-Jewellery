import { useRef, Suspense,useEffect,useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls} from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const arrow = '<-';
  const pos = useRef();
  const [ipad, setIpad] = useState(false);

  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/gold_bracelet.glb');
  useEffect(() => {
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
  }, []);
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          camera={{ fov: 70, position: [0, 0, 10] }}
          pixelratio={window.devicePixelRatio}
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
           position={ipad ? new THREE.Vector3(0, -2, 0) : new THREE.Vector3(-0.5, -1.5, 0)} 
          rotation={[1,0,0]} 
          scale={ipad ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0.7, 0.7, 0.7)} 
          dispose={null}>
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