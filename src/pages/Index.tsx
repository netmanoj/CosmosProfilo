
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence } from 'framer-motion';
import CanvasLayout from '@/layouts/CanvasLayout';
import NavMenu from '@/components/ui/NavMenu';
import SectionIndicator from '@/components/ui/SectionIndicator';

// Import custom hooks
import { useSectionNavigation } from './home/hooks/useSectionNavigation';

// Import components
import Scene from './home/components/Scene';
import HeaderBadge from './home/components/HeaderBadge';
import HomeIntro from './home/components/HomeIntro';

// Import sections
import AboutSection from './home/sections/AboutSection';
import SkillsSection from './home/sections/SkillsSection';
import ProjectsSection from './home/sections/ProjectsSection';
import ContactSection from './home/sections/ContactSection';

const Index = () => {
  const isMobile = useIsMobile();
  const { sections, activeSection, handleSectionChange } = useSectionNavigation();
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* 3D Canvas with fixed black hole view */}
      <CanvasLayout>
        <Scene 
          activeSection={activeSection}
          onPlanetClick={handleSectionChange}
        />
      </CanvasLayout>
      
      {/* UI Layer */}
      <div className="relative z-10">
        {/* Header badge */}
        <HeaderBadge />
        
        {/* Navigation */}
        <NavMenu
          items={sections}
          activeId={activeSection}
          onChange={handleSectionChange}
        />
        
        {/* Section indicator (desktop only) */}
        {!isMobile && (
          <SectionIndicator
            sections={sections.map(s => s.label)}
            activeIndex={sections.findIndex(s => s.id === activeSection)}
          />
        )}
        
        {/* Content Sections */}
        <AboutSection show={activeSection === 'about'} />
        <SkillsSection show={activeSection === 'skills'} />
        <ProjectsSection show={activeSection === 'projects'} />
        <ContactSection show={activeSection === 'contact'} />
        
        {/* Intro overlay for home section */}
        <AnimatePresence>
          {activeSection === 'home' && (
            <HomeIntro onExploreClick={() => handleSectionChange('about')} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
