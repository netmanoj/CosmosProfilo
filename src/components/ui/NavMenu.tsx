
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface NavMenuProps {
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const NavMenu = ({ items, activeId, onChange, className }: NavMenuProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50",
        "bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl py-3 px-4",
        className
      )}
    >
      <ul className="flex items-center space-x-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-300 text-white/80 hover:text-white",
                activeId === item.id && "text-white"
              )}
              onClick={() => onChange(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background highlight */}
              <AnimatePresence>
                {(activeId === item.id || hoveredId === item.id) && (
                  <motion.span
                    layoutId="navBackground"
                    className={cn(
                      "absolute inset-0 rounded-lg -z-10",
                      activeId === item.id 
                        ? "bg-blue-500/20" 
                        : "bg-white/5"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Icon */}
              {item.icon && (
                <span className="mr-2">{item.icon}</span>
              )}
              
              {/* Label */}
              <span className="relative">
                {item.label}
                
                {/* Active indicator */}
                {activeId === item.id && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                    layoutId="activeIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default NavMenu;
