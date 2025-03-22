import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const ProjectsSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="Projects & Publications"
      subtitle="Portfolio Highlights"
      show={show}
      side="right"
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-3 text-white">Projects</h2>
          <ul className="space-y-4 text-white/80">
            <li>
              <a 
                href="https://github.com/netmanoj/recipieOnGo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Recipe Finder
              </a>
              <p>A web app to find recipes based on ingredients or dishes.</p>
            </li>
            <li>
              <a 
                href="https://github.com/netmanoj/artify" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Artify Gallery
              </a>
              <p>Interactive art gallery powered by Unsplash API.</p>
            </li>
            <li>
              <a 
                href="https://real-time-chat-app-5952a.firebaseapp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Groupie - Real-Time Chat Application
              </a>
              <p>Real-time chat app built with React.js and Firebase.</p>
            </li>
            <li>
              <a 
                href="https://github.com/netmanoj/fos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Homieforever - Food Ordering System
              </a>
              <p>Food ordering web app with customer and product management.</p>
            </li>
            <li>
              <a 
                href="https://github.com/netmanoj/cooltyper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                CoolTyper - Typing Test Web App
              </a>
              <p>Typing test app to measure WPM with accuracy.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default ProjectsSection;