
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuizCard from "../components/quizzes/QuizCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Quizzes = () => {
  interface Option {
    id: string;
    text: string;
  }

  interface Quiz {
    id: string; // Changed from number to string to match UUID format
    question: string;
    options: Option[];
    correctOptionId: string;
    category: string;
    imageUrl?: string;
  }

  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fallback quizzes in case of API failure
  const fallbackQuizzes: Quiz[] = [
    {
      id: uuidv4(), // Using UUID instead of number
      question: "Which planet is known as the Red Planet?",
      options: [
        { id: "a", text: "Earth" },
        { id: "b", text: "Mars" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Venus" }
      ],
      correctOptionId: "b",
      category: "Science"
    },
    {
      id: uuidv4(), // Using UUID instead of number
      question: "What is 8 + 5?",
      options: [
        { id: "a", text: "12" },
        { id: "b", text: "13" },
        { id: "c", text: "14" },
        { id: "d", text: "15" }
      ],
      correctOptionId: "b",
      category: "Math"
    },
    {
      id: uuidv4(), // Using UUID instead of number
      question: "Which of these is not a fruit?",
      options: [
        { id: "a", text: "Apple" },
        { id: "b", text: "Carrot" },
        { id: "c", text: "Banana" },
        { id: "d", text: "Orange" }
      ],
      correctOptionId: "b",
      category: "Science"
    },
    {
      id: uuidv4(), // Using UUID instead of number
      question: "How many continents are there on Earth?",
      options: [
        { id: "a", text: "5" },
        { id: "b", text: "6" },
        { id: "c", text: "7" },
        { id: "d", text: "8" }
      ],
      correctOptionId: "c",
      category: "Geography"
    },
    {
      id: uuidv4(), // Using UUID instead of number
      question: "Which word is spelled correctly?",
      options: [
        { id: "a", text: "Recieve" },
        { id: "b", text: "Receive" },
        { id: "c", text: "Receve" },
        { id: "d", text: "Reciave" }
      ],
      correctOptionId: "b",
      category: "Spelling"
    },
    {
      id: uuidv4(), // Using UUID instead of number
      question: "What is the capital of France?",
      options: [
        { id: "a", text: "London" },
        { id: "b", text: "Berlin" },
        { id: "c", text: "Paris" },
        { id: "d", text: "Rome" }
      ],
      correctOptionId: "c",
      category: "Geography"
    }
  ];

  // Fetch quiz data
  const fetchQuizData = async (numQuizzes: number) => {
    try {
      const prompt = `
        You are a children-specific chatbot. Please provide ${numQuizzes} questions related to category (e.g., "Math", "Science", "Spelling", "Music", "Arts", "Reading" etc., chosen randomly) for children below age 15. 
        Each question should be structured with the following properties:
        1. question: The question itself (e.g., "What is 5 + 3?")
        2. options: An array of objects, where each object contains:
            - id: A unique identifier for the option (e.g., "a", "b", "c", "d")
            - text: The text of the option (e.g., "7", "8", "9", "10")
        3. correctOptionId: The id of the correct answer option (e.g., "a", "b", "c", "d")
        4. category: The category of the question (e.g., "Math", "Science", "Spelling")
        Please return the JSON in the following format:
        [
          {
            "question": "Which of these animals can fly?",
            "options": [
              { "id": "a", "text": "Dog" },
              { "id": "b", "text": "Cat" },
              { "id": "c", "text": "Bird" },
              { "id": "d", "text": "Fish" }
            ],
            "correctOptionId": "c",
            "category": "Science"
          }
        ]`;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/math/fromai`,
        { prompt }
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.data) {
        const candidates = response.data.data.response?.candidates;

        if (Array.isArray(candidates) && candidates.length > 0) {
          const quizText = candidates[0].content.parts[0].text;
          const cleanText = quizText.replace(/```json|```/g, "").trim();
          const quizJson = JSON.parse(cleanText);

          if (Array.isArray(quizJson)) {
            // Assign UUIDs to each quiz
            const quizzesWithId = quizJson.map((quiz) => ({
              id: uuidv4(), // Using UUID string as ID
              ...quiz
            }));

            setQuizData((prev) => [...prev, ...quizzesWithId]);
            setLoading(false);
          } else {
            throw new Error("Invalid data format");
          }
        } else {
          throw new Error("No candidates data found");
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error(err);
      
      // If no quizzes have been loaded yet, use the fallback quizzes
      if (quizData.length === 0) {
        setQuizData(fallbackQuizzes);
      }
      
      setLoading(false);
    }
  };

  // Fetch quiz data on component mount
  useEffect(() => {
    fetchQuizData(6);
  }, []);

  // Handle answering the quiz
  const handleAnswer = (quizId: string) => {
    const answeredQuiz = quizData.find((quiz) => quiz.id === quizId);
    if (answeredQuiz) {
      setAnsweredQuizzes((prev) => [...prev, answeredQuiz]);
      setQuizData((prev) => prev.filter((quiz) => quiz.id !== quizId));
      
      // Try to fetch a new quiz, use fallback if it fails
      try {
        fetchQuizData(1);
      } catch (err) {
        console.error("Failed to fetch new quiz after answer", err);
        
        // Add a fallback quiz if available and not all are used
        if (answeredQuizzes.length < fallbackQuizzes.length) {
          const fallbackIndex = answeredQuizzes.length % fallbackQuizzes.length;
          const fallbackQuiz = {
            ...fallbackQuizzes[fallbackIndex],
            id: uuidv4()
          };
          setQuizData(prev => [...prev, fallbackQuiz]);
        }
      }
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Loading Quizzes...
            </h1>
          </div>
        </div>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Fun Quizzes</h1>
            <p className="text-gray-600">
              Test your knowledge with these exciting quizzes!
            </p>
            {error && (
              <motion.div 
                className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizData.length > 0 ? (
              quizData.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  question={quiz.question}
                  options={quiz.options}
                  correctOptionId={quiz.correctOptionId}
                  category={quiz.category}
                  imageUrl={quiz.imageUrl}
                  onAnswer={() => handleAnswer(quiz.id)}
                />
              ))
            ) : (
              <p>No quizzes available.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Quizzes;
