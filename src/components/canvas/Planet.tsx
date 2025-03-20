
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture, Sphere } from '@react-three/drei';

interface PlanetProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  rotationSpeed?: number;
  onClick?: () => void;
  name: string;
  hasAtmosphere?: boolean;
  hasClouds?: boolean;
  hasWater?: boolean;
  hasCraters?: boolean;
  planetType?: 'earth' | 'gas' | 'desert' | 'ice' | 'lava';
}

const Planet = ({
  position,
  size = 1,
  color = '#22A66D',
  rotationSpeed = 0.005,
  onClick,
  name,
  hasAtmosphere = true,
  hasClouds = false,
  hasWater = true,
  hasCraters = false,
  planetType = 'earth'
}: PlanetProps) => {
  const planetRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Generate a displacement map for planet surface
  const displacementMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Create a gradient background
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    
    if (planetType === 'earth') {
      // Create landmass-like patterns
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Generate noise
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 50 + 20;
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add some ridges
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 20 + 10;
        const angle = Math.random() * Math.PI;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(-width/2, -height/2, width, height);
        ctx.restore();
      }
    } else if (planetType === 'gas') {
      // Gas giant patterns
      const colors = ['#11466D', '#1A6189', '#2271A4', '#2A81BE'];
      
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create bands
      for (let i = 0; i < 8; i++) {
        const y = i * (canvas.height / 8);
        const height = canvas.height / 8;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(0, y, canvas.width, height);
      }
      
      // Add swirls
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 40 + 20;
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.random() * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Default planetary surface
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 5 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [planetType]);
  
  // Create cloud texture
  const cloudTexture = useMemo(() => {
    if (!hasClouds) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate cloud patterns
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 80 + 20;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [hasClouds]);
  
  // Create water texture for earth-like planets
  const waterTexture = useMemo(() => {
    if (!hasWater) return null;
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Create water pattern
    ctx.fillStyle = '#1A67BD';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some ripples
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 5 + 1;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, [hasWater]);
  
  // Use texture based on planet type
  const getMainColor = () => {
    switch (planetType) {
      case 'earth': return new THREE.Color('#22A66D');
      case 'gas': return new THREE.Color('#4A90E2');
      case 'desert': return new THREE.Color('#E2A74A');
      case 'ice': return new THREE.Color('#A4D8E7');
      case 'lava': return new THREE.Color('#E24A4A');
      default: return new THREE.Color(color);
    }
  };
  
  useFrame((state, delta) => {
    if (planetRef.current) {
      // Rotate planet
      planetRef.current.rotation.y += delta * rotationSpeed;
      
      // Cloud rotation (slightly different speed)
      if (cloudRef.current) {
        cloudRef.current.rotation.y += delta * rotationSpeed * 0.7;
      }
      
      // Glow effect when hovered
      if (materialRef.current) {
        const emissiveIntensity = hovered 
          ? THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.3, 0.1)
          : THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.1, 0.1);
        
        materialRef.current.emissiveIntensity = emissiveIntensity;
      }
    }
  });
  
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  return (
    <group position={position} ref={planetRef}>
      {/* Main planet sphere */}
      <mesh
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color={getMainColor()}
          roughness={0.7}
          metalness={0.2}
          map={hasWater ? waterTexture : undefined}
          displacementMap={displacementMap}
          displacementScale={0.1}
          bumpMap={displacementMap}
          bumpScale={0.05}
          emissive={getMainColor()}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Cloud layer */}
      {hasClouds && (
        <mesh ref={cloudRef}>
          <sphereGeometry args={[size * 1.02, 32, 32]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent={true}
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* Atmosphere glow */}
      {hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[size * 1.2, 32, 32]} />
          <meshBasicMaterial
            color={getMainColor()}
            transparent
            opacity={0.07}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Brighter inner atmosphere */}
      {hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[size * 1.1, 32, 32]} />
          <meshBasicMaterial
            color={getMainColor()}
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Add name label (comment out if not needed) */}
      {/* <Html position={[0, size * 1.5, 0]} center>
        <div className="text-white text-lg font-bold bg-black/50 px-2 py-1 rounded">
          {name}
        </div>
      </Html> */}
    </group>
  );
};

export default Planet;
