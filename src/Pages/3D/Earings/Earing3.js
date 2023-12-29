import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EaringModel(props) {
    const arrow = '<-';
    const group = useRef();
    const pos = useRef();
    const [ipad, setIpad] = useState(false);
    const { nodes, materials } = useGLTF('/3D/gold earrings glb.glb');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.reload) {
            navigate('/earing3/3', { replace: false }, { state: null });
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
            <Canvas
                camera={{ fov: 70, position: [0, 0, 10] }}
                pixelratio={window.devicePixelRatio}
                style={{
                    width: '100%', height: ipad ? '900px' : '600px',
                    top: 0,
                    left: 0,
                }}
                onCreated={({ gl }) => {
                    gl.setSize(`${ipad ? 1000 : 400}`, `${ipad ? 900 : 500}`);
                }}
            >
                <ambientLight intensity={0.9} />
                <directionalLight intensity={0.8} position={[0, 3, 0]} />
                <pointLight position={[1, 1, 1]} />
                <Center />
                <Suspense fallback={null}>
                <group ref={group} {...props} 
           position={ipad ? new THREE.Vector3(-1, -3, 0) : new THREE.Vector3(-2, -5, 0)} 
          rotation={[0,0,0]} 
          scale={ipad ? new THREE.Vector3(1.2, 1.2, 1.2) : new THREE.Vector3(0.9, 0.9, 0.9)} 
          dispose={null}>
                        <mesh geometry={nodes._gold_strings.geometry} material={materials['Material.002']} position={[0.631, 3.28, -0.709]} scale={[-0.03, -1.185, -0.03]} />
                        <mesh geometry={nodes.screws.geometry} material={materials['Material.001']} position={[0.008, 4.88, -2.109]} rotation={[0, 0, -Math.PI / 2]} scale={[0.399, 0.164, 0.844]} />
                        <mesh geometry={nodes.maincubes.geometry} material={materials.Material} position={[-0.019, 4.884, -0.697]} rotation={[0, Math.PI / 2, 0]} scale={[0.284, 0.51, 0.51]} />
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
