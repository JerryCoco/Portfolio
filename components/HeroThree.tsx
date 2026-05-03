'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Scene() {
  const meshRef = useRef<any>();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#4488ff" />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        <meshStandardMaterial color="white" wireframe transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function HeroThree() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <Scene />
    </Canvas>
  );
}