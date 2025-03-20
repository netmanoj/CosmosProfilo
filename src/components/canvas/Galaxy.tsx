
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const blackholeRef = useRef<THREE.Mesh>(null);
  
  // Create a galaxy with optimized parameters
  const particleCount = 15000; // More particles for better visibility
  
  // Use useMemo to optimize performance
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Galaxy parameters
    const branches = 5;
    const radius = 15;
    const spin = 1.5;
    const randomness = 0.6;
    const randomnessPower = 3;
    const innerColor = new THREE.Color('#9b4dca');   // Purple inner color
    const outerColor = new THREE.Color('#2196f3');   // Blueish outer color
    
    // Create dust particle distribution in spiral arms
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Calculate radius - more particles toward the center
      const radius_i = Math.random() * radius * (Math.random() < 0.8 ? 0.8 : 1);
      
      // Calculate angle based on branch
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      
      // Add spiral by making the angle depend on radius
      const spinAngle = radius_i * spin;
      
      // Calculate position with randomness that increases with distance
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius_i + randomX;
      positions[i3 + 1] = randomY; // Flatten the galaxy a bit
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius_i + randomZ;
      
      // Add color variation based on distance from center
      const colorRatio = radius_i / radius;
      const mixedColor = innerColor.clone();
      mixedColor.lerp(outerColor, colorRatio);
      
      // Add slight randomness to color
      const hsl = {};
      mixedColor.getHSL(hsl);
      mixedColor.setHSL(
        hsl.h,
        hsl.s + Math.random() * 0.2 - 0.1,
        hsl.l + Math.random() * 0.2 - 0.1
      );
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      // Vary particle size - smaller particles farther out
      sizes[i] = (1 - colorRatio * 0.5) * (Math.random() * 0.2 + 0.05);
    }
    
    return { positions, colors, sizes };
  }, []);
  
  // Animate the galaxy
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03; // Rotation speed
    }
    
    if (blackholeRef.current) {
      blackholeRef.current.rotation.z += delta * 0.5;
      
      // Pulse the black hole slightly
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      blackholeRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group>
      {/* Galaxy dust particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
      
      {/* Black hole at center */}
      <mesh ref={blackholeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#000000" />
        <group>
          {/* Accretion disk */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 3.5, 64]} />
            <meshBasicMaterial 
              color="#7e57c2" 
              side={THREE.DoubleSide} 
              opacity={0.7} 
              transparent 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Glow */}
          <mesh>
            <sphereGeometry args={[1.8, 32, 32]} />
            <meshBasicMaterial 
              color="#651fff" 
              transparent 
              opacity={0.2} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </mesh>
    </group>
  );
};

export default Galaxy;
