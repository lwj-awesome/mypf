import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CardProps {
  width: number;
  height: number;
  color: string;
  radius: number;
}

const Card: React.FC<CardProps> = ({ width, height, color, radius }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const particleTexture = useTexture("/nclogo.jpg");

  const x = width / 2 - radius;
  const y = height / 2 - radius;

  const shape = new THREE.Shape();
  shape
    .absarc(x, y, radius, Math.PI / 2, 0, true)
    .lineTo(x + radius, -y)
    .absarc(x, -y, radius, 0, -Math.PI / 2, true)
    .lineTo(-x, -(y + radius))
    .absarc(-x, -y, radius, -Math.PI / 2, Math.PI, true)
    .lineTo(-(x + radius), y)
    .absarc(-x, y, radius, Math.PI, Math.PI / 2, true);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.01,
    bevelThickness: 0.1,
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        attach="material"
        side={THREE.DoubleSide}
        metalness={0.7}
        roughness={0.3}
        alphaMap={particleTexture}
        map={particleTexture}
      />
    </mesh>
  );
};

const CardView = ({ color = "white" }: { color: string }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 1, 1]} />
      <Card width={3} height={5} radius={0.5} color={color} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        minPolarAngle={1.5}
        maxPolarAngle={0}
      />
    </Canvas>
  );
};

export default CardView;
