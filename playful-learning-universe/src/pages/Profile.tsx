
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/profile/UserProfile';

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Learning Profile</h1>
          <p className="text-gray-600">Track your progress and see your learning achievements!</p>
        </motion.div>
        
        <UserProfile />
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Profile;
