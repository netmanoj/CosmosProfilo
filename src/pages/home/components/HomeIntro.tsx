
import { motion } from 'framer-motion';

interface HomeIntroProps {
  onExploreClick: () => void;
}

const HomeIntro = ({ onExploreClick }: HomeIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-30"
    >
      <div className="text-center max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-black/85 backdrop-blur-xl p-10 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            Manoj Adhikari
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl sm:text-2xl font-medium text-white mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            Full Stack Developer & Technology Enthusiast
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/90 max-w-md mx-auto mb-8 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
          >
            Passionate about technology and problem-solving, with a strong desire to learn, adapt, and stay updated with the latest advances.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="inline-flex pointer-events-auto"
          >
            <button 
              onClick={onExploreClick}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-colors shadow-lg shadow-purple-500/30"
            >
              Explore My Universe
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeIntro;
