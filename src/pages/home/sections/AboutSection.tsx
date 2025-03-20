import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const AboutSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="About Me"
      subtitle="Software Developer"
      show={show}
      side="right"
    >
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white"
        >
          <h1 className="text-2xl font-bold mb-2">Manoj Adhikari</h1>
          <p className="text-white/80">
            Bengaluru, Karnataka |{' '}
            <a href="mailto:imadhikarimanoj@gmail.com" className="text-blue-400 hover:text-blue-300">
              imadhikarimanoj@gmail.com
            </a>{' '}
          </p>
          <p className="text-white/80 mt-2">
            <a href="https://linkedin.com/in/livingmanoj" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mr-4">
              🔗 LinkedIn
            </a>
            <a href="https://netmanoj.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              🌐 Portfolio
            </a>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-2 text-white">Summary</h2>
          <p className="text-white/80 leading-relaxed">
            Passionate about technology and problem-solving, with a strong desire to learn, adapt, and stay updated with the latest advances. 
            Driven by curiosity and innovation, thrives in dynamic environments where skills can be used to create impactful solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default AboutSection;
