import { useEffect, useRef, useState } from "react";
import { useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useIndexContext } from "../../context/IndexProvider";
import { useNavigate } from "react-router-dom";
import { indexRoute } from "../../constants";

const Character = () => {
  const glb = useGLTF("/character.glb");
  const dance = useFBX("/houseDancing.fbx");
  const pushButton = useFBX("/buttonPushing.fbx");

  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [currentAction, setCurrentAction] =
    useState<THREE.AnimationAction | null>(null);

  const { selectedIndex, setSelectedIndex } = useIndexContext();
  const navigate = useNavigate();
  const animations = [dance.animations[0], pushButton.animations[0]];

  const playAnimation = (index: number) => {
    if (!mixer.current || !animations[index]) return;
    const newAction = mixer.current.clipAction(animations[index]);
    if (currentAction) {
      currentAction.fadeOut(0.5);
    }
    newAction.reset().fadeIn(1).play();
    newAction.setEffectiveWeight(1.0);
    newAction.setEffectiveTimeScale(1.0);

    if (index === 0) {
      newAction.setLoop(THREE.LoopRepeat, Infinity);
    } else {
      newAction.setLoop(THREE.LoopOnce, 1);
      newAction.clampWhenFinished = true;
    }
    setCurrentAction(newAction);
    mixer.current.addEventListener("finished", (e) => {
      if (e.action === newAction && selectedIndex) {
        console.log("애니메이션 종료");
        if (!indexRoute[selectedIndex - 1]) return;
        navigate(`/${indexRoute[selectedIndex - 1]}`);
        setSelectedIndex(null);
      }
    });
  };

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

  useEffect(() => {
    if (selectedIndex === null) return;
    playAnimation(1);
  }, [selectedIndex]);

  return <primitive object={glb.scene} scale={6} position={[0, -5, 0]} />;
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
