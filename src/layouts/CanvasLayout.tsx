
import { Canvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import Stars from '@/components/canvas/Stars';
import Galaxy from '@/components/canvas/Galaxy';

interface CanvasLayoutProps {
  children: ReactNode;
}

const CanvasLayout = ({ children }: CanvasLayoutProps) => {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 15, 0], fov: 40, up: [0, 0, -1] }} // Adjusted camera position
        dpr={[1, 2]} 
        gl={{ 
          alpha: false, 
          antialias: true,
          logarithmicDepthBuffer: true,
          powerPreference: "high-performance"
        }}
        style={{ background: '#030712' }}
        shadows
      >
        {/* Dark space background */}
        <color attach="background" args={['#020207']} />
        <fog attach="fog" args={['#070b1a', 20, 45]} />
        
        {/* Ambient lighting for scene visibility */}
        <ambientLight intensity={0.2} />
        
        {/* Main light source */}
        <pointLight 
          position={[0, 10, 0]} 
          intensity={1} 
          color="#ff4500" 
          distance={20}
        />
        
        {/* Additional directional light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.4} 
          color="#ffffff"
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        
        <Suspense fallback={null}>
          <Stars count={3000} />
          <Galaxy />
          {children}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasLayout;
