import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const ContactSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="Contact"
      subtitle="Get in Touch"
      show={show}
      side="left"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Contact Information</h2>
          <div className="space-y-4">
            <p>
              <strong className="text-white">Location:</strong><br />
              Bengaluru, Karnataka
            </p>
            <p>
              <strong className="text-white">Email:</strong><br />
              <a 
                href="mailto:imadhikarimanoj@gmail.com" 
                className="text-blue-400 hover:text-blue-300"
              >
                imadhikarimanoj@gmail.com
              </a>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white/80"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Professional Profiles</h2>
          <div className="space-y-4">
            <p>
              <strong className="text-white">LinkedIn:</strong><br />
              <a 
                href="https://linkedin.com/in/livingmanoj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                linkedin.com/in/livingmanoj
              </a>
            </p>
            <p>
              <strong className="text-white">Portfolio:</strong><br />
              <a 
                href="https://netmanoj.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                netmanoj.netlify.app
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default ContactSection;
