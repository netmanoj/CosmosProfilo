
import { motion } from 'framer-motion';
import InfoPanel from '@/components/ui/InfoPanel';
import { Badge } from "@/components/ui/badge";

// Define projects data
const projects = [
  {
    title: 'Recipe Finder',
    description: 'A web app to find recipes based on ingredients or dishes.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    demoUrl: '#',
    githubUrl: 'https://github.com/netmanoj/recipieOnGo'
  },
  {
    title: 'Artify Gallery',
    description: 'Interactive art gallery powered by Unsplash API.',
    technologies: ['React.js', 'CSS', 'Unsplash API'],
    demoUrl: '#',
    githubUrl: 'https://github.com/netmanoj/artify'
  },
  {
    title: 'Groupie - Real-Time Chat Application',
    description: 'Real-time chat app built with React.js and Firebase.',
    technologies: ['React.js', 'Firebase', 'CSS'],
    demoUrl: 'https://real-time-chat-app-5952a.firebaseapp.com',
    githubUrl: '#'
  },
  {
    title: 'Homieforever - Food Ordering System',
    description: 'Food ordering web app with customer and product management.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com/netmanoj/fos'
  },
  {
    title: 'CoolTyper - Typing Test Web App',
    description: 'Typing test app to measure WPM with accuracy.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com/netmanoj/cooltyper'
  }
];

const ProjectsSection = ({ show }: { show: boolean }) => {
  return (
    <InfoPanel
      title="My Projects"
      subtitle="Recent Work & Applications"
      show={show}
      side="right"
    >
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-opacity-90 backdrop-blur-md bg-black/80 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300"
          >
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-white/90 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="text-xs bg-white/10 text-white border-white/30 backdrop-blur-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-4 mt-4">
              {project.demoUrl !== '#' && (
                <a 
                  href={project.demoUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Demo
                </a>
              )}
              {project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/90 hover:text-white transition-colors"
                >
                  GitHub Repo
                </a>
              )}
            </div>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Publications</h3>
          <div className="space-y-4 text-white/80">
            <p><strong>Homieforever Food Delivery Driven Company from Homemade Kitchen</strong> – Published in International Research Journal of Engineering and Technology (IRJET), Volume: 08, Issue: 07 (July 2021)</p>
            <p>+2 additional international journal publications – <a href="https://www.linkedin.com/in/livingmanoj/details/publications/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">View Publications</a></p>
          </div>
        </motion.div>
      </div>
    </InfoPanel>
  );
};

export default ProjectsSection;
