import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { connectToDB } from "./config/mongoose"; // Import the mongoose configuration file

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

connectToDB();

app.use(express.json());

//Routes

app.use("/api/v1/categories", require("./routes/categories"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

export default app;
