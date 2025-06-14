
import { v4 as uuidv4 } from 'uuid';

// Interface for our story objects
export interface SavedStory {
  id: string;
  title: string;
  content: string; 
  coverImage: string;
  category: string;
  ageRange: string;
  createdAt: number; // timestamp
}

// Local storage key
const SAVED_STORIES_KEY = 'saved_stories';

// Get all saved stories
export const getSavedStories = (): SavedStory[] => {
  try {
    const savedStoriesJson = localStorage.getItem(SAVED_STORIES_KEY);
    return savedStoriesJson ? JSON.parse(savedStoriesJson) : [];
  } catch (error) {
    console.error('Error retrieving saved stories:', error);
    return [];
  }
};

// Save a new story
export const saveStory = (
  title: string,
  content: string,
  coverImage: string = "https://images.unsplash.com/photo-1472396961693-142e6e269027" // default image if none provided
): SavedStory => {
  try {
    const newStory: SavedStory = {
      id: uuidv4(),
      title,
      content,
      coverImage,
      category: "Fantasy", // Default category
      ageRange: "5-8", // Default age range
      createdAt: Date.now(),
    };

    const existingStories = getSavedStories();
    const updatedStories = [newStory, ...existingStories];
    
    localStorage.setItem(SAVED_STORIES_KEY, JSON.stringify(updatedStories));
    return newStory;
  } catch (error) {
    console.error('Error saving story:', error);
    throw error;
  }
};

// Get a limited number of stories
export const getLimitedStories = (limit: number): SavedStory[] => {
  const allStories = getSavedStories();
  return allStories.slice(0, limit);
};
