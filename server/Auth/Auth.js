import express from "express";
import bcrypt from "bcrypt";
import User from "../Model/User.js";

const Router = express.Router();
const saltRound = 10;

Router.get("", (req, res) => {
  res.send("hello there");
});
Router.post("/signup", async (req, res) => {
  try {
    let success = false;
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, message: "user already exist" });
    }

    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    });
    await newUser.save();
    success = true;
    res.status(200).json({ success, message: "successful" });
  } catch (error) {
    console.error(error);
    console.error(error.message);
    res.status(500).send("some error occured while creating the user");
  }
});
//Login functionality

Router.post("/login", async (req, res) => {
  let success = false;
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ success, message: "Incorrect Email" });
  }
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, pass) => {
      if (!err) {
        bcrypt.compare(password, pass.password, function (err, result) {
          if (result) {
            success = true;
            return res.status(200).json({ success, message: "logged in" });
          } else {
            if (!err)
              return res
                .status(401)
                .json({ success, message: "invalid credentials" });
          }
        });
      }
    });
  } catch (error) {
    res.status(401).json({ error: "something went wrong" });
  }
});
export default Router;
