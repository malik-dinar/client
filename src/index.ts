import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "path";
import http from "http";

import connectDb from "./config/connection";
import moviesRoute from "./router/movies";
import reviewRoute from "./router/reviews"

dotenv.config();
const app = express();
const port = 3001;

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", moviesRoute);
app.use("/api", reviewRoute);

//Global path handeler
// app.use("/*", (req, res) => {
//   res.status(404).json({ error: "Incorrect endpoint!" });
// });

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is  running in ${port} visit http://localhost:${port}`);
});
