
import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';

const ContactSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="Contact Me"
      subtitle="Let's Connect"
      show={show}
      side="left"
    >
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80"
        >
          I'm always open to new opportunities, collaborations, or just a friendly chat about tech. Feel free to reach out through any of the channels below:
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mt-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-400">Email</h4>
              <p className="text-white">
                <a href="mailto:imadhikarimanoj@gmail.com" className="hover:text-blue-400 transition-colors">imadhikarimanoj@gmail.com</a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-400">LinkedIn</h4>
              <p className="text-white">
                <a href="https://linkedin.com/in/livingmanoj" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">linkedin.com/in/livingmanoj</a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-400">Portfolio</h4>
              <p className="text-white">
                <a href="https://netmanoj.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">netmanoj.netlify.app</a>
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 outline-none transition-colors"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 outline-none transition-colors"
            />
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 outline-none transition-colors resize-none"
            ></textarea>
            <button className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
              Send Message
            </button>
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default ContactSection;
