import express from "express";
import Router from "./Auth/Auth.js";
import database from "./database.js";
//Database Connection
database();
const app = express();
app.use(express.json());

app.use("", Router);
app.listen(5555, () => console.log("server is running on port 5555"));
