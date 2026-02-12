import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);

app.use(errorHandler);

export default app;
