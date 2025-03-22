
import { useRef, useMemo } from 'react';
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
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5; // y (flattened for galactic plane)
    positions[i * 3 + 2] = radius * Math.cos(phi);                   // z
    
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
  
  // Create improved circular texture for stars
  const starTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a radial gradient for soft particle edges
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
      ctx.fill();
      
      // Add a small glow effect
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 4, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Animate the stars with subtle twinkling and rotation around the black hole
  useFrame((state, delta) => {
    if (starsRef.current) {
      // Slow overall rotation
      starsRef.current.rotation.x -= delta * 0.003;
      starsRef.current.rotation.y -= delta * 0.005;
      
      // Apply gravity effect to stars
      const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        
        // Calculate distance from center
        const distance = Math.sqrt(x * x + z * z);
        
        // Apply orbital effect - stars farther from center move slower
        if (distance > 2) {
          const angle = Math.atan2(z, x);
          const orbitSpeed = 0.01 / Math.sqrt(distance); // Inverse square relationship
          const newAngle = angle + orbitSpeed * delta;
          
          positions[i] = Math.cos(newAngle) * distance;
          positions[i + 2] = Math.sin(newAngle) * distance;
        }
      }
      
      starsRef.current.geometry.attributes.position.needsUpdate = true;
      
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
        map={starTexture}
      />
    </points>
  );
};

export default Stars;
