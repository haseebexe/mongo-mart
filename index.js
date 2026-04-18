import express from "express";
import dotenv from "dotenv";
import connectDb from "./server/utils/db.js";

dotenv.config();

// Importing routes
import userRouter from "./server/routes/user.js";



const port = process.env.PORT;

const app = express();

app.use(express.json())
// Using routes
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
