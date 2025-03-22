import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const AboutSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="About Me"
      subtitle="Developer & Technology Enthusiast"
      show={show}
      side="right"
    >
      <div className="space-y-8 sm:space-y-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 leading-relaxed text-lg sm:text-base px-4 sm:px-0"
        >
          Passionate about technology and problem-solving, with a strong desire to learn, adapt, and stay updated with the latest advances. Driven by curiosity and innovation, thrives in dynamic environments where skills can be used to create impactful solutions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3 mt-4"
        >
          
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default AboutSection;
