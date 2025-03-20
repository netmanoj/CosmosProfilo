
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import Planet from '@/components/canvas/Planet';
import Particles from '@/components/canvas/Particles';

interface SceneProps {
  activeSection: string;
  onPlanetClick: (section: string) => void;
}

const Scene = ({ activeSection, onPlanetClick }: SceneProps) => {
  const controlsRef = useRef<CameraControls>(null);
  
  // Define planet positions
  const planetPositions = [
    [8, 0, -5],   // About planet
    [0, -8, -10], // Skills planet
    [-10, 0, -5], // Projects planet
    [0, 10, -15]  // Contact planet
  ];
  
  // Animate camera based on active section
  useFrame((state) => {
    if (controlsRef.current) {
      // Adjust camera position based on section
      if (activeSection === 'home') {
        state.camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.05);
        state.camera.lookAt(0, 0, 0);
      }
    }
  });
  
  return (
    <>
      <CameraControls ref={controlsRef} />
      
      {/* Interactive particles */}
      <Particles count={300} color="#ffffff" />
      
      {/* Earth-like planet for About */}
      <Planet 
        position={planetPositions[0] as [number, number, number]} 
        size={1.5} 
        color="#22A66D" 
        name="About"
        onClick={() => onPlanetClick('about')}
        planetType="earth"
        hasWater={true}
        hasClouds={true}
        hasAtmosphere={true}
      />
      
      {/* Ice planet for Skills */}
      <Planet 
        position={planetPositions[1] as [number, number, number]} 
        size={1.8} 
        color="#00BCD4" 
        name="Skills"
        onClick={() => onPlanetClick('skills')}
        planetType="ice"
        hasWater={false}
        hasClouds={false}
        hasAtmosphere={true}
      />
      
      {/* Gas giant for Projects */}
      <Planet 
        position={planetPositions[2] as [number, number, number]} 
        size={2} 
        color="#FFC107" 
        name="Projects"
        onClick={() => onPlanetClick('projects')}
        planetType="gas"
        hasWater={false}
        hasClouds={true}
        hasAtmosphere={true}
      />
      
      {/* Desert planet for Contact */}
      <Planet 
        position={planetPositions[3] as [number, number, number]} 
        size={1.2} 
        color="#FF5722" 
        name="Contact"
        onClick={() => onPlanetClick('contact')}
        planetType="desert"
        hasWater={false}
        hasClouds={false}
        hasAtmosphere={true}
      />
    </>
  );
};

export default Scene;
