
import { useState } from 'react';

export interface Section {
  id: string;
  label: string;
}

// Define sections
const SECTIONS: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  // Change section handler
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };
  
  return {
    sections: SECTIONS,
    activeSection,
    setActiveSection,
    handleSectionChange
  };
};
