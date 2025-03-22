
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfoPanelProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  show: boolean;
  className?: string;
}

const InfoPanel = ({
  title,
  subtitle,
  children,
  side = 'right',
  show,
  className
}: InfoPanelProps) => {
  const [rendered, setRendered] = useState(false);
  
  // Prevent flash of content when transitioning between sections
  useEffect(() => {
    if (show) {
      setRendered(true);
    }
  }, [show]);
  
  return (
    <AnimatePresence mode="wait">
      {(show || rendered) && (
        <motion.div
          className={cn(
            "fixed top-0 h-screen w-[450px] max-w-full z-40 bg-black/60 backdrop-blur-xl border border-white/20 shadow-lg",
            side === 'left' ? "left-0 rounded-r-2xl" : "right-0 rounded-l-2xl",
            className
          )}
          initial={{ 
            x: side === 'left' ? -100 : 100, 
            opacity: 0 
          }}
          animate={{ 
            x: show ? 0 : side === 'left' ? -100 : 100,
            opacity: show ? 1 : 0
          }}
          exit={{ 
            x: side === 'left' ? -100 : 100, 
            opacity: 0 
          }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 100 
          }}
          onAnimationComplete={() => {
            if (!show) setRendered(false);
          }}
        >
          <div className="p-8 h-full flex flex-col">
            {/* Title Animation */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {title}
                  </h2>
                  
                  {subtitle && (
                    <p className="text-sm text-white mb-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                      {subtitle}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Content Animation */}
            <AnimatePresence mode="wait">
              {show && (
                <motion.div
                  key={`content-${title}`}
                  className="overflow-y-auto pb-6 flex-1 pr-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
