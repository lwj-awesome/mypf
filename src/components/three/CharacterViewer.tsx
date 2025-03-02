import { useEffect, useRef, useState } from "react";
import { useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

const Character = () => {
  const glb = useGLTF("/character.glb");

  const dance = useFBX("/houseDancing.fbx");
  const pushButton = useFBX("/buttonPushing.fbx");

  const mixer = useRef<THREE.AnimationMixer | null>(null);

  const [currentAction, setCurrentAction] =
    useState<THREE.AnimationAction | null>(null);

  const animations = [dance.animations[0], pushButton.animations[0]];

  useEffect(() => {
    if (!glb.scene || animations.length === 0) return;

    mixer.current = new THREE.AnimationMixer(glb.scene);
    playAnimation(0);

    return () => {
      mixer.current?.stopAllAction();
    };
  }, [glb]);

  useEffect(() => {
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer.current) mixer.current.update(clock.getDelta());
    };

    animate();
  }, []);

  const playAnimation = (index: number) => {
    if (!mixer.current || !animations[index]) return;

    const newAction = mixer.current.clipAction(animations[index]);

    if (currentAction) {
      currentAction.fadeOut(0.5);
    }

    newAction.reset().fadeIn(1).play();
    newAction.setEffectiveWeight(1.0);
    newAction.setEffectiveTimeScale(1.0);

    setCurrentAction(newAction);
  };

  const handleClick = () => {
    const nextIndex =
      (animations.indexOf(currentAction?.getClip() ?? animations[0]) + 1) %
      animations.length;
    playAnimation(nextIndex);
  };

  return (
    <group onPointerDown={handleClick}>
      <primitive object={glb.scene} scale={6} position={[0, -5, 0]} />
    </group>
  );
};

const CharacterViewer = () => {
  return (
    <Canvas camera={{ position: [1, 7, 15], fov: 50 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 2, 2]} />
      <Character />
    </Canvas>
  );
};

export default CharacterViewer;
