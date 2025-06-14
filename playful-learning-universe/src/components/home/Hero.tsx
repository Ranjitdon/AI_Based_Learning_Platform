
import { motion } from 'framer-motion';
import MascotAnimation from './MascotAnimation';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-8 md:pt-12 pb-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-kid-light-blue/20 via-white to-white"></div>
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-kid-light-blue/20 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="w-full md:w-1/2 text-center md:text-left pt-8 md:pt-16">
            <motion.div 
              className="inline-block px-4 py-1 rounded-full bg-kid-light-blue text-kid-blue font-medium text-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AI-Powered Learning for Kids
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block">Learning is</span> 
              <span className="bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent">Magical Adventure</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-lg md:text-xl mb-8 md:pr-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover a world where education comes alive with interactive stories, fun math games, and creative activities personalized for every child.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button 
                className="kid-button-primary text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Learning Adventure!
              </motion.button>
              
              <motion.button 
                className="kid-button-ghost text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Activities
              </motion.button>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <MascotAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
