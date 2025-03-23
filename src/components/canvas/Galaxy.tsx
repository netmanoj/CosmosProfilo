import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const blackholeRef = useRef<THREE.Mesh>(null);
  const accretionParticlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>();

  // Create particles for the galaxy
  const particleCount = 15000;
  
  // Create galaxy particles
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
    const innerColor = new THREE.Color('#ff4500');
    const outerColor = new THREE.Color('#8b5cf6');
    
    // Metroid structure parameters
    const metroidStructures = [
      { x: 5, y: 0, z: 5, radius: 2, particleCount: 300 },
      { x: -6, y: 1, z: -4, radius: 1.5, particleCount: 250 },
      { x: 3, y: -1, z: -7, radius: 1.8, particleCount: 280 },
      { x: -4, y: 0.5, z: 6, radius: 1.6, particleCount: 260 }
    ];

    let currentParticle = 0;

    // Create Metroid structures
    metroidStructures.forEach(structure => {
      for (let i = 0; i < structure.particleCount; i++) {
        const i3 = currentParticle * 3;
        
        // Create circular/spiral pattern for each structure
        const angle = (i / structure.particleCount) * Math.PI * 8;
        const spiralRadius = (i / structure.particleCount) * structure.radius;
        const height = Math.sin(angle * 2) * structure.radius * 0.2;
        
        positions[i3] = structure.x + Math.cos(angle) * spiralRadius;
        positions[i3 + 1] = structure.y + height;
        positions[i3 + 2] = structure.z + Math.sin(angle) * spiralRadius;
        
        // Unique colors for Metroid structures
        const color = new THREE.Color();
        const hue = 0.65 + Math.sin(angle) * 0.1; // Blue-purple range
        const saturation = 0.8;
        const lightness = 0.6 + Math.sin(angle * 2) * 0.2;
        color.setHSL(hue, saturation, lightness);
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Larger particles for structure definition
        sizes[currentParticle] = 0.2 + Math.sin(angle) * 0.1;
        
        currentParticle++;
      }
    });

    // Fill remaining particles with galaxy dust
    for (let i = currentParticle; i < particleCount; i++) {
      const i3 = i * 3;
      const radius_i = Math.random() * radius * (Math.random() < 0.8 ? 0.8 : 1);
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius_i * spin;
      
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius_i;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius_i + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius_i + randomZ;
      
      const colorRatio = radius_i / radius;
      const mixedColor = innerColor.clone().lerp(outerColor, colorRatio);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      sizes[i] = (1 - colorRatio * 0.5) * (Math.random() * 0.2 + 0.05);
    }
    
    return { positions, colors, sizes };
  }, []);

  // Create accretion disk particles
  const accretionDisk = useMemo(() => {
    const particleCount = 8000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.4 + Math.pow(Math.random(), 2) * 1.2;
      const height = (Math.random() - 0.5) * 0.05;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;
      
      // Initialize orbital velocities
      const speed = Math.sqrt(0.8 / radius);
      velocities[i3] = -Math.sin(angle) * speed;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = Math.cos(angle) * speed;
      
      // Color based on radius
      const temperature = 1 - Math.min(1, (radius - 0.4) / 1.2);
      const color = new THREE.Color();
      if (temperature > 0.8) {
        color.setHSL(0.6, 1, 1); // Blue-white for hottest
      } else if (temperature > 0.5) {
        color.setHSL(0.1, 1, 0.9); // Yellow-white
      } else {
        color.setHSL(0.05, 0.8, 0.7); // Orange-red
      }
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      sizes[i] = (1.2 - temperature) * 0.08;
    }
    
    velocitiesRef.current = velocities;
    return { positions, colors, sizes };
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }

    if (accretionParticlesRef.current && velocitiesRef.current) {
      const positions = accretionParticlesRef.current.geometry.attributes.position.array as Float32Array;
      const colors = accretionParticlesRef.current.geometry.attributes.color.array as Float32Array;
      const velocities = velocitiesRef.current;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        const distance = Math.sqrt(x * x + z * z);
        
        if (distance > 0.35) {
          // Update position
          positions[i] += velocities[i] * delta;
          positions[i + 2] += velocities[i + 2] * delta;
          
          // Calculate new angle and apply gravitational effect
          const angle = Math.atan2(z, x);
          const acceleration = 0.8 / (distance * distance);
          
          velocities[i] = (-Math.sin(angle) * acceleration + velocities[i]) * 0.999;
          velocities[i + 2] = (Math.cos(angle) * acceleration + velocities[i + 2]) * 0.999;
          
          // Add subtle vertical oscillation
          positions[i + 1] = y + Math.sin(state.clock.elapsedTime + distance * 2) * 0.01;
          
          // Update color based on velocity
          const speed = Math.sqrt(velocities[i] * velocities[i] + velocities[i + 2] * velocities[i + 2]);
          const color = new THREE.Color();
          const temperature = Math.min(1, speed * 1.5);
          
          if (temperature > 0.7) {
            color.setHSL(0.6, 1, 1);
          } else if (temperature > 0.4) {
            color.setHSL(0.1, 1, 0.9);
          } else {
            color.setHSL(0.05, 0.8, 0.7);
          }
          
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        } else {
          // Reset particles that get too close
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.2;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 0.05;
          positions[i + 2] = Math.sin(angle) * radius;
          
          const speed = Math.sqrt(0.8 / radius);
          velocities[i] = -Math.sin(angle) * speed;
          velocities[i + 2] = Math.cos(angle) * speed;
        }
      }
      
      accretionParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      accretionParticlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  // Create particle texture
  const particleTexture = useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
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
          map={particleTexture}
        />
      </points>
      
      {/* Black hole system */}
      <group position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Event horizon */}
        <mesh ref={blackholeRef}>
          <sphereGeometry args={[0.3, 64, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Accretion disk */}
        <points ref={accretionParticlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={accretionDisk.positions.length / 3}
              array={accretionDisk.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={accretionDisk.colors.length / 3}
              array={accretionDisk.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={accretionDisk.sizes.length}
              array={accretionDisk.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            sizeAttenuation={true}
            depthWrite={false}
            vertexColors
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            map={particleTexture}
          />
        </points>
      </group>
    </group>
  );
};

export default Galaxy;
