import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface CardProps {
  width: number;
  height: number;
  radius: number;
  cardIndex: number;
}

const Card = ({ width, height, radius, cardIndex }: CardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cardImagePath = [
    "/images/NSD.jpg",
    "/images/NCI.jpg",
    "/images/GIGGY.jpg",
  ];
  const particleTexture = useTexture(cardImagePath[cardIndex]) as THREE.Texture;
  particleTexture.repeat.set(1, 1);
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
    depth: 0.02,
    bevelThickness: 0.3,
  });

  geometry.computeBoundingBox();
  const max = geometry.boundingBox!.max;
  const min = geometry.boundingBox!.min;
  const range = new THREE.Vector2(max.x - min.x, max.y - min.y);
  const uvAttribute = geometry.attributes.position.array;

  const uvs: number[] = [];
  for (let i = 0; i < uvAttribute.length; i += 3) {
    const x = uvAttribute[i];
    const y = uvAttribute[i + 1];
    uvs.push((x - min.x) / range.x, (y - min.y) / range.y);
  }

  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        attach="material"
        side={THREE.DoubleSide}
        metalness={1.5}
        roughness={0.9}
        alphaMap={particleTexture}
        map={particleTexture}
      />
    </mesh>
  );
};

const CardView = ({ cardIndex }: { cardIndex: number }) => {
  return (
    <Canvas camera={{ position: [-2, 2, 6] }}>
      <ambientLight intensity={3} />
      <directionalLight position={[0, 1, 1]} />
      <Card width={4} height={5} radius={0.7} cardIndex={cardIndex} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={1.5}
        enableZoom={false}
        minPolarAngle={1.5}
        maxPolarAngle={0}
      />
    </Canvas>
  );
};

export default CardView;
