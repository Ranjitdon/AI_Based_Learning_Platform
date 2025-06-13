import { Request, Response } from "express";
import Category from "../models/mathSchema";
import { apiGemini } from "../utils/genAiService";

const getMathItems = async (req: Request, res: Response) => {
  const math = await Category.find({});
  res.status(200).json({
    message: math,
  });
};

const getQuizFromApi = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const apiResponse = await apiGemini({
    prompt: prompt,
  });

  res.status(200).json({
    message: "Data generated successfully!",
    data: apiResponse,
  });
};


const postMathItems = async (req: Request, res: Response) => {
  const { categoryName, levels } = req.body;
  const newCategory = new Category({ categoryName, levels });
  const saveMathItems = await newCategory.save();
  res.status(200).json({
    message: saveMathItems,
  });
};

export default {
  getMathItems,
  postMathItems,
  getQuizFromApi,
};
