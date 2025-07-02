import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
); // optional: adds createdAt & updatedAt

// Create and export the User model
const User = mongoose.model("User", userSchema);
export { User };
