
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Book, Calculator, Brain, PaintBucket, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/stories', name: 'Stories', icon: <Book className="w-5 h-5 mr-1" /> },
    { path: '/math', name: 'Math', icon: <Calculator className="w-5 h-5 mr-1" /> },
    { path: '/quizzes', name: 'Quizzes', icon: <Brain className="w-5 h-5 mr-1" /> },
    { path: '/creative', name: 'Creative', icon: <PaintBucket className="w-5 h-5 mr-1" /> },
    { path: '/profile', name: 'Profile', icon: <User className="w-5 h-5 mr-1" /> },
  ];
  
  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="bg-kid-blue text-white font-bold rounded-xl w-10 h-10 flex items-center justify-center mr-2"
          >
            L
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-kid-blue to-kid-purple bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            LearniVerse
          </motion.h1>
        </Link>
        
        <nav className="hidden md:flex">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`relative px-4 py-2 rounded-xl flex items-center transition-all ${
                    location.pathname === item.path 
                      ? 'text-kid-blue font-bold' 
                      : 'text-gray-600 hover:text-kid-blue'
                  }`}
                >
                  {item.icon}
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-kid-light-blue rounded-xl -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile navigation - shown on small screens */}
        <div className="md:hidden flex items-center">
          <div className="bg-kid-light-blue rounded-full px-4 py-1">
            <Link to="/profile" className="text-kid-blue font-medium">
              My Space
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] rounded-t-3xl z-50">
        <div className="flex justify-around py-3 px-2">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 ${
                location.pathname === item.path ? 'text-kid-blue' : 'text-gray-500'
              }`}
            >
              <div className={`p-1 rounded-full ${location.pathname === item.path ? 'bg-kid-light-blue' : ''}`}>
                {item.icon}
              </div>
              <span className="text-xs mt-1">{item.name}</span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute bottom-0 w-1 h-1 rounded-full bg-kid-blue"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
