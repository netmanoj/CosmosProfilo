import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const SkillsSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="Skills & Training"
      subtitle="Technical Expertise"
      show={show}
      side="left"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-white">Skills</h2>
          <div className="space-y-3 text-white/80">
            <p>
              <strong className="text-white">Technical Skills:</strong> HTML, CSS, JavaScript, React.js, Git, GitHub, Linux, Figma, Canva, VS Code, Firebase, MS Office
            </p>
            <p>
              <strong className="text-white">Programming Languages:</strong> C, JavaScript
            </p>
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default SkillsSection;
