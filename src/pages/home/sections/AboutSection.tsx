
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
      <div className="space-y-6">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 leading-relaxed"
        >
          Passionate about technology and problem-solving, with a strong desire to learn, adapt, and stay updated with the latest advances. Driven by curiosity and innovation, thrives in dynamic environments where skills can be used to create impactful solutions.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Education</h3>
          <ul className="text-white/80 leading-relaxed space-y-2">
            <li>
              <strong>Excel Engineering College</strong> (2021 – 2024)<br /> 
              Bachelor of Engineering, Computer Science and Engineering — <strong>GPA:</strong> 8.1/10
            </li>
            <li>
              <strong>Centre for Computer and Communication Technology</strong> (2018 – 2021)<br />  
              Diploma in Computer Science and Technology — <strong>GPA:</strong> 7.5/10
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-white">Training</h3>
          <ul className="text-white/80 leading-relaxed space-y-2">
            <li>
              <strong>UpGrad</strong> – Certificate Program in Full-Stack Development Bootcamp (May 2024 – December 2024)
            </li>
            <li>
              <strong>NSIC Technical Services Centre</strong> – Virtual Internship on Android App Development (Dec. 2022)
            </li>
            <li>
              <strong>ISOEH Siliguri</strong> – On-site Training on Web Development (Dec. 2020 – Jan. 2021)
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-3 mt-4"
        >
          <div className="bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-blue-400 mb-1">Contact</h4>
            <p className="text-sm text-white/70">
              <a href="mailto:imadhikarimanoj@gmail.com" className="hover:text-blue-400 transition-colors">imadhikarimanoj@gmail.com</a>
              <br />Bengaluru, Karnataka
            </p>
          </div>
          
          <div className="bg-opacity-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-medium text-blue-400 mb-1">Languages</h4>
            <p className="text-sm text-white/70">English, Hindi, Nepali</p>
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default AboutSection;
