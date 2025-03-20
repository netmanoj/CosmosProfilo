
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionIndicatorProps {
  sections: string[];
  activeIndex: number;
  className?: string;
}

const SectionIndicator = ({ 
  sections, 
  activeIndex, 
  className 
}: SectionIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={cn(
        "fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-3",
        className
      )}
    >
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className="relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
        >
          {/* Indicator dot */}
          <div 
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === activeIndex 
                ? "bg-blue-400 shadow-lg shadow-blue-400/50" 
                : "bg-white/20 group-hover:bg-white/50"
            )}
          />
          
          {/* Label tooltip */}
          <div 
            className={cn(
              "absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none",
              "whitespace-nowrap px-2 py-1 rounded-md bg-black/80 text-xs",
              "transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
              index === activeIndex && "opacity-100 translate-x-0"
            )}
          >
            {section}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SectionIndicator;
