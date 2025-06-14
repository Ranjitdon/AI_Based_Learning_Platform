import mongoose from "mongoose";
import "dotenv/config";
mongoose.set("strictQuery", false);

const mongodbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
};

export default mongodbConnect;
