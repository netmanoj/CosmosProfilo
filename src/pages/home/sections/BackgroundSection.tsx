import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundSectionProps {
  show: boolean;
}

const BackgroundSection = ({ show }: BackgroundSectionProps) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 100 
          }}
          className="fixed inset-0 z-40"
        />
      )}
    </AnimatePresence>
  );
};

export default BackgroundSection; 