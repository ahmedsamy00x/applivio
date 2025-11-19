"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingCard({ position, rotation, color, delay = 0 }: any) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();

      // Smooth hover transition for position and scale
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Gentle floating motion (reduced when hovered)
      const floatIntensity = hovered ? 0.2 : 1;
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        position[1] + Math.sin(t * 0.5 + delay) * 0.1 * floatIntensity,
        0.1
      );

      // Subtle rotation that follows mouse slightly if needed, but keeping it simple for now
      meshRef.current.rotation.x =
        rotation[0] + Math.sin(t * 0.3 + delay) * 0.05;
      meshRef.current.rotation.y =
        rotation[1] + Math.sin(t * 0.2 + delay) * 0.05;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Glass Card Background - Smaller Scale */}
      <mesh scale={[0.8, 0.8, 0.8]}>
        <boxGeometry args={[3, 2, 0.1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0.15}
          color={hovered ? "#60a5fa" : color}
        />
      </mesh>

      {/* Content Stripes simulating text/UI - Scaled down */}
      <group scale={[0.8, 0.8, 0.8]}>
        <mesh position={[-0.8, 0.4, 0.06]}>
          <planeGeometry args={[1, 0.2]} />
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </mesh>
        <mesh position={[-0.5, 0, 0.06]}>
          <planeGeometry args={[1.6, 0.1]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
        <mesh position={[-0.5, -0.3, 0.06]}>
          <planeGeometry args={[1.6, 0.1]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>

        {/* Status Dot */}
        <mesh position={[1.1, 0.6, 0.06]}>
          <circleGeometry args={[0.15, 32]} />
          <meshBasicMaterial
            color={color === "#2563eb" ? "#4ade80" : "#fbbf24"}
          />
        </mesh>
      </group>
    </group>
  );
}

function VoiceOrb({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Pulse effect, intensified on hover
      const baseScale = hovered ? 1.4 : 1.2; // Increased base size
      const pulseSpeed = hovered ? 5 : 3;
      const scale = baseScale + Math.sin(t * pulseSpeed) * 0.1;

      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshTransmissionMaterial
          resolution={512}
          thickness={0.5}
          roughness={0}
          envMapIntensity={2}
          color={hovered ? "#60a5fa" : "#3b82f6"}
          distortion={1.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
        />
      </mesh>

      {/* Sound waves - Larger */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        scale={hovered ? [1.5, 1.5, 1.5] : [1.2, 1.2, 1.2]}
      >
        <ringGeometry args={[1, 1.05, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={hovered ? 0.5 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        scale={hovered ? [1.8, 1.8, 1.8] : [1.5, 1.5, 1.5]}
      >
        <ringGeometry args={[1, 1.05, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={hovered ? 0.3 : 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ConnectionLines() {
  const points = useMemo(
    () => [
      new THREE.Vector3(-2, 1, 0), // Card 1
      new THREE.Vector3(0, -0.5, 1), // Orb
      new THREE.Vector3(2, 1.5, -1), // Card 2
    ],
    []
  );

  return (
    <group>
      {/* Connection 1 */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([points[0]!, points[1]!]),
            20,
            0.02,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
      {/* Connection 2 */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([points[1]!, points[2]!]),
            20,
            0.02,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero3DModel() {
  return (
    <div className="h-[500px] w-full lg:h-[600px]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Environment preset="city" />

        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={[0, 0, 0]} rotation={[0, -0.2, 0]}>
            {/* Central Voice Orb representing input - Center Stage */}
            <VoiceOrb position={[0, -0.5, 1.5]} />

            {/* Job Application Cards - Smaller and surrounding */}
            <FloatingCard
              position={[-2, 1.2, 0]}
              rotation={[0, 0.3, 0.1]}
              color="#2563eb" // Blue for offer/applied
              delay={0}
            />
            <FloatingCard
              position={[2.2, 1.5, -1]}
              rotation={[0, -0.3, -0.1]}
              color="#f59e0b" // Amber for interview
              delay={1}
            />
            <FloatingCard
              position={[1.5, -1.8, -1.5]}
              rotation={[0.2, -0.1, 0]}
              color="#ef4444" // Red for rejected
              delay={2}
            />

            {/* Connecting lines implying data flow */}
            <ConnectionLines />
          </group>
        </Float>

        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4.5}
        />
      </Canvas>
    </div>
  );
}
