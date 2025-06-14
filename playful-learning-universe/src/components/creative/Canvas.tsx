
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Wand2 } from 'lucide-react';

const colors = [
  '#FF6B6B', // Red
  '#FF9F45', // Orange
  '#FFD93D', // Yellow
  '#6BCB77', // Green
  '#4ECDC4', // Teal
  '#4A7CFA', // Blue
  '#B088F9', // Purple
  '#FF9BD2', // Pink
  '#000000', // Black
  '#FFFFFF', // White
];

interface Position {
  x: number;
  y: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#4A7CFA');
  const [brushSize, setBrushSize] = useState(10);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);
  
  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set initial drawing style
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);
  
  // Update drawing style when color or brush size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
  }, [currentColor, brushSize]);
  
  // Get actual position on canvas accounting for scaling
  const getCanvasPosition = (clientX: number, clientY: number): Position => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };
  
  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    // Handle both mouse and touch events
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const position = getCanvasPosition(clientX, clientY);
    setLastPosition(position);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Handle both mouse and touch events
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch devices
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const currentPosition = getCanvasPosition(clientX, clientY);
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    ctx.stroke();
    
    setLastPosition(currentPosition);
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };
  
  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  
  // Download canvas as image
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'my-amazing-artwork.png';
    link.click();
  };
  return (
    <div className="bg-white rounded-3xl shadow-kid overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {colors.map((color) => (
            <motion.button
              key={color}
              className={`w-8 h-8 rounded-full ${
                color === '#FFFFFF' ? 'border border-gray-200' : ''
              } ${
                currentColor === color ? 'ring-2 ring-offset-2 ring-kid-blue' : ''
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Brush Size</label>
          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full h-2 bg-kid-light-blue rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>
        
        <div className="relative border-4 border-kid-light-blue rounded-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-[400px] touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
          
          {/* Preview of brush size and color */}
          {isDrawing && lastPosition && (
            <div 
              className="absolute pointer-events-none rounded-full"
              style={{
                width: `${brushSize}px`,
                height: `${brushSize}px`,
                backgroundColor: currentColor,
                left: `${lastPosition.x}px`,
                top: `${lastPosition.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <motion.button
            className="kid-button bg-kid-red text-white flex items-center"
            onClick={clearCanvas}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="mr-2" size={18} />
            Clear
          </motion.button>
          
          <motion.button
            className="kid-button-primary flex items-center"
            onClick={downloadImage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="mr-2" size={18} />
            Save
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
