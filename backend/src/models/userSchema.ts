import { Schema, model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const userSchema: Schema<IUser> = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = model<IUser>("User", userSchema);

export default User;
