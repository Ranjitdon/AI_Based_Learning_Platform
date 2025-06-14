
import { motion } from 'framer-motion';
import { Book, Calculator, Brain, PaintBucket, Gift } from 'lucide-react';
import Hero from '../components/home/Hero';
import SubjectCard from '../components/home/SubjectCard';
import Footer from '../components/Footer';

const Index = () => {
  const subjectCards = [
    {
      title: "Interactive Stories",
      description: "Discover a world of AI-generated stories that adapt to your interests and reading level.",
      icon: <Book className="w-6 h-6" />,
      color: "bg-kid-blue",
      lightColor: "bg-kid-light-blue/30",
      path: "/stories"
    },
    {
      title: "Math Games",
      description: "Practice math skills with fun, interactive games that adjust to your learning pace.",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-kid-green",
      lightColor: "bg-kid-light-green/30",
      path: "/math"
    },
    {
      title: "Fun Quizzes",
      description: "Test your knowledge with colorful quizzes on various subjects with instant feedback.",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-kid-purple",
      lightColor: "bg-kid-light-pink/30",
      path: "/quizzes"
    },
    {
      title: "Creative Space",
      description: "Draw, create stories, and let your imagination run wild with AI-powered creative tools.",
      icon: <PaintBucket className="w-6 h-6" />,
      color: "bg-kid-orange",
      lightColor: "bg-kid-light-yellow/30",
      path: "/creative"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      
      <Hero />
      
      {/* Subject Categories */}
      <section className="py-16 bg-kid-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Learning Adventures
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover fun activities tailored to your child's interests and learning style
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjectCards.map((card, index) => (
              <SubjectCard
                key={card.title}
                title={card.title}
                description={card.description}
                icon={card.icon}
                color={card.color}
                lightColor={card.lightColor}
                path={card.path}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-kid-light-blue/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Why Kids Love LearniVerse
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mx-auto w-16 h-16 bg-kid-light-blue rounded-2xl flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-kid-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-gray-600">AI adapts to each child's pace and interests, making learning engaging and effective.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto w-16 h-16 bg-kid-light-green rounded-2xl flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-kid-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Activities</h3>
              <p className="text-gray-600">Fun, engaging activities that make learning feel like play with instant feedback.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="mx-auto w-16 h-16 bg-kid-light-yellow rounded-2xl flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-kid-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">See growth with achievements, badges and detailed progress reports for parents.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call-to-Action */}
      <section className="py-16 bg-gradient-to-r from-kid-blue to-kid-purple">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ready to Begin the Learning Adventure?
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-white text-opacity-80 mt-4">No credit card required. Explore all activities for Free.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
