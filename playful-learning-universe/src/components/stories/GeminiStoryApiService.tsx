
import axios from 'axios';

interface StoryGenerationResponse {
  story: string;
  title?: string;
  imageUrl?: string;
  image?: string; // Base64 encoded image from the Flask API
}

export const generateStoryWithGemini = async (prompt: string): Promise<StoryGenerationResponse> => {
  try {
    // Call the Flask backend API that integrates with Google Gemini
    const response = await axios.post(`${'http://127.0.0.1:5000'}/generate_story`, {
      input: prompt,
    });
    
    // Process the response from the Flask API
    const responseData = response.data;
    
    // Create a title from the prompt if not provided
    const title = generateStoryTitle(prompt);
    
    // If the API returned a base64 image, use it
    let imageUrl = undefined;
    if (responseData.image) {
      imageUrl = `data:image/png;base64,${responseData.image}`;
    }
    
    return {
      story: responseData.story,
      title: title,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error('Error generating story with Gemini:', error);
    throw error;
  }
};

// Helper function to generate a fallback story if API is not available or fails
export const generateFallbackStory = (prompt: string): StoryGenerationResponse => {
  // Generate a simple story based on the prompt
  const story = `Once upon a time, there was ${prompt.toLowerCase()}. 
    
    Every day, they would go on amazing adventures in their world. They made friends with everyone they met and shared their joy with others.
    
    One special day, something magical happened that changed everything. Through courage and kindness, they discovered that true happiness comes from helping others and being brave.
    
    The end.`;
    
  // Generate a title based on the prompt
  const title = generateStoryTitle(prompt);
  
  return {
    story,
    title,
  };
};

// Helper function to generate a title based on the prompt
function generateStoryTitle(prompt: string): string {
  const cleanPrompt = prompt.trim().toLowerCase();
  
  if (cleanPrompt.includes("bear")) {
    return "The Adventurous Little Bear";
  } else if (cleanPrompt.includes("school")) {
    return "The Weather Wizards' Academy";
  } else if (cleanPrompt.includes("treehouse")) {
    return "The Secret Door in the Treehouse";
  } else {
    // Generate a generic title based on the first few words
    const words = prompt.split(' ').slice(0, 4);
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return `The Magical Tale of ${capitalizedWords.join(' ')}`;
  }
}
