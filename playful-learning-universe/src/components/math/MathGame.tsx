
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, Divide, Star, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface MathGameProps {
  category: 'addition' | 'subtraction' | 'multiplication' | 'division';
  level: number;
}

const MathGame = ({ category, level }: MathGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [problem, setProblem] = useState(() => generateProblem(category, level));
  
  // Generate problem based on category and level
  function generateProblem(category: 'addition' | 'subtraction' | 'multiplication' | 'division', level: number) {
    let num1: number, num2: number, answer: number, options: number[];
    
    switch (category) {
      case 'addition':
        num1 = Math.floor(Math.random() * (level * 10)) + 1;
        num2 = Math.floor(Math.random() * (level * 10)) + 1;
        answer = num1 + num2;
        break;
      case 'subtraction':
        num2 = Math.floor(Math.random() * (level * 5)) + 1;
        num1 = num2 + Math.floor(Math.random() * (level * 5)) + 1;
        answer = num1 - num2;
        break;
      case 'multiplication':
        num1 = Math.floor(Math.random() * (level * 3)) + 1;
        num2 = Math.floor(Math.random() * (level * 2)) + 1;
        answer = num1 * num2;
        break;
      case 'division':
        num2 = Math.floor(Math.random() * (level * 2)) + 1;
        if (num2 === 0) num2 = 1; // Prevent division by zero
        answer = Math.floor(Math.random() * (level * 2)) + 1;
        num1 = num2 * answer; // Ensure clean division
        break;
    }
    
    // Generate answer options (1 correct, 3 close but wrong)
    const wrongAnswers = [
      answer + 1,
      answer - 1,
      answer + 2,
      answer - 2,
      answer + (Math.floor(Math.random() * 5) + 3),
      answer - (Math.floor(Math.random() * 5) + 3),
    ].filter(a => a !== answer && a > 0);
    
    // Pick 3 random wrong answers
    const randomWrongAnswers = wrongAnswers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    // Create options array with correct answer and 3 wrong answers
    options = [answer, ...randomWrongAnswers]
      .sort(() => 0.5 - Math.random());
    
    return { num1, num2, answer, options };
  };
  
  // Handle answer selection
  const handleSelectAnswer = (selectedOption: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selectedOption);
    setShowFeedback(true);
    
    const isCorrect = selectedOption === problem.answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowHint(false);
      if (currentQuestion < 10) {
        setCurrentQuestion(currentQuestion + 1);
        // Generate a new problem for the next question
        setProblem(generateProblem(category, level));
      }
    }, 1500);
  };
  
  // Get operation symbol based on category
  const getOperationSymbol = () => {
    switch (category) {
      case 'addition': return <Plus className="text-kid-blue" />;
      case 'subtraction': return <Minus className="text-kid-red" />;
      case 'multiplication': return <X className="text-kid-purple" />;
      case 'division': return <Divide className="text-kid-green" />;
    }
  };
  
  // Get hint text based on category
  const getHint = () => {
    switch (category) {
      case 'addition':
        return `Count ${problem.num1} and then add ${problem.num2} more!`;
      case 'subtraction':
        return `Start with ${problem.num1} and take away ${problem.num2}.`;
      case 'multiplication':
        return `Think of ${problem.num1} groups with ${problem.num2} in each group.`;
      case 'division':
        return `Divide ${problem.num1} into groups of ${problem.num2}.`;
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = (currentQuestion / 10) * 100;
  
  return (
    <div className="bg-white rounded-3xl shadow-kid p-6 md:p-8">
      {/* Progress and score */}
      <div className="flex justify-between items-center mb-6">
        <div className="kid-badge bg-kid-light-blue text-kid-blue">
          Question {currentQuestion}/10
        </div>
        <div className="flex items-center">
          <Star className="text-kid-yellow fill-kid-yellow mr-1" size={18} />
          <span className="font-bold">{score}</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="kid-progress-bar mb-8">
        <motion.div 
          className="kid-progress-fill"
          initial={{ width: `${(currentQuestion - 1) * 10}%` }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Math problem */}
      <div className="mb-8">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center space-x-6 md:space-x-8 text-4xl md:text-5xl font-bold"
        >
          <span>{problem.num1}</span>
          <div className="w-10 h-10 flex items-center justify-center">
            {getOperationSymbol()}
          </div>
          <span>{problem.num2}</span>
          <span>=</span>
          <div className="w-16 h-16 rounded-xl bg-kid-light-blue flex items-center justify-center animate-pulse">
            ?
          </div>
        </motion.div>
      </div>
      
      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4">
        {problem.options.map((option, index) => (
          <motion.button
            key={`${currentQuestion}-${index}`}
            className={`kid-button relative h-16 text-xl font-bold ${
              showFeedback 
                ? option === problem.answer 
                  ? 'bg-kid-green text-white' 
                  : option === selectedAnswer 
                    ? 'bg-kid-red text-white' 
                    : 'bg-gray-100 text-gray-400'
                : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-kid-blue'
            }`}
            onClick={() => handleSelectAnswer(option)}
            disabled={showFeedback}
            whileHover={!showFeedback ? { scale: 1.05, y: -5 } : {}}
            whileTap={!showFeedback ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
          >
            {option}
            
            {showFeedback && option === problem.answer && (
              <motion.div 
                className="absolute -right-2 -top-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <CheckCircle className="text-white fill-kid-green stroke-white" size={24} />
              </motion.div>
            )}
            
            {showFeedback && option === selectedAnswer && option !== problem.answer && (
              <motion.div 
                className="absolute -right-2 -top-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <XCircle className="text-white fill-kid-red stroke-white" size={24} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Hint button */}
      <div className="mt-8 text-center">
        <motion.button
          className="flex items-center mx-auto space-x-2 text-kid-blue hover:text-kid-purple transition-colors"
          onClick={() => setShowHint(!showHint)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle size={18} />
          <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
        </motion.button>
        
        {/* Hint display */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-kid-light-blue rounded-xl text-kid-blue">
                {getHint()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MathGame;
