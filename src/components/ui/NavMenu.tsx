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
    <div className="fixed inset-x-0 bottom-4 sm:bottom-6 flex justify-center items-center z-50 px-2 sm:px-4">
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "w-[95%] sm:w-auto sm:min-w-[200px] sm:max-w-[90%]",
          "bg-opacity-10 backdrop-blur-md bg-black/40 border border-white/10 rounded-full py-1 sm:py-2 px-2 sm:px-6",
          className
        )}
      >
        <ul className="flex items-center justify-between sm:justify-center sm:gap-3 w-full">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300",
                  "text-[13px] sm:text-sm md:text-base font-medium whitespace-nowrap",
                  activeId === item.id ? "text-white" : "text-white/70 hover:text-white"
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
                        "absolute inset-0 rounded-full -z-10",
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
                  <span className="mr-1 sm:mr-2">{item.icon}</span>
                )}
                
                {/* Label */}
                <span className="relative">
                  {item.label}
                  
                  {/* Active indicator */}
                  {activeId === item.id && (
                    <motion.span
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-400"
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
    </div>
  );
};

export default NavMenu;