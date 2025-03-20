
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarProps {
  count?: number;
}

const Stars = ({ count = 2000 }: StarProps) => {
  const starsRef = useRef<THREE.Points>(null);
  
  // Generate random positions for stars with varying sizes
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Create a more dispersed, cloud-like distribution
    const radius = 20 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.5;             // z (flattened a bit for galactic plane)
    
    // Vary the star sizes
    sizes[i] = Math.random() * 0.15 + 0.03;
    
    // Add color variation
    const starColor = new THREE.Color();
    
    // Most stars should be white/blue/yellow
    const colorRoll = Math.random();
    if (colorRoll < 0.7) {
      // White to blue-white stars
      starColor.setHSL(0.6, Math.random() * 0.2, 0.9 + Math.random() * 0.1);
    } else if (colorRoll < 0.9) {
      // Yellow-white stars
      starColor.setHSL(0.1, 0.3, 0.9);
    } else {
      // Few reddish stars
      starColor.setHSL(0.05, 0.9, 0.9);
    }
    
    colors[i * 3] = starColor.r;
    colors[i * 3 + 1] = starColor.g;
    colors[i * 3 + 2] = starColor.b;
  }
  
  // Animate the stars with subtle twinkling
  useFrame((state, delta) => {
    if (starsRef.current) {
      // Slow rotation
      starsRef.current.rotation.x -= delta * 0.003;
      starsRef.current.rotation.y -= delta * 0.005;
      
      // Access the material for twinkling effect
      const material = starsRef.current.material as THREE.PointsMaterial;
      material.size = Math.max(0.05, Math.sin(state.clock.elapsedTime * 0.5) * 0.01 + 0.05);
    }
  });
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
};

export default Stars;
