import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  category: string;
  imageUrl?: string;
  onAnswer: () => void;  // New prop to trigger next question generation
}

const QuizCard = ({
  question,
  options,
  correctOptionId,
  category,
  imageUrl,
  onAnswer,
}: QuizCardProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelectOption = (optionId: string) => {
    if (showFeedback) return;

    setSelectedOptionId(optionId);
    setShowFeedback(true);

    // Display feedback for 2 seconds before generating the next question
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOptionId(null);
      onAnswer();  // Trigger new question generation
    }, 2000);
  };

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "science":
        return "bg-kid-green text-white";
      case "math":
        return "bg-kid-blue text-white";
      case "spelling":
        return "bg-kid-purple text-white";
      case "geography":
        return "bg-kid-teal text-white";
      default:
        return "bg-kid-yellow text-kid-blue";
    }
  };

  return (
    <motion.div
      className="kid-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`kid-badge ${getCategoryColor()}`}>{category}</span>

        {showFeedback && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {selectedOptionId === correctOptionId ? (
              <div className="flex items-center text-kid-green">
                <CheckCircle className="mr-1" size={16} />
                <span className="font-medium">Correct!</span>
              </div>
            ) : (
              <div className="flex items-center text-kid-red">
                <XCircle className="mr-1" size={16} />
                <span className="font-medium">Try again!</span>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {imageUrl && (
        <div className="h-40 overflow-hidden rounded-xl mb-4">
          <img
            src={imageUrl}
            alt="Quiz question"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h3 className="text-xl font-bold mb-6">{question}</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <motion.button
            key={option.id}
            className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
              showFeedback
                ? option.id === correctOptionId
                  ? "bg-kid-green/10 border-kid-green text-kid-green"
                  : option.id === selectedOptionId
                  ? "bg-kid-red/10 border-kid-red text-kid-red"
                  : "bg-gray-100 border-gray-200 text-gray-400"
                : "bg-white border-gray-200 hover:border-kid-blue"
            }`}
            onClick={() => handleSelectOption(option.id)}
            whileHover={!showFeedback ? { scale: 1.02 } : {}}
            whileTap={!showFeedback ? { scale: 0.98 } : {}}
          >
            {option.text}

            <AnimatePresence>
              {showFeedback && option.id === correctOptionId && (
                <motion.div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <CheckCircle className="text-kid-green" size={20} />
                </motion.div>
              )}

              {showFeedback &&
                option.id === selectedOptionId &&
                option.id !== correctOptionId && (
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <XCircle className="text-kid-red" size={20} />
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
