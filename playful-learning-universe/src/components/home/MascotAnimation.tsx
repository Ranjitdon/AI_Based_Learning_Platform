
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MascotAnimation = () => {
  // References for animated elements
  const robotRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const mathRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-[300px] md:h-[400px] w-full">
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-10 left-[15%] w-12 h-12 bg-kid-light-blue rounded-full opacity-30"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-[20%] w-8 h-8 bg-kid-light-yellow rounded-full opacity-30"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 right-[10%] w-10 h-10 bg-kid-light-pink rounded-full opacity-30"
        animate={{ 
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Robot mascot */}
      <motion.div 
        ref={robotRef}
        className="absolute left-[10%] md:left-[20%] top-10 md:top-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          rotate: [-2, 2, -2],
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {/* Robot head */}
          <div className="w-32 h-28 bg-kid-blue rounded-t-2xl rounded-b-lg relative shadow-lg">
            {/* Eyes */}
            <div className="absolute top-6 left-5 w-6 h-6 bg-white rounded-full">
              <div className="w-3 h-3 bg-black rounded-full relative top-1 left-1.5"></div>
            </div>
            <div className="absolute top-6 right-5 w-6 h-6 bg-white rounded-full">
              <div className="w-3 h-3 bg-black rounded-full relative top-1 left-1.5"></div>
            </div>
            
            {/* Antenna */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gray-300">
              <div className="w-4 h-4 bg-kid-red rounded-full relative -top-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            
            {/* Mouth */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-white rounded-full">
              <motion.div 
                className="w-12 h-4 border-2 border-white rounded-b-full absolute top-1"
                animate={{ scaleY: [1, 0.6, 1], opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
              />
            </div>
          </div>
          
          {/* Robot body */}
          <div className="w-24 h-24 bg-kid-light-blue mx-auto rounded-lg relative -top-2 shadow-lg">
            {/* Buttons */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-4 h-4 bg-kid-yellow rounded-full"></div>
              <div className="w-4 h-4 bg-kid-green rounded-full"></div>
              <div className="w-4 h-4 bg-kid-red rounded-full"></div>
            </div>
            
            {/* Arms */}
            <motion.div 
              className="absolute -left-4 top-6 w-4 h-12 bg-kid-light-blue rounded-full"
              animate={{ rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute -right-4 top-6 w-4 h-12 bg-kid-light-blue rounded-full"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Book character */}
      <motion.div 
        ref={bookRef}
        className="absolute left-[45%] transform -translate-x-1/2 bottom-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          rotate: [2, -2, 2]
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          y: { duration: 0.5, delay: 0.2 },
          rotate: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }
        }}
      >
        {/* Book body */}
        <div className="w-40 h-36 bg-gradient-to-r from-kid-green to-kid-teal rounded-md relative shadow-lg">
          {/* Book spine */}
          <div className="absolute left-[15%] top-0 h-full w-[5px] bg-white/20"></div>
          
          {/* Book face */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            {/* Eyes */}
            <div className="flex space-x-8">
              <motion.div 
                className="w-5 h-5 bg-white rounded-full"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              >
                <div className="w-2 h-2 bg-black rounded-full relative top-1.5 left-1.5"></div>
              </motion.div>
              <motion.div 
                className="w-5 h-5 bg-white rounded-full"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
              >
                <div className="w-2 h-2 bg-black rounded-full relative top-1.5 left-1.5"></div>
              </motion.div>
            </div>
            
            {/* Mouth */}
            <motion.div 
              className="w-12 h-6 bg-white mt-6 rounded-[50%] mx-auto"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
          
          {/* Book pages */}
          <div className="absolute right-2 top-2 bottom-2 w-[10px] bg-white rounded-sm"></div>
        </div>
      </motion.div>
      
      {/* Math symbol */}
      <motion.div 
        ref={mathRef}
        className="absolute right-[15%] top-1/4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          rotate: [-3, 3, -3]
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.4 },
          y: { duration: 0.5, delay: 0.4 },
          rotate: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }
        }}
      >
        <div className="relative">
          {/* Main circle */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-kid-purple to-kid-pink flex items-center justify-center shadow-lg">
            {/* Plus symbol */}
            <div className="text-4xl font-bold text-white">+</div>
            
            {/* Orbital circles */}
            <motion.div 
              className="absolute -top-2 -right-2 w-8 h-8 bg-kid-yellow rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{ transformOrigin: "center center", transform: "translate(0, 0) rotate(0deg)" }}
            />
            
            <motion.div 
              className="absolute -bottom-4 left-0 w-6 h-6 bg-kid-teal rounded-full"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ transformOrigin: "center center", transform: "translate(0, 0) rotate(0deg)" }}
            />
          </div>
          
          {/* Eyes */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
            <div className="w-5 h-5 bg-white rounded-full">
              <div className="w-2 h-2 bg-black rounded-full relative top-1.5 left-1.5"></div>
            </div>
            <div className="w-5 h-5 bg-white rounded-full">
              <div className="w-2 h-2 bg-black rounded-full relative top-1.5 left-1.5"></div>
            </div>
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-white rounded-b-xl"
            animate={{ scaleY: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      
      {/* Floating stars and shapes */}
      <motion.div 
        ref={starsRef}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} 
              ${['bg-kid-yellow', 'bg-kid-light-blue', 'bg-kid-light-pink'][Math.floor(Math.random() * 3)]} 
              ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              opacity: 0.4 + Math.random() * 0.4
            }}
            animate={{ 
              y: [0, -10, 0], 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 + Math.random() * 3,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MascotAnimation;
