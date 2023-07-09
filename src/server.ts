import cors from "cors";
import express from "express";
import app from "./app";
import routes from "./routes/routes";
require("dotenv").config();

const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
