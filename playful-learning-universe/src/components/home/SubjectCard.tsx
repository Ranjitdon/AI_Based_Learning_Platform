
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  lightColor: string;
  path: string;
  delay?: number;
}

const SubjectCard = ({ 
  title, 
  description, 
  icon, 
  color, 
  lightColor, 
  path,
  delay = 0 
}: SubjectCardProps) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <Link to={path}>
        <motion.div 
          className={`h-full rounded-3xl p-6 flex flex-col items-center text-center transition-all ${lightColor} border border-white/60 backdrop-blur-sm`}
          whileHover={{ y: -5, boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1)' }}
          initial={{ boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}
        >
          <motion.div 
            className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-4 shadow-md text-white`}
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <h3 className={`text-xl font-bold mb-2 text-gray-800`}>{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          
          <motion.div 
            className={`mt-auto pt-4 kid-button-ghost text-${color.split('-')[1]}-600`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default SubjectCard;
