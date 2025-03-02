import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Stars = (): JSX.Element => {
  const particleTexture = useTexture("/reactLogo.ico");

  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.001;
      ref.current.rotation.y += 0.001;
    }
  });

  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 5;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.1}
        transparent
        depthWrite={false}
        map={particleTexture}
        alphaMap={particleTexture}
      />
    </points>
  );
};

const ReactStarView = (): JSX.Element => (
  <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
    <ambientLight intensity={5} />
    <directionalLight position={[2.65, 2.13, 1.02]} intensity={1} />
    <Stars />
    <pointLight position={[5, 5, 5]} intensity={2} />
    <spotLight position={[0, 10, 0]} angle={0.3} intensity={1.5} />
  </Canvas>
);

export default ReactStarView;
