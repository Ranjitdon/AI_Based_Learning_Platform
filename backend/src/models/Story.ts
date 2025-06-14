import mongoose, { Schema, Document } from "mongoose";

export interface IStory extends Document {
  title: string;
  content: string;
  coverImage: string;
  category: string;
  ageRange: string;
  createdAt: Date;
}

// Check if model already exists to prevent overwrite error
const StorySchema = new Schema<IStory>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: "https://images.unsplash.com/photo-1472396961693-142e6e269027" },
  category: { type: String, default: "Fantasy" },
  ageRange: { type: String, default: "5-8" },
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.models.Story || mongoose.model<IStory>("Story", StorySchema);

export default Story;
