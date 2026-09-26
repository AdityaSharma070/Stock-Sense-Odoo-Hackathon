import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server running at port: ${process.env.PORT || 8000}`);
    });

    server.on("error", (error) => {
      console.log("❌ Server error:", error);
    });
  })
  .catch((err) => {
    console.log("❌ DB connection failed:", err);
  });