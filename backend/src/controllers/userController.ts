import { Request, Response } from "express";
import User from "../models/userSchema";

const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.log("Unexpected error", error);
      res.status(500).json({ error: "Unexpected error" });
    }
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.log("Unexpected error", error);
      res.status(500).json({ error: "Unexpected error" });
    }
  }
};

export default { createUser, getUser };
