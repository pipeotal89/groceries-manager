import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(express.json());

//Routes

app.use("/api/v1/categories", require("./routes/categories"));

export default app;
