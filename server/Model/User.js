import mongoose from "mongoose";

const userSechma = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSechma);

export default User;
