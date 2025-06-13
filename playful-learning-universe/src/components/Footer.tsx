
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 mt-16 bg-gradient-to-b from-transparent to-kid-light-blue/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <motion.h2 
              className="text-2xl font-bold bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              LearniVerse
            </motion.h2>
            <p className="text-gray-600 mt-2">Making learning fun and magical!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
            <div>
              <h3 className="font-bold text-kid-blue mb-2">Explore</h3>
              <ul className="space-y-1">
                <li><a href="/stories" className="text-gray-600 hover:text-kid-blue transition-colors">Stories</a></li>
                <li><a href="/math" className="text-gray-600 hover:text-kid-blue transition-colors">Math Games</a></li>
                <li><a href="/quizzes" className="text-gray-600 hover:text-kid-blue transition-colors">Fun Quizzes</a></li>
                <li><a href="/creative" className="text-gray-600 hover:text-kid-blue transition-colors">Get Creative</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-kid-blue mb-2">Parents</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Parent Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Progress Reports</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Settings</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
              <h3 className="font-bold text-kid-blue mb-2">Contact</h3>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Email Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-kid-blue transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-kid-blue/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-kid-red" fill="currentColor" /> for young learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
