import { Request, Response } from "express";
import Story from "../models/Story";

// Controller Function to Save a Story
const saveStory = async (req: Request, res: Response) => {
  try {
    const { title, content, coverImage } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    // Create new story document
    const newStory = new Story({
      title,
      content,
      coverImage: coverImage || "https://images.unsplash.com/photo-1472396961693-142e6e269027", // Default Image
    });

    // Save story to MongoDB
    await newStory.save();

    return res.status(201).json({ message: "Story saved successfully!", story: newStory });
  } catch (error) {
    console.error("Error saving story:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getStories = async (req: Request, res: Response) => {
    try {
      const stories = await Story.find().sort({ createdAt: -1 }); // Fetch latest stories first
      return res.status(200).json(stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

export default{
    getStories,
    saveStory,
};
