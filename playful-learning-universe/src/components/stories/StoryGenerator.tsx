import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, RefreshCw, Send, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateStoryWithGemini, generateFallbackStory } from './GeminiStoryApiService';
import axios from "axios";

const EXAMPLE_PROMPTS = [
  "A little bear who loves to explore the forest.",
  "A magical school where kids learn how to control the weather.",
  "Two friends discover a hidden door in their treehouse."
];

// Create a custom event for story saving
export const STORY_SAVED_EVENT = 'storySaved';

const StoryGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [storyTitle, setStoryTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyImage, setStoryImage] = useState<string | null>(null);
  const [storySaved, setStorySaved] = useState(false);
  const { toast } = useToast();

  const handleGenerateStory = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a story idea first!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Call the updated Gemini API service
      const response = await generateStoryWithGemini(prompt);
      
      if (response.story) {
        setStory(response.story);
        setStoryTitle(response.title || "Your Magical Story");
        
        // If the API returned an image
        if (response.imageUrl) {
          setStoryImage(response.imageUrl);
        } else {
          setStoryImage(null);
        }
        
        toast({
          title: "Story created!",
          description: "Your magical story is ready to read!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error generating story:", error);
      
      // Fallback to the mock implementation if API fails
      const fallbackResponse = generateFallbackStory(prompt);
      setStory(fallbackResponse.story);
      setStoryTitle(fallbackResponse.title || "Your Magical Story");
      setStoryImage(null);
      
      toast({
        title: "Story created!",
        description: "Your magical story is ready to read using our backup storyteller!",
        variant: "default",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleReset = () => {
    setPrompt('');
    setStory('');
    setStoryTitle('');
    setStoryImage(null);
  };

  // Save story
  const handleSaveStory = async () => {
    try {
      const storyData = {
        title: storyTitle,
        content: story,
        coverImage: storyImage || "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      };
  
      console.log("📤 Sending story data:", storyData);
  
      await axios.post(`${import.meta.env.VITE_BASE_URL}/stories/saveStory`, storyData);
  
      setStorySaved(true);
      toast({
        title: "Story saved!",
        description: "Your magical story has been saved to your collection!",
        variant: "default",
      });

      // Dispatch a custom event to notify that a story was saved
      window.dispatchEvent(new CustomEvent(STORY_SAVED_EVENT));
      
    } catch (error: any) {
      console.error("❌ Error saving story:", error.response?.data || error.message);
      toast({
        title: "Oops!",
        description: error.response?.data?.error || "There was a problem saving your story.",
        variant: "destructive",
      });
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <Card className="relative overflow-hidden border-2 border-kid-light-blue shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-kid-light-blue/40 to-transparent rounded-bl-full -z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-kid-light-purple/30 to-transparent rounded-tr-full -z-0"></div>
        
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-kid-purple" />
            <span>Story Creator</span>
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="ml-1"
            >
              <Sparkles className="w-5 h-5 text-kid-orange" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {!story ? (
            <>
              <p className="mb-4 text-gray-600">
                Enter a story idea, and our magical story creator will write an amazing story just for you!
              </p>
              
              <div className="space-y-4">
                <Textarea
                  placeholder="Example: A little bear who loves to explore the forest."
                  className="min-h-[100px] bg-white/70 backdrop-blur-sm border-kid-light-purple/50 focus:border-kid-purple"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                
                <div className="flex flex-wrap gap-2">
                  <p className="w-full text-sm text-gray-500">Or try one of these:</p>
                  {EXAMPLE_PROMPTS.map((examplePrompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="bg-white/70 text-kid-blue border-kid-light-blue hover:bg-kid-light-blue/20"
                      onClick={() => handleExampleClick(examplePrompt)}
                    >
                      {examplePrompt}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-kid-light-purple/30 min-h-[300px]"
              >
                <h3 className="font-bold text-xl mb-3 text-kid-purple">
                  {storyTitle}
                </h3>
                
                {storyImage && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={storyImage} 
                      alt={storyTitle} 
                      className="rounded-lg max-h-64 object-cover shadow-md" 
                    />
                  </div>
                )}
                
                <div className="prose">
                  {story.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="relative z-10 flex justify-between">
          {!story ? (
            <Button
              onClick={handleGenerateStory}
              disabled={isGenerating || !prompt.trim()}
              className="bg-gradient-to-r from-kid-blue to-kid-purple hover:opacity-90 text-white"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating Magic...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Create Story
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-kid-light-blue text-kid-blue hover:bg-kid-light-blue/20"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Create Another Story
              </Button>
              
              <Button
                onClick={handleSaveStory}
                disabled={storySaved}
                className="bg-gradient-to-r from-kid-green to-kid-teal hover:opacity-90 text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {storySaved ? "Story Saved" : "Save Story"}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default StoryGenerator;
