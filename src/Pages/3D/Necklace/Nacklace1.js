import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation, useNavigate } from 'react-router-dom';
import { Center, Environment, useGLTF } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom'
function EaringModel(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const arrow = '<-';
  const group = useRef();
  const { nodes, materials } = useGLTF('/3D/jashin_necklace.glb');
  useEffect(() => {
    if (location.state && location.state.reload) {
      navigate('/earing2/2', { replace: false }, { state: null })
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
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Center />
          <group ref={group} {...props} position={[-1.5, -1, 0]} rotation={[0, 0, 0]} scale={[32.03, 32.03, 32.03]} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={0.013}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh geometry={nodes.Object_4.geometry} material={materials.Material} />
                <mesh geometry={nodes.Object_5.geometry} material={materials.Material} />
              </group>
            </group>
          </group>

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
