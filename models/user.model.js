import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/\s+@\s+\.\s+/, "please enter a valid email id"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: 5,
      maxLength: 255,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
