import { model, Schema } from "mongoose";

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuestions {
  question: string;
  options: IOption[];
  answer: string;
  hint?: string;
}

export interface ILevel {
  levelNumber: number;
  questions: IQuestions[];
}

export interface ICategory {
  categoryName: string;
  levels: ILevel[];
}

export const optionSchema: Schema<IOption> = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

export const questionSchema: Schema<IQuestions> = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
});

export const levelSchema = new Schema({
  levelNumber: {
    type: Number,
    required: true,
  },
  questions: {
    type: [questionSchema],
  },
});

export const categorySchema = new Schema<ICategory>({
  categoryName: { type: String, required: true },
  levels: [levelSchema],
});
interface IStory {
  title: string;
  content: string;
  coverImage: string;
  category: string;
  ageRange: string;
  createdAt: Date;
}

// Define MongoDB Schema
const storySchema = new Schema<IStory>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, default: "https://images.unsplash.com/photo-1472396961693-142e6e269027" }, // Default Image
  category: { type: String, default: "Fantasy" },
  ageRange: { type: String, default: "5-8" },
  createdAt: { type: Date, default: Date.now },
});

const Category = model<ICategory>("Category", categorySchema);
const Story = model<IStory>("Story", storySchema);

export default Category;
