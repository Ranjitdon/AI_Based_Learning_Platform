
import { motion } from 'framer-motion';
import { Star, Award, BookOpen, Calculator, Brain, Palette } from 'lucide-react';

// Sample user data
const userData = {
  name: "Alex",
  avatar: "/placeholder.svg",
  age: 8,
  grade: "3rd Grade",
  badges: [
    { id: 1, name: "Reading Explorer", count: 5, icon: BookOpen, color: "bg-kid-blue" },
    { id: 2, name: "Math Master", count: 3, icon: Calculator, color: "bg-kid-green" },
    { id: 3, name: "Quiz Champion", count: 7, icon: Brain, color: "bg-kid-purple" },
    { id: 4, name: "Creative Genius", count: 2, icon: Palette, color: "bg-kid-orange" },
  ],
  totalStars: 42,
  recentActivities: [
    { id: 1, name: "Read 'The Curious Robot'", type: "story", date: "Today" },
    { id: 2, name: "Completed Addition Quiz", type: "math", date: "Yesterday" },
    { id: 3, name: "Created Space Adventure Art", type: "creative", date: "2 days ago" },
  ],
  recommendedActivities: [
    { id: 1, name: "The Friendly Dragon", type: "story", difficulty: "Easy" },
    { id: 2, name: "Multiplication Level 2", type: "math", difficulty: "Medium" },
    { id: 3, name: "Science Quiz: Animals", type: "quiz", difficulty: "Medium" },
  ]
};

const UserProfile = () => {
  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'story': return <BookOpen className="text-kid-blue" size={18} />;
      case 'math': return <Calculator className="text-kid-green" size={18} />;
      case 'quiz': return <Brain className="text-kid-purple" size={18} />;
      case 'creative': return <Palette className="text-kid-orange" size={18} />;
      default: return <Star className="text-kid-yellow" size={18} />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Summary */}
      <div className="md:col-span-1">
        <motion.div 
          className="kid-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-kid-light-blue overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-16 h-16" 
                />
              </div>
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-kid-yellow text-kid-blue rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              >
                {userData.age}
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-bold mt-4">{userData.name}</h2>
            <p className="text-gray-600">{userData.grade}</p>
            
            <div className="flex items-center mt-2 bg-kid-light-yellow px-3 py-1 rounded-full">
              <Star className="text-kid-yellow fill-kid-yellow mr-1" size={16} />
              <span className="font-medium">{userData.totalStars} Stars</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-3">My Badges</h3>
            <div className="space-y-3">
              {userData.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className="flex items-center bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <div className={`w-10 h-10 ${badge.color} rounded-lg flex items-center justify-center text-white`}>
                    <badge.icon size={20} />
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="font-medium text-gray-800">{badge.name}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <Award className="text-kid-yellow fill-kid-yellow mr-1" size={14} />
                    <span className="text-xs font-medium">{badge.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Activity Center */}
      <div className="md:col-span-2 grid grid-cols-1 gap-6">
        {/* Recent Activities */}
        <motion.div 
          className="kid-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-bold text-gray-800 mb-4">Recent Activities</h3>
          
          <div className="space-y-3">
            {userData.recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex items-center bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="ml-3 flex-grow">
                  <p className="font-medium text-gray-800">{activity.name}</p>
                  <p className="text-gray-500 text-sm">{activity.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Recommendations */}
        <motion.div 
          className="kid-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="font-bold text-gray-800 mb-4">Recommended For You</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {userData.recommendedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <span className={`text-xs font-medium kid-badge ${
                    activity.difficulty === 'Easy' 
                      ? 'bg-kid-light-green text-kid-green' 
                      : activity.difficulty === 'Medium'
                        ? 'bg-kid-light-blue text-kid-blue'
                        : 'bg-kid-light-purple text-kid-purple'
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>
                
                <h4 className="font-bold mt-3 mb-1">{activity.name}</h4>
                
                <button className="w-full mt-2 text-center text-kid-blue font-medium hover:underline text-sm">
                  Start Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Progress Overview */}
        <motion.div 
          className="kid-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-bold text-gray-800 mb-4">My Learning Progress</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">Reading Skills</span>
                <span className="text-kid-blue font-medium">75%</span>
              </div>
              <div className="kid-progress-bar">
                <motion.div 
                  className="kid-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">Math Skills</span>
                <span className="text-kid-green font-medium">60%</span>
              </div>
              <div className="kid-progress-bar">
                <motion.div 
                  className="kid-progress-fill from-kid-green to-kid-teal"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">Science Knowledge</span>
                <span className="text-kid-purple font-medium">40%</span>
              </div>
              <div className="kid-progress-bar">
                <motion.div 
                  className="kid-progress-fill from-kid-purple to-kid-pink"
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-700">Creativity</span>
                <span className="text-kid-orange font-medium">85%</span>
              </div>
              <div className="kid-progress-bar">
                <motion.div 
                  className="kid-progress-fill from-kid-orange to-kid-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
