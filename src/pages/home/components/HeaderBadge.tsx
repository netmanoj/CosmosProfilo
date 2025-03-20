
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";

const HeaderBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 left-8"
    >
      <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 border-none text-white">
        Software Developer
      </Badge>
    </motion.div>
  );
};

export default HeaderBadge;
