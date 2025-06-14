import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, X, Divide } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MathGame from "../components/math/MathGame";

const Math = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "addition" | "subtraction" | "multiplication" | "division"
  >("addition");
  const [selectedLevel, setSelectedLevel] = useState(1);

  const categories = [
    { id: "addition", name: "Addition", icon: <Plus />, color: "bg-kid-blue" },
    {
      id: "subtraction",
      name: "Subtraction",
      icon: <Minus />,
      color: "bg-kid-red",
    },
    {
      id: "multiplication",
      name: "Multiplication",
      icon: <X />,
      color: "bg-kid-purple",
    },
    {
      id: "division",
      name: "Division",
      icon: <Divide />,
      color: "bg-kid-green",
    },
  ];

  const levels = [1, 2, 3, 4, 5];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Math Games</h1>
            <p className="text-gray-600">
              Practice math skills with fun, interactive games!
            </p>
          </motion.div>

          {/* Category selection */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`p-4 rounded-2xl flex flex-col items-center ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : "bg-white text-gray-800 border-2 border-gray-200"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      category.id as
                        | "addition"
                        | "subtraction"
                        | "multiplication"
                        | "division"
                    )
                  }
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedCategory === category.id
                        ? "bg-white/20"
                        : category.color + " text-white"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <span className="mt-2 font-bold">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Level selection */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">Choose a Level</h2>
            <div className="flex flex-wrap gap-4">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    selectedLevel === level
                      ? `${
                          categories.find((c) => c.id === selectedCategory)
                            ?.color
                        } text-white shadow-lg`
                      : "bg-white text-gray-800 border-2 border-gray-200"
                  }`}
                  onClick={() => setSelectedLevel(level)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Math game */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            key={`${selectedCategory}-${selectedLevel}`}
          >
            <MathGame category={selectedCategory} level={selectedLevel} />
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Math;
