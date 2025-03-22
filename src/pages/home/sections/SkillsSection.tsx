
import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';
import { Badge } from "@/components/ui/badge";

// Define skills data
const skills = [
  { name: 'HTML & CSS', level: 90, color: '#FF4560' },
  { name: 'JavaScript', level: 85, color: '#00E396' },
  { name: 'React.js', level: 80, color: '#008FFB' },
  { name: 'Firebase', level: 75, color: '#FEB019' },
  { name: 'Git & GitHub', level: 85, color: '#775DD0' }
];

const SkillsSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="My Skills"
      subtitle="Technologies & Capabilities"
      show={show}
      side="left"
    >
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-xs text-white/60">{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {['HTML', 'CSS', 'JavaScript', 'React.js', 'Git', 'GitHub', 'Linux', 'Figma', 'Canva', 'VS Code', 'Firebase', 'MS Office'].map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="bg-opacity-10 backdrop-blur-md bg-white/5 text-white/90 py-1.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Soft Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['Communication', 'Problem-Solving', 'Team Collaboration', 'Adaptability', 'Time Management'].map((skill) => (
              <Badge 
                key={skill} 
                variant="outline"
                className="bg-opacity-10 backdrop-blur-md bg-white/5 text-white/90 py-1.5 border-white/30"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default SkillsSection;
