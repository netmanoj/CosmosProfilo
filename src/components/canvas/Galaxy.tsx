
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const blackholeRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  
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
    const innerColor = new THREE.Color('#ff4500');   // Bright orange inner color
    const outerColor = new THREE.Color('#8b5cf6');   // Purple outer color
    
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
      const hsl: THREE.HSL = { h: 0, s: 0, l: 0 };
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
  
  // Animate the galaxy with gravity effect
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03; // Rotation speed
      
      // Apply gravity-like effect - particles closer to center move faster
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Apply gravity effect - objects closer to center orbit faster
        if (distance > 0.5) { // Don't affect particles too close to center
          const angle = Math.atan2(z, x);
          const newAngle = angle + (0.02 / Math.max(0.5, distance)) * delta;
          
          positions[i] = Math.cos(newAngle) * distance;
          positions[i + 2] = Math.sin(newAngle) * distance;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (accretionDiskRef.current) {
      accretionDiskRef.current.rotation.z += delta * 0.2; // Faster rotation for accretion disk
      
      // Pulse the accretion disk slightly
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      accretionDiskRef.current.scale.set(scale, scale, scale);
    }
  });
  
  // Create a texture for the particles to make them round
  const particleTexture = useMemo(() => {
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
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
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
          map={particleTexture}
        />
      </points>
      
      {/* Black hole at center - SMALLER size */}
      <group position={[0, 0, 0]}>
        {/* Black hole center */}
        <mesh ref={blackholeRef}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        
        {/* Accretion disk - very small */}
        <mesh ref={accretionDiskRef} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.15, 0.4, 64]} />
          <meshBasicMaterial 
            map={createAccretionDiskTexture()}
            side={THREE.DoubleSide} 
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Outer glow */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[0.4, 0.6, 64]} />
          <meshBasicMaterial 
            color="#d946ef" 
            transparent 
            opacity={0.4} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};

// Create a texture for the accretion disk
const createAccretionDiskTexture = () => {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  
  if (context) {
    // Create a radial gradient
    const gradient = context.createRadialGradient(
      size / 2, size / 2, size / 3,
      size / 2, size / 2, size / 2
    );
    
    // Colors inspired by the reference image
    gradient.addColorStop(0, '#ffffff');    // White center
    gradient.addColorStop(0.3, '#ffa500');  // Orange
    gradient.addColorStop(0.5, '#ff4500');  // Red-orange
    gradient.addColorStop(0.7, '#d946ef');  // Pink/magenta
    gradient.addColorStop(1, '#7e22ce');    // Purple/violet
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    // Add some swirl/turbulence effect
    context.globalCompositeOperation = 'overlay';
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = (Math.random() * 0.4 + 0.3) * size / 2;
      
      context.save();
      context.translate(size / 2, size / 2);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(radius * 0.8, 0);
      context.lineTo(radius * 1.2, 0);
      context.arc(0, 0, radius, 0, Math.PI / (Math.random() * 2 + 1), false);
      context.closePath();
      context.fill();
      context.restore();
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

export default Galaxy;
